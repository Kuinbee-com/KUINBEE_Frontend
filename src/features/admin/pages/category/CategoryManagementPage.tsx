import React, { useState } from 'react';
// Modern font import for global use
import '@fontsource/inter/index.css';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

// Custom hooks and components
// Update the import path if the hook is located elsewhere, for example:
import { useCategoryManagement, type Category } from '../../hooks/useCategoryManagement';
// Or, if the file does not exist, create 'useCategoryManagement.ts' in the correct folder.
import AdminPageHeader from '../../components/PageHeader';
// Update the import path below if SimpleSearchBox is located elsewhere
// import SimpleSearchBox from '@/shared/components/SimpleSearchBox'; // <-- File not found, create or fix path
import CategoryTable from '../../components/CategoryTable';
// Update the import path below to the correct location of ConfirmDeleteDialog
// For example, if it exists in 'src/shared/components/ConfirmDeleteDialog.tsx':
import ConfirmDeleteDialog from '../../../../shared/components/ConfirmDeleteDialog';
// If the file does not exist, create 'src/shared/components/ConfirmDeleteDialog.tsx'

const palette = {
  bg: '#f9fafc',
};

/**
 * CategoryManagementPage Component
 * 
 * This page allows admins to:
 * - View all categories in a table
 * - Search/filter categories by name
 * - Add new categories
 * - Edit existing categories
 * - Delete categories (with confirmation)
 * 
 * The page is composed of reusable components:
 * - AdminPageHeader: Provides navigation and page title
 * - SimpleSearchBox: Allows filtering the category list
 * - CategoryTable: Displays categories in a professional table
 * - ConfirmDeleteDialog: Handles delete confirmation with safety checks
 */
const CategoryManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Local state for UI interactions
  const [search, setSearch] = useState(''); // Current search term
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // First delete confirmation
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false); // Final delete confirmation
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // Category being deleted

  // Custom hook that handles all category business logic
  const { 
    loading, // Is a delete operation in progress?
    successMessage, // Success message to show user
    setSuccessMessage, // Function to clear success message
    deleteCategory, // Function to delete a category
    filterCategories // Function to filter categories by search term
  } = useCategoryManagement();

  // Get the list of categories filtered by current search term
  const filteredCategories = filterCategories(search);

  /**
   * Handle editing a category
   * Navigates to the edit page with the category ID
   */
  const handleEdit = (category: Category) => {
    navigate(`/admin/categories/edit/${category.id}`);
  };

  /**
   * Handle initiating category deletion
   * Opens the first confirmation dialog
   */
  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  /**
   * Handle final deletion confirmation
   * Actually deletes the category and shows success message
   */
  const confirmDelete = async () => {
    if (!selectedCategory) return;
    
    try {
      await deleteCategory(selectedCategory);
    } catch (error) {
      console.error('Failed to delete category:', error);
    } finally {
      // Close dialogs and clear selection
      setDeleteDialogOpen(false);
      setConfirmDeleteDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <Box sx={{ 
      background: palette.bg, 
      minHeight: '100vh', 
      px: 0, 
      py: 0, 
  fontFamily: 'Inter, Roboto ,Arial, sans-serif' 
    }}>
      <Box sx={{ maxWidth: 1900, mx: 'auto', py: 0, width: '100%', px: 2 }}>
        {/* Page Header with title, back button, and Add button */}
        <AdminPageHeader
          title="Categories"
          backPath="/admin"
          backLabel="Back to Dashboard"
          actionButton={{
            label: "Add Category",
            icon: <AddIcon />,
            onClick: () => navigate('/admin/categories/create')
          }}
          successMessage={successMessage}
          onClearMessage={() => setSuccessMessage(null)}
        />
        
        {/* Search box to filter categories */}
        {/* <SimpleSearchBox
          value={search}
          onChange={setSearch}
          placeholder="Search categories..."
        /> */}
        
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Delete Confirmation Dialogs */}
        <ConfirmDeleteDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={() => {
            setDeleteDialogOpen(false);
            setConfirmDeleteDialogOpen(true);
          }}
          title="Confirm Delete"
          message={`Are you sure you want to delete the category "${selectedCategory?.name}"? This action cannot be undone.`}
        />

        <ConfirmDeleteDialog
          open={confirmDeleteDialogOpen}
          onClose={() => setConfirmDeleteDialogOpen(false)}
          onConfirm={confirmDelete}
          title="Final Confirmation"
          message="This is your final warning. Deleting this category will permanently remove it and cannot be recovered."
          itemName={selectedCategory?.name}
          itemDetails={
            <span style={{ color: '#6b7280', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
              Datasets Count: {selectedCategory?.datasetCount}
            </span>
          }
          loading={loading}
          showWarning={true}
        />
      </Box>
    </Box>
  );
};

export default CategoryManagementPage;
