import { ApiService } from '../../../../core/services/api';
import { generateDatasetUniqueId } from '../../../../shared/utils/uuidGenerator';
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
      datasetUniqueId: datasetData.datasetUniqueId || generateDatasetUniqueId(),
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
    const response = await ApiService.get<Dataset>(`${this.BASE_URL}/getDatasetById/${id}`);

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
    const response = await ApiService.post<string>(`${this.BASE_URL}/generateDatasetUploadURL`, {
      id: datasetId,
      fileFormat,
      isPaid
    });
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || response.message || 'Failed to get upload URL');
    }
  }

  /**
   * Get download URL for an uploaded dataset
   */
  static async getDownloadUrlForDataset(datasetId: string, fileFormat: string, isPaid: boolean): Promise<string> {
    const response = await ApiService.post<{ downloadURL: string }>(`${this.BASE_URL}/getDatasetDownloadURL`, {
      id: datasetId,
      fileFormat,
      isPaid
    });
    
    if (response.success && response.data) {
      return response.data.downloadURL;
    } else {
      throw new Error(response.error || response.message || 'Failed to get download URL');
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

  /**
   * Bulk upload datasets (metadata only, no S3 file upload)
   */
  static async uploadMultipleDatasets(datasets: any[]): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
      const response = await ApiService.post<any[]>(`${this.BASE_URL}/addMultipleDatasetInfo`, datasets);
      
      if (response.success && response.data) {
        return {
          success: true,
          data: response.data,
          error: undefined
        };
      } else {
        return {
          success: false,
          data: undefined,
          error: response.error || 'Upload failed'
        };
      }
    } catch (error: any) {
      return { success: false, error: error?.message || 'Bulk upload failed' };
    }
  }
}
