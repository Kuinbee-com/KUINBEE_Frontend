import { useState } from 'react';
import type { DatasetApiBody } from '../services/datasets/csvDatasetParser';
import { DatasetService } from '../services/datasets/datasetService';
import type { CategoryData, SourceData } from '../utils/validationHelpers';

export interface BulkUploadItem {
  status: 'pending' | 'uploading' | 'error' | 'invalid';
  apiData: DatasetApiBody;
  error?: string;
  validationErrors?: string[];
  warnings?: string[]; // Added to track supertype warnings
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
  const [validCategories, setValidCategories] = useState<Set<string>>(new Set());
  const [validSources, setValidSources] = useState<Set<string>>(new Set());
  const [categoriesData, setCategoriesData] = useState<CategoryData[]>([]);
  const [sourcesData, setSourcesData] = useState<SourceData[]>([]);
  const [isLoadingValidation, setIsLoadingValidation] = useState(false);

  // Fetch valid categories and sources from backend
  const loadValidationData = async (): Promise<void> => {
    setIsLoadingValidation(true);
    try {
      const [categories, sources] = await Promise.all([
        DatasetService.getAllCategories(),
        DatasetService.getAllSources()
      ]);

      // Store the full data for display purposes
      setCategoriesData(categories);
      setSourcesData(sources);

      // Create Sets for fast lookup (assuming categories and sources have 'id' field)
      const categoryIds = new Set(categories.map(cat => cat.id));
      const sourceIds = new Set(sources.map(src => src.id));

      setValidCategories(categoryIds);
      setValidSources(sourceIds);
    } catch (error) {
      console.error('Failed to load validation data:', error);
    } finally {
      setIsLoadingValidation(false);
    }
  };

  // Validate a single dataset
  const validateDataset = (apiData: DatasetApiBody): string[] => {
    const errors: string[] = [];

    if (!validCategories.has(apiData.primaryCategoryId)) {
      errors.push(`Invalid category ID: ${apiData.primaryCategoryId}`);
    }

    if (!validSources.has(apiData.sourceId)) {
      errors.push(`Invalid source ID: ${apiData.sourceId}`);
    }

    return errors;
  };

  const addDatasets = (apiDatasets: DatasetApiBody[]) => {
    const items = apiDatasets.map(ds => {
      const validationErrors = validateDataset(ds);
      const warnings = ds.warnings || [];
      // If superTypes is empty after normalization, mark as invalid
      if (!ds.superTypes || ds.superTypes.trim() === '') {
        validationErrors.push('Invalid or missing SuperType: must be one of the allowed types.');
      }
      return {
        status: validationErrors.length > 0 ? 'invalid' as const : 'pending' as const,
        apiData: ds,
        validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
        warnings: warnings.length > 0 ? warnings : undefined
      };
    });
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
      const apiDatasets = pendingDatasets.map(item => {
        // Remove warnings field before sending to API
        const { warnings, ...cleanApiData } = item.apiData;
        return cleanApiData;
      });
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
    isLoadingValidation,
    showUploadedView,
    validCategories,
    validSources,
    categoriesData,
    sourcesData,
    addDatasets,
    clearAll,
    uploadAllDatasets,
    uploadFileForDataset,
    loadValidationData,
  };
}
