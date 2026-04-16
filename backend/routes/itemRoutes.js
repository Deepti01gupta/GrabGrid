const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addItem,
  getAllItems,
  getItemById,
  getMyItems,
  updateItem,
  deleteItem,
  searchItems,
} = require('../controllers/itemController');

// Public routes
router.get('/', getAllItems);

// Protected routes - must come BEFORE /:id to avoid matching as ID
router.post('/', authMiddleware, addItem);
router.get('/my-items', authMiddleware, getMyItems);
router.get('/search', authMiddleware, searchItems);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

// Public routes - /:id goes last
router.get('/:id', getItemById);

module.exports = router;
