const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { register, login, getProfile, updateProfile, changePassword, uploadProfilePic } = require('../controllers/authController');

// Public routes
router.post('/register', register);
router.post('/login', login);


// Protected routes
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/change-password', authMiddleware, changePassword);

// Profile picture upload (Multer middleware to be added in next step)
const upload = require('../middleware/uploadMiddleware');
router.post('/profile-pic', authMiddleware, upload.single('profilePic'), uploadProfilePic);

module.exports = router;
