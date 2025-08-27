import axios from 'axios';
import type {
  UserProfile,
  Dataset,
  DownloadOptions,
  Category,
  Source,
  DownloadedDataset
} from '../types';

/**
 * User API service for handling user-specific operations
 */

// Create axios instance for user operations
const userApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
userApi.interceptors.request.use(
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

// Add response interceptor for error handling
userApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('identityCode');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export class UserApiService {
  /**
   * Get user profile information
   */
  static async getUserProfile(): Promise<UserProfile> {
    const response = await userApi.get('/api/v1/user/profile/getUserProfileInfo');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch profile');
    }
  }

  /**
   * Update user profile information
   */
  static async updateUserProfile(profileData: Partial<UserProfile['UserProfileInfo']>): Promise<UserProfile> {
    const response = await userApi.post('/api/v1/user/profile/upsertUserProfileInfo', profileData);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to update profile');
    }
  }

  /**
   * Get all uploaded datasets (public datasets available for download)
   */
  static async getAllUploadedDatasets(limit = 20, offset = 0): Promise<Dataset[]> {
    const response = await userApi.get(`/api/v1/user/datasets/operations/getAllUploadedDatasets?limit=${limit}&offset=${offset}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch datasets');
    }
  }

  /**
   * Get dataset by ID
   */
  static async getDatasetById(id: string): Promise<Dataset> {
    const response = await userApi.get(`/api/v1/user/datasets/operations/getDatasetById/${id}`);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch dataset');
    }
  }

  /**
   * Get user's downloaded datasets
   */
  static async getDownloadedDatasets(): Promise<DownloadedDataset[]> {
    const response = await userApi.get('/api/v1/user/datasets/operations/getDownloadedDatasets');
    
    if (response.data.success) {
      
      return response.data.data;
      
    } else {
      throw new Error(response.data.error || 'Failed to fetch downloaded datasets');
    }
  }

  /**
   * Generate download URL for a dataset
   */
  static async generateDatasetDownloadURL(datasetId: string, options: DownloadOptions): Promise<{downloadURL: string}> {
    const requestData = {
      id: datasetId,
      isAgreedToLicense: options.isAgreedToLicense,
      fileFormat: options.fileFormat,
      isPaid: options.isPaid
    };
    
    const response = await userApi.post('/api/v1/user/datasets/operations/generateDatasetDownloadURL', requestData);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to generate download URL');
    }
  }

  /**
   * Get all categories (authenticated)
   */
  static async getAllCategories(): Promise<Category[]> {
    const response = await userApi.get('/api/v1/user/datasets/operations/getAllCategories');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch categories');
    }
  }

  /**
   * Get all sources (authenticated)
   */
  static async getAllSources(): Promise<Source[]> {
    const response = await userApi.get('/api/v1/user/datasets/operations/getAllSources');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch sources');
    }
  }

  // ====== PUBLIC/UNAUTHENTICATED METHODS ======
  
  /**
   * Get all uploaded datasets (public access, no auth required)
   */
  static async getAllUploadedDatasetsPublic(limit = 20, offset = 0): Promise<Dataset[]> {
    const response = await userApi.get(`/api/v1/user/datasets/getAllUploadedDatasets?limit=${limit}&offset=${offset}`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch datasets');
    }
  }

  /**
   * Get filtered datasets with query parameters - uses auth routes when available
   */
  static async getFilteredDatasetsPublic(params: {
    limit: number; // Required by backend
    offset?: number;
    search?: string;
    isPaid?: boolean;
    category?: string;
    source?: string;
    superType?: string;
    // Note: location filtering not supported by backend yet
    // location?: string;
  }): Promise<Dataset[]> {
    // Check if user is authenticated and use appropriate route
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;
    
    try {
      let url: string;
      let response;
      
      if (isAuthenticated) {
        // Use authenticated route with filters
        console.log('Making filtered request to AUTHENTICATED route with params:', params);
        
        // Build query parameters for authenticated route
        const queryParams = new URLSearchParams();
        queryParams.set('limit', params.limit.toString());
        queryParams.set('offset', (params.offset || 0).toString());
        if (params.search) {
          queryParams.set('search', params.search);
        }
        
        // Build filter object as JSON string
        const filterObj: any = {};
        if (params.isPaid !== undefined) {
          filterObj.isPaid = params.isPaid;
        }
        if (params.category) {
          filterObj.category = params.category;
        }
        if (params.source) {
          filterObj.source = params.source;
        }
        if (params.superType) {
          filterObj.superType = params.superType;
        }
        
        // Add filter as JSON string if we have any filters
        if (Object.keys(filterObj).length > 0) {
          queryParams.set('filter', JSON.stringify(filterObj));
        }
        
        url = `/api/v1/user/datasets/operations/getAllUploadedDatasets?${queryParams.toString()}`;
        response = await userApi.get(url);
        
      } else {
        // Use public route - it supports the same filtering as authenticated route
        console.log('Making filtered request to PUBLIC route with params:', params);
        
        // Build query parameters for public route - same as authenticated route
        const queryParams = new URLSearchParams();
        queryParams.set('limit', params.limit.toString());
        queryParams.set('offset', (params.offset || 0).toString());
        if (params.search) {
          queryParams.set('search', params.search);
        }
        
        // Build filter object as JSON string
        const filterObj: any = {};
        if (params.isPaid !== undefined) {
          filterObj.isPaid = params.isPaid;
        }
        if (params.category) {
          filterObj.category = params.category;
        }
        if (params.source) {
          filterObj.source = params.source;
        }
        if (params.superType) {
          filterObj.superType = params.superType;
        }
        
        // Add filter as JSON string if we have any filters
        if (Object.keys(filterObj).length > 0) {
          queryParams.set('filter', JSON.stringify(filterObj));
        }
        
        url = `/api/v1/user/datasets/getAllUploadedDatasets?${queryParams.toString()}`;
        response = await userApi.get(url);
      }
      
      if (response.data.success) {
        return response.data.data;
      } else {
        console.error('Backend error:', response.data);
        throw new Error(response.data.error || response.data.message || 'Failed to fetch filtered datasets');
      }
      
    } catch (error) {
      console.error('API request failed:', error);
      // If authenticated request fails, try public route as fallback
      if (isAuthenticated) {
        try {
          console.log('Authenticated request failed, trying public route as fallback');
          const fallbackResponse = await userApi.get(`/api/v1/user/datasets/getAllUploadedDatasets?limit=${params.limit}&offset=${params.offset || 0}`);
          if (fallbackResponse.data.success) {
            return fallbackResponse.data.data;
          }
        } catch (fallbackError) {
          console.error('Fallback request also failed:', fallbackError);
        }
      }
      throw error;
    }
  }

  /**
   * Get dataset by ID (public access, no auth required)
   */
  static async getDatasetByIdPublic(id: string): Promise<Dataset> {
    const response = await userApi.get(`/api/v1/user/datasets/getDatasetById/${id}`);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch dataset');
    }
  }

  /**
   * Get all categories (public access, no auth required)
   */
  static async getAllCategoriesPublic(): Promise<Category[]> {
    const response = await userApi.get('/api/v1/user/categories/getAllCategories');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch categories');
    }
  }

  /**
   * Get all sources (public access, no auth required)
   */
  static async getAllSourcesPublic(): Promise<Source[]> {
    const response = await userApi.get('/api/v1/user/sources/getAllSources');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch sources');
    }
  }
}

export default UserApiService;
