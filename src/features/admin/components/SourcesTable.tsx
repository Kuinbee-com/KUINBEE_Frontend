import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

/**
 * Source data type
 */
interface Source {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
  datasetCount: number;
}

/**
 * Props for the SourcesTable component
 */
interface SourcesTableProps {
  /** Array of sources to display */
  sources: Source[];
  /** Function called when user clicks edit button */
  onEdit: (source: Source) => void;
  /** Function called when user clicks delete button */
  onDelete: (source: Source) => void;
}

// Simple color palette for consistent styling
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
 * SourcesTable Component
 * 
 * Displays sources in a professional table format with:
 * - Source name column
 * - Description column  
 * - Dataset count column
 * - Action buttons (Edit/Delete)
 * 
 * Features:
 * - Responsive design
 * - Hover effects on rows
 * - Consistent styling with other admin tables
 * - Clear action buttons with icons
 * 
 * Usage:
 * <SourcesTable 
 *   sources={sourcesList} 
 *   onEdit={handleEdit} 
 *   onDelete={handleDelete} 
 * />
 */
const SourcesTable: React.FC<SourcesTableProps> = ({
  sources,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer 
      sx={{ 
        width: '100%', 
        background: palette.card, 
        boxShadow: 1, 
        borderRadius: 3, 
        border: `1px solid ${palette.border}`, 
        mt: 2 
      }}
    >
      <Table stickyHeader sx={{ minWidth: 900, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            {/* Source Name Column Header */}
            <TableCell 
              sx={{ 
                color: palette.muted, 
                fontWeight: 600, 
                fontSize: '1.08rem', 
                background: palette.bg, 
                borderBottom: `2px solid ${palette.border}`, 
                padding: '18px 28px', 
                fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                letterSpacing: 0.2, 
                textAlign: 'left', 
                width: '18%' 
              }}
            >
              Source Name
            </TableCell>
            {/* Source ID Column Header */}
            <TableCell 
              sx={{ 
                color: palette.muted, 
                fontWeight: 600, 
                fontSize: '1.08rem', 
                background: palette.bg, 
                borderBottom: `2px solid ${palette.border}`, 
                padding: '18px 28px', 
                fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                letterSpacing: 0.2, 
                textAlign: 'left', 
                width: '14%' 
              }}
            >
              Source ID
            </TableCell>
            {/* Description Column Header */}
            <TableCell 
              sx={{ 
                color: palette.muted, 
                fontWeight: 600, 
                fontSize: '1.08rem', 
                background: palette.bg, 
                borderBottom: `2px solid ${palette.border}`, 
                padding: '18px 28px', 
                fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                letterSpacing: 0.2, 
                textAlign: 'left', 
                width: '32%' 
              }}
            >
              Description
            </TableCell>
            {/* Dataset Count Column Header */}
            <TableCell 
              sx={{ 
                color: palette.muted, 
                fontWeight: 600, 
                fontSize: '1.08rem', 
                background: palette.bg, 
                borderBottom: `2px solid ${palette.border}`, 
                padding: '18px 28px', 
                fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                letterSpacing: 0.2, 
                textAlign: 'center', 
                width: '18%' 
              }}
            >
              No. of Datasets
            </TableCell>
            {/* Actions Column Header */}
            <TableCell 
              sx={{ 
                color: palette.muted, 
                fontWeight: 600, 
                fontSize: '1.08rem', 
                background: palette.bg, 
                borderBottom: `2px solid ${palette.border}`, 
                padding: '18px 24px', 
                fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                letterSpacing: 0.2, 
                textAlign: 'center', 
                width: '18%' 
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        {/* Table Body - Data Rows */}
        <TableBody>
          {sources.map((source) => (
            <TableRow 
              key={source.id} 
              hover 
              sx={{ 
                transition: 'background 0.2s', 
                '&:hover': { background: palette.bg }, 
                fontFamily: 'Inter, Roboto, Arial, sans-serif' 
              }}
            >
              {/* Source Name Cell */}
              <TableCell 
                sx={{ 
                  color: palette.text, 
                  fontWeight: 600, 
                  fontSize: '1.02rem', 
                  padding: '16px 28px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'left', 
                  width: '18%' 
                }}
              >
                {source.name}
              </TableCell>
              {/* Source ID Cell */}
              <TableCell 
                sx={{ 
                  color: palette.muted, 
                  fontWeight: 500, 
                  fontSize: '1rem', 
                  padding: '16px 28px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'left', 
                  width: '14%' 
                }}
              >
                {source.id}
              </TableCell>
              {/* Description Cell */}
              <TableCell 
                sx={{ 
                  color: palette.muted, 
                  fontWeight: 500, 
                  fontSize: '1rem', 
                  padding: '16px 28px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'left', 
                  width: '32%' 
                }}
              >
                {source.description}
              </TableCell>
              {/* Dataset Count Cell */}
              <TableCell 
                sx={{ 
                  color: palette.text, 
                  fontWeight: 600, 
                  fontSize: '1.02rem', 
                  padding: '16px 28px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'center', 
                  width: '18%' 
                }}
              >
                {source.datasetCount}
              </TableCell>
              {/* Actions Cell - Edit and Delete buttons */}
              <TableCell 
                sx={{ 
                  padding: '16px 24px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'center', 
                  width: '18%' 
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                  {/* Edit Button */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5, 
                      cursor: 'pointer', 
                      '&:hover': { opacity: 0.8 } 
                    }}
                    onClick={() => onEdit(source)}
                  >
                    <EditIcon fontSize="small" sx={{ color: palette.accent }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: palette.accent, 
                        fontWeight: 600, 
                        fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                        fontSize: '0.95rem' 
                      }}
                    >
                      Edit
                    </Typography>
                  </Box>
                  {/* Delete Button */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5, 
                      cursor: 'pointer', 
                      '&:hover': { opacity: 0.8 } 
                    }}
                    onClick={() => onDelete(source)}
                  >
                    <DeleteIcon fontSize="small" sx={{ color: palette.error }} />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: palette.error, 
                        fontWeight: 600, 
                        fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                        fontSize: '0.95rem' 
                      }}
                    >
                      Delete
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SourcesTable;
