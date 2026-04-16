const Borrow = require('../models/Borrow');
const Item = require('../models/Item');
const User = require('../models/User');

// GET /api/dashboard/user
// Returns dashboard data for the logged-in user
exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.userId;
    const now = new Date();

    const ownedItemsQuery = Item.find({ ownerId: userId });
    const borrowedItemsQuery = Borrow.find({
      borrowerId: userId,
      status: { $in: ['Approved', 'Active'] },
    }).populate('itemId').populate('ownerId', 'name profilePic');
    
    const pendingRequestsQuery = Borrow.find({
      ownerId: userId,
      status: 'Pending',
    }).populate('itemId').populate('borrowerId', 'name profilePic');
    
    const returnedItemsQuery = Borrow.find({
      status: 'Returned',
      $or: [
        { borrowerId: userId },
        { ownerId: userId },
      ],
    }).populate('itemId').populate('borrowerId ownerId', 'name profilePic');
    
    const overdueItemsQuery = Borrow.find({
      status: { $in: ['Approved', 'Active'] },
      expectedReturnDate: { $lt: now },
      borrowerId: userId,
    }).populate('itemId').populate('ownerId', 'name profilePic');

    // History: Approved/Rejected requests where user is owner
    const historyQuery = Borrow.find({
      ownerId: userId,
      status: { $in: ['Active', 'Rejected'] },
    }).populate('itemId', 'name').populate('borrowerId', 'name');

    const [
      ownedItems,
      borrowedItems,
      pendingRequests,
      returnedItems,
      overdueItems,
      history,
    ] = await Promise.all([
      ownedItemsQuery,
      borrowedItemsQuery,
      pendingRequestsQuery,
      returnedItemsQuery,
      overdueItemsQuery,
      historyQuery,
    ]);

    res.json({
      ownedItems,
      borrowedItems,
      pendingRequests,
      returnedItems,
      overdueItems,
      history, // Added history field
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
