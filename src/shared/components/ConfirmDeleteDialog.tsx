import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  itemDetails?: React.ReactNode;
  loading?: boolean;
  showWarning?: boolean;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  itemDetails,
  loading = false,
  showWarning = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle 
        sx={{ 
          fontFamily: 'Inter, Roboto, Arial, sans-serif', 
          fontWeight: 600,
          color: showWarning ? '#ef4444' : 'inherit'
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        {showWarning && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            This is your final warning. This action will permanently remove the item and cannot be recovered.
          </Alert>
        )}
        <Typography sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
          {message}
        </Typography>
        {itemName && (
          <Typography 
            sx={{ 
              fontFamily: 'Inter, Roboto, Arial, sans-serif', 
              fontWeight: 600,
              mt: 1
            }}
          >
            Item: "{itemName}"
          </Typography>
        )}
        {itemDetails && (
          <div style={{ marginTop: 8 }}>
            {itemDetails}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant={showWarning ? "contained" : "outlined"}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} /> : <DeleteIcon />}
          sx={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
        >
          {loading ? 'Deleting...' : (showWarning ? 'Delete Forever' : 'Yes, Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
