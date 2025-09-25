import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Upload as UploadIcon } from '@mui/icons-material';
import { DatasetService } from '../../services/datasets/datasetService';
import type { CreateDatasetRequest } from '../../types';
import { datasetSuperTypeOptions } from '../../types';

interface Category {
  id: string;
  name: string;
}

interface Source {
  id: string;
  name: string;
}

const CreateDatasetPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Form state matching backend IDatasetBaseInput
  const [formData, setFormData] = useState({
    title: '',
    primaryCategoryId: '',
    sourceId: '',
    price: 0,
    isPaid: false,
    license: '',
    superTypes: '',
    datasetUniqueId: '',
    aboutDatasetInfo: {
      overview: '',
      description: '',
      dataQuality: '',
      dataFormatInfo: {
        rows: 1,
        cols: 1,
        fileFormat: 'csv',
      },
      features: [] as Array<{ content: string; }>,
    },
    locationInfo: {
      region: '',
      country: '',
      state: '',
      city: '',
    },
    securityInfo: {
      currentEncryptionSecret: '',
      masterSecret: '',
    },
    categories: [] as Array<{ id: string; }>,
  });

  const [featuresInput, setFeaturesInput] = useState('');

  // Load categories and sources
  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        const [categoriesData, sourcesData] = await Promise.all([
          DatasetService.getAllCategories(),
          DatasetService.getAllSources(),
        ]);
        setCategories(categoriesData);
        setSources(sourcesData);
      } catch (err) {
        setError('Failed to load form options');
        console.error('Error loading options:', err);
      } finally {
        setLoading(false);
      }
    };
    loadOptions();
  }, []);

  const handleInputChange = (field: string, value: any) => {
    // Always store file format in lowercase
    if (field === 'aboutDatasetInfo.dataFormatInfo.fileFormat' && typeof value === 'string') {
      value = value.toLowerCase();
    }
    
    if (field.includes('.')) {
      const fieldParts = field.split('.');
      
      if (fieldParts.length === 2) {
        // Handle two-level nesting like "section.subField"
        const [section, subField] = fieldParts;
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...(prev as any)[section],
            [subField]: value,
          },
        }));
      } else if (fieldParts.length === 3) {
        // Handle three-level nesting like "aboutDatasetInfo.dataFormatInfo.fileFormat"
        const [section, subSection, subField] = fieldParts;
        setFormData(prev => ({
          ...prev,
          [section]: {
            ...(prev as any)[section],
            [subSection]: {
              ...(prev as any)[section][subSection],
              [subField]: value,
            },
          },
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Auto-detect file format and ensure it's lowercase
      const extension = file.name.split('.').pop()?.toLowerCase();
      const allowedFormats = ['csv', 'xls', 'xlsx', 'xml'];
      
      if (extension && allowedFormats.includes(extension)) {
        handleInputChange('aboutDatasetInfo.dataFormatInfo.fileFormat', extension);
      } else {
        // Default to csv if format is not recognized or not allowed
        handleInputChange('aboutDatasetInfo.dataFormatInfo.fileFormat', 'csv');
        // Show a warning to the user
        setError(`File format "${extension}" is not supported. Defaulting to CSV format. Please select a file with one of these formats: ${allowedFormats.join(', ')}`);
      }
    }
  };

  const handleFeaturesChange = (value: string) => {
    setFeaturesInput(value);
    // Convert comma-separated features to array
    const featuresArray = value
      .split(',')
      .map(feature => ({ content: feature.trim() }))
      .filter(feature => feature.content);
    
    setFormData(prev => ({
      ...prev,
      aboutDatasetInfo: {
        ...prev.aboutDatasetInfo,
        features: featuresArray,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!formData.primaryCategoryId) {
      setError('Primary Category is required');
      return;
    }
    
    if (!formData.sourceId) {
      setError('Source is required');
      return;
    }
    
    if (!formData.license.trim()) {
      setError('License is required');
      return;
    }

    // Validate file format is one of the allowed formats
    const allowedFormats = ['csv', 'xls', 'xlsx', 'xml'];
    if (!allowedFormats.includes(formData.aboutDatasetInfo.dataFormatInfo.fileFormat)) {
      setError('Please select a valid file format (csv, xls, xlsx, or xml)');
      return;
    }

    // Validate rows and columns are greater than 0
    const rows = Number(formData.aboutDatasetInfo.dataFormatInfo.rows);
    const cols = Number(formData.aboutDatasetInfo.dataFormatInfo.cols);
    
    if (!rows || rows <= 0 || !Number.isInteger(rows)) {
      setError('Number of rows must be a valid integer greater than 0');
      return;
    }

    if (!cols || cols <= 0 || !Number.isInteger(cols)) {
      setError('Number of columns must be a valid integer greater than 0');
      return;
    }

    // Ensure categories array is not empty as it's required by backend
    if (!formData.categories || formData.categories.length === 0) {
      // Auto-add primary category to categories array if empty
      setFormData(prev => ({
        ...prev,
        categories: [{ id: formData.primaryCategoryId }]
      }));
    }
    
    try {
      setLoading(true);
      setError(null);

      // Create dataset first - this returns a presigned S3 upload URL
      const result = await DatasetService.createDataset(formData as CreateDatasetRequest);
      console.log('Dataset creation result:', result);
      
      // If file is selected, upload it to S3 using the presigned URL
      if (selectedFile && result.uploadUrl) {
        console.log('Starting file upload to S3...');
        try {
          await DatasetService.uploadFileToS3(result.uploadUrl, selectedFile);
          console.log('File uploaded successfully to S3');
        } catch (uploadError) {
          console.error('File upload failed:', uploadError);
          setError('Dataset created but file upload failed. You can upload the file later.');
          // Don't return here - still show success for dataset creation
        }
      } else if (selectedFile && !result.uploadUrl) {
        console.warn('File selected but no upload URL received from backend');
        setError('Dataset created but upload URL not received. You can upload the file later.');
      } else if (!selectedFile) {
        console.log('No file selected for upload');
      }

      navigate('/admin/datasets', {
        state: { 
          message: `Dataset "${formData.title}" has been created successfully.${
            selectedFile && result.uploadUrl ? ' File uploaded successfully.' : ''
          }` 
        }
      });
      
    } catch (err) {
      console.error('Error creating dataset:', err);
      setError(err instanceof Error ? err.message : 'Failed to create dataset');
    } finally {
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress size={48} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading form options...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', mt: 6, p: 3 }}>
      {/* Header */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/admin/datasets')}
        sx={{ mb: 3 }}
      >
        Back to Datasets
      </Button>
      
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
        Create New Dataset
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {/* Basic Information */}
          <Box>
            <Card>
              <CardHeader title="Basic Information" />
              <CardContent>
                <TextField
                  label="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Primary Category</InputLabel>
                  <Select
                    value={formData.primaryCategoryId}
                    onChange={(e) => handleInputChange('primaryCategoryId', e.target.value)}
                    required
                    label="Primary Category"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Source</InputLabel>
                  <Select
                    value={formData.sourceId}
                    onChange={(e) => handleInputChange('sourceId', e.target.value)}
                    required
                    label="Source"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {sources.map((source) => (
                      <MenuItem key={source.id} value={source.id}>
                        {source.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography sx={{ mr: 2 }}>Paid Dataset:</Typography>
                  <Switch
                    checked={formData.isPaid}
                    onChange={(e) => handleInputChange('isPaid', e.target.checked)}
                  />
                </Box>

                {formData.isPaid && (
                  <TextField
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                )}

                <TextField
                  label="License"
                  value={formData.license}
                  onChange={(e) => handleInputChange('license', e.target.value)}
                  fullWidth
                  required
                  sx={{ mb: 3 }}
                />

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Supertype</InputLabel>
                  <Select
                    value={formData.superTypes}
                    onChange={(e) => handleInputChange('superTypes', e.target.value)}
                    label="Supertype"
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          overflowY: 'auto',
                        },
                      },
                    }}
                  >
                    {datasetSuperTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Box>

          {/* Location Information */}
          <Box>
            <Card>
              <CardHeader title="Location Information" />
              <CardContent>
                <TextField
                  label="Region"
                  value={formData.locationInfo.region}
                  onChange={(e) => handleInputChange('locationInfo.region', e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Country"
                  value={formData.locationInfo.country}
                  onChange={(e) => handleInputChange('locationInfo.country', e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="State"
                  value={formData.locationInfo.state}
                  onChange={(e) => handleInputChange('locationInfo.state', e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="City"
                  value={formData.locationInfo.city}
                  onChange={(e) => handleInputChange('locationInfo.city', e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Full width sections */}
        <Box sx={{ mt: 4 }}>
          {/* About Dataset */}
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardHeader title="About Dataset" />
              <CardContent>
                <TextField
                  label="Overview"
                  value={formData.aboutDatasetInfo.overview}
                  onChange={(e) => handleInputChange('aboutDatasetInfo.overview', e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Description"
                  value={formData.aboutDatasetInfo.description}
                  onChange={(e) => handleInputChange('aboutDatasetInfo.description', e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Data Quality"
                  value={formData.aboutDatasetInfo.dataQuality}
                  onChange={(e) => handleInputChange('aboutDatasetInfo.dataQuality', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Features"
                  value={featuresInput}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  sx={{ mb: 3 }}
                  helperText="Enter features separated by commas"
                />
              </CardContent>
            </Card>
          </Box>

          {/* Data Format and File Upload */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
            gap: 4, 
            mt: 4,
            position: 'relative',
            zIndex: 1 
          }}>
            {/* Data Format */}
            <Box>
              <Card sx={{ position: 'relative', overflow: 'visible' }}>
                <CardHeader title="Data Format" />
                <CardContent>
                  <TextField
                    label="Number of Rows"
                    type="number"
                    value={formData.aboutDatasetInfo.dataFormatInfo.rows}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty string during typing, or valid numbers
                      if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                        handleInputChange('aboutDatasetInfo.dataFormatInfo.rows', value === '' ? '' : Number(value));
                      }
                    }}
                    onBlur={(e) => {
                      // Ensure minimum value of 1 when user finishes typing
                      const value = e.target.value;
                      if (value === '' || Number(value) < 1) {
                        handleInputChange('aboutDatasetInfo.dataFormatInfo.rows', 1);
                      }
                    }}
                    inputProps={{ min: 1 }}
                    fullWidth
                    sx={{ mb: 3 }}
                    helperText="Enter the total number of rows in your dataset"
                  />

                  <TextField
                    label="Number of Columns"
                    type="number"
                    value={formData.aboutDatasetInfo.dataFormatInfo.cols}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow empty string during typing, or valid numbers
                      if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                        handleInputChange('aboutDatasetInfo.dataFormatInfo.cols', value === '' ? '' : Number(value));
                      }
                    }}
                    onBlur={(e) => {
                      // Ensure minimum value of 1 when user finishes typing
                      const value = e.target.value;
                      if (value === '' || Number(value) < 1) {
                        handleInputChange('aboutDatasetInfo.dataFormatInfo.cols', 1);
                      }
                    }}
                    inputProps={{ min: 1 }}
                    fullWidth
                    sx={{ mb: 3 }}
                    helperText="Enter the total number of columns in your dataset"
                  />

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      File Format *
                    </Typography>
                    <select
                      value={formData.aboutDatasetInfo.dataFormatInfo.fileFormat || 'csv'}
                      onChange={(e) => {
                        const selectedFormat = e.target.value.toLowerCase();
                        handleInputChange('aboutDatasetInfo.dataFormatInfo.fileFormat', selectedFormat);
                      }}
                      required
                      data-testid="file-format-dropdown"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: '1px solid #c4c4c4',
                        borderRadius: '4px',
                        fontSize: '16px',
                        backgroundColor: 'white',
                        outline: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#1976d2';
                        e.target.style.boxShadow = '0 0 0 2px rgba(25, 118, 210, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#c4c4c4';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="csv">csv</option>
                      <option value="xls">xls</option>
                      <option value="xlsx">xlsx</option>
                      <option value="xml">xml</option>
                    </select>
                  </Box>
                </CardContent>
              </Card>
            </Box>

          {/* File Upload */}
          <Box>
            <Card>
              <CardHeader title="File Upload" />
              <CardContent>
                <input
                  type="file"
                  id="file-upload"
                  accept=".csv,.xls,.xlsx,.xml"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Select Dataset File
                  </Button>
                </label>
                
                {selectedFile && (
                  <Typography variant="body2" color="textSecondary">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
          </Box>

          {/* Security Settings */}
          <Box sx={{ mt: 4 }}>
            <Card>
              <CardHeader title="Security Settings" />
              <CardContent>
                <TextField
                  label="Current Encryption Secret"
                  value={formData.securityInfo.currentEncryptionSecret}
                  onChange={(e) => handleInputChange('securityInfo.currentEncryptionSecret', e.target.value)}
                  fullWidth
                  type="password"
                  sx={{ mb: 3 }}
                  helperText="Optional: Encryption key for sensitive data"
                />

                <TextField
                  label="Master Secret"
                  value={formData.securityInfo.masterSecret}
                  onChange={(e) => handleInputChange('securityInfo.masterSecret', e.target.value)}
                  fullWidth
                  type="password"
                  sx={{ mb: 3 }}
                  helperText="Optional: Master encryption key"
                />
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : undefined}
            sx={{ px: 6, py: 2 }}
          >
            {loading ? 'Creating Dataset...' : 'Create Dataset'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateDatasetPage;
