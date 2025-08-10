import React, { useState, useEffect } from 'react';
// Modern font import for global use
import '@fontsource/inter/index.css';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  Chip,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

// Dataset interface matching CreateDatasetPage fields
interface Dataset {
  id: string;
  title: string;
  primaryCategory: string;
  source: string;
  price: number;
  isPaid: boolean;
  currency: string;
  sampleUrl: string;
  license: string;
  superTypes: string;
  location: string;
  country: string;
  state: string;
  city: string;
  overview: string;
  description: string;
  dataQuality: string;
  featuresContent: string;
  rows: number;
  cols: number;
  fileFormat: string;
  records: number;
  createdAt: string;
  updatedAt: string;
  adminId: string;
}

const palette = {
  bg: '#f9fafc',
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
  warning: '#f59e0b',
};

const DatasetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Mock fetch function - replace with actual API call
  const fetchDataset = async (datasetId: string): Promise<Dataset> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data based on the datasets from AdminDatasets.tsx
    const mockDatasets: Record<string, Dataset> = {
      '1': {
        id: '1',
        title: 'Global Financial Markets - Q2 2025',
        primaryCategory: 'Finance',
        source: 'External',
        price: 299.99,
        isPaid: true,
        currency: 'USD',
        sampleUrl: 'https://example.com/sample-financial-data.csv',
        license: 'Proprietary',
        superTypes: 'Financial, Market Data',
        location: 'USA',
        country: 'United States',
        state: 'New York',
        city: 'New York',
        overview: 'Comprehensive financial market data covering Q2 2025 trends and analysis.',
        description: 'This dataset provides detailed financial market information including stock prices, trading volumes, market indices, and economic indicators for the second quarter of 2025. The data encompasses major global markets including NYSE, NASDAQ, LSE, and other international exchanges.',
        dataQuality: 'High quality data sourced from verified financial institutions and exchanges. Data is cleaned, validated, and updated in real-time.',
        featuresContent: 'Real-time market data, Historical trends, Multi-currency support, API access, Regular updates, Professional support',
        rows: 540000,
        cols: 25,
        fileFormat: 'CSV, JSON',
        records: 540000,
        createdAt: '2025-01-15T10:30:00Z',
        updatedAt: '2025-01-20T14:45:00Z',
        adminId: 'admin123',
      },
      // Add more mock datasets as needed
    };

    const dataset = mockDatasets[datasetId];
    if (!dataset) {
      throw new Error('Dataset not found');
    }
    return dataset;
  };

  const handleDelete = async () => {
    if (!dataset) return;
    
    setDeleting(true);
    try {
      // TODO: Replace with actual API call
      console.log('Deleting dataset:', dataset.id);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // Navigate back to datasets list after successful deletion
      navigate('/admin/datasets', { 
        state: { message: `Dataset "${dataset.title}" has been deleted successfully.` }
      });
    } catch (error) {
      setError('Failed to delete dataset. Please try again.');
      setDeleting(false);
    }
    setConfirmDeleteDialogOpen(false);
  };

  useEffect(() => {
    const loadDataset = async () => {
      if (!id) {
        setError('Dataset ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchDataset(id);
        setDataset(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dataset');
      } finally {
        setLoading(false);
      }
    };

    loadDataset();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
        <CircularProgress size={48} sx={{ color: palette.accent }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 1200, mx: 'auto', py: 4, px: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/datasets')}
          sx={{ color: palette.accent, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
        >
          Back to Datasets
        </Button>
      </Box>
    );
  }

  if (!dataset) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ background: palette.bg, minHeight: '100vh', py: 4, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
        {/* Header with Back Arrow */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/admin/datasets')}
            sx={{ 
              color: palette.muted, 
              fontFamily: 'Inter, Roboto, Arial, sans-serif',
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4" fontWeight={600} sx={{ color: palette.accent, letterSpacing: 1, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
              Dataset Details
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/admin/datasets/edit/${dataset.id}`)}
              sx={{
                borderColor: palette.buttonBorder,
                color: palette.accent,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.2,
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                '&:hover': {
                  background: palette.bg,
                  borderColor: palette.accent,
                },
              }}
            >
              Edit Dataset
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
              sx={{
                borderColor: palette.error,
                color: palette.error,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.2,
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                '&:hover': {
                  background: `${palette.error}10`,
                  borderColor: palette.error,
                },
              }}
            >
              Delete Dataset
            </Button>
          </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
          {/* Left Column - Basic Info */}
          <Box>
            <Paper sx={{ p: 4, mb: 3, background: palette.card, borderRadius: 3, border: `1px solid ${palette.border}`, boxShadow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box>
                  <Typography variant="h5" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                    {dataset.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={dataset.primaryCategory} 
                      size="small" 
                      sx={{ background: `${palette.accent}15`, color: palette.accent, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
                    />
                    <Chip 
                      label={dataset.source} 
                      size="small" 
                      variant="outlined"
                      sx={{ borderColor: palette.border, color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
                    />
                  </Box>
                </Box>
                <Chip 
                  label={dataset.isPaid ? `$${dataset.price.toLocaleString()} ${dataset.currency}` : 'Free'} 
                  size="medium"
                  sx={{ 
                    background: dataset.isPaid ? `${palette.success}15` : `${palette.warning}15`, 
                    color: dataset.isPaid ? palette.success : palette.warning,
                    fontWeight: 600,
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    fontSize: '1rem',
                    px: 2,
                    py: 1
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                Overview
              </Typography>
              <Typography variant="body1" sx={{ color: palette.muted, mb: 3, lineHeight: 1.6, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                {dataset.overview}
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                Description
              </Typography>
              <Typography variant="body1" sx={{ color: palette.muted, mb: 3, lineHeight: 1.6, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                {dataset.description}
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                Data Quality
              </Typography>
              <Typography variant="body1" sx={{ color: palette.muted, mb: 3, lineHeight: 1.6, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                {dataset.dataQuality}
              </Typography>

              <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                Key Features
              </Typography>
              <Typography variant="body1" sx={{ color: palette.muted, lineHeight: 1.6, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                {dataset.featuresContent}
              </Typography>
            </Paper>
          </Box>

          {/* Right Column - Metadata */}
          <Box>
            {/* Data Format Info */}
            <Card sx={{ mb: 3, background: palette.card, borderRadius: 3, border: `1px solid ${palette.border}`, boxShadow: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <StorageIcon fontSize="small" sx={{ verticalAlign: 'middle' }} />
                  <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif', verticalAlign: 'middle' }}>
                    Data Format
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Rows:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.rows.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Columns:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.cols}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Format:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.fileFormat}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Records:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.records.toLocaleString()}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card sx={{ mb: 3, background: palette.card, borderRadius: 3, border: `1px solid ${palette.border}`, boxShadow: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CategoryIcon fontSize="small" />
                  Location & Metadata
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Location:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.location}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Country:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.country}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>State:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.state}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>City:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.city}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>License:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.license}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Super Types:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.superTypes}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Sample & Admin Info */}
            <Card sx={{ background: palette.card, borderRadius: 3, border: `1px solid ${palette.border}`, boxShadow: 1 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} sx={{ color: palette.text, mb: 2, fontFamily: 'Inter, Roboto, Arial, sans-serif', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DescriptionIcon fontSize="small" />
                  Additional Info
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {dataset.sampleUrl && (
                    <Box>
                      <Typography variant="body2" sx={{ color: palette.muted, mb: 1, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Sample URL:</Typography>
                      <Typography variant="body2" fontWeight={600} sx={{ color: palette.accent, fontFamily: 'Inter, Roboto, Arial, sans-serif', wordBreak: 'break-all' }}>
                        <a href={dataset.sampleUrl} target="_blank" rel="noopener noreferrer" style={{ color: palette.accent, textDecoration: 'none' }}>
                          {dataset.sampleUrl}
                        </a>
                      </Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Admin ID:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{dataset.adminId}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Created:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{formatDate(dataset.createdAt)}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: palette.muted, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Updated:</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ color: palette.text, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>{formatDate(dataset.updatedAt)}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Delete Confirmation Dialogs */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 600 }}>
            Confirm Delete
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
              Are you sure you want to delete the dataset "{dataset.title}"? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)} sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setDeleteDialogOpen(false);
                setConfirmDeleteDialogOpen(true);
              }} 
              color="error" 
              variant="outlined"
              sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
            >
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmDeleteDialogOpen} onClose={() => setConfirmDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 600, color: palette.error }}>
            Final Confirmation
          </DialogTitle>
          <DialogContent>
            <Alert severity="warning" sx={{ mb: 2 }}>
              This is your final warning. Deleting this dataset will permanently remove all associated data and cannot be recovered.
            </Alert>
            <Typography sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 600 }}>
              Dataset: "{dataset.title}"
            </Typography>
            <Typography sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', color: palette.muted, mt: 1 }}>
              ID: {dataset.id}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setConfirmDeleteDialogOpen(false)} 
              disabled={deleting}
              sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDelete} 
              color="error" 
              variant="contained"
              disabled={deleting}
              startIcon={deleting ? <CircularProgress size={16} /> : <DeleteIcon />}
              sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
            >
              {deleting ? 'Deleting...' : 'Delete Forever'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DatasetDetailPage;
