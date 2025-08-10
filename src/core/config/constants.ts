/**
 * Application Constants
 * Centralized configuration values
 */

export const APP_CONFIG = {
  name: 'Kuinbee Admin',
  version: '1.0.0',
  description: 'Admin Panel for Kuinbee Platform',
} as const;

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
} as const;

export const ROUTES = {
  // Auth routes
  LOGIN: '/admin/login',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_DATASETS: '/admin/datasets',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_SOURCES: '/admin/sources',
  
  SUPERADMIN_ADMINS: '/superadmin/admins',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'SuperAdmin',
  ADMIN: 'Admin', 
  USER: 'User',
} as const;
