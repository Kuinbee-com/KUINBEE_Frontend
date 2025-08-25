# Dataset Bulk Upload Validation

## Overview

This feature implements validation for the bulk dataset upload functionality to prevent errors caused by invalid category and source IDs in the CSV files.

## How It Works

### 1. Validation Data Loading
- On component mount, the system fetches all valid categories and sources from the backend
- Uses `DatasetService.getAllCategories()` and `DatasetService.getAllSources()`
- Creates fast lookup Sets for validation

### 2. CSV Validation
- When a CSV is uploaded and parsed, each dataset is validated
- Checks if `primaryCategoryId` exists in valid categories
- Checks if `sourceId` exists in valid sources
- Datasets with invalid IDs are marked with status 'invalid'

### 3. User Feedback
- Invalid datasets are displayed with clear error messages
- Shows which specific IDs are invalid
- Upload button is disabled until all datasets are valid
- Provides a helpful reference of valid category and source IDs

### 4. Upload Prevention
- Only datasets with 'pending' status are uploaded to the backend
- Invalid datasets are filtered out automatically
- User must fix the CSV and re-upload to proceed

## Files Modified

### `useBulkDatasetUpload.ts`
- Added validation state and functions
- Updated `BulkUploadItem` interface to include validation errors
- Added `loadValidationData()` function
- Added `validateDataset()` function
- Modified `addDatasets()` to validate each dataset

### `AddMultipleDatasets.tsx`
- Added validation data loading on component mount
- Updated UI to show validation status and errors
- Added helpful display of valid category and source IDs
- Modified upload button to prevent upload when validation fails

### `validationHelpers.ts` (New)
- Utility functions for formatting validation errors
- Helper functions for displaying validation information

## User Experience

1. **Loading State**: Shows "Loading validation data..." while fetching valid IDs
2. **Valid ID Display**: Shows examples of valid category and source IDs
3. **Validation Errors**: Clear error messages for each invalid dataset
4. **Status Display**: Shows count of pending, invalid, uploading, and error datasets
5. **Upload Prevention**: Button changes to "Fix X invalid datasets" when errors exist

## Error Messages

- `Invalid category ID: [ID]` - When a category ID doesn't exist
- `Invalid source ID: [ID]` - When a source ID doesn't exist

## Benefits

- Prevents backend errors from invalid IDs
- Provides clear feedback to users
- Reduces failed upload attempts
- Improves overall user experience
- Maintains data integrity
