const mongoose = require('mongoose');
const logger = require('./logger');
 
// ─── Connection options ────────────────────────────────────────────────────
// Mongoose 8 sets these as defaults, but explicit is better for enterprise
const MONGO_OPTIONS = {
  maxPoolSize: 10,        // max concurrent connections in the pool
  serverSelectionTimeoutMS: 5000,  // fail fast if Atlas is unreachable
  socketTimeoutMS: 45000,          // close sockets after 45s of inactivity
};
 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, MONGO_OPTIONS);
    logger.info(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    // Exit process — nothing works without the DB
    process.exit(1);
  }
};
 
// ─── Connection event listeners ───────────────────────────────────────────
mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected. Attempting to reconnect...');
});
 
mongoose.connection.on('reconnected', () => {
  logger.info('MongoDB reconnected successfully.');
});
 
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB runtime error: ${err.message}`);
});
 
module.exports = connectDB;