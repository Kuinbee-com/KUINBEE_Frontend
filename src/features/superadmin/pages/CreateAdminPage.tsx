import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Stack,
  Typography,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Divider,
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { SuperAdminService } from '../services/superAdminService';

/**
 * Form data structure for admin creation/editing
 */
interface AdminFormData {
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  officialEmailId: string;
  personalEmailId: string;
  phNo: string;
  alternativePhNo: string;
  personalInfo: {
    address: string;
    fatherName: string;
    motherName: string;
    gender: string;
    dob: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    nationality: string;
  };
  permissions: string[];
}

// Consistent color palette matching other pages
const palette = {
  bg: '#f9fafc',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#111827',
  buttonText: '#ffffff',
  buttonBg: '#111827',
  error: '#ef4444',
  success: '#10b981',
};

// Available options for form fields
const TITLE_OPTIONS = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
const GENDER_OPTIONS = ['MALE', 'FEMALE', 'OTHER'];
const PERMISSION_OPTIONS = ['CREATE', 'READ', 'UPDATE', 'DELETE'];

/**
 * CreateAdminPage Component
 * 
 * This page handles both creating new admins and editing existing ones.
 * 
 * Features:
 * - Comprehensive form with personal and professional details
 * - Multi-select permissions
 * - Form validation with error messages
 * - Loading states during API calls
 * - Success and error notifications
 * - Consistent styling with other admin pages
 * 
 * Usage:
 * - For creating: /superadmin/admins/create
 * - For editing: /superadmin/admins/edit/:id
 */
const CreateAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get admin ID from URL (for editing)
  const isEditMode = Boolean(id); // Determine if we're editing or creating

  // Form data state
  const [formData, setFormData] = useState<AdminFormData>({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    officialEmailId: '',
    personalEmailId: '',
    phNo: '',
    alternativePhNo: '',
    personalInfo: {
      address: '',
      fatherName: '',
      motherName: '',
      gender: '',
      dob: '',
      city: '',
      state: '',
      country: 'India',
      pinCode: '',
      nationality: 'Indian',
    },
    permissions: [],
  });

  // UI state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /**
   * Handle input field changes for basic fields
   */
  const handleInputChange = (field: keyof AdminFormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Handle input field changes for personal info nested fields
   */
  const handlePersonalInfoChange = (field: keyof AdminFormData['personalInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First name and last name are required');
      return;
    }

    if (!formData.officialEmailId.trim()) {
      setError('Official email is required');
      return;
    }

    if (!formData.phNo.trim()) {
      setError('Phone number is required');
      return;
    }

    // Validate phone number format (should be numeric)
    if (!/^\d+$/.test(formData.phNo.trim())) {
      setError('Phone number should contain only digits');
      return;
    }

    // Validate alternative phone number if provided
    if (formData.alternativePhNo && formData.alternativePhNo.trim() && !/^\d+$/.test(formData.alternativePhNo.trim())) {
      setError('Alternative phone number should contain only digits');
      return;
    }

    if (formData.permissions.length === 0) {
      setError('At least one permission must be selected');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEditMode) {
        // Update existing admin
        // await SuperAdminService.updateAdmin(id, formData);
        console.log('Updating admin:', id, formData);
        // Navigate back with success message since update is not implemented yet
        navigate('/superadmin/admins', { 
          state: { 
            successMessage: 'Update functionality coming soon!' 
          } 
        });
      } else {
        // Create new admin
        const result = await SuperAdminService.createAdmin(formData);
        
        // Navigate back to admin management with detailed success info
        navigate('/superadmin/admins', { 
          state: { 
            successData: {
              message: `Admin "${formData.firstName} ${formData.lastName}" created successfully!`,
              adminId: result.adminId,
              defaultPassword: result.defaultPassword,
              adminName: `${formData.firstName} ${formData.lastName}`,
              officialEmail: formData.officialEmailId
            }
          } 
        });
      }
      
    } catch (error) {
      let errorMessage = 'An unknown error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object') {
        const errorObj = error as any;
        errorMessage = errorObj.message || errorObj.error || errorObj.msg || 'Unknown error format';
      }
      
      setError(isEditMode ? `Failed to update admin: ${errorMessage}` : `Failed to create admin: ${errorMessage}`);
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

  return (
    <Box sx={{ padding: 3, backgroundColor: palette.bg, minHeight: '100vh' }}>
      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton
          onClick={handleBack}
          sx={{ mr: 2, color: palette.accent }}
          aria-label="Go back to admin management"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600, color: palette.accent }}>
          {isEditMode ? 'Edit Admin' : 'Create New Admin'}
        </Typography>
      </Box>

      {/* Main Form Card */}
      <Card sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* Basic Information Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: palette.text, fontWeight: 600 }}>
                  Basic Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Title */}
                    <FormControl sx={{ minWidth: 120 }} required>
                      <InputLabel>Title</InputLabel>
                      <Select
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        disabled={loading}
                      >
                        {TITLE_OPTIONS.map((title) => (
                          <MenuItem key={title} value={title}>
                            {title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* First Name */}
                    <TextField
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      fullWidth
                      required
                      disabled={loading}
                    />

                    {/* Middle Name */}
                    <TextField
                      label="Middle Name"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />

                    {/* Last Name */}
                    <TextField
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      fullWidth
                      required
                      disabled={loading}
                    />
                  </Box>
                </Stack>
              </Box>

              {/* Contact Information Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: palette.text, fontWeight: 600 }}>
                  Contact Information
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Official Email */}
                    <TextField
                      label="Official Email"
                      type="email"
                      value={formData.officialEmailId}
                      onChange={(e) => handleInputChange('officialEmailId', e.target.value)}
                      fullWidth
                      required
                      disabled={loading}
                    />

                    {/* Personal Email */}
                    <TextField
                      label="Personal Email"
                      type="email"
                      value={formData.personalEmailId}
                      onChange={(e) => handleInputChange('personalEmailId', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Phone Number */}
                    <TextField
                      label="Phone Number"
                      value={formData.phNo}
                      onChange={(e) => handleInputChange('phNo', e.target.value)}
                      fullWidth
                      required
                      disabled={loading}
                    />

                    {/* Alternative Phone */}
                    <TextField
                      label="Alternative Phone"
                      value={formData.alternativePhNo}
                      onChange={(e) => handleInputChange('alternativePhNo', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* Personal Information Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: palette.text, fontWeight: 600 }}>
                  Personal Information
                </Typography>
                <Stack spacing={2}>
                  {/* Address */}
                  <TextField
                    label="Address"
                    value={formData.personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    disabled={loading}
                  />

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Father's Name */}
                    <TextField
                      label="Father's Name"
                      value={formData.personalInfo.fatherName}
                      onChange={(e) => handlePersonalInfoChange('fatherName', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />

                    {/* Mother's Name */}
                    <TextField
                      label="Mother's Name"
                      value={formData.personalInfo.motherName}
                      onChange={(e) => handlePersonalInfoChange('motherName', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Gender */}
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        value={formData.personalInfo.gender}
                        onChange={(e) => handlePersonalInfoChange('gender', e.target.value)}
                        disabled={loading}
                      >
                        {GENDER_OPTIONS.map((gender) => (
                          <MenuItem key={gender} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Date of Birth */}
                    <TextField
                      label="Date of Birth"
                      type="date"
                      value={formData.personalInfo.dob}
                      onChange={(e) => handlePersonalInfoChange('dob', e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      disabled={loading}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* City */}
                    <TextField
                      label="City"
                      value={formData.personalInfo.city}
                      onChange={(e) => handlePersonalInfoChange('city', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />

                    {/* State */}
                    <TextField
                      label="State"
                      value={formData.personalInfo.state}
                      onChange={(e) => handlePersonalInfoChange('state', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />

                    {/* Pin Code */}
                    <TextField
                      label="Pin Code"
                      value={formData.personalInfo.pinCode}
                      onChange={(e) => handlePersonalInfoChange('pinCode', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Country */}
                    <TextField
                      label="Country"
                      value={formData.personalInfo.country}
                      onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />

                    {/* Nationality */}
                    <TextField
                      label="Nationality"
                      value={formData.personalInfo.nationality}
                      onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
                      fullWidth
                      disabled={loading}
                    />
                  </Box>
                </Stack>
              </Box>

              <Divider />

              {/* Permissions Section */}
              <Box>
                <Typography variant="h6" sx={{ mb: 2, color: palette.text, fontWeight: 600 }}>
                  Permissions *
                </Typography>
                <FormControl fullWidth required>
                  <InputLabel>Select Permissions</InputLabel>
                  <Select
                    multiple
                    value={formData.permissions}
                    onChange={(e) => handleInputChange('permissions', e.target.value as string[])}
                    disabled={loading}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={value} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {PERMISSION_OPTIONS.map((permission) => (
                      <MenuItem key={permission} value={permission}>
                        {permission}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4 }}>
                {/* Cancel Button */}
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={loading}
                  startIcon={<ArrowBackIcon />}
                >
                  Cancel
                </Button>

                {/* Save Button */}
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  sx={{
                    backgroundColor: palette.buttonBg,
                    color: palette.buttonText,
                    '&:hover': {
                      backgroundColor: palette.accent,
                    },
                  }}
                >
                  {loading 
                    ? (isEditMode ? 'Updating...' : 'Creating...') 
                    : (isEditMode ? 'Update Admin' : 'Create Admin')
                  }
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateAdminPage;
