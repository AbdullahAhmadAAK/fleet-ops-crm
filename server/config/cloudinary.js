const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const logger = require('./logger');
 
// ─── Initialise Cloudinary SDK ────────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,   // always https
});
 
// ─── File type whitelist ───────────────────────────────────────────────────
const ALLOWED_IMAGE_FORMATS = ['jpg', 'jpeg', 'png', 'webp'];
const ALLOWED_DOC_FORMATS   = ['pdf', 'jpg', 'jpeg', 'png'];
const MAX_FILE_SIZE_MB       = 10;
 
// ─── Storage factory ──────────────────────────────────────────────────────
// Keeps assets organised in Cloudinary by folder/context
const createStorage = (folder, allowedFormats) =>
  new CloudinaryStorage({
    cloudinary,
    params: async (_req, file) => ({
      folder:          `fleet-crm/${folder}`,
      allowed_formats: allowedFormats,
      transformation:  [{ quality: 'auto', fetch_format: 'auto' }],
      // Unique filename: timestamp + original name (spaces removed)
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
    }),
  });
 
// ─── Multer instances by upload context ───────────────────────────────────
const fileSizeLimit = { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 };
 
const uploadVehicleDoc = multer({
  storage: createStorage('vehicle-documents', ALLOWED_DOC_FORMATS),
  limits:  fileSizeLimit,
});
 
const uploadAvatar = multer({
  storage: createStorage('avatars', ALLOWED_IMAGE_FORMATS),
  limits:  fileSizeLimit,
});
 
const uploadRequestAttachment = multer({
  storage: createStorage('request-attachments', ALLOWED_DOC_FORMATS),
  limits:  fileSizeLimit,
});
 
// ─── Multer error handler (used in middleware chain) ──────────────────────
const handleMulterError = (err, _req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`,
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
};
 
logger.info('Cloudinary SDK initialised.');
 
module.exports = {
  cloudinary,
  uploadVehicleDoc,
  uploadAvatar,
  uploadRequestAttachment,
  handleMulterError,
};