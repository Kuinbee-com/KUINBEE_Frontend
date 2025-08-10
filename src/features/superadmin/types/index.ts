/**
 * SuperAdmin feature type definitions
 */

// Admin types for SuperAdmin management
export interface Admin {
  id: string;
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  officialEmailId: string;
  personalEmailId: string;
  phNo: string; // Note: Backend sends BigInt, but we convert to string for frontend
  alternativePhNo?: string; // Note: Backend sends BigInt, but we convert to string for frontend
  createdById: string;
  createdAt: string;
  personalInfo: {
    address: string;
    fatherName: string;
    motherName: string;
    gender: string;
    dob: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    nationality: string;
  };
  permissions: string[];
  status?: string;
}

export interface CreateAdminRequest {
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  officialEmailId: string;
  personalEmailId: string;
  phNo: string; // Frontend handles as string, will be converted to number for backend
  alternativePhNo?: string; // Frontend handles as string, will be converted to number for backend
  personalInfo: {
    address: string;
    fatherName: string;
    motherName: string;
    gender: string; // Will be converted to uppercase for backend (MALE/FEMALE/OTHER)
    dob: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    nationality: string;
  };
  permissions: string[];
}

export interface UpdateAdminRequest {
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  officialEmailId?: string;
  personalEmailId?: string;
  phNo?: string; // Frontend sends as string, backend converts to BigInt
  alternativePhNo?: string; // Frontend sends as string, backend converts to BigInt
  personalInfo?: {
    address?: string;
    fatherName?: string;
    motherName?: string;
    gender?: string;
    dob?: string;
    city?: string;
    state?: string;
    country?: string;
    pinCode?: string;
    nationality?: string;
  };
  permissions?: string[];
  status?: string;
}

// API Response types
export interface SuperAdminApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
