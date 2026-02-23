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
router.get('/search', searchItems);
router.get('/:id', getItemById);

// Protected routes
router.post('/', authMiddleware, addItem);
router.get('/my-items', authMiddleware, getMyItems);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;
