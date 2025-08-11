import { useState } from 'react';
import type { DatasetApiBody } from '../services/datasets/csvDatasetParser';
import { DatasetService } from '../services/datasets/datasetService';

export interface BulkUploadItem {
  status: 'pending' | 'uploading' | 'error';
  apiData: DatasetApiBody;
  error?: string;
}

export interface UploadedDataset {
  id: string;
  dataFormat: string;
  title: string;
  isPaid: boolean; // Still needed for backend API
  status: 'ready' | 'uploading' | 'uploaded' | 'error';
  error?: string;
}

export function useBulkDatasetUpload() {
  const [datasets, setDatasets] = useState<BulkUploadItem[]>([]);
  const [uploadedDatasets, setUploadedDatasets] = useState<UploadedDataset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadedView, setShowUploadedView] = useState(false);

  const addDatasets = (apiDatasets: DatasetApiBody[]) => {
    const items = apiDatasets.map(ds => ({
      status: 'pending' as const,
      apiData: ds,
    }));
    setDatasets(items);
    setUploadedDatasets([]);
    setShowUploadedView(false);
  };

  const clearAll = () => {
    setDatasets([]);
    setUploadedDatasets([]);
    setShowUploadedView(false);
  };

  // Upload all datasets in bulk (metadata only)
  const uploadAllDatasets = async (): Promise<void> => {
    const pendingDatasets = datasets.filter(item => item.status === 'pending');
    if (pendingDatasets.length === 0) return;

    setIsUploading(true);
    try {
      // Mark all as uploading
      setDatasets(prev => prev.map(item => 
        item.status === 'pending' ? { ...item, status: 'uploading' } : item
      ));

      // Use DatasetService for bulk upload - this sends metadata only
      const apiDatasets = pendingDatasets.map(item => item.apiData);
      const result = await DatasetService.uploadMultipleDatasets(apiDatasets);

      if (result.success && result.data) {
        // Create uploaded datasets list from response
        // Backend returns datasets in the same order they were sent
        const uploaded: UploadedDataset[] = result.data.map((backendItem, index) => {
          const originalDataset = pendingDatasets[index]; // Map by index since order is preserved
          
          return {
            id: backendItem.id,
            dataFormat: backendItem.dataFormat,
            title: originalDataset?.apiData.title || `Dataset ${index + 1}`,
            isPaid: !!originalDataset?.apiData.isPaid,
            status: 'ready' as const
          };
        });
        
        setUploadedDatasets(uploaded);
        setShowUploadedView(true);
        // Clear the original datasets since we now show the uploaded ones
        setDatasets([]);
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

  // Upload file for a specific uploaded dataset
  const uploadFileForDataset = async (datasetId: string, file: File): Promise<void> => {
    const dataset = uploadedDatasets.find(d => d.id === datasetId);
    if (!dataset) return;
    
    // Mark as uploading
    setUploadedDatasets(prev => prev.map(d => 
      d.id === datasetId ? { ...d, status: 'uploading' } : d
    ));
    
    try {
      // Get presigned upload URL from backend
      const uploadUrl = await DatasetService.getUploadUrlForDataset(
        dataset.id, 
        dataset.dataFormat, 
        dataset.isPaid
      );
      
      // Upload file to S3
      await DatasetService.uploadFileToS3(uploadUrl, file);
      
      // Mark as uploaded
      setUploadedDatasets(prev => prev.map(d => 
        d.id === datasetId ? { ...d, status: 'uploaded' } : d
      ));
    } catch (error) {
      // Mark as error
      setUploadedDatasets(prev => prev.map(d => 
        d.id === datasetId ? { ...d, status: 'error', error: 'File upload failed' } : d
      ));
    }
  };

  return {
    datasets,
    uploadedDatasets,
    isUploading,
    showUploadedView,
    addDatasets,
    clearAll,
    uploadAllDatasets,
    uploadFileForDataset,
  };
}
