import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  Box,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
  Paper,
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { InputAdornment, IconButton } from '@mui/material';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../../../core/store';

import { loginUser, clearError } from '../store/authSlice';
import KuinbeeLogo from '../../../assets/logos/kuinbee-logo.svg';

// Define hooks directly in this file to avoid import issues
const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * AdminLogin Component
 * Handles admin authentication with form validation and error handling
 */
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Automatically redirect to admin dashboard based on user role
  const getRedirectPath = (userRole: string) => {
    if (userRole === 'SUPERADMIN') {
      return '/admin/dashboard'; // SuperAdmins can access admin features
    }
    return '/admin/dashboard';
  };

  // Redirect if already authenticated and is admin
  useEffect(() => {
    if (isAuthenticated && user && (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) {
      const redirectPath = getRedirectPath(user.role);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  /**
   * Validate form inputs
   */
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      // Navigate to admin dashboard after successful login
      const redirectPath = getRedirectPath(result.user.role);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      // Show toast notification for login failure
      toast.error('Login failed. Please check your credentials and try again.');
      console.error('Login failed:', error);
    }
  };

  /**
   * Handle input changes with validation
   */
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // If already authenticated and is admin, redirect
  if (isAuthenticated && user && (user.role === 'ADMIN' || user.role === 'SUPERADMIN')) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 80%, rgba(17, 24, 39, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(75, 85, 99, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Back Arrow */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ 
          position: 'absolute',
          top: 20,
          left: 20,
          color: '#6b7280',
          fontSize: '0.95rem',
          textTransform: 'none',
          zIndex: 10,
          '&:hover': { 
            color: '#111827',
            backgroundColor: 'transparent'
          }
        }}
      >
        Back to Home
      </Button>
      
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 440,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
            color: 'white',
            textAlign: 'center',
            py: 4,
            px: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Box
            component="img"
            src={KuinbeeLogo}
            alt="Kuinbee Logo"
            sx={{
              width: 64,
              height: 48,
              mb: 3,
              filter: 'brightness(0) invert(1) drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.25)',
                filter: 'brightness(0) invert(1) drop-shadow(0 6px 12px rgba(0,0,0,0.4))',
              },
            }}
          />
          <Typography variant="h4" component="h1" fontWeight="650" gutterBottom>
            Kuinbee
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8}}>
            Admin Panel Login
          </Typography>
        </Box>

        {/* Form */}
        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              disabled={isLoading}
             sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                  '&.Mui-focused': {
                    boxShadow: '0 6px 16px rgba(17, 24, 39, 0.15)',
                  },
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              disabled={isLoading}
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                backgroundColor: '#111827',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#1f2937',
                },
                '&:disabled': {
                  backgroundColor: '#9ca3af',
                  color: '#ffffff',
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In to Admin Panel'
              )}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 2 }}
          >
            Authorized personnel only. All access is monitored and logged.
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            align="center"
            display="block"
          >
            Having trouble? Contact your system administrator.
          </Typography>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
