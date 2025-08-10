import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Upload as UploadIcon, 
  CloudUpload as CloudUploadIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useBulkDatasetUpload } from '../../hooks/useBulkDatasetUpload';

const palette = {
  bg: '#f9fafb',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  buttonText: '#ffffff',
  buttonBg: '#111827',
  buttonBorder: '#d1d5db',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b'
};

const AddMultipleDatasets: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    datasets, 
    isUploading, 
    addDatasets, 
    uploadAllDatasets, 
    uploadSingleItem, 
    removeDataset,
    clearAll 
  } = useBulkDatasetUpload();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUploadedFileName, setLastUploadedFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Prevent uploading the same file twice
    if (lastUploadedFileName && file.name === lastUploadedFileName) {
      setError('You cannot upload the same file twice. Please select a different file.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadSuccess(null);

    try {
      const parsed = await import('../../services/datasets/csvDatasetParser').then(m => m.parseCsvToApiDatasets(file));
      console.log('Parsed datasets for API:', parsed);
      
      addDatasets(parsed);
      setLastUploadedFileName(file.name);

      if (parsed.length === 0) {
        setError('No valid datasets found in the CSV file.');
      }
    } catch (err) {
      console.error('CSV parsing error:', err);
      setError('Error parsing CSV file. Please check the format and try again.');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUploadAll = async () => {
    setError(null);
    setUploadSuccess(null);
    
    try {
      await uploadAllDatasets();
      const uploadedCount = datasets.filter(d => d.status === 'uploaded').length;
      setUploadSuccess(`Successfully uploaded ${uploadedCount} dataset(s)`);
    } catch (error) {
      setError('Failed to upload datasets. Please try again.');
    }
  };

  const handleUploadSingle = async (index: number) => {
    setError(null);
    try {
      await uploadSingleItem(index);
    } catch (error) {
      setError(`Failed to upload dataset at index ${index}`);
    }
  };

  const handleRemoveDataset = (index: number) => {
    removeDataset(index);
  };

  const handleClearAll = () => {
    clearAll();
    setError(null);
    setUploadSuccess(null);
    setLastUploadedFileName(null);
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip label="Pending Upload" size="small" sx={{ backgroundColor: '#fef3c7', color: '#92400e' }} />;
      case 'uploading':
        return <Chip label="Uploading..." size="small" sx={{ backgroundColor: '#dbeafe', color: '#1e40af' }} />;
      case 'uploaded':
        return <Chip label="Uploaded" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46' }} />;
      case 'error':
        return <Chip label="Error" size="small" sx={{ backgroundColor: '#fee2e2', color: '#991b1b' }} />;
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  const pendingCount = datasets.filter(d => d.status === 'pending').length;
  const uploadedCount = datasets.filter(d => d.status === 'uploaded').length;
  const errorCount = datasets.filter(d => d.status === 'error').length;

  return (
    <Box sx={{ 
      background: palette.bg, 
      minHeight: '100vh', 
      px: 0, 
      py: 0, 
      fontFamily: 'Inter, Roboto, Arial, sans-serif' 
    }}>
      <Box sx={{ maxWidth: 1900, mx: 'auto', py: 0, width: '100%', px: 2 }}>
        
        {/* Header */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/datasets')}
          sx={{ 
            color: palette.muted, 
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            mt: 3,
            mb: 2,
            fontSize: '0.95rem',
            textTransform: 'none',
            '&:hover': { 
              color: palette.accent,
              backgroundColor: 'transparent'
            }
          }}
        >
          Back to Datasets
        </Button>

        <Typography 
          variant="h4" 
          fontWeight={600} 
          sx={{ 
            color: palette.accent, 
            letterSpacing: 1, 
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            mb: 3
          }}
        >
          Add Multiple Datasets
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Upload Section */}
        <Card sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: palette.accent }}>
              Upload CSV File
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: palette.muted }}>
              Upload a CSV file containing dataset metadata. Each row should represent one dataset.
              <br />
              <a 
                href="/sample-datasets.csv" 
                download 
                style={{ 
                  color: palette.accent, 
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Download sample CSV template
              </a>
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                sx={{
                  background: palette.buttonBg,
                  color: palette.buttonText,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    background: palette.accent,
                  },
                  '&:disabled': {
                    background: palette.muted,
                    color: palette.buttonText,
                  }
                }}
              >
                {isLoading ? 'Processing...' : 'Choose CSV File'}
              </Button>

              {datasets.length > 0 && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    onClick={handleUploadAll}
                    disabled={isUploading || pendingCount === 0}
                    sx={{
                      borderColor: palette.success,
                      color: palette.success,
                      '&:hover': {
                        borderColor: palette.success,
                        backgroundColor: `${palette.success}10`,
                      }
                    }}
                  >
                    Upload All ({pendingCount})
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleClearAll}
                    disabled={isUploading}
                    sx={{
                      borderColor: palette.error,
                      color: palette.error,
                      '&:hover': {
                        borderColor: palette.error,
                        backgroundColor: `${palette.error}10`,
                      }
                    }}
                  >
                    Clear All
                  </Button>
                </>
              )}
            </Box>

            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            {uploadSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {uploadSuccess}
              </Alert>
            )}

            {datasets.length > 0 && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: palette.bg, borderRadius: 1 }}>
                <Typography variant="body2" sx={{ color: palette.text }}>
                  Status: {uploadedCount} uploaded, {pendingCount} pending, {errorCount} errors
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Datasets List */}
        {datasets.length > 0 && (
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: palette.accent }}>
                Parsed Datasets ({datasets.length})
              </Typography>
              
              <TableContainer component={Paper} sx={{ mt: 2, maxHeight: 600 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Source</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Records</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Format</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datasets.map((dataset, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {dataset.apiData.title || 'Untitled'}
                          </Typography>
                          {dataset.apiData?.aboutDatasetInfo?.description && (
                            <Typography variant="caption" color="textSecondary">
                              {dataset.apiData.aboutDatasetInfo.description.substring(0, 100)}
                              {dataset.apiData.aboutDatasetInfo.description.length > 100 && '...'}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {dataset.apiData.superTypes || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {dataset.apiData.sourceId || 'N/A'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            ${dataset.apiData.price?.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {dataset.apiData.aboutDatasetInfo?.dataFormatInfo?.rows?.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {dataset.apiData.aboutDatasetInfo?.dataFormatInfo?.fileFormat}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {getStatusChip(dataset.status)}
                          {dataset.error && (
                            <Typography variant="caption" sx={{ display: 'block', color: palette.error, mt: 0.5 }}>
                              {dataset.error}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            {dataset.status === 'pending' && (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<UploadIcon />}
                                onClick={() => handleUploadSingle(index)}
                                disabled={isUploading}
                                sx={{
                                  textTransform: 'none',
                                  border: `1px solid ${palette.buttonBg}`,
                                  color: palette.buttonBg,
                                  borderRadius: 1,
                                  minWidth: 'auto',
                                  px: 1.5,
                                  '&:hover': {
                                    backgroundColor: palette.buttonBg,
                                    color: palette.buttonText,
                                  }
                                }}
                              >
                                Upload
                              </Button>
                            )}
                            {dataset.status === 'uploading' && (
                              <CircularProgress size={20} />
                            )}
                            {dataset.status === 'uploaded' && (
                              <CheckCircleIcon sx={{ color: palette.success }} />
                            )}
                            {dataset.status === 'error' && (
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<UploadIcon />}
                                onClick={() => handleUploadSingle(index)}
                                disabled={isUploading}
                                sx={{
                                  textTransform: 'none',
                                  border: `1px solid ${palette.error}`,
                                  color: palette.error,
                                  borderRadius: 1,
                                  minWidth: 'auto',
                                  px: 1.5,
                                  '&:hover': {
                                    backgroundColor: palette.error,
                                    color: palette.buttonText,
                                  }
                                }}
                              >
                                Retry
                              </Button>
                            )}
                            <Button
                              variant="text"
                              size="small"
                              onClick={() => handleRemoveDataset(index)}
                              disabled={isUploading}
                              sx={{ 
                                minWidth: 'auto', 
                                p: 0.5, 
                                color: palette.muted,
                                '&:hover': { color: palette.error }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {datasets.length === 0 && !isLoading && (
          <Card sx={{ textAlign: 'center', py: 6, boxShadow: 1 }}>
            <CardContent>
              <CloudUploadIcon sx={{ fontSize: 60, color: palette.muted, mb: 2 }} />
              <Typography variant="h6" sx={{ color: palette.muted, mb: 1 }}>
                No datasets uploaded yet
              </Typography>
              <Typography variant="body2" sx={{ color: palette.muted }}>
                Upload a CSV file to get started with bulk dataset creation
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default AddMultipleDatasets;