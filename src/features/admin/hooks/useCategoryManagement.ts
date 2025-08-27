import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryService } from '../services/category/categoryService';

// Mock category data - fallback if API fails
const mockCategories = [
  { id: '1', name: 'Finance', datasetCount: 12 },
  { id: '2', name: 'Healthcare', datasetCount: 8 },
  { id: '3', name: 'Technology', datasetCount: 15 },
  { id: '4', name: 'Retail', datasetCount: 5 },
  { id: '5', name: 'Real Estate', datasetCount: 3 },
];

export interface Category {
  id: string;
  name: string;
  datasetCount: number;
}

const useCategoryManagement = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load categories from localStorage or API
  const loadCategories = async () => {
    setLoading(true);
    try {
      const cached = localStorage.getItem('categories');
      if (cached) {
        setCategories(JSON.parse(cached));
        setLoading(false);
        // Optionally, refresh in background
        CategoryService.getAllCategories().then(result => {
          const mappedCategories: Category[] = result.map(cat => ({
            id: cat.id,
            name: cat.name,
            datasetCount: cat.datasetCount || 0
          }));
          setCategories(mappedCategories);
          localStorage.setItem('categories', JSON.stringify(mappedCategories));
        }).catch(() => {});
        return;
      }
      const result = await CategoryService.getAllCategories();
      const mappedCategories: Category[] = result.map(cat => ({
        id: cat.id,
        name: cat.name,
        datasetCount: cat.datasetCount || 0
      }));
      setCategories(mappedCategories);
      localStorage.setItem('categories', JSON.stringify(mappedCategories));
    } catch (error) {
      console.error('Failed to load categories:', error);
      setCategories(mockCategories);
    } finally {
      setLoading(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Handle success messages from navigation state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  }, [location.state]);

  const deleteCategory = async (category: Category): Promise<void> => {
    setLoading(true);
    try {
      await CategoryService.deleteCategory(category.id);
      // Remove category from state
      setCategories(prev => {
        const updated = prev.filter(cat => cat.id !== category.id);
        localStorage.setItem('categories', JSON.stringify(updated));
        return updated;
      });
      setSuccessMessage(`Category "${category.name}" has been deleted successfully.`);
    } catch (error) {
      console.error('Failed to delete category:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = (searchTerm: string): Category[] => {
    return categories.filter(cat =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    categories,
    loading,
    successMessage,
    setSuccessMessage,
    deleteCategory,
    filterCategories,
    refreshCategories: loadCategories,
  };
};

// Export both named and default exports
export { useCategoryManagement };
export default useCategoryManagement;
