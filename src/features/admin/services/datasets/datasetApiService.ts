// All dataset API logic is now handled in datasetService.ts
// This file is deprecated and can be removed.

import type { DatasetApiBody } from './csvDatasetParser';

// API base URL - using Vite environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface BulkUploadResponse {
  success: boolean;
  data?: Array<{ id: string; dataFormat: string }>;
  message?: string;
  error?: string;
}

/**
 * Get authorization headers with token from localStorage
 */
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}

/**
 * Uploads multiple datasets to the backend
 * Calls the /admin/dataset/addMultipleDatasetInfo endpoint
 */
export async function uploadMultipleDatasets(datasets: DatasetApiBody[]): Promise<BulkUploadResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/dataset/addMultipleDatasetInfo`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(datasets)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('Error uploading datasets:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
