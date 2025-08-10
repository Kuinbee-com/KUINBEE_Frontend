import { createTheme } from '@mui/material/styles';

/**
 * Material-UI Theme Configuration
 * Centralized theme settings for consistent styling
 */

export const theme = createTheme({
  palette: {
    primary: {
      main: '#111827', // gray-900
      light: '#374151', // gray-700
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4b5563', // gray-600
      light: '#9ca3af', // gray-400
      dark: '#374151', // gray-700
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb', // gray-50
      paper: '#ffffff',
    },
    success: {
      main: '#10b981', // emerald-500
    },
    warning: {
      main: '#f59e0b', // amber-500
    },
    error: {
      main: '#ef4444', // red-500
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});
