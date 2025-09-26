import { useState, useEffect } from 'react';
// Modern font import for global use
import '@fontsource/inter/index.css';
import { useNavigate, useLocation } from 'react-router-dom';
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
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, ArrowBack as ArrowBackIcon, CloudUpload, CloudDownload } from '@mui/icons-material';
import * as React from 'react';
import { DatasetService } from '../../services/datasets/datasetService';
import { CategoryService } from '../../services/category/categoryService';
import type { Dataset } from '../../types';

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
};

const AdminDatasets: React.FC = () => {
  const [search, setSearch] = useState('');
  // Removed filtersOpen state
  // Removed categoryFilter and priceFilter state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<any>(null);
  const [deleting, setDeleting] = useState(false);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const location = useLocation();

  // Fade transition state
  const [fade, setFade] = useState(true);

  // Load datasets from API
  const loadDatasets = async () => {
    setLoading(true);
    setError('');
    try {
  const datasetsData = await DatasetService.getAllDatasets();
  setDatasets(datasetsData);
  // Fetch categories and build lookup map
  const categoryList = await CategoryService.getAllCategories();
  setCategories(categoryList);
  const map: Record<string, string> = {};
  categoryList.forEach(cat => { map[cat.id] = cat.name; });
  setCategoryMap(map);
    } catch (err) {
      console.error('Failed to load datasets:', err);
      setError(err instanceof Error ? err.message : 'Failed to load datasets');
    } finally {
      setLoading(false);
    }
  };

  // Load datasets on component mount
  useEffect(() => {
    loadDatasets();
  }, []);

  // Check for success message from navigation state
  React.useEffect(() => {
    if (location.state?.message) {
      // Show success message here if needed
      console.log(location.state.message);
    }
  }, [location.state]);

  // Smooth transition on navigation
  const handleNavigate = (url: string) => {
    setFade(false);
    setTimeout(() => {
      navigate(url);
    }, 250);
  };

  const handleDelete = async () => {
    if (!selectedDataset) return;
    
    setDeleting(true);
    try {
      await DatasetService.deleteDataset(selectedDataset.id);
      
      // Refresh the datasets list
      await loadDatasets();
    } catch (error) {
      console.error('Failed to delete dataset:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete dataset');
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
      setConfirmDeleteDialogOpen(false);
      setSelectedDataset(null);
    }
  };

  const handleDeleteClick = (_dataset: any) => {
    setSelectedDataset(_dataset);
    setDeleteDialogOpen(true);
  };

  const handleRowClick = (_dataset: any) => {
    // Navigate to dataset detail page using real backend ID
    navigate(`/admin/datasets/${_dataset.id}`);
  };

  const handleEditClick = (_dataset: any, index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click
    // Navigate to edit page
    navigate(`/admin/datasets/edit/${index + 1}`);
  };

    const filteredDatasets = datasets.filter(ds => {
    const matchesSearch = ds.title.toLowerCase().includes(search.toLowerCase());
    // Only filter by search now
    return matchesSearch;
  });

  return (
    <Box sx={{ background: palette.bg, px: 0, py: 0, position: 'relative', transition: 'opacity 0.25s', opacity: fade ? 1 : 0, fontFamily: 'Inter, Roboto, Arial, sans-serif', overflowX: 'hidden' }}>
      <Box sx={{ maxWidth: '100%', mx: 'auto', py: 0, width: '100%', px: 2 }}>
        {/* Back Arrow */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin')}
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
          Back to Dashboard
        </Button>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 0 }, px: 0, pt: 2, pb: 2, width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          <Typography variant="h4" fontWeight={600} sx={{ color: palette.accent, letterSpacing: 1, fontFamily: 'Inter, Roboto, Arial, sans-serif', flexShrink: 0 }}>
            Datasets
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' }, maxWidth: '100%', overflow: 'hidden' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: palette.buttonBg,
                color: palette.buttonText,
                borderRadius: 2,
                boxShadow: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                transition: 'background 0.2s',
                minWidth: { xs: 60, sm: 'auto' },
                '&:hover': {
                  background: palette.accent,
                  opacity: 0.9,
                },
              }}
              onClick={() => handleNavigate('/admin/datasets/create')}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Add Dataset</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Add</Box>
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: palette.accent,
                color: palette.buttonText,
                borderRadius: 2,
                boxShadow: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                transition: 'background 0.2s',
                minWidth: { xs: 70, sm: 'auto' },
                '&:hover': {
                  background: palette.buttonBg,
                  opacity: 0.9,
                },
              }}
              onClick={() => handleNavigate('/admin/datasets/add-multiple')}
            >
              <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>Add Multiple</Box>
              <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>Multi</Box>
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloudUpload />}
              sx={{
                borderColor: '#f59e0b',
                color: '#f59e0b',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                transition: 'all 0.2s',
                minWidth: { xs: 70, sm: 'auto' },
                '&:hover': {
                  background: '#f59e0b',
                  color: 'white',
                  borderColor: '#f59e0b',
                },
              }}
              onClick={() => handleNavigate('/admin/datasets/pending-uploads')}
            >
              <Box component="span" sx={{ display: { xs: 'none', lg: 'inline' } }}>Pending</Box>
              <Box component="span" sx={{ display: { xs: 'inline', lg: 'none' } }}>Pend</Box>
            </Button>
            <Button
              variant="outlined"
              startIcon={<CloudDownload />}
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 1, sm: 2 },
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                fontFamily: 'Inter, Roboto, Arial, sans-serif',
                transition: 'all 0.2s',
                minWidth: { xs: 70, sm: 'auto' },
                '&:hover': {
                  background: '#10b981',
                  color: 'white',
                  borderColor: '#10b981',
                },
              }}
              onClick={() => handleNavigate('/admin/datasets/uploaded')}
            >
              <Box component="span" sx={{ display: { xs: 'none', lg: 'inline' } }}>Uploaded</Box>
              <Box component="span" sx={{ display: { xs: 'inline', lg: 'none' } }}>Up</Box>
            </Button>
          </Box>
        </Box>
        <Divider sx={{ mb: 0 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', px: 0, py: 2, width: '100%', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 0 } }}>
          <TextField
            placeholder="Search datasets..."
            size="small"
            sx={{
              width: { xs: '100%', sm: 250, md: 300 },
              background: palette.card,
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                background: palette.card,
              },
            }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </Box>
        {/* Filters Section removed */}
        <Divider sx={{ mb: 0 }} />
        
        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2, color: palette.muted }}>
              Loading datasets...
            </Typography>
          </Box>
        ) : datasets.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: palette.muted }}>
              No datasets found
            </Typography>
          </Box>
        ) : (
        <TableContainer sx={{ width: '100%', background: palette.bg, boxShadow: 'none', borderRadius: 0, border: 'none', overflowX: 'hidden' }}>
          <Table stickyHeader sx={{ width: '100%', tableLayout: 'fixed', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 4px', md: '12px 8px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, width: { xs: '8%', md: '6%' } }}>#</TableCell>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, width: { xs: '35%', sm: '30%', md: '25%' } }}>Title</TableCell>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, display: { xs: 'none', sm: 'table-cell' }, width: { sm: '20%', md: '18%' } }}>Category</TableCell>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, width: { xs: '20%', sm: '15%', md: '12%' } }}>Price</TableCell>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, display: { xs: 'none', md: 'table-cell' }, width: { md: '15%' } }}>Records</TableCell>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, display: { xs: 'none', lg: 'table-cell' }, width: { lg: '12%' } }}>Format</TableCell>
                <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.85rem', md: '1rem' }, background: palette.bg, borderBottom: `2px solid ${palette.border}`, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', letterSpacing: 0.1, textAlign: 'center', width: { xs: '37%', sm: '20%', md: '18%', lg: '12%' } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDatasets.map((ds, idx) => (
                <TableRow
                  key={ds.id}
                  hover
                  onClick={() => handleRowClick(ds)}
                  sx={{
                    background: palette.card,
                    borderRadius: 2,
                    boxShadow: '0 1px 6px rgba(0,0,0,0.03)',
                    border: `1px solid ${palette.border}`,
                    mb: 2,
                    transition: 'box-shadow 0.2s, background 0.2s',
                    fontFamily: 'Inter, Roboto, Arial, sans-serif',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      background: '#f3f4f6',
                    },
                  }}
                >
                  <TableCell sx={{ color: palette.muted, fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.95rem' }, border: 'none', borderRadius: 2, padding: { xs: '8px 4px', md: '12px 8px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', textAlign: 'center' }}>{idx + 1}</TableCell>
                  <TableCell sx={{ color: palette.text, fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.95rem' }, border: 'none', borderRadius: 2, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ds.title}</TableCell>
                  <TableCell sx={{ color: palette.muted, fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.9rem' }, border: 'none', borderRadius: 2, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', display: { xs: 'none', sm: 'table-cell' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{categoryMap[ds.primaryCategoryId] || ds.primaryCategoryId}</TableCell>
                  <TableCell sx={{ color: palette.text, fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.95rem' }, border: 'none', borderRadius: 2, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>${ds.price.toLocaleString()}</TableCell>
                  <TableCell sx={{ color: palette.text, fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.95rem' }, border: 'none', borderRadius: 2, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', display: { xs: 'none', md: 'table-cell' } }}>{ds.aboutDatasetInfo?.dataFormatInfo?.rows?.toLocaleString() || 'N/A'}</TableCell>
                  <TableCell sx={{ color: palette.muted, fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.9rem' }, border: 'none', borderRadius: 2, padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', display: { xs: 'none', lg: 'table-cell' } }}>{ds.aboutDatasetInfo?.dataFormatInfo?.fileFormat || 'N/A'}</TableCell>
                  <TableCell sx={{ padding: { xs: '8px 8px', md: '12px 16px' }, fontFamily: 'Inter, Roboto, Arial, sans-serif', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', gap: { xs: 0.5, md: 1 }, alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'row', sm: 'row' } }}>
                      <Box 
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { opacity: 0.8 }, p: 0.5 }}
                        onClick={(e) => handleEditClick(ds, idx, e)}
                      >
                        <EditIcon sx={{ fontSize: { xs: '16px', md: '18px' }, color: palette.accent }} />
                        <Typography variant="body2" sx={{ color: palette.accent, fontWeight: 600, fontFamily: 'Inter, Roboto, Arial, sans-serif', fontSize: { xs: '0.7rem', md: '0.8rem' }, display: { xs: 'none', md: 'block' } }}>Edit</Typography>
                      </Box>
                      <Box 
                        sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', '&:hover': { opacity: 0.8 }, p: 0.5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(ds);
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: { xs: '16px', md: '18px' }, color: palette.error }} />
                        <Typography variant="body2" sx={{ color: palette.error, fontWeight: 600, fontFamily: 'Inter, Roboto, Arial, sans-serif', fontSize: { xs: '0.7rem', md: '0.8rem' }, display: { xs: 'none', md: 'block' } }}>Del</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}

        {/* Delete Confirmation Dialogs */}
        {selectedDataset && (
          <>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
              <DialogTitle sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', fontWeight: 600 }}>
                Confirm Delete
              </DialogTitle>
              <DialogContent>
                <Typography sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
                  Are you sure you want to delete the dataset "{selectedDataset.title}"? This action cannot be undone.
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
                  Dataset: "{selectedDataset.title}"
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', color: palette.muted, mt: 1 }}>
                  Category: {selectedDataset.category} | Price: ${selectedDataset.price.toLocaleString()}
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
          </>
        )}
      </Box>
    </Box>
  );
};
export default AdminDatasets;

