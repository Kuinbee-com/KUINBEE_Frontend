// ...existing code...
// ...existing code...

// LocationInfo type for dataset location details
export interface LocationInfo {
  id: string;
  datasetId: string;
  region: string;
  country: string;
  state: string;
  city: string;
}

// MarketplaceDataset type matches backend response for marketplace datasets
export interface MarketplaceDataset {
  id: string;
  title: string;
  isPaid: boolean;
  price: number;
  overview: string;
  fileFormat: string;
  category: string;
  source: string;
  totalDownloads: number;
  locationInfo: LocationInfo;
  lastUpdatedAt: string;
  tags: string[];
}
/**
 * User-related types and interfaces
 */

export interface UserProfile {
  name: string;
  email: string;
  phNo?: string;
  UserProfileInfo?: {
    bio?: string;
    city?: string;
    country?: string;
    gender?: string;
    occupation?: string;
    institution?: string;
  };
}

export interface Dataset {
  id: string;
  title: string;
  description: string;
  category: string;
  source: string;
  fileSize: number;
  downloadCount: number;
  isPaid: boolean;
  price?: number;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  format?: string;
  lastUpdated?: string;

  // Legacy fields for compatibility
  isFree?: boolean; // Derived from !isPaid
  size?: string; // Human readable file size

  // Additional fields for dataset detail page
  primaryCategoryId?: string;
  primaryCategoryName?: string; // Added for badge display
  sourceId?: string;
  sourceName?: string; // Added for badge display
  superTypes?: string;
  status?: string;
  license?: string;
  aboutDatasetInfo?: {
    overview: string;
    description: string;
    dataQuality: string;
    features: { content: string }[];
    dataFormatInfo: {
      rows: number;
      cols: number;
      fileFormat: string;
    };
  };
  locationInfo?: {
    region: string;
    country: string;
  };
  categories?: { id: string }[];

  // Add birthInfo for backend compatibility
  birthInfo?: {
    createdAt?: string;
    lastUpdatedAt?: string;
  };
}



export interface DownloadOptions {
  fileFormat: string;
  isPaid: boolean;
  userId: string;
  isAgreedToLicense: boolean;
}

export interface DownloadHistory {
  id: string;
  datasetId: string;
  dataset: Dataset;
  downloadedAt: string;
  fileFormat: string;
  downloadUrl?: string;
}

export interface UserStats {
  totalDownloads: number;
  totalDatasetsAccessed: number;
  favoriteCategories: string[];
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'download' | 'view' | 'search';
  description: string;
  timestamp: string;
  metadata?: any;
}


export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

export interface EditingProfile {
  occupation: string;
  institution: string;
  city: string;
  country: string;
  bio: string;
}

// Category and Source types for backend integration
export interface Category {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

export interface Source {
  id: string;
  name: string;
  createdAt: string;
}




export interface DownloadedDataset {
    id: string;
    title: string;
    isPaid: boolean;
    datasetUniqueId: string;
    primaryCategoryName: string;
    purchaseDate: string;
    price?: number;
}
