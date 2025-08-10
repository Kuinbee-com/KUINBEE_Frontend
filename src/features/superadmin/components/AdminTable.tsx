import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import type { Admin } from '../hooks';

// Consistent color palette
const palette = {
  bg: '#f9fafc',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
};

interface AdminTableProps {
  /** List of admins to display */
  admins: Admin[];
  /** Callback when edit button is clicked */
  onEdit: (admin: Admin) => void;
  /** Callback when delete button is clicked */
  onDelete: (admin: Admin) => void;
  /** Callback when view button is clicked */
  onView: (admin: Admin) => void;
  /** Whether any operation is in progress */
  loading?: boolean;
}

/**
 * AdminTable Component
 * 
 * A professional table for displaying admin information with actions.
 * 
 * Features:
 * - Clean, modern table design
 * - Status indicators with color coding
 * - Action buttons for view, edit, delete
 * - Responsive layout
 * - Consistent styling with app theme
 * 
 * The table shows:
 * - Admin name (first + last)
 * - Email address
 * - Phone number
 * - Permissions count
 * - Status badge
 * - Action buttons
 */
const AdminTable: React.FC<AdminTableProps> = ({
  admins,
  onEdit,
  onDelete,
  onView,
  loading = false,
}) => {
  /**
   * Get status color based on admin status
   */
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return palette.success;
      case 'inactive':
        return palette.error;
      case 'pending':
        return palette.warning;
      default:
        return palette.muted;
    }
  };

  /**
   * Format admin's full name
   */
  const getFullName = (admin: Admin) => {
    const middle = admin.middleName ? ` ${admin.middleName}` : '';
    return `${admin.title} ${admin.firstName}${middle} ${admin.lastName}`;
  };

  /**
   * Format permissions for display
   */
  const getPermissionsDisplay = (permissions: string[]) => {
    return `${permissions.length} permission${permissions.length !== 1 ? 's' : ''}`;
  };

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        boxShadow: 'none',
        border: `1px solid ${palette.border}`,
        borderRadius: 2,
      }}
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: palette.bg }}>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: palette.text,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              Admin Name
            </TableCell>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: palette.text,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              Email
            </TableCell>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: palette.text,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              Phone
            </TableCell>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: palette.text,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              Permissions
            </TableCell>
            <TableCell 
              sx={{ 
                fontWeight: 600, 
                color: palette.text,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              Status
            </TableCell>
            <TableCell 
              align="right"
              sx={{ 
                fontWeight: 600, 
                color: palette.text,
                borderBottom: `1px solid ${palette.border}`,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {admins.length === 0 ? (
            <TableRow>
              <TableCell 
                colSpan={6} 
                align="center"
                sx={{ 
                  py: 8,
                  color: palette.muted,
                  borderBottom: 'none',
                }}
              >
                <Typography variant="body1">
                  No admins found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            admins.map((admin) => (
              <TableRow 
                key={admin.id}
                onClick={() => onView(admin)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: palette.bg,
                  },
                  '&:last-child td': {
                    borderBottom: 'none',
                  },
                }}
              >
                {/* Admin Name */}
                <TableCell 
                  sx={{ 
                    borderBottom: `1px solid ${palette.border}`,
                    color: palette.text,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {getFullName(admin)}
                  </Typography>
                </TableCell>

                {/* Email */}
                <TableCell 
                  sx={{ 
                    borderBottom: `1px solid ${palette.border}`,
                    color: palette.text,
                  }}
                >
                  <Typography variant="body2">
                    {admin.officialEmailId}
                  </Typography>
                </TableCell>

                {/* Phone */}
                <TableCell 
                  sx={{ 
                    borderBottom: `1px solid ${palette.border}`,
                    color: palette.text,
                  }}
                >
                  <Typography variant="body2">
                    {admin.phNo}
                  </Typography>
                </TableCell>

                {/* Permissions */}
                <TableCell 
                  sx={{ 
                    borderBottom: `1px solid ${palette.border}`,
                    color: palette.muted,
                  }}
                >
                  <Typography variant="body2">
                    {getPermissionsDisplay(admin.permissions)}
                  </Typography>
                </TableCell>

                {/* Status */}
                <TableCell 
                  sx={{ 
                    borderBottom: `1px solid ${palette.border}`,
                  }}
                >
                  <Chip
                    label={admin.status || 'Unknown'}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(admin.status),
                      color: '#ffffff',
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  />
                </TableCell>

                {/* Actions */}
                <TableCell 
                  align="right"
                  sx={{ 
                    borderBottom: `1px solid ${palette.border}`,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'flex-end' }}>
                    {/* Edit Button */}
                    <Tooltip title="Edit Admin">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(admin);
                        }}
                        disabled={loading}
                        sx={{
                          color: palette.accent,
                          '&:hover': {
                            backgroundColor: palette.bg,
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip title="Delete Admin">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(admin);
                        }}
                        disabled={loading}
                        sx={{
                          color: palette.error,
                          '&:hover': {
                            backgroundColor: '#fef2f2',
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
