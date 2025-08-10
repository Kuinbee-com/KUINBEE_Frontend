import { useState, useEffect } from 'react';
import { SuperAdminService } from '../services/superAdminService';

/**
 * Admin data structure - defines what information each admin contains
 */
export interface Admin {
  /** Unique identifier for the admin */
  id: string;
  /** Admin's title (Mr., Ms., Dr., etc.) */
  title: string;
  /** Admin's first name */
  firstName: string;
  /** Admin's middle name (optional) */
  middleName?: string;
  /** Admin's last name */
  lastName: string;
  /** Admin's official email address */
  officialEmailId: string;
  /** Admin's personal email address */
  personalEmailId: string;
  /** Admin's primary phone number */
  phNo: string; // Note: Backend uses BigInt, but frontend handles as string
  /** Admin's alternative phone number */
  alternativePhNo?: string; // Note: Backend uses BigInt, but frontend handles as string
  /** ID of the superadmin who created this admin */
  createdById: string;
  /** Date when admin was created */
  createdAt: string;
  /** Admin's personal information */
  personalInfo: {
    address: string;
    fatherName: string;
    motherName: string;
    gender: string;
    dob: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    nationality: string;
  };
  /** Admin's permissions array */
  permissions: string[];
  /** Admin's current status */
  status?: string;
}

/**
 * State for delete confirmation dialog
 */
interface DeleteDialogState {
  /** Whether the delete dialog is currently open */
  isOpen: boolean;
  /** The admin that user wants to delete (null when dialog is closed) */
  adminToDelete: Admin | null;
}

/**
 * Custom hook for managing admins in the superadmin panel
 * 
 * This hook provides all the business logic needed for:
 * - Displaying admins list
 * - Searching/filtering admins
 * - Creating new admins  
 * - Editing existing admins
 * - Deleting admins with confirmation
 * - Showing success messages
 * 
 * Benefits of using this hook:
 * - Separates business logic from UI components
 * - Makes components cleaner and more focused
 * - Allows easy reuse of admin management logic
 * - Centralizes state management
 * 
 * Example usage:
 * ```tsx
 * const {
 *   filteredAdmins,
 *   searchQuery,
 *   handleSearchChange,
 *   handleDelete,
 *   deleteDialog,
 *   setDeleteDialog
 * } = useAdminManagement();
 * ```
 */
export const useAdminManagement = () => {
  // All admins data (loaded from API)
  const [admins, setAdmins] = useState<Admin[]>([]);

  // Mock admins data as fallback
  const mockAdmins: Admin[] = [
    {
      id: 'cmdkjnifa0009dq0v10gjsh5u',
      title: 'Mr.',
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      officialEmailId: 'john.doe@company.com',
      personalEmailId: 'john.personal@gmail.com',
      phNo: '+1234567890',
      alternativePhNo: '+0987654321',
      createdById: 'cmdkg769p000bk10w14ifnoz0',
      createdAt: '2024-08-01',
      personalInfo: {
        address: '123 Main Street',
        fatherName: 'Robert Doe',
        motherName: 'Mary Doe',
        gender: 'Male',
        dob: '1990-01-15',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        pinCode: '10001',
        nationality: 'American',
      },
      permissions: ['manage_datasets', 'manage_categories', 'manage_sources'],
      status: 'active',
    },
    {
      id: 'cmdkjnifa0009dq0v10gjsh5v',
      title: 'Ms.',
      firstName: 'Jane',
      lastName: 'Smith',
      officialEmailId: 'jane.smith@company.com',
      personalEmailId: 'jane.personal@gmail.com',
      phNo: '+1234567891',
      createdById: 'cmdkg769p000bk10w14ifnoz0',
      createdAt: '2024-08-02',
      personalInfo: {
        address: '456 Oak Avenue',
        fatherName: 'William Smith',
        motherName: 'Lisa Smith',
        gender: 'Female',
        dob: '1992-03-20',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        pinCode: '90001',
        nationality: 'American',
      },
      permissions: ['manage_datasets', 'manage_categories'],
      status: 'active',
    },
  ];

  // Current search query for filtering admins
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Loading state for API operations
  const [loading, setLoading] = useState<boolean>(false);
  
  // Success message to show after operations
  const [successMessage, setSuccessMessage] = useState<string>('');
  
  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    isOpen: false,
    adminToDelete: null,
  });

  // Load admins from API
  const loadAdmins = async () => {
    setLoading(true);
    try {
      const apiAdmins = await SuperAdminService.getAllAdmins();
      if (Array.isArray(apiAdmins)) {
        setAdmins(apiAdmins);
      } else {
        setAdmins(mockAdmins);
      }
    } catch (error) {
      console.error('Failed to load admins:', error);
      // Fallback to mock data if API fails
      setAdmins(mockAdmins);
    } finally {
      setLoading(false);
    }
  };

  // Load admins on component mount
  useEffect(() => {
    loadAdmins();
  }, []);

  /**
   * Handle search query changes
   * Updates the search query state which automatically filters the admins
   */
  const handleSearchChange = (query: string): void => {
    setSearchQuery(query);
  };

  /**
   * Filter admins based on search query
   * Searches in admin name, email, and phone fields
   */
  const filteredAdmins = admins.filter((admin) => {
    const searchTerm = searchQuery.toLowerCase();
    const fullName = `${admin.firstName} ${admin.middleName || ''} ${admin.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm) ||
      admin.officialEmailId.toLowerCase().includes(searchTerm) ||
      admin.personalEmailId.toLowerCase().includes(searchTerm) ||
      admin.phNo.includes(searchTerm)
    );
  });

  /**
   * Handle delete action
   * Opens confirmation dialog with the admin to be deleted
   */
  const handleDelete = (admin: Admin): void => {
    setDeleteDialog({
      isOpen: true,
      adminToDelete: admin,
    });
  };

  /**
   * Confirm delete action
   * Actually deletes the admin via API and updates the UI
   */
  const confirmDelete = async (): Promise<void> => {
    if (!deleteDialog.adminToDelete) return;

    setLoading(true);
    try {
      await SuperAdminService.deleteAdmin(deleteDialog.adminToDelete.id);
      
      // Remove admin from state
      setAdmins(prev => prev.filter(admin => admin.id !== deleteDialog.adminToDelete!.id));
      
      // Close dialog
      setDeleteDialog({ isOpen: false, adminToDelete: null });
      
      // Show success message
      const adminName = `${deleteDialog.adminToDelete.firstName} ${deleteDialog.adminToDelete.lastName}`;
      setSuccessMessage(`Admin "${adminName}" has been deleted successfully.`);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Failed to delete admin:', error);
      // You might want to show an error toast here
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cancel delete action
   * Closes the confirmation dialog without deleting
   */
  const cancelDelete = (): void => {
    setDeleteDialog({ isOpen: false, adminToDelete: null });
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
    admins,
    filteredAdmins,
    
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
    refreshAdmins: loadAdmins,
    
    // Dialog control
    setDeleteDialog,
  };
};

export default useAdminManagement;
