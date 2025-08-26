import * as React from 'react'; 
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

/**
 * Form data structure for source creation/editing
 */
interface SourceFormData {
  name: string;
}

// Consistent color palette matching CategoryPage
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

/**
 * CreateSourcePage Component
 * 
 * This page handles both creating new sources and editing existing ones.
 * 
 * What this page does:
 * - Shows a form to create/edit source information
 * - Validates user input before submission
 * - Provides clear feedback on success/error
 * - Navigates back to source management after success
 * 
 * Features:
 * - Auto-detects edit vs create mode from URL parameters
 * - Form validation with error messages
 * - Loading states during API calls
 * - Success and error notifications
 * - Consistent styling with other admin pages
 * 
 * Usage:
 * - For creating: /admin/sources/create
 * - For editing: /admin/sources/edit/:id
 * 
 * The form includes:
 * 1. Source name (required)
 * 2. Source description (required)
 * 
 * This follows the same clean pattern as CreateCategoryPage
 * with proper validation and user feedback.
 */
const CreateSourcePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get source ID from URL (for editing)
  const isEditMode = Boolean(id); // Determine if we're editing or creating

  // Form data state
  const [formData, setFormData] = useState<SourceFormData>({
    name: '',
  });

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
  }>({});

  /**
   * Load source data for editing when component mounts
   */
  useEffect(() => {
    if (isEditMode && id) {
      loadSourceForEditing(id);
    }
  }, [isEditMode, id]);

  /**
   * Load existing source data for editing
   * @param sourceId - ID of the source to load
   */
  const loadSourceForEditing = async (sourceId: string) => {
    setLoading(true);
    try {
      let found = null;
      const cached = localStorage.getItem('sources');
      if (cached) {
        const arr = JSON.parse(cached);
        found = arr.find((s: any) => s.id === sourceId);
      }
      if (!found) {
        // Fallback to API
        const apiSources = await import('../../services/sources/sourceService').then(m => m.SourceService.getAllSources());
        found = apiSources.find((s: any) => s.id === sourceId);
        // Update cache if found
        if (apiSources && apiSources.length) {
          localStorage.setItem('sources', JSON.stringify(apiSources));
        }
      }
      if (!found) {
        setError('Source not found. It may have been deleted or does not exist.');
        return;
      }
      setFormData({ name: found.name });
    } catch (error) {
      console.error('Error loading source:', error);
      setError('Failed to load source data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle input field changes
   * @param field - The field name that changed
   * @param value - The new value
   */
  const handleInputChange = (field: keyof SourceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Validate form data before submission
   * @returns true if form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};
    if (!formData.name.trim()) {
      errors.name = 'Source name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Source name must be at least 2 characters';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    try {
      if (isEditMode) {
        // Update existing source with only name (as per backend contract)
        const result = await import('../../services/sources/sourceService').then(m => m.SourceService.updateSource(id!, { name: formData.name }));
        console.log('Source updated:', result);
      } else {
        // Create new source
        const result = await import('../../services/sources/sourceService').then(m => m.SourceService.createSource(formData.name));
        console.log('Source created:', result);
      }
      navigate('/admin/sources', { 
        state: { successMessage: `Source ${isEditMode ? 'updated' : 'created'} successfully!` } 
      });
    } catch (error) {
      console.error('Error saving source:', error);
      setError(isEditMode ? 'Failed to update source' : 'Failed to create source');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate back to source management
   */
  const handleBack = () => {
    navigate('/admin/sources');
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: palette.bg, minHeight: '100vh' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          onClick={handleBack}
          sx={{ mr: 2, color: palette.accent }}
          aria-label="Go back"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600, color: palette.accent }}>
          {isEditMode ? 'Edit Source' : 'Create New Source'}
        </Typography>
      </Box>

      {/* Main Form Card */}
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Loading State */}
          {loading && !formData.name && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          {(!loading || formData.name) && (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Source Name Field */}
                <TextField
                  label="Source Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={Boolean(fieldErrors.name)}
                  helperText={fieldErrors.name || 'Enter a clear, descriptive name for this source'}
                  fullWidth
                  required
                  variant="outlined"
                  disabled={loading}
                />


                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                  {/* Cancel Button */}
                  <Button
                    variant="outlined"
                    onClick={handleBack}
                    disabled={loading}
                    startIcon={<ArrowBackIcon />}
                  >
                    Cancel
                  </Button>

                  {/* Save Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{
                      backgroundColor: palette.buttonBg,
                      color: palette.buttonText,
                      '&:hover': {
                        backgroundColor: palette.accent,
                      },
                    }}
                  >
                    {loading 
                      ? (isEditMode ? 'Updating...' : 'Creating...') 
                      : (isEditMode ? 'Update Source' : 'Create Source')
                    }
                  </Button>
                </Box>
              </Stack>
            </form>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateSourcePage;
