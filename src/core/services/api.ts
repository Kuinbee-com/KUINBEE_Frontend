import axios from 'axios';
import type { ApiResponse } from '../../features/user/types';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
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

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      window.location.href = '/admin/login';
    }
    
    return Promise.reject(error);
  }
);

// Generic API methods
export class ApiService {
  static async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await api.get(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await api.post(url, data);
    return response.data;
  }

  static async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await api.put(url, data);
    return response.data;
  }

  static async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await api.patch(url, data);
    return response.data;
  }

  static async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await api.delete(url);
    return response.data;
  }
}

export default api;
