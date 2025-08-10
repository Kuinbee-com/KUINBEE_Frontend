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
import { type Category } from '../hooks/useCategoryManagement';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const palette = {
  bg: '#f9fafc',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  error: '#ef4444',
};

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
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
        <TableHead>
          <TableRow>
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
                width: '30%' 
              }}
            >
              Name
            </TableCell>
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
                width: '25%' 
              }}
            >
              No. of Datasets
            </TableCell>
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
                width: '22%' 
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow 
              key={category.id} 
              hover 
              sx={{ 
                transition: 'background 0.2s', 
                '&:hover': { background: palette.bg }, 
                fontFamily: 'Inter, Roboto, Arial, sans-serif' 
              }}
            >
              <TableCell 
                sx={{ 
                  color: palette.text, 
                  fontWeight: 600, 
                  fontSize: '1.02rem', 
                  padding: '16px 28px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'left', 
                  width: '30%' 
                }}
              >
                {category.name}
              </TableCell>
              <TableCell 
                sx={{ 
                  color: palette.text, 
                  fontWeight: 600, 
                  fontSize: '1.02rem', 
                  padding: '16px 28px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'center', 
                  width: '25%' 
                }}
              >
                {category.datasetCount}
              </TableCell>
              <TableCell 
                sx={{ 
                  padding: '16px 24px', 
                  fontFamily: 'Inter, Roboto, Arial, sans-serif', 
                  textAlign: 'center', 
                  width: '22%' 
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5, 
                      cursor: 'pointer', 
                      '&:hover': { opacity: 0.8 } 
                    }}
                    onClick={() => onEdit(category)}
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
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.5, 
                      cursor: 'pointer', 
                      '&:hover': { opacity: 0.8 } 
                    }}
                    onClick={() => onDelete(category)}
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

export default CategoryTable;
