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
  Chip
} from '@mui/material';
import { Download, Refresh } from '@mui/icons-material';
import { DatasetService } from '../../../services/datasets/datasetService';

interface UploadedDataset {
  id: string;
  title: string;
  isPaid: boolean;
  price?: number;
  fileFormat: string;
}

export default function UploadedDatasetsPage() {
  const [datasets, setDatasets] = useState<UploadedDataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    fetchUploadedDatasets();
  }, []);

  const fetchUploadedDatasets = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DatasetService.getUploadedDatasets();
      setDatasets(data as unknown as UploadedDataset[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch uploaded datasets');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (dataset: UploadedDataset) => {
    try {
      setDownloading(dataset.id);
      setError(null);

      // Get download URL
      const downloadUrl = await DatasetService.getDownloadUrlForDataset(
        dataset.id,
        dataset.fileFormat,
        dataset.isPaid
      );

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${dataset.title}.${dataset.fileFormat.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(null);
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
          Uploaded Datasets
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchUploadedDatasets}
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
              No uploaded datasets found
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Upload some datasets to see them here.
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
                <TableCell>Price</TableCell>
                <TableCell>File Format</TableCell>
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
                    {dataset.isPaid ? (
                      <Typography variant="body2">
                        ${dataset.price || 0}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Free
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={dataset.fileFormat} 
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      onClick={() => handleDownload(dataset)}
                      disabled={downloading === dataset.id}
                      size="small"
                    >
                      {downloading === dataset.id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        'Download'
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
