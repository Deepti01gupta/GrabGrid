const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, 'Please provide item name'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Book', 'Lab Kit', 'Appliance', 'Sports Equipment', 'Other'],
      required: [true, 'Please provide category'],
    },
    condition: {
      type: String,
      enum: ['New', 'Good', 'Used'],
      required: [true, 'Please provide condition'],
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hostelBlock: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    securityDeposit: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Available', 'Requested', 'Borrowed', 'Unavailable'],
      default: 'Available',
    },
    borrowDuration: {
      type: Number, // in days
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    availableUntil: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    currentBorrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    borrowStartDate: {
      type: Date,
      default: null,
    },
    borrowEndDate: {
      type: Date,
      default: null,
    },
    pricePerDay: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalTimesBorrowed: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
