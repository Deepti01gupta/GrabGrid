const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../services/tokenService');
const { uploadImage, deleteImage } = require('../services/cloudinaryService');
const { logActivity } = require('../services/activityLogService');

// Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, hostelBlock, roomNumber, phoneNumber, role } = req.body;

    // Validate required fields
    if (!name || !email || !password || !hostelBlock || !roomNumber || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    console.log('📝 Registering new user:', email);

    const user = new User({ name, email, password, hostelBlock, roomNumber, phoneNumber, role });
    await user.save();

    console.log('✅ User registered successfully:', user._id);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await logActivity(user._id, 'REGISTER', 'User registered', req.ip);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hostelBlock: user.hostelBlock,
        roomNumber: user.roomNumber,
      },
    });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    console.log('🔐 Login attempt for:', email);

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ User found:', user._id);

    // Verify password
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('✅ Password verified for user:', email);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    console.log('✅ Tokens generated for user:', user._id);
    console.log('📊 Access Token:', accessToken.substring(0, 20) + '...');

    // Log activity
    await logActivity(user._id, 'LOGIN', 'User logged in', req.ip);

    // Send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        hostelBlock: user.hostelBlock,
        roomNumber: user.roomNumber,
        rating: user.rating,
      },
    });

    console.log('✅ Login successful for:', email);
  } catch (error) {
    console.error('❌ Login error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};

// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, hostelBlock, roomNumber, phoneNumber } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, hostelBlock, roomNumber, phoneNumber },
      { new: true }
    ).select('-password');
    await logActivity(req.userId, 'UPDATE_PROFILE', 'Profile updated', req.ip);
    res.status(200).json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userId).select('+password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });
    user.password = newPassword;
    await user.save();
    await logActivity(user._id, 'CHANGE_PASSWORD', 'User changed password', req.ip);
    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload Profile Picture
exports.uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Delete old pic if exists
    if (user.profilePic && user.profilePic.public_id) {
      await deleteImage(user.profilePic.public_id);
    }
    const result = await uploadImage(req.file.path);
    user.profilePic = { public_id: result.public_id, url: result.secure_url };
    await user.save();
    await logActivity(user._id, 'UPLOAD_PROFILE_PIC', 'User uploaded profile picture', req.ip);
    res.status(200).json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
