const Item = require('../models/Item');
const User = require('../models/User');

/**
 * Helper function to check and update item availability status
 * If availableUntil date has passed, mark item as Unavailable
 */
const updateItemAvailabilityStatus = async (item) => {
  if (item && item.availableUntil) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const availableUntilDate = new Date(item.availableUntil);
    availableUntilDate.setHours(0, 0, 0, 0); // Reset time to start of day

    // If availableUntil date has passed and item is still Available, mark as Unavailable
    if (today > availableUntilDate && item.status === 'Available') {
      item.status = 'Unavailable';
      await item.save();
    }
  }
  return item;
};

/**
 * Helper function to check and update availability for multiple items
 * Filters out items that have passed their availability period
 */
const cleanupExpiredItems = async (items) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check each item and update if needed
  for (let item of items) {
    if (item.availableUntil) {
      const availableUntilDate = new Date(item.availableUntil);
      availableUntilDate.setHours(0, 0, 0, 0);

      if (today > availableUntilDate && item.status === 'Available') {
        item.status = 'Unavailable';
        await item.save();
      }
    }
  }

  // Return only Available items
  return items.filter(item => item.status === 'Available');
};

// Add Item
exports.addItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      condition,
      description,
      securityDeposit,
      borrowDuration,
      availableFrom,
      availableUntil,
      imageUrl,
    } = req.body;

    // Fetch user's hostelBlock and roomNumber from profile
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const item = new Item({
      itemName,
      category,
      condition,
      description,
      ownerId: req.userId,
      hostelBlock: user.hostelBlock,
      roomNumber: user.roomNumber,
      securityDeposit,
      borrowDuration,
      availableFrom,
      availableUntil,
      imageUrl,
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

    // Check and cleanup expired items
    const availableItems = await cleanupExpiredItems(items);

    res.status(200).json({
      success: true,
      items: availableItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Item by ID
exports.getItemById = async (req, res) => {
  try {
    let item = await Item.findById(req.params.id)
      .populate('ownerId', 'name hostelBlock roomNumber rating phoneNumber')
      .populate('currentBorrower', 'name hostelBlock roomNumber');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check and update availability status if needed
    item = await updateItemAvailabilityStatus(item);

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

    // Check and update availability status for all items
    const updatedItems = await cleanupExpiredItems(items);

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

    // Exclude user's own items from search results
    let filter = { status: 'Available', ownerId: { $ne: req.userId } };

    if (category) filter.category = category;
    if (condition) filter.condition = condition;
    if (hostelBlock) filter.hostelBlock = hostelBlock;
    if (itemName) filter.itemName = { $regex: itemName, $options: 'i' };

    const items = await Item.find(filter)
      .populate('ownerId', 'name hostelBlock roomNumber rating')
      .sort({ createdAt: -1 });

    // Check and cleanup expired items
    const availableItems = await cleanupExpiredItems(items);

    res.status(200).json({
      success: true,
      count: availableItems.length,
      items: availableItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
