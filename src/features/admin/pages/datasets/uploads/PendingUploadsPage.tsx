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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Pending Uploads
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchPendingDatasets}
          disabled={loading}
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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>File Format</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell>
                    <Typography variant="subtitle2">{dataset.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={dataset.isPaid ? 'Paid' : 'Free'} 
                      color={dataset.isPaid ? 'primary' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={dataset.fileFormat} 
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        handleFileSelect(dataset.id, file || null);
                      }}
                      inputProps={{
                        accept: dataset.fileFormat === 'CSV' ? '.csv' : '.xlsx,.xls'
                      }}
                      sx={{ fontSize: '0.875rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<CloudUpload />}
                      onClick={() => handleUpload(dataset)}
                      disabled={!selectedFiles[dataset.id] || uploading === dataset.id}
                      size="small"
                    >
                      {uploading === dataset.id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        'Upload'
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
