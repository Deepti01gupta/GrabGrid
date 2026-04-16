const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ratingController = require('../controllers/ratingController');

// POST /api/ratings/add
router.post('/add', authMiddleware, ratingController.addRating);

// GET /api/ratings/user/:userId
router.get('/user/:userId', ratingController.getUserRatings);

module.exports = router;
