const router = require('express').Router();
 
// ─── Module routes mount here as they are built ───────────────────────────
// Each import is uncommented when the module is implemented.
// This keeps the file clean and shows the full API surface at a glance.
 
// router.use('/auth',           require('./auth.routes'));
// router.use('/users',          require('./users.routes'));
// router.use('/clients',        require('./clients.routes'));
// router.use('/vehicles',       require('./vehicles.routes'));
// router.use('/drivers',        require('./drivers.routes'));
// router.use('/requests',       require('./requests.routes'));
// router.use('/maintenance',    require('./maintenance.routes'));
// router.use('/appointments',   require('./appointments.routes'));
// router.use('/communications', require('./communications.routes'));
// router.use('/notifications',  require('./notifications.routes'));
// router.use('/reports',        require('./reports.routes'));
// router.use('/audit',          require('./audit.routes'));
// router.use('/dashboard',      require('./dashboard.routes'));
 
// ─── API root info ────────────────────────────────────────────────────────
router.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Fleet CRM API v1',
    docs:    '/api/v1',
  });
});
 
module.exports = router;