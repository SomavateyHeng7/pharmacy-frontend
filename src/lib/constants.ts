/**
 * Constants used throughout the application
 */

export const APP_NAME = 'PharmaCare Management System';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  DASHBOARD: '/',
  INVENTORY: '/inventory',
  INVOICES: '/invoices',
  INVOICES_NEW: '/invoices/new',
  INVOICES_TEMPLATES: '/invoices/templates',
  INVOICES_RECURRING: '/invoices/recurring',
  PRESCRIPTIONS: '/prescription',
  CUSTOMERS: '/customer',
  PURCHASE_ORDERS: '/purchase',
  SUPPLIERS: '/supplier',
  REPORTS: '/report',
  SUPER_ADMIN: '/superadmin',
  PROFILE: '/profile',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  CUSTOMERS: '/customers',
  DRUGS: '/drugs',
  INVOICES: '/invoices',
  PRESCRIPTIONS: '/prescriptions',
  SUPPLIERS: '/suppliers',
  PURCHASE_ORDERS: '/purchase-orders',
  REPORTS: '/reports',
  PROFILE: '/profile',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const DATE_FORMAT = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  DATETIME: 'MMM dd, yyyy HH:mm',
} as const;

export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
} as const;

export const TOAST_DURATION = 3000;

export const STOCK_ALERT_THRESHOLD = {
  LOW: 0.2, // 20% of reorder level
  CRITICAL: 0.1, // 10% of reorder level
} as const;
