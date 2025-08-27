import { useState, useEffect } from 'react';
import { SourceService } from '../services/sources/sourceService';

/**
 * Source data structure - defines what information each source contains
 */
export interface Source {
  /** Unique identifier for the source */
  id: string;
  /** Display name of the source */
  name: string;
  /** Detailed description of what this source provides */
  description: string;
  /** Status of the source */
  status: 'active' | 'inactive';
  /** Creation date of the source */
  createdAt: string;
  /** Number of datasets available from this source */
  datasetCount: number;
  /** Organization/provider where the dataset is from (e.g., RBI, NABARD, SEBI) */
  provider: string;
}

/**
 * State for delete confirmation dialog
 */
interface DeleteDialogState {
  /** Whether the delete dialog is currently open */
  isOpen: boolean;
  /** The source that user wants to delete (null when dialog is closed) */
  sourceToDelete: Source | null;
}

/**
 * Custom hook for managing sources in the admin panel
 * 
 * This hook provides all the business logic needed for:
 * - Displaying sources list
 * - Searching/filtering sources
 * - Creating new sources  
 * - Editing existing sources
 * - Deleting sources with confirmation
 * - Showing success messages
 * 
 * Benefits of using this hook:
 * - Separates business logic from UI components
 * - Makes components cleaner and more focused
 * - Allows easy reuse of source management logic
 * - Centralizes state management
 * 
 * Example usage:
 * ```tsx
 * const {
 *   filteredSources,
 *   searchQuery,
 *   handleSearchChange,
 *   handleDelete,
 *   deleteDialog,
 *   setDeleteDialog
 * } = useSourceManagement();
 * ```
 */
export const useSourceManagement = () => {
  // All sources data (loaded from API)
  const [sources, setSources] = useState<Source[]>([]);

  // Mock sources data as fallback
  const mockSources: Source[] = [
    {
      id: '1',
      name: 'RBI',
      description: 'Reserve Bank of India datasets and financial statistics.',
      status: 'active' as const,
      createdAt: '2024-01-15',
      datasetCount: 15,
      provider: 'RBI',
    },
    {
      id: '2', 
      name: 'NABARD',
      description: 'National Bank for Agriculture and Rural Development datasets.',
      status: 'active' as const,
      createdAt: '2024-02-20',
      datasetCount: 8,
      provider: 'NABARD',
    },
    {
      id: '3',
      name: 'SEBI',
      description: 'Securities and Exchange Board of India market data.',
      status: 'active' as const,
      createdAt: '2024-03-10',
      datasetCount: 12,
      provider: 'SEBI',
    },
    {
      id: '4',
      name: 'Ministry of Finance',
      description: 'Government finance and budget datasets.',
      status: 'inactive' as const,
      createdAt: '2024-01-05',
      datasetCount: 6,
      provider: 'Ministry of Finance',
    },
    {
      id: '5',
      name: 'ICSSR',
      description: 'Indian Council of Social Science Research datasets.',
      status: 'active' as const,
      createdAt: '2024-04-01',
      datasetCount: 9,
      provider: 'ICSSR',
    },
  ];

  // Current search query for filtering sources
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Loading state for API operations
  const [loading, setLoading] = useState<boolean>(false);
  
  // Success message to show after operations
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    isOpen: false,
    sourceToDelete: null,
  });

  // Load sources from localStorage or API
  const loadSources = async () => {
    setLoading(true);
    try {
      const cached = localStorage.getItem('sources');
      if (cached) {
        setSources(JSON.parse(cached));
        setLoading(false);
        // Optionally, refresh in background
        SourceService.getAllSources().then(result => {
          setSources(result);
          localStorage.setItem('sources', JSON.stringify(result));
        }).catch(() => {});
        return;
      }
      const result = await SourceService.getAllSources();
      setSources(result);
      localStorage.setItem('sources', JSON.stringify(result));
    } catch (error) {
      console.error('Failed to load sources:', error);
      setSources(mockSources);
    } finally {
      setLoading(false);
    }
  };

  // Load sources on component mount
  useEffect(() => {
    loadSources();
  }, []);

  /**
   * Handle search query changes
   * Updates the search query state which automatically filters the sources
   */
  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
  };

  /**
   * Filter sources based on search query
   * Searches in source name, description, and provider fields
   */
  const filteredSources = sources.filter((source) => {
    const searchTerm = (searchQuery || "").toLowerCase();
    return (
      (source.name || "").toLowerCase().includes(searchTerm) ||
      (source.description || "").toLowerCase().includes(searchTerm) ||
      (source.provider || "").toLowerCase().includes(searchTerm)
    );
  });

  /**
   * Handle delete action
   * Opens confirmation dialog with the source to be deleted
   */
  const handleDelete = (source: Source): void => {
    setDeleteDialog({
      isOpen: true,
      sourceToDelete: source,
    });
  };

  /**
   * Confirm delete action
   * Actually deletes the source via API and updates the UI
   */
  const confirmDelete = async (): Promise<void> => {
    if (!deleteDialog.sourceToDelete) return;
    setLoading(true);
    try {
      await SourceService.deleteSource(deleteDialog.sourceToDelete.id);
      setSources(prev => {
        const updated = prev.filter(source => source.id !== deleteDialog.sourceToDelete!.id);
        localStorage.setItem('sources', JSON.stringify(updated));
        return updated;
      });
      setDeleteDialog({ isOpen: false, sourceToDelete: null });
      setSuccessMessage(`Source "${deleteDialog.sourceToDelete.name}" has been deleted successfully.`);
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to delete source:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel delete action
   * Closes the confirmation dialog without deleting
   */
  const cancelDelete = (): void => {
    setDeleteDialog({ isOpen: false, sourceToDelete: null });
  };

  /**
   * Clear success message
   */
  const clearSuccessMessage = (): void => {
    setSuccessMessage('');
  };

  // Return all the state and functions that components need
  return {
    // Data
    sources,
    filteredSources,
    
    // UI State
    searchQuery,
    loading,
    successMessage,
    deleteDialog,
    
    // Actions
    handleSearchChange,
    handleDelete,
    confirmDelete,
    cancelDelete,
    clearSuccessMessage,
    refreshSources: loadSources,
    
    // Dialog control
    setDeleteDialog,
  };
};

export default useSourceManagement;
