const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  requestBorrow,
  approveBorrow,
  rejectBorrow,
  returnItem,
  getMyBorrowRequests,
  getMyBorrows,
} = require('../controllers/borrowController');

// Protected routes
router.post('/request', authMiddleware, requestBorrow);
router.post('/approve', authMiddleware, approveBorrow);
router.post('/reject', authMiddleware, rejectBorrow);
router.post('/return', authMiddleware, returnItem);

router.get('/my-requests', authMiddleware, getMyBorrowRequests);
router.get('/my-borrows', authMiddleware, getMyBorrows);

module.exports = router;
