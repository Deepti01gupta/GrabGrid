const Borrow = require('../models/Borrow');
const Item = require('../models/Item');
const User = require('../models/User');

// Request to Borrow Item
exports.requestBorrow = async (req, res) => {
  try {
    const { itemId } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.status !== 'Available') {
      return res.status(400).json({ message: 'Item is not available' });
    }

    // Check if borrow request already exists
    const existingBorrow = await Borrow.findOne({
      itemId,
      borrowerId: req.userId,
      status: { $in: ['Pending', 'Active'] },
    });

    if (existingBorrow) {
      return res.status(400).json({ message: 'You have already requested this item' });
    }

    const borrowDate = new Date();
    const expectedReturnDate = new Date(borrowDate.getTime() + item.borrowDuration * 24 * 60 * 60 * 1000);

    const borrow = new Borrow({
      itemId,
      borrowerId: req.userId,
      ownerId: item.ownerId,
      borrowDate,
      expectedReturnDate,
      status: 'Pending',
    });

    await borrow.save();

    // Update item status
    await Item.findByIdAndUpdate(itemId, { status: 'Requested' });

    res.status(201).json({
      success: true,
      message: 'Borrow request sent successfully',
      borrow,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Borrow Request
exports.approveBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrow.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to approve this request' });
    }

    borrow.status = 'Approved';
    await borrow.save();

    // Update item status and set current borrower
    const item = await Item.findById(borrow.itemId);
    item.status = 'Borrowed';
    item.currentBorrower = borrow.borrowerId;
    item.borrowStartDate = borrow.borrowDate;
    item.borrowEndDate = borrow.expectedReturnDate;
    await item.save();

    res.status(200).json({
      success: true,
      message: 'Borrow request approved',
      borrow,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject Borrow Request
exports.rejectBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrow.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to reject this request' });
    }

    borrow.status = 'Rejected';
    await borrow.save();

    // Update item status back to available
    await Item.findByIdAndUpdate(borrow.itemId, { status: 'Available' });

    res.status(200).json({
      success: true,
      message: 'Borrow request rejected',
      borrow,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return Item
exports.returnItem = async (req, res) => {
  try {
    const { borrowId, conditionOnReturn } = req.body;

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    if (borrow.borrowerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to return this item' });
    }

    const returnDate = new Date();
    borrow.actualReturnDate = returnDate;
    borrow.conditionOnReturn = conditionOnReturn;
    borrow.status = 'Returned';

    // Calculate late days and fine
    if (returnDate > borrow.expectedReturnDate) {
      const timeDiff = returnDate - borrow.expectedReturnDate;
      borrow.daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      borrow.fine = borrow.daysLate * 10; // 10 rupees per day
    }

    await borrow.save();

    // Update item status
    const item = await Item.findById(borrow.itemId);
    item.status = 'Available';
    item.currentBorrower = null;
    item.borrowStartDate = null;
    item.borrowEndDate = null;
    await item.save();

    // Update user's borrowed items count
    await User.findByIdAndUpdate(req.userId, { $inc: { itemsBorrowed: 1 } });

    res.status(200).json({
      success: true,
      message: 'Item returned successfully',
      borrow,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Borrow Requests (for item owner)
exports.getMyBorrowRequests = async (req, res) => {
  try {
    const borrows = await Borrow.find({ ownerId: req.userId })
      .populate('borrowerId', 'name hostelBlock roomNumber rating')
      .populate('itemId', 'itemName category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Borrows (for borrower)
exports.getMyBorrows = async (req, res) => {
  try {
    const borrows = await Borrow.find({ borrowerId: req.userId })
      .populate('ownerId', 'name hostelBlock roomNumber rating phoneNumber')
      .populate('itemId', 'itemName category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
