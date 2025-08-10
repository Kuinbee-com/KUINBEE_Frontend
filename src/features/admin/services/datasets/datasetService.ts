import { ApiService } from '../../../../core/services/api';
import type {
  Dataset,
  CreateDatasetRequest,
  UpdateDatasetRequest
} from '../../types';

/**
 * Dataset management service
 * Handles all dataset-related API calls
 */
export class DatasetService {
  private static readonly BASE_URL = '/api/v1/admin/datasets/operations';

  /**
   * Create a new dataset
   */
  static async createDataset(datasetData: CreateDatasetRequest): Promise<{ uploadUrl: string }> {
    // Ensure datasetUniqueId is set if not provided
    const requestData = {
      ...datasetData,
      datasetUniqueId: datasetData.datasetUniqueId || `dataset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      // Ensure aboutDatasetInfo has proper structure with required fields
      aboutDatasetInfo: {
        ...datasetData.aboutDatasetInfo,
        dataFormatInfo: {
          rows: datasetData.aboutDatasetInfo?.dataFormatInfo?.rows || 1,
          cols: datasetData.aboutDatasetInfo?.dataFormatInfo?.cols || 1,
          fileFormat: datasetData.aboutDatasetInfo?.dataFormatInfo?.fileFormat || 'CSV'
        }
      },
      // Ensure locationInfo has all required fields
      locationInfo: {
        region: datasetData.locationInfo?.region || '',
        country: datasetData.locationInfo?.country || '',
        state: datasetData.locationInfo?.state || '',
        city: datasetData.locationInfo?.city || ''
      },
      // Ensure securityInfo has all required fields
      securityInfo: {
        currentEncryptionSecret: datasetData.securityInfo?.currentEncryptionSecret || '',
        masterSecret: datasetData.securityInfo?.masterSecret || ''
      }
    };

    const response = await ApiService.post<string>(`${this.BASE_URL}/addDataset`, requestData);
    
    if (response.success && response.data) {
      // Backend returns the upload URL directly in data field
      return { uploadUrl: response.data };
    } else {
      throw new Error(response.error || response.message || 'Failed to create dataset');
    }
  }

  /**
   * Upload file to S3 using presigned URL
   */
  static async uploadFileToS3(uploadUrl: string, file: File): Promise<void> {
    try {
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type || 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new Error('Failed to upload file to S3');
    }
  }

  /**
   * Get all categories
   */
  static async getAllCategories(): Promise<any[]> {
    const response = await ApiService.get<any[]>(`${this.BASE_URL}/getAllCategories`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch categories');
    }
  }

  /**
   * Get all sources
   */
  static async getAllSources(): Promise<any[]> {
    const response = await ApiService.get<any[]>(`${this.BASE_URL}/getAllSources`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch sources');
    }
  }

  /**
   * Update an existing dataset
   */
  static async updateDataset(id: string, datasetData: UpdateDatasetRequest): Promise<Dataset> {
    const response = await ApiService.put<Dataset>(`${this.BASE_URL}/editDataset/${id}`, datasetData);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to update dataset');
    }
  }

  /**
   * Get a dataset by ID
   */
  static async getDataset(id: string): Promise<Dataset> {
    const response = await ApiService.get<Dataset>(`${this.BASE_URL}/getDataset/${id}`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch dataset');
    }
  }

  /**
   * Get all datasets
   */
  static async getAllDatasets(): Promise<Dataset[]> {
    const response = await ApiService.get<Dataset[]>(`${this.BASE_URL}/getAllDatasets`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch datasets');
    }
  }

  /**
   * Get datasets without uploaded files
   */
  static async getNonUploadedDatasets(): Promise<Dataset[]> {
    const response = await ApiService.get<Dataset[]>(`${this.BASE_URL}/getAllNonUploadedDatasetsInfo`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch non-uploaded datasets');
    }
  }

  /**
   * Get datasets with uploaded files
   */
  static async getUploadedDatasets(): Promise<Dataset[]> {
    const response = await ApiService.get<Dataset[]>(`${this.BASE_URL}/getAllUploadedDatasets`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch uploaded datasets');
    }
  }

  /**
   * Get upload URL for an existing dataset (for pending uploads)
   */
  static async getUploadUrlForDataset(datasetId: string, fileFormat: string, isPaid: boolean): Promise<string> {
    // Backend route is GET but expects body data - using a custom approach
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}${this.BASE_URL}/getDatasetUploadURL`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        id: datasetId,
        fileFormat,
        isPaid
      })
    });

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data;
    } else {
      throw new Error(data.error || data.message || 'Failed to get upload URL');
    }
  }

  /**
   * Get download URL for an uploaded dataset
   */
  static async getDownloadUrlForDataset(datasetId: string, fileFormat: string, isPaid: boolean): Promise<string> {
    // Backend route is GET but expects body data - using a custom approach
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}${this.BASE_URL}/getDatasetDownloadURL`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        id: datasetId,
        fileFormat,
        isPaid
      })
    });

    const data = await response.json();
    
    if (data.success && data.data) {
      return data.data.downloadURL;
    } else {
      throw new Error(data.error || data.message || 'Failed to get download URL');
    }
  }

  /**
   * Delete a dataset
   */
  static async deleteDataset(id: string): Promise<void> {
    const response = await ApiService.delete<void>(`${this.BASE_URL}/deleteDataset/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete dataset');
    }
  }
}
