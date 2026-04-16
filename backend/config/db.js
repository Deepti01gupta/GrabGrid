const mongoose = require('mongoose');

/**
 * Connect to MongoDB using Mongoose
 * 
 * This function establishes a connection to MongoDB with:
 * - Automatic retry logic for failed connections
 * - Connection pooling for better performance
 * - Proper error handling and logging
 * - Environment-based configuration
 */
const connectDB = async () => {
  try {
    // Validate that MONGODB_URI is provided
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    console.log('🔄 Attempting to connect to MongoDB...');

    // Connect to MongoDB with optimized options
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection timeout
      serverSelectionTimeoutMS: 5000,
      // Server connection timeout
      socketTimeoutMS: 45000,
      // Maximum connection pool size
      maxPoolSize: 10,
      // Minimum connection pool size
      minPoolSize: 5,
      // Enable automatic reconnection
      retryWrites: true,
      retryReads: true,
      // Use new URL parser
      useNewUrlParser: true,
      // Use new server discovery and monitoring engine
      useUnifiedTopology: true,
    });

    // Log successful connection
    console.log('✅ MongoDB Connected Successfully');
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
    console.log(`   Connection State: ${conn.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED'}`);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('✅ Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  Mongoose disconnected from MongoDB');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 Mongoose reconnected to MongoDB');
    });

    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:');
    console.error(`   Message: ${error.message}`);
    
    // Don't exit process in development, just retry
    if (process.env.NODE_ENV === 'production') {
      console.error('   Exiting application in production...');
      process.exit(1);
    } else {
      console.warn('   Retrying in development mode...');
      // Retry connection after 5 seconds in development
      setTimeout(connectDB, 5000);
    }
  }
};

// Handle process termination gracefully
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('\n✅ MongoDB connection closed on app termination');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error closing MongoDB connection:', err.message);
    process.exit(1);
  }
});

module.exports = connectDB;
