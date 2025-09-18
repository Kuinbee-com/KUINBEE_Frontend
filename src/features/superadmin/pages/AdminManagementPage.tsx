import React, { useState, useEffect } from 'react';
// Modern font import for global use
import '@fontsource/inter/index.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Alert, Paper, Chip } from '@mui/material';
import { Add as AddIcon, ContentCopy as CopyIcon } from '@mui/icons-material';

// Custom hooks and components
import { useAdminManagement, type Admin } from '../hooks/useAdminManagement.ts';
import { SuperAdminService } from '../services/superAdminService';
import SimpleSearchBox from '../../../shared/components/SearchBox';
import AdminTable from '../components/AdminTable';
import ConfirmDeleteDialog from '../../../shared/components/ConfirmDeleteDialog';

const palette = {
  bg: '#f9fafc',
};

/**
 * AdminManagementPage Component
 * 
 * This page allows superadmins to:
 * - View all admins in a table
 * - Search/filter admins by name, email, or phone
 * - Add new admins
 * - Edit existing admins
 * - View admin details
 * - Delete admins (with confirmation)
 * 
 * The page is composed of reusable components:
 * - AdminPageHeader: Provides navigation and page title
 * - SimpleSearchBox: Allows filtering the admin list
 * - AdminTable: Displays admins in a professional table
 * - ConfirmDeleteDialog: Handles delete confirmation with safety checks
 */
const AdminManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Local state for UI interactions
  const [search, setSearch] = useState(''); // Current search term
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Delete confirmation dialog
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null); // Admin being deleted
  
  // Success message state
  const [successData, setSuccessData] = useState<{
    message: string;
    adminId: string;
    defaultPassword: string;
    adminName: string;
    officialEmail: string;
  } | null>(null);

  // Custom hook that handles all admin business logic
  const { 
    loading: hookLoading, // Is a hook operation in progress?
    filteredAdmins, // Admins filtered by search term
    handleSearchChange, // Function to update search query
    refreshAdmins, // Function to refresh admin list
  } = useAdminManagement();

  // Local loading state for delete operations
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Handle success message from navigation state
  useEffect(() => {
    if (location.state?.successData) {
      setSuccessData(location.state.successData);
      
      // Refresh the admin list to show the new admin
      refreshAdmins();
      
      // Auto-hide success message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessData(null);
      }, 5000);
      
      // Clear the navigation state to prevent showing the message again on refresh
      navigate(location.pathname, { replace: true, state: {} });
      
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate, location.pathname, refreshAdmins]);

  /**
   * Handle navigation to edit admin page
   * @param admin - Admin to edit
   */
  const handleEditAdmin = (admin: Admin) => {
    navigate(`/superadmin/admins/edit/${admin.id}`);
  };

  /**
   * Handle navigation to view admin details page
   * @param admin - Admin to view
   */
  const handleViewAdmin = (admin: Admin) => {
    navigate(`/superadmin/admins/${admin.id}`);
  };

  /**
   * Handle delete admin action - opens confirmation dialog
   * @param admin - Admin to delete
   */
  const handleDeleteAdmin = (admin: Admin) => {
    setSelectedAdmin(admin);
    setDeleteDialogOpen(true);
  };

  /**
   * Handle delete confirmation - actually deletes the admin
   */
  const handleConfirmDelete = async () => {
    if (!selectedAdmin) return;

    setDeleteLoading(true);
    try {
      // Call the API to delete the admin
      await SuperAdminService.deleteAdmin(selectedAdmin.id);
      
      // Show success message
      const adminName = `${selectedAdmin.firstName} ${selectedAdmin.lastName}`;
      setSuccessData({
        message: `Admin "${adminName}" has been deleted successfully.`,
        adminId: selectedAdmin.id,
        defaultPassword: '',
        adminName: adminName,
        officialEmail: selectedAdmin.officialEmailId
      });
      
      // Refresh the admin list to reflect changes
      await refreshAdmins();
      
      // Close dialog and clear selected admin
      setDeleteDialogOpen(false);
      setSelectedAdmin(null);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessData(null), 5000);
      
    } catch (error) {
      console.error('Failed to delete admin:', error);
      // You might want to show an error toast here
    } finally {
      setDeleteLoading(false);
    }
  };

  /**
   * Handle canceling delete operation
   */
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedAdmin(null);
  };

  /**
   * Handle copying text to clipboard
   */
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  /**
   * Handle search input changes
   * @param value - New search value
   */
  const handleSearchInputChange = (value: string) => {
    setSearch(value);
    handleSearchChange(value);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: palette.bg, minHeight: '100vh' }}>
      {/* Page Header */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#111827', marginBottom: 1 }}>
          Admin Management
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ color: '#6b7280' }}>
            Manage administrators and their permissions
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/superadmin/admins/create')}
            sx={{
              backgroundColor: '#111827',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#374151',
              },
            }}
          >
            Add New Admin
          </Button>
        </Box>
      </Box>

      {/* Success Message */}
      {successData && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          onClose={() => setSuccessData(null)}
        >
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {successData.message}
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#f0f9ff', border: '1px solid #e0f2fe' }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Admin Credentials:
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <Chip 
                  label={`ID: ${successData.adminId}`}
                  variant="outlined"
                  size="small"
                  onClick={() => copyToClipboard(successData.adminId)}
                  onDelete={() => copyToClipboard(successData.adminId)}
                  deleteIcon={<CopyIcon />}
                />
                <Chip 
                  label={`Password: ${successData.defaultPassword}`}
                  variant="outlined"
                  size="small"
                  color="warning"
                  onClick={() => copyToClipboard(successData.defaultPassword)}
                  onDelete={() => copyToClipboard(successData.defaultPassword)}
                  deleteIcon={<CopyIcon />}
                />
                <Chip 
                  label={`Email: ${successData.officialEmail}`}
                  variant="outlined"
                  size="small"
                  onClick={() => copyToClipboard(successData.officialEmail)}
                  onDelete={() => copyToClipboard(successData.officialEmail)}
                  deleteIcon={<CopyIcon />}
                />
              </Box>
              <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#ef4444' }}>
                ⚠️ Save these credentials securely! This message will disappear in 5 seconds.
              </Typography>
            </Paper>
          </Box>
        </Alert>
      )}

      {/* Search Box */}
      <Box sx={{ mb: 3 }}>
        <SimpleSearchBox
          value={search}
          onChange={handleSearchInputChange}
          placeholder="Search admins by name, email, or phone..."
        />
      </Box>

      {/* Admin Table */}
      <AdminTable
        admins={filteredAdmins}
        onEdit={handleEditAdmin}
        onDelete={handleDeleteAdmin}
        onView={handleViewAdmin}
        loading={deleteLoading || hookLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={deleteDialogOpen}
        title="Delete Admin"
        message={
          selectedAdmin
            ? `Are you sure you want to delete admin "${selectedAdmin.firstName} ${selectedAdmin.lastName}"? This action cannot be undone and will permanently remove all associated data.`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onClose={handleCancelDelete}
        loading={deleteLoading}
        showWarning={true}
      />
    </Box>
  );
};

export default AdminManagementPage;
