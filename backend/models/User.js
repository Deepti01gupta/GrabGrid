
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false, // Do not return password by default
    },
    hostelBlock: {
      type: String,
      required: [true, 'Please provide hostel block'],
    },
    roomNumber: {
      type: String,
      required: [true, 'Please provide room number'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide phone number'],
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    trustScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    itemsShared: {
      type: Number,
      default: 0,
    },
    itemsBorrowed: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
      min: 0,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profilePic: {
      public_id: { type: String },
      url: { type: String },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
