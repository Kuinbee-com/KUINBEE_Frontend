import { ApiService } from '../../../core/services/api';
import type {
  Admin,
  CreateAdminRequest,
  UpdateAdminRequest
} from '../types';

/**
 * SuperAdmin service
 * Handles all admin management API calls for SuperAdmin features
 */
export class SuperAdminService {
  private static readonly BASE_URL = '/api/v1/superAdmin/admin/operations';

  /**
   * Get all admins
   */
  static async getAllAdmins(): Promise<Admin[]> {
    const response = await ApiService.get<{allAdmins: any[]}>(`${this.BASE_URL}/getAllAdmins`);
    
    if (response.success && response.data) {
      // Convert BigInt phone numbers to strings for frontend
      const admins = response.data.allAdmins.map(admin => ({
        ...admin,
        phNo: admin.phNo ? admin.phNo.toString() : '',
        alternativePhNo: admin.alternativePhNo ? admin.alternativePhNo.toString() : undefined,
      }));
      return admins;
    } else {
      throw new Error(response.error || 'Failed to fetch admins');
    }
  }

  /**
   * Get a specific admin by ID
   */
  static async getAdmin(id: string): Promise<Admin> {
    const response = await ApiService.get<{admin: any}>(`${this.BASE_URL}/getAdmin/${id}`);
    
    if (response.success && response.data) {
      // Convert BigInt phone numbers to strings for frontend
      const admin = {
        ...response.data.admin,
        phNo: response.data.admin.phNo ? response.data.admin.phNo.toString() : '',
        alternativePhNo: response.data.admin.alternativePhNo ? response.data.admin.alternativePhNo.toString() : undefined,
      };
      return admin;
    } else {
      throw new Error(response.error || 'Failed to fetch admin');
    }
  }

  /**
   * Create a new admin
   */
  static async createAdmin(adminData: CreateAdminRequest): Promise<{defaultPassword: string; adminId: string}> {
    try {
      // Transform data to match backend expectations
      const backendData = {
        ...adminData,
        // Convert phone numbers from string to number
        phNo: parseInt(adminData.phNo),
        alternativePhNo: adminData.alternativePhNo ? parseInt(adminData.alternativePhNo) : undefined,
        personalInfo: {
          ...adminData.personalInfo,
          // Ensure gender is uppercase
          gender: adminData.personalInfo.gender.toUpperCase()
        }
      };

      const response = await ApiService.post<{defaultPassword: string; adminId: string}>(`${this.BASE_URL}/addAdmin`, backendData);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        throw new Error(response.error || response.message || 'Failed to create admin');
      }
    } catch (error: any) {
      // Handle axios errors and extract meaningful error messages
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Try different possible error message fields
        const errorMessage = errorData.message || errorData.error || errorData.msg || 'Unknown backend error';
        throw new Error(`Backend Error: ${errorMessage}`);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to create admin: Network or unknown error');
      }
    }
  }

  /**
   * Update an existing admin
   * TODO: Implement updateAdmin endpoint in backend
   */
  static async updateAdmin(_id: string, _adminData: UpdateAdminRequest): Promise<Admin> {
    throw new Error('Update admin functionality not yet implemented in backend');
  }

  /**
   * Delete an admin
   */
  static async deleteAdmin(id: string): Promise<void> {
    const response = await ApiService.delete<void>(`${this.BASE_URL}/deleteAdmin/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete admin');
    }
  }
}

export default SuperAdminService;
