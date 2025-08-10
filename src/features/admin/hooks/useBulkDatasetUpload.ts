import { useState } from 'react';
import type { DatasetApiBody } from '../services/datasets/csvDatasetParser';
import { DatasetService } from '../services/datasetService';

export interface BulkUploadItem {
  status: 'pending' | 'uploading' | 'uploaded' | 'error';
  apiData: DatasetApiBody;
  error?: string;
  uploadedId?: string; // Store the ID returned from backend
}

export function useBulkDatasetUpload() {
  const [datasets, setDatasets] = useState<BulkUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addDatasets = (apiDatasets: DatasetApiBody[]) => {
    const items = apiDatasets.map(ds => ({
      status: 'pending' as const,
      apiData: ds,
    }));
    setDatasets(prev => [...prev, ...items]);
  };

  const markAsUploading = (index: number) => {
    setDatasets(prev => prev.map((item, idx) =>
      idx === index ? { ...item, status: 'uploading' } : item
    ));
  };

  const markAsUploaded = (index: number, uploadedId?: string) => {
    setDatasets(prev => prev.map((item, idx) =>
      idx === index ? { ...item, status: 'uploaded', uploadedId } : item
    ));
  };

  const markAsError = (index: number, error: string) => {
    setDatasets(prev => prev.map((item, idx) =>
      idx === index ? { ...item, status: 'error', error } : item
    ));
  };

  const removeDataset = (index: number) => {
    setDatasets(prev => prev.filter((_, idx) => idx !== index));
  };

  const clearAll = () => {
    setDatasets([]);
  };

  // Upload all datasets in bulk
  const uploadAllDatasets = async (): Promise<void> => {
    const pendingDatasets = datasets.filter(item => item.status === 'pending');
    if (pendingDatasets.length === 0) return;

    setIsUploading(true);
    try {
      // Mark all as uploading
      setDatasets(prev => prev.map(item => 
        item.status === 'pending' ? { ...item, status: 'uploading' } : item
      ));

      // Use DatasetService for bulk upload
      const apiDatasets = pendingDatasets.map(item => item.apiData);
      const result = await DatasetService.uploadMultipleDatasets(apiDatasets);

      if (result.success && result.data) {
        // Mark corresponding datasets as uploaded using datasetUniqueId
        setDatasets(prev => prev.map((item) => {
          if (item.status === 'uploading') {
            const matchingResult = result.data?.find(r => r.datasetUniqueId === item.apiData.datasetUniqueId);
            return { 
              ...item, 
              status: 'uploaded', 
              uploadedId: matchingResult?.id 
            };
          }
          return item;
        }));
      } else {
        // Mark all as error
        setDatasets(prev => prev.map(item => 
          item.status === 'uploading' 
            ? { ...item, status: 'error', error: result.error || 'Upload failed' }
            : item
        ));
      }
    } catch (error) {
      // Mark all as error
      setDatasets(prev => prev.map(item => 
        item.status === 'uploading' 
          ? { ...item, status: 'error', error: 'Network error occurred' }
          : item
      ));
    } finally {
      setIsUploading(false);
    }
  };

  // Upload a single dataset
  const uploadSingleItem = async (index: number): Promise<void> => {
    const item = datasets[index];
    if (!item || item.status !== 'pending') return;

    markAsUploading(index);
    try {
      const result = await DatasetService.createDataset(item.apiData);
      if (result && result.uploadUrl) {
        // Mark as uploaded (no backend ID, just success)
        markAsUploaded(index);
      } else {
        markAsError(index, 'Upload failed');
      }
    } catch (error) {
      markAsError(index, 'Network error occurred');
    }
  };

  return {
    datasets,
    isUploading,
    addDatasets,
    markAsUploading,
    markAsUploaded,
    markAsError,
    removeDataset,
    clearAll,
    uploadAllDatasets,
    uploadSingleItem,
  };
}
