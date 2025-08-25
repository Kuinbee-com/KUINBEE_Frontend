import axios from 'axios';
import type { LoginCredentials, LoginResponse, User, UserRegistrationData, RegisterResponse } from '../types';

/**
 * Authentication service for handling auth-related API calls
 */

// Create axios instance with base URL from environment or production
const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout for deployed backend
});

// Add request interceptor to include auth token
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export class AuthService {
  /**
   * Login user with email and password
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Transform email to emailId for backend compatibility
    const requestData = {
      emailId: credentials.email,
      password: credentials.password
    };
    
    const response = await authApi.post('/api/v1/auth/loginPassword', requestData);
    
    // Backend returns: { success: true, data: { token, identityCode } }
    if (response.data.success) {
      const { token, identityCode } = response.data.data;
      
      // Store only token and identityCode - no user object creation
      // Backend will handle role validation through API endpoints
      localStorage.setItem('token', token);
      localStorage.setItem('identityCode', identityCode);
      
      return { token, identityCode };
    } else {
      throw new Error(response.data.error || 'Login failed');
    }
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    // Clear user info from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('identityCode');
    localStorage.removeItem('user');
    // TODO: Implement logout API call if needed
    // await authApi.post('/api/v1/auth/logout');
  }

  /**
   * Verify token validity and extract user data from JWT
   * The backend JWT token is base64 encoded and contains user information
   */
  static async verifyToken(token: string): Promise<User> {
    const storedToken = localStorage.getItem('token');
    const storedIdentityCode = localStorage.getItem('identityCode');
    
    if (storedToken !== token) {
      throw new Error('Invalid token');
    }
    
    if (!storedIdentityCode) {
      throw new Error('No identity code found - please login again');
    }
    
    try {
      // Decode the base64 encoded JWT token
      const decodedJWT = atob(token);
      const jwtParts = decodedJWT.split('.');
      
      if (jwtParts.length !== 3) {
        throw new Error('Invalid JWT format');
      }
      
      // Parse the payload (second part of JWT)
      const payload = JSON.parse(atob(jwtParts[1]));
      
      // Extract user information from JWT payload
      const user: User = {
        id: payload.id,
        email: payload.email,
        role: payload.role,
        identityCode: payload.identityCode,
        ...(payload.adminId && { adminId: payload.adminId }),
        ...(payload.superAdminId && { superAdminId: payload.superAdminId }),
        ...(payload.userId && { userId: payload.userId }),
        ...(payload.adminPermissions && { adminPermissions: payload.adminPermissions })
      };
      
      return user;
    } catch (error) {
      throw new Error('Failed to decode token - please login again');
    }
  }

  /**
   * Register new user
   */
  static async registerUser(userData: UserRegistrationData): Promise<RegisterResponse> {
    const response = await authApi.post('/api/v1/user/userRegistration', userData);
    
    // Backend returns success response with user data
    return response.data;
  }
}
