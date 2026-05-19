require('dotenv').config();
 
const http      = require('http');
const app       = require('./app');
const connectDB = require('./config/db');
const logger    = require('./config/logger');
 
const PORT = process.env.PORT || 5000;
 
// ─── Boot sequence ────────────────────────────────────────────────────────
const startServer = async () => {
  // 1. Connect to MongoDB Atlas — exit if it fails
  await connectDB();
 
  // 2. Initialise Cloudinary (SDK config — no async needed)
  require('./config/cloudinary');
 
  // 3. Create HTTP server (needed for SSE in Module 11)
  const server = http.createServer(app);
 
  // 4. Start listening
  server.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
 
  // ─── Graceful shutdown ─────────────────────────────────────────────────
  // On SIGTERM/SIGINT: stop accepting new connections, close existing ones,
  // then disconnect from MongoDB. Prevents data corruption mid-write.
  const shutdown = (signal) => {
    logger.warn(`${signal} received. Starting graceful shutdown...`);
 
    server.close(async () => {
      logger.info('HTTP server closed.');
 
      try {
        const mongoose = require('mongoose');
        await mongoose.connection.close();
        logger.info('MongoDB connection closed.');
        process.exit(0);
      } catch (err) {
        logger.error(`Error during shutdown: ${err.message}`);
        process.exit(1);
      }
    });
 
    // Force exit if graceful shutdown takes longer than 15s
    setTimeout(() => {
      logger.error('Graceful shutdown timed out. Forcing exit.');
      process.exit(1);
    }, 15000);
  };
 
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT',  () => shutdown('SIGINT'));
 
  // ─── Unhandled rejections & exceptions ────────────────────────────────
  // These should never happen — log, then crash so the process restarts clean
  process.on('unhandledRejection', (reason) => {
    logger.error('UNHANDLED REJECTION', { reason: reason?.message || reason });
    server.close(() => process.exit(1));
  });
 
  process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCEPTION', { message: err.message, stack: err.stack });
    process.exit(1);
  });
};
 
startServer();