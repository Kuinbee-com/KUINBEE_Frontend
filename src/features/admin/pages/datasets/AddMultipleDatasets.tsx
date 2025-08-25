
import React, { useState, useRef, useEffect } from 'react';
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
    uploadedDatasets,
    isUploading,
    isLoadingValidation,
    showUploadedView,
    categoriesData,
    sourcesData,
    addDatasets, 
    uploadAllDatasets, 
    clearAll,
    uploadFileForDataset,
    loadValidationData
  } = useBulkDatasetUpload();
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUploadedFileName, setLastUploadedFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null);
  const [fileUploadSuccess, setFileUploadSuccess] = useState<string | null>(null);

  // Load validation data on component mount
  useEffect(() => {
    loadValidationData();
  }, []);

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
      setUploadSuccess(`Successfully uploaded metadata for ${datasets.length} dataset(s). Ready for file upload.`);
    } catch (error) {
      setError('Failed to upload datasets. Please try again.');
    }
  };

  const handleClearAll = () => {
    clearAll();
    setError(null);
    setUploadSuccess(null);
    setLastUploadedFileName(null);
    setSelectedFiles({});
    setFileUploadError(null);
    setFileUploadSuccess(null);
  };

  const handleFileSelect = (datasetId: string, file: File | null) => {
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [datasetId]: file }));
    } else {
      setSelectedFiles(prev => {
        const updated = { ...prev };
        delete updated[datasetId];
        return updated;
      });
    }
  };

  const handleFileUpload = async (dataset: any) => {
    const file = selectedFiles[dataset.id];
    if (!file) {
      setFileUploadError('Please select a file to upload');
      return;
    }

    try {
      setFileUploadError(null);
      setFileUploadSuccess(null);
      
      await uploadFileForDataset(dataset.id, file);
      
      setFileUploadSuccess(`File uploaded successfully for: ${dataset.title}`);
      
      // Clear selected file
      setSelectedFiles(prev => {
        const updated = { ...prev };
        delete updated[dataset.id];
        return updated;
      });
    } catch (err) {
      setFileUploadError(`Failed to upload file for: ${dataset.title}`);
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'pending':
        return <Chip label="Pending Metadata Upload" size="small" sx={{ backgroundColor: '#fef3c7', color: '#92400e' }} />;
      case 'uploading':
        return <Chip label="Uploading File..." size="small" sx={{ backgroundColor: '#dbeafe', color: '#1e40af' }} />;
      case 'ready':
        return <Chip label="Ready for File Upload" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46' }} />;
      case 'uploaded':
        return <Chip label="Complete" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46' }} />;
      case 'error':
        return <Chip label="Error" size="small" sx={{ backgroundColor: '#fee2e2', color: '#991b1b' }} />;
      default:
        return <Chip label="Unknown" size="small" />;
    }
  };

  const pendingCount = datasets.filter(d => d.status === 'pending').length;
  const errorCount = datasets.filter(d => d.status === 'error').length;
  const uploadingCount = datasets.filter(d => d.status === 'uploading').length;
  const invalidCount = datasets.filter(d => d.status === 'invalid').length;

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

        {/* Show uploaded datasets view after successful bulk upload */}
        {showUploadedView ? (
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ color: palette.accent }}>
                  Uploaded Datasets ({uploadedDatasets.length}) - Ready for File Upload
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={handleClearAll}
                  sx={{
                    borderColor: palette.error,
                    color: palette.error,
                    '&:hover': {
                      borderColor: palette.error,
                      backgroundColor: `${palette.error}10`,
                    }
                  }}
                >
                  Start Over
                </Button>
              </Box>

              {fileUploadError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {fileUploadError}
                </Alert>
              )}

              {fileUploadSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {fileUploadSuccess}
                </Alert>
              )}

              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Dataset ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Format</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>File</TableCell>
                      <TableCell sx={{ fontWeight: 600, backgroundColor: palette.bg }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadedDatasets.map((dataset) => (
                      <TableRow key={dataset.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2">{dataset.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: palette.muted }}>
                            {dataset.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={dataset.dataFormat.toUpperCase()} 
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="file"
                            accept={dataset.dataFormat === 'csv' ? '.csv' : '.xlsx,.xls,.json,.txt'}
                            onChange={(e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                              handleFileSelect(dataset.id, file || null);
                            }}
                            style={{ fontSize: '0.875rem', width: '200px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            startIcon={dataset.status === 'uploading' ? <CircularProgress size={16} color="inherit" /> : <CloudUploadIcon />}
                            onClick={() => handleFileUpload(dataset)}
                            disabled={!selectedFiles[dataset.id] || dataset.status === 'uploading' || dataset.status === 'uploaded'}
                            size="small"
                            sx={{
                              backgroundColor: dataset.status === 'uploaded' ? palette.success : palette.accent,
                              '&:hover': {
                                backgroundColor: dataset.status === 'uploaded' ? palette.success : palette.buttonBg,
                              }
                            }}
                          >
                            {dataset.status === 'uploaded' ? 'Uploaded' : dataset.status === 'uploading' ? 'Uploading...' : 'Upload'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* CSV Upload Section */}
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

                {/* Show valid categories and sources when available */}
                {categoriesData.length > 0 && sourcesData.length > 0 && (
                  <Box sx={{ mb: 3, p: 2, backgroundColor: '#f0f9ff', borderRadius: 1, border: '1px solid #e0f2fe' }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: palette.accent }}>
                      Valid IDs for your CSV:
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1, color: palette.text }}>
                      <strong>Categories:</strong> {categoriesData.slice(0, 3).map(c => `${c.name} (${c.id})`).join(', ')}
                      {categoriesData.length > 3 && ` ... and ${categoriesData.length - 3} more`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.text }}>
                      <strong>Sources:</strong> {sourcesData.slice(0, 3).map(s => `${s.name} (${s.id})`).join(', ')}
                      {sourcesData.length > 3 && ` ... and ${sourcesData.length - 3} more`}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={isLoading || isLoadingValidation ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || isLoadingValidation}
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
                    {isLoadingValidation ? 'Loading validation data...' : isLoading ? 'Processing...' : 'Choose CSV File'}
                  </Button>

                  {datasets.length > 0 && (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        onClick={handleUploadAll}
                        disabled={isUploading || pendingCount === 0 || invalidCount > 0}
                        sx={{
                          borderColor: invalidCount > 0 ? palette.error : palette.success,
                          color: invalidCount > 0 ? palette.error : palette.success,
                          '&:hover': {
                            borderColor: invalidCount > 0 ? palette.error : palette.success,
                            backgroundColor: invalidCount > 0 ? `${palette.error}10` : `${palette.success}10`,
                          }
                        }}
                      >
                        {invalidCount > 0 ? `Fix ${invalidCount} invalid datasets` : `Upload ${pendingCount} Valid Datasets`}
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
                      Status: {pendingCount} pending metadata upload, {uploadingCount} uploading, {errorCount} errors, {invalidCount} invalid (need fixing)
                    </Typography>
                  </Box>
                )}

                {/* Show validation errors */}
                {invalidCount > 0 && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                      Found {invalidCount} datasets with validation errors:
                    </Typography>
                    {datasets
                      .filter(d => d.status === 'invalid')
                      .map((dataset, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            "{dataset.apiData.title}":
                          </Typography>
                          <ul style={{ marginTop: 4, marginBottom: 0, paddingLeft: 20 }}>
                            {dataset.validationErrors?.map((error, errorIndex) => (
                              <li key={errorIndex}>
                                <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                                  {error}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      ))
                    }
                    <Typography variant="body2" sx={{ mt: 2, fontWeight: 500 }}>
                      Please correct the category and source IDs in your CSV and re-upload.
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Parsed Datasets Summary - Just show count and upload button */}
            {datasets.length > 0 && (
              <Card sx={{ boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: palette.accent }}>
                    Ready to Upload: {datasets.length} datasets parsed from CSV
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: palette.muted }}>
                      Click "Upload All Metadata" to create datasets in the database, then you can upload files individually.
                    </Typography>
                  </Box>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default AddMultipleDatasets;