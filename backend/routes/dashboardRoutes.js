const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserDashboard } = require('../controllers/dashboardController');

/**
 * GET /api/dashboard
 * Fetch comprehensive dashboard data for logged-in user
 * Protected route - requires JWT token
 * 
 * Returns:
 * - User information
 * - Owned items
 * - Borrowed items
 * - Pending requests
 * - History
 */
router.get('/', authMiddleware, getUserDashboard);

module.exports = router;
