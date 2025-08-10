import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Button,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import type { Admin } from '../hooks';

// Consistent color palette
const palette = {
  bg: '#f9fafc',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

/**
 * AdminDetailPage Component
 * 
 * This page displays detailed information about a specific admin.
 * 
 * Features:
 * - Complete admin profile display
 * - Status indicators
 * - Permission badges
 * - Edit and back navigation
 * - Responsive layout
 * - Consistent styling
 */
const AdminDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  /**
   * Load admin data when component mounts
   */
  useEffect(() => {
    if (id) {
      loadAdminDetails(id);
    }
  }, [id]);

  /**
   * Load admin details from API or mock data
   */
  const loadAdminDetails = async (adminId: string) => {
    setLoading(true);
    try {
      // Mock data for demonstration - replace with actual API call
      const mockAdmins: Admin[] = [
        {
          id: 'cmdkjnifa0009dq0v10gjsh5u',
          title: 'Mr.',
          firstName: 'John',
          middleName: 'A.',
          lastName: 'Doe',
          officialEmailId: 'john.doe@company.com',
          personalEmailId: 'john.personal@gmail.com',
          phNo: '+1234567890',
          alternativePhNo: '+0987654321',
          createdById: 'cmdkg769p000bk10w14ifnoz0',
          createdAt: '2025-01-15T10:30:00Z',
          personalInfo: {
            address: '123 Main St, City Center',
            fatherName: 'Richard Doe',
            motherName: 'Jane Doe',
            gender: 'Male',
            dob: '1990-01-01',
            city: 'Mumbai',
            state: 'Maharashtra',
            country: 'India',
            pinCode: '400001',
            nationality: 'Indian',
          },
          permissions: ['CREATE', 'UPDATE', 'DELETE', 'READ'],
          status: 'active',
        },
        // Add other mock admins here...
      ];

      const foundAdmin = mockAdmins.find(a => a.id === adminId);
      if (!foundAdmin) {
        throw new Error('Admin not found');
      }
      
      setAdmin(foundAdmin);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load admin details');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Navigate back to admin management
   */
  const handleBack = () => {
    navigate('/superadmin/admins');
  };

  /**
   * Navigate to edit admin page
   */
  const handleEdit = () => {
    if (admin) {
      navigate(`/superadmin/admins/edit/${admin.id}`);
    }
  };

  /**
   * Get status color based on admin status
   */
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return palette.success;
      case 'inactive':
        return palette.error;
      case 'pending':
        return palette.warning;
      default:
        return palette.muted;
    }
  };

  /**
   * Format admin's full name
   */
  const getFullName = (admin: Admin) => {
    const middle = admin.middleName ? ` ${admin.middleName}` : '';
    return `${admin.title} ${admin.firstName}${middle} ${admin.lastName}`;
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Box sx={{ 
        padding: 3, 
        backgroundColor: palette.bg, 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !admin) {
    return (
      <Box sx={{ padding: 3, backgroundColor: palette.bg, minHeight: '100vh' }}>
        <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto', mt: 3 }}>
          {error || 'Admin not found'}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: palette.bg, minHeight: '100vh' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleBack}
            sx={{ mr: 2, color: palette.accent }}
            aria-label="Go back to admin management"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: 600, color: palette.accent }}>
            Admin Details
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          sx={{
            backgroundColor: palette.accent,
            '&:hover': {
              backgroundColor: palette.text,
            },
          }}
        >
          Edit Admin
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {/* Basic Information Card */}
        <Card sx={{ mb: 3, border: `1px solid ${palette.border}` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonIcon sx={{ fontSize: 40, color: palette.accent }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: palette.text }}>
                    {getFullName(admin)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    Admin ID: {admin.id}
                  </Typography>
                </Box>
              </Box>
              
              <Chip
                label={admin.status || 'Unknown'}
                sx={{
                  backgroundColor: getStatusColor(admin.status),
                  color: '#ffffff',
                  fontWeight: 500,
                  textTransform: 'capitalize',
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Contact Information */}
            <Stack spacing={2}>
              <Typography variant="h6" sx={{ color: palette.text, fontWeight: 600 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ color: palette.muted }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Official Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.officialEmailId}
                  </Typography>
                </Box>
              </Box>

              {admin.personalEmailId && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EmailIcon sx={{ color: palette.muted }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Personal Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.muted }}>
                      {admin.personalEmailId}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon sx={{ color: palette.muted }} />
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Phone Number
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.phNo}
                  </Typography>
                </Box>
              </Box>

              {admin.alternativePhNo && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PhoneIcon sx={{ color: palette.muted }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Alternative Phone
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.muted }}>
                      {admin.alternativePhNo}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card sx={{ mb: 3, border: `1px solid ${palette.border}` }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: palette.text, fontWeight: 600, mb: 3 }}>
              Personal Information
            </Typography>

            <Stack spacing={2}>
              {admin.personalInfo.address && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationIcon sx={{ color: palette.muted }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Address
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.muted }}>
                      {admin.personalInfo.address}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Father's Name
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.personalInfo.fatherName || 'Not provided'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Mother's Name
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.personalInfo.motherName || 'Not provided'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Gender
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.personalInfo.gender || 'Not specified'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Date of Birth
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.personalInfo.dob ? formatDate(admin.personalInfo.dob) : 'Not provided'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {`${admin.personalInfo.city}, ${admin.personalInfo.state} ${admin.personalInfo.pinCode}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Nationality
                  </Typography>
                  <Typography variant="body2" sx={{ color: palette.muted }}>
                    {admin.personalInfo.nationality}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Permissions Card */}
        <Card sx={{ mb: 3, border: `1px solid ${palette.border}` }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: palette.text, fontWeight: 600, mb: 3 }}>
              Permissions
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {admin.permissions.map((permission) => (
                <Chip
                  key={permission}
                  label={permission}
                  variant="outlined"
                  sx={{
                    borderColor: palette.accent,
                    color: palette.accent,
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card sx={{ border: `1px solid ${palette.border}` }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" sx={{ color: palette.text, fontWeight: 600, mb: 3 }}>
              System Information
            </Typography>
            
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Created Date
                </Typography>
                <Typography variant="body2" sx={{ color: palette.muted }}>
                  {formatDate(admin.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Created By
                </Typography>
                <Typography variant="body2" sx={{ color: palette.muted }}>
                  {admin.createdById}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AdminDetailPage;
