// Extends Dataset to include birthInfo for admin detail view
export type DatasetWithBirthInfo = Dataset & {
  birthInfo?: {
    createdAt?: string;
    lastUpdatedAt?: string;
  };
};
/**
 * Admin feature type definitions
 */

// Category types
export interface Category {
  id: string;
  name: string;
  datasetCount?: number;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface CreateCategoryRequest {
  categoryName: string;
}

export interface UpdateCategoryRequest {
  categoryName: string;
}

// Source types
export interface Source {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  datasetCount: number;
  provider: string;
  updatedAt?: string;
}

export interface CreateSourceRequest {
  name: string;
  description: string;
  provider: string;
  status?: 'active' | 'inactive';
}

export interface UpdateSourceRequest {
  name: string;
}

// Dataset types - Updated to match backend IDatasetBaseInput
export interface Dataset {
  id: string;
  title: string;
  primaryCategoryId: string;
  sourceId: string;
  datasetUniqueId?: string;
  price: number;
  isPaid: boolean;
  license: string;
  superTypes: string;
  aboutDatasetInfo?: {
    overview: string;
    description: string;
    dataQuality: string;
    dataFormatInfo: {
      rows: number;
      cols: number;
      fileFormat: string;
    };
    features?: Array<{ content: string; }>;
  };
  locationInfo?: {
    region: string;
    country: string;
    state: string;
    city: string;
  };
  securityInfo?: {
    currentEncryptionSecret: string;
    masterSecret: string;
  };
  categories?: Array<{ id: string; }>;
  status?: 'active' | 'inactive' | 'pending';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDatasetRequest {
  title: string;
  primaryCategoryId: string;
  sourceId: string;
  datasetUniqueId?: string;
  price: number;
  isPaid: boolean;
  license: string;
  superTypes: string;
  aboutDatasetInfo?: {
    overview: string;
    description: string;
    dataQuality: string;
    dataFormatInfo: {
      rows: number;
      cols: number;
      fileFormat: string;
    };
    features?: Array<{ content: string; }>;
  };
  locationInfo?: {
    region: string;
    country: string;
    state: string;
    city: string;
  };
  securityInfo?: {
    currentEncryptionSecret: string;
    masterSecret: string;
  };
  categories?: Array<{ id: string; }>;
}

export interface UpdateDatasetRequest {
  title?: string;
  description?: string;
  categoryId?: string;
  sourceId?: string;
  price?: number;
  dataType?: string;
  format?: string;
  size?: string;
  status?: 'active' | 'inactive' | 'pending';
  tags?: string[];
  sampleData?: any;
}

// API Response types
export interface AdminApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}
