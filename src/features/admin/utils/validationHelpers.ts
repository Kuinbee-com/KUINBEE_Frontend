/**
 * Validation helpers for dataset bulk upload
 */

export interface CategoryData {
  id: string;
  name: string;
}

export interface SourceData {
  id: string;
  name: string;
}

/**
 * Format validation errors for display
 */
export function formatValidationError(error: string, categories: CategoryData[], sources: SourceData[]): string {
  if (error.includes('Invalid category ID:')) {
    const categoryId = error.split(': ')[1];
    const validCategories = categories.map(c => `${c.name} (ID: ${c.id})`).join(', ');
    return `${error}. Valid categories: ${validCategories}`;
  }
  
  if (error.includes('Invalid source ID:')) {
    const sourceId = error.split(': ')[1];
    const validSources = sources.map(s => `${s.name} (ID: ${s.id})`).join(', ');
    return `${error}. Valid sources: ${validSources}`;
  }
  
  return error;
}

/**
 * Generate a CSV template with valid IDs as examples
 */
export function generateValidationInfo(categories: CategoryData[], sources: SourceData[]): {
  categoryExamples: string;
  sourceExamples: string;
} {
  const categoryExamples = categories.slice(0, 3).map(c => `${c.name} (${c.id})`).join(', ');
  const sourceExamples = sources.slice(0, 3).map(s => `${s.name} (${s.id})`).join(', ');
  
  return {
    categoryExamples: categoryExamples || 'No categories available',
    sourceExamples: sourceExamples || 'No sources available'
  };
}
