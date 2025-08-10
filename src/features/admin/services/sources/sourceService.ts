import { ApiService } from '../../../../core/services/api';
import type {
  Source,
  CreateSourceRequest,
  UpdateSourceRequest
} from '../../types';

/**
 * Source management service
 * Handles all source-related API calls
 */
export class SourceService {
  private static readonly BASE_URL = '/api/v1/admin/datasets/operations';

  /**
   * Get all sources
   */
  static async getAllSources(): Promise<Source[]> {
    const response = await ApiService.get<Source[]>(`${this.BASE_URL}/getAllSources`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch sources');
    }
  }

  /**
   * Create a new source (new API contract)
   */
  static async createSource(sourceName: string): Promise<{ success: boolean; data: { id: string } }> {
    const body = { sourceName };
    const response = await ApiService.post<{ success: boolean; data: { id: string } }>(`${this.BASE_URL}/createSource`, body);
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to create source');
    }
  }

  /**
   * Update an existing source
   */
  static async updateSource(id: string, sourceData: UpdateSourceRequest): Promise<Source> {
    // Backend expects { sourceName } not { name }
    const body = { sourceName: sourceData.name };
    const response = await ApiService.put<Source>(`${this.BASE_URL}/editSource/${id}`, body);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to update source');
    }
  }

  /**
   * Delete a source
   */
  static async deleteSource(id: string): Promise<void> {
    const response = await ApiService.delete<void>(`${this.BASE_URL}/deleteSource/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete source');
    }
  }
}
