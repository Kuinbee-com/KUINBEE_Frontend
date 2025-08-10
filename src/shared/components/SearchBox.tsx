import React from 'react';
import { Box, TextField, Divider } from '@mui/material';

/**
 * Props for the SimpleSearchBox component
 */
interface SimpleSearchBoxProps {
  /** Current search value */
  value: string;
  /** Function called when user types in search box */
  onChange: (value: string) => void;
  /** Placeholder text shown in empty search box */
  placeholder?: string;
  /** Width of the search box */
  width?: number | string;
}

// Simple color palette
const colors = {
  white: '#ffffff',
};

/**
 * SimpleSearchBox Component
 * 
 * A reusable search input with consistent styling.
 * Used to filter lists of data (categories, datasets, etc.)
 * 
 * Features:
 * - Clean white background
 * - Customizable placeholder text
 * - Adjustable width
 * - Consistent border and styling
 * 
 * Usage example:
 * <SimpleSearchBox 
 *   value={searchTerm} 
 *   onChange={setSearchTerm}
 *   placeholder="Search categories..."
 * />
 */
const SimpleSearchBox: React.FC<SimpleSearchBoxProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  width = 300,
}) => {
  return (
    <>
      {/* Divider line to separate from content above */}
      <Divider sx={{ mb: 0 }} />
      
      {/* Container for the search box */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0, py: 2, width: '100%' }}>
        {/* The actual search input field */}
        <TextField
          placeholder={placeholder}
          size="small"
          sx={{
            width,
            background: colors.white,
            borderRadius: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: colors.white,
            },
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </Box>
    </>
  );
};

export default SimpleSearchBox;
