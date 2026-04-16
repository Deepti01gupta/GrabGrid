const Rating = require('../models/Rating');
const User = require('../models/User');
const Borrow = require('../models/Borrow');
const Item = require('../models/Item');

// Helper: Calculate and update trust score
async function updateTrustScore(userId) {
  const user = await User.findById(userId);
  if (!user) return;

  // Average rating
  const ratings = await Rating.find({ reviewedUserId: userId });
  const avgRating = ratings.length
    ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    : 0;

  // Successful borrows/returns
  const totalBorrows = await Borrow.countDocuments({ ownerId: userId });
  const successfulBorrows = await Borrow.countDocuments({ ownerId: userId, status: 'Returned' });
  const successRate = totalBorrows ? (successfulBorrows / totalBorrows) * 5 : 0;

  // Punctuality (on-time returns)
  const punctualBorrows = await Borrow.countDocuments({ ownerId: userId, status: 'Returned', daysLate: 0 });
  const onTimeRate = successfulBorrows ? (punctualBorrows / successfulBorrows) * 5 : 0;

  // Trust score formula
  const trustScore = (avgRating * 0.5) + (successRate * 0.3) + (onTimeRate * 0.2);

  user.averageRating = avgRating;
  user.totalRatings = ratings.length;
  user.trustScore = trustScore;
  await user.save();
}

// POST /api/ratings/add
exports.addRating = async (req, res) => {
  try {
    const { reviewedUserId, itemId, borrowId, rating, review } = req.body;
    const reviewerId = req.userId;

    // Validation: cannot rate self
    if (reviewerId === reviewedUserId) {
      return res.status(400).json({ message: 'You cannot rate yourself.' });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    // Borrow must exist and be returned
    const borrow = await Borrow.findById(borrowId);
    if (!borrow || borrow.status !== 'Returned') {
      return res.status(400).json({ message: 'Borrow transaction not completed.' });
    }

    // Prevent duplicate rating for same borrowId
    const existing = await Rating.findOne({ reviewerId, borrowId });
    if (existing) {
      return res.status(400).json({ message: 'You have already rated this transaction.' });
    }

    // Save rating
    const newRating = new Rating({ reviewerId, reviewedUserId, itemId, borrowId, rating, review });
    await newRating.save();

    // Update reviewed user's stats
    await updateTrustScore(reviewedUserId);

    res.status(201).json({ success: true, message: 'Rating submitted.', rating: newRating });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/ratings/user/:userId
exports.getUserRatings = async (req, res) => {
  try {
    const { userId } = req.params;
    const ratings = await Rating.find({ reviewedUserId: userId })
      .populate('reviewerId', 'name profilePic');
    res.status(200).json({ success: true, ratings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
