const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
 
const { combine, timestamp, printf, colorize, errors, json, splat } = format;
 
// ─── Custom console format (dev-friendly) ─────────────────────────────────
const consoleFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level}]: ${stack || message}${metaStr}`;
});
 
// ─── Shared base format for file transports ───────────────────────────────
const fileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  splat(),
  json()
);
 
// ─── Daily rotate config factory ──────────────────────────────────────────
const rotateTransport = (level, filename) =>
  new DailyRotateFile({
    level,
    filename: path.join('logs', `${filename}-%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',     // keep 14 days of logs
    format: fileFormat,
  });
 
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'fleet-crm-api' },
  transports: [
    rotateTransport('error', 'error'),   // errors only
    rotateTransport('info',  'combined'), // info and above
  ],
  // Don't crash on unhandled promise rejections — log them instead
  exitOnError: false,
});
 
// ─── Console transport (dev only) ─────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'HH:mm:ss' }),
        errors({ stack: true }),
        consoleFormat
      ),
    })
  );
}
 
module.exports = logger;