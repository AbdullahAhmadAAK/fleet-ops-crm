// ─── Route paths ───────────────────────────────────────────────────────────
// Single source of truth — import from here, never hardcode route strings
export const ROUTES = {
  LOGIN:            '/login',
  DASHBOARD:        '/dashboard',
  CLIENTS:          '/clients',
  CLIENT_DETAIL:    '/clients/:id',
  VEHICLES:         '/vehicles',
  VEHICLE_DETAIL:   '/vehicles/:id',
  DRIVERS:          '/drivers',
  DRIVER_DETAIL:    '/drivers/:id',
  REQUESTS:         '/requests',
  REQUEST_DETAIL:   '/requests/:id',
  MAINTENANCE:      '/maintenance',
  CALENDAR:         '/calendar',
  COMMUNICATIONS:   '/communications',
  NOTIFICATIONS:    '/notifications',
  REPORTS:          '/reports',
  AUDIT:            '/audit',
  SETTINGS:         '/settings',
  PROFILE:          '/profile',
};

// ─── User roles ────────────────────────────────────────────────────────────
export const ROLES = {
  SUPER_ADMIN:   'super_admin',
  FLEET_MANAGER: 'fleet_manager',
  DISPATCHER:    'dispatcher',
  TECHNICIAN:    'technician',
  CLIENT:        'client',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]:   'Super Admin',
  [ROLES.FLEET_MANAGER]: 'Fleet Manager',
  [ROLES.DISPATCHER]:    'Dispatcher',
  [ROLES.TECHNICIAN]:    'Technician',
  [ROLES.CLIENT]:        'Client',
};

// ─── Vehicle statuses ─────────────────────────────────────────────────────
export const VEHICLE_STATUS = {
  ACTIVE:             'active',
  IN_SERVICE:         'in_service',
  OUT_OF_SERVICE:     'out_of_service',
  PENDING_INSPECTION: 'pending_inspection',
  DECOMMISSIONED:     'decommissioned',
};

export const VEHICLE_STATUS_LABELS = {
  [VEHICLE_STATUS.ACTIVE]:             'Active',
  [VEHICLE_STATUS.IN_SERVICE]:         'In Service',
  [VEHICLE_STATUS.OUT_OF_SERVICE]:     'Out of Service',
  [VEHICLE_STATUS.PENDING_INSPECTION]: 'Pending Inspection',
  [VEHICLE_STATUS.DECOMMISSIONED]:     'Decommissioned',
};

export const VEHICLE_STATUS_COLORS = {
  [VEHICLE_STATUS.ACTIVE]:             'green',
  [VEHICLE_STATUS.IN_SERVICE]:         'blue',
  [VEHICLE_STATUS.OUT_OF_SERVICE]:     'red',
  [VEHICLE_STATUS.PENDING_INSPECTION]: 'yellow',
  [VEHICLE_STATUS.DECOMMISSIONED]:     'gray',
};

// ─── Vehicle types ────────────────────────────────────────────────────────
export const VEHICLE_TYPES = {
  CAR:             'car',
  VAN:             'van',
  TRUCK:           'truck',
  BUS:             'bus',
  HEAVY_EQUIPMENT: 'heavy_equipment',
  MOTORCYCLE:      'motorcycle',
};

export const VEHICLE_TYPE_LABELS = {
  [VEHICLE_TYPES.CAR]:             'Car',
  [VEHICLE_TYPES.VAN]:             'Van',
  [VEHICLE_TYPES.TRUCK]:           'Truck',
  [VEHICLE_TYPES.BUS]:             'Bus',
  [VEHICLE_TYPES.HEAVY_EQUIPMENT]: 'Heavy Equipment',
  [VEHICLE_TYPES.MOTORCYCLE]:      'Motorcycle',
};

// ─── Fuel types ───────────────────────────────────────────────────────────
export const FUEL_TYPES = {
  PETROL:  'petrol',
  DIESEL:  'diesel',
  ELECTRIC: 'electric',
  HYBRID:  'hybrid',
  CNG:     'cng',
};

export const FUEL_TYPE_LABELS = {
  [FUEL_TYPES.PETROL]:  'Petrol',
  [FUEL_TYPES.DIESEL]:  'Diesel',
  [FUEL_TYPES.ELECTRIC]: 'Electric',
  [FUEL_TYPES.HYBRID]:  'Hybrid',
  [FUEL_TYPES.CNG]:     'CNG',
};

// ─── Service request statuses ─────────────────────────────────────────────
export const REQUEST_STATUS = {
  PENDING:          'pending',
  ASSIGNED:         'assigned',
  SCHEDULED:        'scheduled',
  IN_PROGRESS:      'in_progress',
  WAITING_PARTS:    'waiting_parts',
  WAITING_APPROVAL: 'waiting_approval',
  COMPLETED:        'completed',
  CANCELLED:        'cancelled',
};

