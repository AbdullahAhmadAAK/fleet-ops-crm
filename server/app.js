require('dotenv').config();
require('express-async-errors');  // patches Express to catch async errors without try/catch
 
const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const rateLimit    = require('express-rate-limit');
 
const corsOptions  = require('./config/corsOptions');
const logger       = require('./config/logger');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
 
const app = express();
 
// ─── Trust proxy (required for correct IP behind Render/Railway/Nginx) ────
app.set('trust proxy', 1);
 
// ─── Security headers ─────────────────────────────────────────────────────
app.use(helmet());
 
// ─── CORS ─────────────────────────────────────────────────────────────────
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));   // preflight for all routes
 
// ─── Body parsers ─────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
 
// ─── HTTP request logging ─────────────────────────────────────────────────
// Morgan streams into Winston so all logs go through one system
const morganStream = {
  write: (message) => logger.http(message.trim()),
};
 
const morganFormat =
  process.env.NODE_ENV === 'production'
    ? 'combined'   // Apache-style — good for production log analysis
    : 'dev';       // Coloured, concise — good for local development
 
app.use(morgan(morganFormat, { stream: morganStream }));
 
// ─── Global rate limiter ───────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_GLOBAL_WINDOW_MS) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_GLOBAL_MAX)        || 100,
  standardHeaders: true,   // RateLimit-* headers (RFC draft 6)
  legacyHeaders:   false,  // disable X-RateLimit-* headers
  message: {
    success: false,
    message: 'Too many requests. Please slow down and try again later.',
  },
});
 
app.use('/api', globalLimiter);
 
// ─── Auth-specific rate limiter (stricter) ────────────────────────────────
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_AUTH_WINDOW_MS) || 15 * 60 * 1000,
  max:      parseInt(process.env.RATE_LIMIT_AUTH_MAX)        || 10,
  standardHeaders: true,
  legacyHeaders:   false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in 15 minutes.',
  },
});
 
app.use('/api/v1/auth/login', authLimiter);
 
// ─── Health check ─────────────────────────────────────────────────────────
// Load balancers and uptime monitors hit this — must NEVER require auth
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fleet CRM API is running.',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});
 
// ─── API routes (v1) ──────────────────────────────────────────────────────
// Modules plug in here — each module registers its router in routes/index.js
app.use('/api/v1', require('./routes'));
 
// ─── 404 & Global error handler ──────────────────────────────────────────
// MUST be last — order is critical in Express
app.use(notFound);
app.use(errorHandler);
 
module.exports = app;