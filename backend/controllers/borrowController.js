const Borrow = require('../models/Borrow');
const Item = require('../models/Item');
const User = require('../models/User');
const Notification = require('../models/Notification');

// Request to Borrow Item
exports.requestBorrow = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId;

    console.log('📥 Borrow request received:', { itemId, userId });

    // Validate itemId
    if (!itemId) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      console.log('❌ Item not found:', itemId);
      return res.status(404).json({ message: 'Item not found' });
    }

    console.log('✅ Item found:', item.itemName);

    // Business Logic: User cannot borrow their own item
    if (item.ownerId.toString() === userId) {
      console.log('❌ User is item owner:', userId);
      return res.status(400).json({ message: 'You cannot borrow your own item' });
    }

    if (item.status !== 'Available') {
      console.log('❌ Item not available:', item.status);
      return res.status(400).json({ message: 'Item is not available' });
    }

    // Check if borrow request already exists
    const existingBorrow = await Borrow.findOne({
      itemId,
      borrowerId: userId,
      status: { $in: ['Pending', 'Active'] },
    });

    if (existingBorrow) {
      console.log('❌ Borrow request already exists:', existingBorrow._id);
      return res.status(400).json({ message: 'You have already requested this item' });
    }

    const borrowDate = new Date();
    const expectedReturnDate = new Date(borrowDate.getTime() + item.borrowDuration * 24 * 60 * 60 * 1000);

    const borrow = new Borrow({
      itemId,
      borrowerId: userId,
      ownerId: item.ownerId,
      borrowDate,
      expectedReturnDate,
      status: 'Pending',
    });

    await borrow.save();
    console.log('✅ Borrow record created:', borrow._id);

    // Update item status
    await Item.findByIdAndUpdate(itemId, { status: 'Requested' });
    console.log('✅ Item status updated to Requested');

    res.status(201).json({
      success: true,
      message: 'Borrow request sent successfully',
      borrow,
    });
  } catch (error) {
    console.error('❌ Error in requestBorrow:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Approve Borrow Request
exports.approveBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrow = await Borrow.findById(borrowId).populate('borrowerId itemId');
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow request not found' });
    }

    if (borrow.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to approve this request' });
    }

    // Update item status and set current borrower
    const item = await Item.findById(borrow.itemId);
    item.status = 'Borrowed';
    item.currentBorrower = borrow.borrowerId;
    item.borrowStartDate = borrow.borrowDate;
    item.borrowEndDate = borrow.expectedReturnDate;
    
    // Increment times borrowed
    item.totalTimesBorrowed = (item.totalTimesBorrowed || 0) + 1;
    await item.save();

    // Calculate total amount based on price per day
    const durationInMs = borrow.expectedReturnDate - borrow.borrowDate;
    const durationInDays = Math.ceil(durationInMs / (1000 * 60 * 60 * 24));
    borrow.totalAmount = (item.pricePerDay || 0) * durationInDays;

    // Set status to 'Active' so borrower can see it in 'My Borrows'
    borrow.status = 'Active';
    await borrow.save();

    // Create notification for borrower
    await Notification.create({
      userId: borrow.borrowerId._id,
      type: 'request_approved',
      title: 'Request Approved',
      message: `Your request to borrow "${item.name}" has been approved!`,
      relatedId: borrowId,
      relatedModel: 'Borrow',
    });

    console.log('✅ Borrow approved:', { borrowId, totalAmount: borrow.totalAmount });

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

    const borrow = await Borrow.findById(borrowId).populate('borrowerId itemId');
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

    // Create notification for borrower
    await Notification.create({
      userId: borrow.borrowerId._id,
      type: 'request_rejected',
      title: 'Request Rejected',
      message: `Your request to borrow "${borrow.itemId.name}" has been rejected.`,
      relatedId: borrowId,
      relatedModel: 'Borrow',
    });

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

    const validConditions = ['New', 'Good', 'Used', 'Damaged', 'Not Returned'];

    // Validate condition value
    if (conditionOnReturn && !validConditions.includes(conditionOnReturn)) {
      return res.status(400).json({ 
        message: `Invalid condition. Must be one of: ${validConditions.join(', ')}` 
      });
    }

    const borrow = await Borrow.findById(borrowId);
    if (!borrow) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    if (borrow.borrowerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to return this item' });
    }

    const returnDate = new Date();
    borrow.actualReturnDate = returnDate;
    borrow.conditionOnReturn = conditionOnReturn || null;
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

    // Update owner's earnings
    await User.findByIdAndUpdate(
      borrow.ownerId,
      { $inc: { totalEarnings: borrow.totalAmount } }
    );
    console.log('💰 Earnings updated for owner:', { 
      ownerId: borrow.ownerId, 
      amount: borrow.totalAmount 
    });

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