export const REQUEST_STATUS_LABELS = {
  [REQUEST_STATUS.PENDING]:          'Pending',
  [REQUEST_STATUS.ASSIGNED]:         'Assigned',
  [REQUEST_STATUS.SCHEDULED]:        'Scheduled',
  [REQUEST_STATUS.IN_PROGRESS]:      'In Progress',
  [REQUEST_STATUS.WAITING_PARTS]:    'Waiting Parts',
  [REQUEST_STATUS.WAITING_APPROVAL]: 'Waiting Approval',
  [REQUEST_STATUS.COMPLETED]:        'Completed',
  [REQUEST_STATUS.CANCELLED]:        'Cancelled',
};

export const REQUEST_STATUS_COLORS = {
  [REQUEST_STATUS.PENDING]:          'yellow',
  [REQUEST_STATUS.ASSIGNED]:         'blue',
  [REQUEST_STATUS.SCHEDULED]:        'purple',
  [REQUEST_STATUS.IN_PROGRESS]:      'indigo',
  [REQUEST_STATUS.WAITING_PARTS]:    'orange',
  [REQUEST_STATUS.WAITING_APPROVAL]: 'pink',
  [REQUEST_STATUS.COMPLETED]:        'green',
  [REQUEST_STATUS.CANCELLED]:        'gray',
};

// ─── Priority levels ───────────────────────────────────────────────────────
export const PRIORITY = {
  CRITICAL: 'critical',
  HIGH:     'high',
  MEDIUM:   'medium',
  LOW:      'low',
};

export const PRIORITY_LABELS = {
  [PRIORITY.CRITICAL]: 'Critical',
  [PRIORITY.HIGH]:     'High',
  [PRIORITY.MEDIUM]:   'Medium',
  [PRIORITY.LOW]:      'Low',
};

export const PRIORITY_COLORS = {
  [PRIORITY.CRITICAL]: 'red',
  [PRIORITY.HIGH]:     'orange',
  [PRIORITY.MEDIUM]:   'yellow',
  [PRIORITY.LOW]:      'green',
};

// ─── Request types ────────────────────────────────────────────────────────
export const REQUEST_TYPE = {
  CORRECTIVE:  'corrective',
  PREVENTIVE:  'preventive',
  INSPECTION:  'inspection',
  EMERGENCY:   'emergency',
};

export const REQUEST_TYPE_LABELS = {
  [REQUEST_TYPE.CORRECTIVE]:  'Corrective',
  [REQUEST_TYPE.PREVENTIVE]:  'Preventive',
  [REQUEST_TYPE.INSPECTION]:  'Inspection',
  [REQUEST_TYPE.EMERGENCY]:   'Emergency',
};

// ─── Notification types ───────────────────────────────────────────────────
export const NOTIFICATION_TYPE = {
  MAINTENANCE_DUE:    'maintenance_due',
  OVERDUE_REQUEST:    'overdue_request',
  APPOINTMENT_REMINDER: 'appointment_reminder',
  LICENSE_EXPIRY:     'license_expiry',
  COMPLIANCE_EXPIRY:  'compliance_expiry',
  PRIORITY_ESCALATED: 'priority_escalated',
  REQUEST_ASSIGNED:   'request_assigned',
  REQUEST_COMPLETED:  'request_completed',
};

// ─── Communication channels ───────────────────────────────────────────────
export const COMM_CHANNEL = {
  WHATSAPP:  'whatsapp',
  PHONE:     'phone',
  EMAIL:     'email',
  IN_PERSON: 'in_person',
  OTHER:     'other',
};

export const COMM_CHANNEL_LABELS = {
  [COMM_CHANNEL.WHATSAPP]:  'WhatsApp',
  [COMM_CHANNEL.PHONE]:     'Phone',
  [COMM_CHANNEL.EMAIL]:     'Email',
  [COMM_CHANNEL.IN_PERSON]: 'In Person',
  [COMM_CHANNEL.OTHER]:     'Other',
};

// ─── SLA tiers ────────────────────────────────────────────────────────────
export const SLA_TIER = {
  BRONZE:   'bronze',
  SILVER:   'silver',
  GOLD:     'gold',
  PLATINUM: 'platinum',
};

export const SLA_TIER_LABELS = {
  [SLA_TIER.BRONZE]:   'Bronze',
  [SLA_TIER.SILVER]:   'Silver',
  [SLA_TIER.GOLD]:     'Gold',
  [SLA_TIER.PLATINUM]: 'Platinum',
};

// ─── Pagination ───────────────────────────────────────────────────────────
export const PAGINATION = {
  DEFAULT_PAGE:     1,
  DEFAULT_LIMIT:    25,
  MAX_LIMIT:        100,
  LIMIT_OPTIONS:    [10, 25, 50, 100],
};

// ─── File upload ──────────────────────────────────────────────────────────
export const UPLOAD = {
  MAX_SIZE_MB:       10,
  ALLOWED_IMAGES:    ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCS:      ['image/jpeg', 'image/png', 'application/pdf'],
};

// ─── Compliance alert thresholds (days) ───────────────────────────────────
export const COMPLIANCE_ALERT_DAYS = {
  INSURANCE:    30,
  REGISTRATION: 30,
  INSPECTION:   14,
  LICENSE:      30,
};