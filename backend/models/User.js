const mongoose = require('mongoose');

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
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    itemsShared: {
      type: Number,
      default: 0,
    },
    itemsBorrowed: {
      type: Number,
      default: 0,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
