import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/**
 * Props for the AdminPageHeader component
 * This component provides a consistent header layout for all admin pages
 */
interface AdminPageHeaderProps {
  /** The main title displayed on the page */
  title: string;
  /** Where the back button should navigate to */
  backPath: string;
  /** Text shown on the back button */
  backLabel: string;
  /** Optional action button (like "Add New" or "Create") */
  actionButton?: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  };
  /** Success message to show at the top of the page */
  successMessage?: string | null;
  /** Function to clear the success message */
  onClearMessage?: () => void;
}

// Simple color palette for consistent styling
const colors = {
  lightGray: '#6b7280',
  darkGray: '#111827',
  white: '#ffffff',
};

/**
 * AdminPageHeader Component
 * 
 * This component provides a consistent header layout for all admin pages.
 * It includes:
 * - A back navigation button
 * - A page title
 * - An optional action button (like "Add New")
 * - Success message display area
 * 
 * Usage example:
 * <AdminPageHeader 
 *   title="Categories" 
 *   backPath="/admin" 
 *   backLabel="Back to Dashboard"
 *   actionButton={{ label: "Add Category", icon: <AddIcon />, onClick: handleAdd }}
 * />
 */
const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  backPath,
  backLabel,
  actionButton,
  successMessage,
  onClearMessage,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Navigation Button - helps users go back to previous page */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(backPath)}
        sx={{ 
          color: colors.lightGray, 
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          mt: 3,
          mb: 2,
          fontSize: '0.95rem',
          textTransform: 'none',
          '&:hover': { 
            color: colors.darkGray,
            backgroundColor: 'transparent'
          }
        }}
      >
        {backLabel}
      </Button>
      
      {/* Page Title and Action Button Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, pt: 2, pb: 2, width: '100%' }}>
        {/* Main Page Title */}
        <Typography 
          variant="h4" 
          fontWeight={600} 
          sx={{ 
            color: colors.darkGray, 
            letterSpacing: 1, 
            fontFamily: 'Inter, Roboto, Arial, sans-serif' 
          }}
        >
          {title}
        </Typography>
        
        {/* Optional Action Button (like "Add New" button) */}
        {actionButton && (
          <Button
            variant="contained"
            startIcon={actionButton.icon}
            onClick={actionButton.onClick}
            sx={{
              background: colors.darkGray,
              color: colors.white,
              borderRadius: 2,
              boxShadow: 2,
              textTransform: 'none',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontFamily: 'Inter, Roboto, Arial, sans-serif',
              transition: 'background 0.2s',
              '&:hover': {
                background: colors.darkGray,
                opacity: 0.9,
              },
            }}
          >
            {actionButton.label}
          </Button>
        )}
      </Box>
      
      {/* Success Message Alert - shows when operations complete successfully */}
      {successMessage && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
          onClose={onClearMessage}
        >
          {successMessage}
        </Alert>
      )}
    </>
  );
};

export default AdminPageHeader;
