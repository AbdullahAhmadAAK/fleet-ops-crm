const logger = require('../config/logger');
 
// ─── Operational error class ───────────────────────────────────────────────
// Throw this anywhere in the app for predictable, clean error responses.
// e.g. throw new AppError('Vehicle not found', 404);
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;   // distinguishes known errors from bugs
    Error.captureStackTrace(this, this.constructor);
  }
}
 
// ─── Mongoose error normalizers ────────────────────────────────────────────
const handleCastError = (err) =>
  new AppError(`Invalid value for field '${err.path}': ${err.value}`, 400);
 
const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Validation failed: ${messages.join('. ')}`, 400);
};
 
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(
    `'${value}' is already in use for field '${field}'. Please use a different value.`,
    409
  );
};
 
// ─── JWT error normalizers ─────────────────────────────────────────────────
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);
 
const handleJWTExpiredError = () =>
  new AppError('Your session has expired. Please log in again.', 401);
 
// ─── Dev vs prod response ──────────────────────────────────────────────────
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack:   err.stack,
    error:   err,
  });
};
 
const sendErrorProd = (err, res) => {
  // Operational: safe to expose the message to the client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
 
  // Programming / unknown error: log it, send a generic message
  logger.error('UNHANDLED ERROR', {
    message: err.message,
    stack:   err.stack,
  });
 
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again later.',
  });
};
 
// ─── Global error handler (4-arg signature required by Express) ────────────
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
 
  // Log every error with request context
  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, {
    statusCode: err.statusCode,
    stack:      process.env.NODE_ENV === 'development' ? err.stack : undefined,
    userId:     req.user?._id,
    ip:         req.ip,
  });
 
  // Normalise known Mongoose/JWT errors into AppErrors
  let error = err;
 
  if (err.name === 'CastError')            error = handleCastError(err);
  if (err.name === 'ValidationError')      error = handleValidationError(err);
  if (err.code  === 11000)                 error = handleDuplicateKeyError(err);
  if (err.name === 'JsonWebTokenError')    error = handleJWTError();
  if (err.name === 'TokenExpiredError')    error = handleJWTExpiredError();
 
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};
 
// ─── 404 handler — mount AFTER all routes ─────────────────────────────────
const notFound = (req, res, next) => {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};
 
module.exports = { errorHandler, notFound, AppError };