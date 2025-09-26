import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Input
} from '@mui/material';
import { CloudUpload, Refresh } from '@mui/icons-material';
import { DatasetService } from '../../../services/datasets/datasetService';

interface PendingDataset {
  id: string;
  title: string;
  isPaid: boolean;
  fileFormat: string;
}

export default function PendingUploadsPage() {
  const [datasets, setDatasets] = useState<PendingDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: File }>({});

  useEffect(() => {
    fetchPendingDatasets();
  }, []);

  const fetchPendingDatasets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.getNonUploadedDatasets();
      setDatasets(data as unknown as PendingDataset[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pending datasets');
    } finally {
      setLoading(false);
    }
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

  const handleUpload = async (dataset: PendingDataset) => {
    const file = selectedFiles[dataset.id];
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    try {
      setUploading(dataset.id);
      setError(null);

      // Get upload URL
      const uploadUrl = await DatasetService.getUploadUrlForDataset(
        dataset.id,
        dataset.fileFormat,
        dataset.isPaid
      );

      // Upload file to S3
      await DatasetService.uploadFileToS3(uploadUrl, file);

      // Refresh the list to remove uploaded dataset
      await fetchPendingDatasets();
      
      // Clear selected file
      setSelectedFiles(prev => {
        const updated = { ...prev };
        delete updated[dataset.id];
        return updated;
      });

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', px: 2, py: 0 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', px: 2, py: 0, overflowX: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={3} flexDirection={{ xs: 'column', sm: 'row' }} gap={{ xs: 2, sm: 0 }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
          Pending Uploads
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchPendingDatasets}
          disabled={loading}
          size="small"
          sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {datasets.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" color="text.secondary" align="center">
              No datasets pending upload
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              All datasets have been uploaded successfully!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: 'hidden', width: '100%' }}>
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: '25%', sm: '30%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' } }}>Title</TableCell>
                <TableCell sx={{ width: { xs: '15%', sm: '12%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' }, display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
                <TableCell sx={{ width: { xs: '20%', sm: '15%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' }, display: { xs: 'none', md: 'table-cell' } }}>File Format</TableCell>
                <TableCell sx={{ width: { xs: '35%', sm: '28%', md: '25%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' } }}>File</TableCell>
                <TableCell sx={{ width: { xs: '25%', sm: '15%', md: '18%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell sx={{ padding: { xs: '8px', md: '16px' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                      {dataset.title}
                    </Typography>
                    {/* Show type and format on mobile as subtitle */}
                    <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 0.5 }}>
                      <Chip 
                        label={dataset.isPaid ? 'Paid' : 'Free'} 
                        color={dataset.isPaid ? 'primary' : 'default'}
                        size="small"
                        sx={{ fontSize: '0.7rem', height: 20, mr: 1 }}
                      />
                      <Chip 
                        label={dataset.fileFormat} 
                        variant="outlined"
                        size="small"
                        sx={{ fontSize: '0.7rem', height: 20, display: { xs: 'none', md: 'inline-flex' } }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ padding: { xs: '8px', md: '16px' }, display: { xs: 'none', sm: 'table-cell' } }}>
                    <Chip 
                      label={dataset.isPaid ? 'Paid' : 'Free'} 
                      color={dataset.isPaid ? 'primary' : 'default'}
                      size="small"
                      sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: { xs: '8px', md: '16px' }, display: { xs: 'none', md: 'table-cell' } }}>
                    <Chip 
                      label={dataset.fileFormat} 
                      variant="outlined"
                      size="small"
                      sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: { xs: '8px', md: '16px' } }}>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        handleFileSelect(dataset.id, file || null);
                      }}
                      inputProps={{
                        accept: '.csv,.xlsx,.xls,.xml'
                      }}
                      sx={{ 
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        width: '100%',
                        '& input': {
                          fontSize: { xs: '0.75rem', md: '0.875rem' }
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ padding: { xs: '8px', md: '16px' } }}>
                    <Button
                      variant="contained"
                      startIcon={<CloudUpload sx={{ fontSize: { xs: '16px', md: '18px' } }} />}
                      onClick={() => handleUpload(dataset)}
                      disabled={!selectedFiles[dataset.id] || uploading === dataset.id}
                      size="small"
                      sx={{ 
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        px: { xs: 1, md: 2 },
                        py: { xs: 0.5, md: 1 },
                        minWidth: { xs: 60, md: 'auto' }
                      }}
                    >
                      {uploading === dataset.id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <>
                          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                            Upload
                          </Box>
                          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                            Up
                          </Box>
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
