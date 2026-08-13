const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Item = require('./models/Item');

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const tokenRoutes = require('./routes/tokenRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Import middleware
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const defaultAllowedOrigins = [
  'https://grab-grid.vercel.app/api',
  'http://localhost:3000'
];

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultAllowedOrigins;

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin header) and configured origins.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

/**
 * Daily cleanup: Mark expired items as unavailable
 * Runs on server startup and every 24 hours
 */
const cleanupExpiredItems = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await Item.updateMany(
      {
        status: 'Available',
        availableUntil: { $lt: today }
      },
      {
        status: 'Unavailable'
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`🗑️  Cleanup: Marked ${result.modifiedCount} expired items as unavailable`);
    }
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
};

/**
 * Schedule cleanup: Runs every 24 hours
 */
const scheduleCleanup = () => {
  // Run cleanup immediately on startup
  cleanupExpiredItems();

  // Schedule cleanup to run every 24 hours (86400000 milliseconds)
  setInterval(cleanupExpiredItems, 24 * 60 * 60 * 1000);

  console.log('📅 Scheduled daily cleanup for expired items');
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/borrow', borrowRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodb: require('mongoose').connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server with database connection
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    // Connect to Database (MUST await this!)
    await connectDB();

    // Start cleanup schedule after database is connected
    scheduleCleanup();

    // Start listening only after database is connected
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 API URL: http://localhost:${PORT}`);
      console.log(`❓ Health Check: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
