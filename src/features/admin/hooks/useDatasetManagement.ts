import { useState, useEffect } from 'react';
import { DatasetService, CategoryService, SourceService } from '../services';
import type { Dataset, Category, Source } from '../types';

export interface UseDatasetManagementReturn {
  // Data
  datasets: Dataset[];
  categories: Category[];
  sources: Source[];
  
  // UI State
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  
  // Actions
  createDataset: (datasetData: any) => Promise<{ uploadUrl: string }>;
  updateDataset: (id: string, datasetData: any) => Promise<Dataset>;
  deleteDataset: (id: string) => Promise<void>;
  getDataset: (id: string) => Promise<Dataset>;
  refreshData: () => Promise<void>;
  clearMessages: () => void;
}

/**
 * Custom hook for managing datasets in the admin panel
 * Provides comprehensive dataset management functionality
 */
export const useDatasetManagement = (): UseDatasetManagementReturn => {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load initial data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load categories and sources for dropdowns
      const [categoriesData, sourcesData] = await Promise.all([
        CategoryService.getAllCategories(),
        SourceService.getAllSources()
      ]);
      
      setCategories(categoriesData);
      setSources(sourcesData);
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('Failed to load categories and sources');
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const createDataset = async (datasetData: any): Promise<{ uploadUrl: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await DatasetService.createDataset(datasetData);
      // Note: After dataset creation, we should reload the datasets list
      // since the creation only returns upload URL, not the full dataset
      loadData(); // Refresh the datasets list
      setSuccessMessage('Dataset created successfully');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create dataset';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDataset = async (id: string, datasetData: any): Promise<Dataset> => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedDataset = await DatasetService.updateDataset(id, datasetData);
      setDatasets(prev => prev.map(dataset => 
        dataset.id === id ? updatedDataset : dataset
      ));
      setSuccessMessage('Dataset updated successfully');
      return updatedDataset;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update dataset';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDataset = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      await DatasetService.deleteDataset(id);
      setDatasets(prev => prev.filter(dataset => dataset.id !== id));
      setSuccessMessage('Dataset deleted successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete dataset';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDataset = async (id: string): Promise<Dataset> => {
    setLoading(true);
    setError(null);
    
    try {
      const dataset = await DatasetService.getDataset(id);
      return dataset;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dataset';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async (): Promise<void> => {
    await loadData();
  };

  const clearMessages = (): void => {
    setError(null);
    setSuccessMessage(null);
  };

  return {
    // Data
    datasets,
    categories,
    sources,
    
    // UI State
    loading,
    error,
    successMessage,
    
    // Actions
    createDataset,
    updateDataset,
    deleteDataset,
    getDataset,
    refreshData,
    clearMessages,
  };
};
