import React, { useState, useEffect } from 'react';
// Modern font import for global use
import '@fontsource/inter/index.css';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { useCategoryManagement } from '../../hooks/useCategoryManagement';

// Category interface matching the Prisma schema

import { CategoryService } from '../../services/category/categoryService';

const palette = {
  bg: '#f9fafc',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  buttonText: '#ffffff',
  buttonBg: '#111827',
  error: '#ef4444',
  success: '#10b981',
};

const CreateCategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Form state
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Load category data in edit mode
  // Use local category data for edit mode
  const { categories, loading: categoriesLoading } = useCategoryManagement();
  useEffect(() => {
    if (isEditMode && id && !categoriesLoading) {
      setLoading(true);
      setError(null);
      const category = categories.find(cat => cat.id === id);
      if (category) {
        setName(category.name);
      } else {
        setError('Category not found');
      }
      setLoading(false);
    }
  }, [isEditMode, id, categories, categoriesLoading]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const categoryData = {
        categoryName: name.trim(),
      };
      
      if (isEditMode) {
        // Update existing category
        console.log('Updating category:', { id, ...categoryData });
        await CategoryService.updateCategory(id!, categoryData);
        
        // Navigate back to categories list
        navigate('/admin/categories', {
          state: { message: `Category "${name}" has been updated successfully.` }
        });
      } else {
        // Create new category
        console.log('Creating category:', categoryData);
        console.log('CategoryData type:', typeof categoryData);
        console.log('CategoryData JSON:', JSON.stringify(categoryData));
        await CategoryService.createCategory(categoryData);
        
        // Navigate back to categories list
        navigate('/admin/categories', {
          state: { message: `Category "${name}" has been created successfully.` }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${isEditMode ? 'update' : 'create'} category`);
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading state while fetching data in edit mode
  if (isEditMode && loading) {
    return (
      <Box sx={{ 
        background: palette.bg, 
        minHeight: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
  fontFamily: 'Inter, Roboto, Arial, sans-serif'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={48} sx={{ color: palette.accent, mb: 2 }} />
          <Typography variant="h6" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            Loading category...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
  <Box sx={{ background: palette.bg, minHeight: '100vh', py: 4, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 2 }}>
        {/* Back Arrow */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/categories')}
          sx={{ 
            color: palette.muted, 
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            mb: 3,
            fontSize: '0.95rem',
            textTransform: 'none',
            '&:hover': { 
              color: palette.accent,
              backgroundColor: 'transparent'
            }
          }}
        >
          Back to Categories
        </Button>

        {/* Page Header */}
        <Typography 
          variant="h4" 
          fontWeight={600} 
          sx={{ 
            color: palette.accent, 
            mb: 4, 
            letterSpacing: 1,
            fontFamily: 'Inter, Roboto, Arial, sans-serif'
          }}
        >
          {isEditMode ? 'Edit Category' : 'Create New Category'}
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            background: palette.card, 
            borderRadius: 3, 
            border: `1px solid ${palette.border}`,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                color: palette.text, 
                fontWeight: 600,
                fontFamily: 'Inter, Roboto, Arial, sans-serif'
              }}
            >
              Category Information
            </Typography>
            
            <Divider sx={{ mb: 4, background: palette.border }} />

            <TextField
              label="Category Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name (e.g., Finance, Healthcare, Technology)"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  background: palette.card,
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                },
                '& .MuiOutlinedInput-input': {
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                },
              }}
              helperText="Choose a clear, descriptive name for the category. This will be used to organize datasets."
            />

            {/* Form Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/categories')}
                disabled={submitting}
                sx={{
                  borderColor: palette.border,
                  color: palette.muted,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1.2,
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  '&:hover': {
                    background: palette.bg,
                    borderColor: palette.accent,
                    color: palette.accent,
                  },
                }}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                disabled={submitting || !name.trim()}
                startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{
                  background: palette.buttonBg,
                  color: palette.buttonText,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4,
                  py: 1.2,
                  fontSize: '1rem',
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  boxShadow: 2,
                  '&:hover': {
                    background: palette.accent,
                    opacity: 0.9,
                    boxShadow: 3,
                  },
                  '&:disabled': {
                    background: palette.muted,
                    color: palette.buttonText,
                  },
                }}
              >
                {submitting 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update Category' : 'Create Category')
                }
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Additional Info */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 3, 
            mt: 3,
            background: `${palette.accent}05`, 
            borderRadius: 3, 
            border: `1px solid ${palette.border}`,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: palette.muted, 
              fontFamily: 'Inter, Roboto, Arial, sans-serif',
              lineHeight: 1.6
            }}
          >
            <strong>Note:</strong> Categories are used to organize and classify datasets. Once created, 
            categories can be assigned to datasets to help users find relevant data more easily. 
            Choose category names that are clear and meaningful to your users.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateCategoryPage;
