const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} = require('../controllers/notificationController');

// Get all notifications
router.get('/', authMiddleware, getNotifications);

// Get unread count
router.get('/unread/count', authMiddleware, getUnreadCount);

// Mark notification as read
router.patch('/:notificationId/read', authMiddleware, markAsRead);

// Mark all as read
router.patch('/read/all', authMiddleware, markAllAsRead);

// Delete notification
router.delete('/:notificationId', authMiddleware, deleteNotification);

// Delete all notifications
router.delete('/delete/all', authMiddleware, deleteAllNotifications);

module.exports = router;
