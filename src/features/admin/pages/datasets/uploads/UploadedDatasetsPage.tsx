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
          Uploaded Datasets
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={fetchUploadedDatasets}
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
              No uploaded datasets found
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
              Upload some datasets to see them here.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <TableContainer component={Paper} sx={{ overflowX: 'hidden', width: '100%' }}>
          <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: '30%', sm: '25%', md: '25%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' } }}>Title</TableCell>
                <TableCell sx={{ width: { xs: '15%', sm: '12%', md: '12%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' }, display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
                <TableCell sx={{ width: { xs: '25%', sm: '18%', md: '15%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' } }}>Price</TableCell>
                <TableCell sx={{ width: { xs: '20%', sm: '15%', md: '15%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' }, display: { xs: 'none', md: 'table-cell' } }}>File Format</TableCell>
                <TableCell sx={{ width: { xs: '25%', sm: '30%', md: '33%' }, fontSize: { xs: '0.8rem', md: '0.875rem' }, padding: { xs: '8px', md: '16px' } }}>Actions</TableCell>
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
                  <TableCell sx={{ padding: { xs: '8px', md: '16px' } }}>
                    {dataset.isPaid ? (
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' }, fontWeight: 600 }}>
                        ${dataset.price || 0}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
                        Free
                      </Typography>
                    )}
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
                    <Button
                      variant="contained"
                      startIcon={<Download sx={{ fontSize: { xs: '16px', md: '18px' } }} />}
                      onClick={() => handleDownload(dataset)}
                      disabled={downloading === dataset.id}
                      size="small"
                      sx={{ 
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        px: { xs: 1, md: 2 },
                        py: { xs: 0.5, md: 1 },
                        minWidth: { xs: 70, md: 'auto' }
                      }}
                    >
                      {downloading === dataset.id ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : (
                        <>
                          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                            Download
                          </Box>
                          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                            Down
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
