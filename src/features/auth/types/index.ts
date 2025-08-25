/**
 * Authentication-related type definitions
 */

export interface User {
  id: string;
  email: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'USER';
  adminId?: string;
  superAdminId?: string;
  userId?: string;
  adminPermissions?: string[];
  identityCode: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  identityCode: string;
}

export interface UserRegistrationData {
  name: string;
  emailId: string;
  password: string;
  phNo: string; // Required by backend (phone number)
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: {
    userId: string;
    email: string;
  };
}
