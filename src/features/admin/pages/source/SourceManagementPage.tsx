import * as React from 'react';
import { Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSourceManagement } from '../../hooks/useSourceManagement';
import PageHeader from  "@/features/admin/components/PageHeader";
import SearchBox from '../../../../shared/components/SearchBox';
import SourcesTable from '../../components/SourcesTable';
import ConfirmDeleteDialog from '../../../../shared/components/ConfirmDeleteDialog';

// Consistent color palette
const palette = {
  bg: '#f9fafc',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  error: '#ef4444',
};

/**
 * SourceManagementPage Component
 * 
 * Main admin page for managing sources.
 * 
 * What this page does:
 * - Displays all sources in a searchable table
 * - Allows creating new sources via floating action button
 * - Enables editing existing sources 
 * - Provides delete functionality with confirmation
 * - Shows success messages for user actions
 * 
 * Features:
 * - Search sources by name
 * - Real-time filtering
 * - Navigation to create/edit pages
 * - Delete confirmation dialogs
 * - Success notifications
 * 
 * Page Layout:
 * 1. Header with title and back navigation
 * 2. Search box for filtering sources
 * 3. Sources table with data and action buttons
 * 4. Floating (+) button to create new source
 * 5. Delete confirmation dialog when needed
 * 
 * This follows the same clean pattern as CategoryManagementPage
 * with reusable components and business logic in custom hooks.
 */
const SourceManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Get all source management functionality from custom hook
  const {
    filteredSources,           // Sources after applying search filter
    searchQuery,               // Current search text
    successMessage,            // Success message to display
    deleteDialog,              // Delete confirmation dialog state
    handleSearchChange,        // Function to update search
    handleDelete,              // Function to delete source
    confirmDelete,             // Function to confirm deletion
    cancelDelete,              // Function to cancel deletion
    clearSuccessMessage,       // Function to clear success message
  } = useSourceManagement();

  /**
   * Navigate to create new source page
   */
  const handleCreateSource = () => {
    navigate('/admin/sources/create');
  };

  /**
   * Navigate to edit existing source page
   * @param source - The source to edit
   */
  const handleEditSource = (source: any) => {
    navigate(`/admin/sources/edit/${source.id}`);
  };

  /**
   * Open delete confirmation dialog
   * @param source - The source to delete
   */
  const handleDeleteSource = (source: any) => {
    handleDelete(source);
  };

  /**
   * Confirm and execute source deletion
   */
  const handleConfirmDelete = () => {
    confirmDelete();
  };

  /**
   * Cancel source deletion
   */
  const handleCancelDelete = () => {
    cancelDelete();
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: palette.bg, minHeight: '100vh' }}>
      {/* Page Header with back navigation, title, and Add button */}
      <PageHeader
        title="Source Management"
        backPath="/admin/dashboard"
        backLabel="Back to Dashboard"
        actionButton={{
          label: "Add Source",
          icon: <AddIcon />,
          onClick: handleCreateSource
        }}
        successMessage={successMessage}
        onClearMessage={clearSuccessMessage}
      />

      {/* Search Box for filtering sources */}
      <SearchBox
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search sources by name..."
      />

      {/* Sources Table with data and actions */}
      <SourcesTable
        sources={filteredSources}
        onEdit={handleEditSource}
        onDelete={handleDeleteSource}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialog.isOpen}
        title="Delete Source"
        message={`Are you sure you want to delete "${deleteDialog.sourceToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
      />
    </Box>
  );
};

export default SourceManagementPage;
