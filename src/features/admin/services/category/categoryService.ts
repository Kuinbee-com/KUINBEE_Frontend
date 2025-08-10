
import { ApiService } from '../../../../core/services/api';
import type {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest
} from '../../types';

/**
 * Category management service
 * Handles all category-related API calls
 */
export class CategoryService {
  private static readonly BASE_URL = '/api/v1/admin/datasets/operations';



  /**
   * Get all categories
   */
  static async getAllCategories(): Promise<Category[]> {
    const response = await ApiService.get<Category[]>(`${this.BASE_URL}/getAllCategories`);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to fetch categories');
    }
  }

  /**
   * Create a new category
   */
  static async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    console.log('CategoryService.createCategory called with:', categoryData);
    console.log('Request URL:', `${this.BASE_URL}/createCategory`);
    
    const response = await ApiService.post<Category>(`${this.BASE_URL}/createCategory`, categoryData);
    
    console.log('CategoryService response:', response);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to create category');
    }
  }

  /**
   * Update an existing category
   */
  static async updateCategory(id: string, categoryData: UpdateCategoryRequest): Promise<Category> {
    const response = await ApiService.put<Category>(`${this.BASE_URL}/editCategory/${id}`, categoryData);
    
    if (response.success && response.data) {
      return response.data;
    } else {
      throw new Error(response.error || 'Failed to update category');
    }
  }

  /**
   * Delete a category
   */
  static async deleteCategory(id: string): Promise<void> {
    const response = await ApiService.delete<void>(`${this.BASE_URL}/deleteCategory/${id}`);
    
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete category');
    }
  }
}
