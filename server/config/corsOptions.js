const logger = require('./logger');
 
// ─── Parse allowed origins from env ───────────────────────────────────────
// CLIENT_ORIGIN supports comma-separated values for multiple frontends
// e.g. CLIENT_ORIGIN=http://localhost:5173,https://fleet.yourdomain.com
const parseOrigins = () => {
  const raw = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
  return raw.split(',').map((o) => o.trim());
};
 
const allowedOrigins = parseOrigins();
logger.info(`CORS — allowed origins: ${allowedOrigins.join(', ')}`);
 
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
 
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
 
    logger.warn(`CORS blocked request from origin: ${origin}`);
    callback(new Error(`Origin ${origin} is not allowed by CORS policy.`));
  },
 
  credentials: true,   // required for httpOnly cookie (refresh token)
 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
 
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],
 
  // Cache preflight response for 10 minutes
  maxAge: 600,
};
 
module.exports = corsOptions;