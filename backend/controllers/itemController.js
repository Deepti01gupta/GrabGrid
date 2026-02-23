const Item = require('../models/Item');
const User = require('../models/User');

// Add Item
exports.addItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      condition,
      description,
      hostelBlock,
      roomNumber,
      securityDeposit,
      borrowDuration,
      availableFrom,
      availableUntil,
    } = req.body;

    const item = new Item({
      itemName,
      category,
      condition,
      description,
      ownerId: req.userId,
      hostelBlock,
      roomNumber,
      securityDeposit,
      borrowDuration,
      availableFrom,
      availableUntil,
    });

    await item.save();

    // Update user's shared items count
    await User.findByIdAndUpdate(req.userId, { $inc: { itemsShared: 1 } });

    res.status(201).json({
      success: true,
      message: 'Item added successfully',
      item,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find({ status: 'Available' })
      .populate('ownerId', 'name hostelBlock roomNumber rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('ownerId', 'name hostelBlock roomNumber rating phoneNumber')
      .populate('currentBorrower', 'name hostelBlock roomNumber');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Items
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ ownerId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      item: updatedItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.ownerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Items
exports.searchItems = async (req, res) => {
  try {
    const { category, condition, hostelBlock, itemName } = req.query;

    let filter = { status: 'Available' };

    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (hostelBlock) filter.hostelBlock = hostelBlock;
    if (itemName) filter.itemName = { $regex: itemName, $options: 'i' };

    const items = await Item.find(filter)
      .populate('ownerId', 'name hostelBlock roomNumber rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
