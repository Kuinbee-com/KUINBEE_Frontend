import { useState, useEffect } from 'react';
import { UserApiService } from '../services/userApiService';
import type { MarketplaceDataset, Category } from '../types';
import type { Source } from '../utils/marketplaceHelpers';

export const useMarketplaceData = () => {
  const [datasets, setDatasets] = useState<MarketplaceDataset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Check authentication status and use appropriate endpoints
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const isAuthenticated = !!token;
      
      // Load all data in parallel using appropriate endpoints
      const [datasetsData, categoriesData, sourcesData] = await Promise.all([
        isAuthenticated 
          ? UserApiService.getAllUploadedDatasets(20, 0)
          : UserApiService.getAllUploadedDatasetsPublic(20, 0),
        isAuthenticated 
          ? UserApiService.getAllCategories()
          : UserApiService.getAllCategoriesPublic(),
        isAuthenticated 
          ? UserApiService.getAllSources()
          : UserApiService.getAllSourcesPublic()
      ]);
      // Map Dataset[] to MarketplaceDataset[] if needed
      setDatasets(datasetsData.map((d: any) => ({
        ...d,
        tags: d.tags || [],
      })));
      setCategories(categoriesData);
      setSources(sourcesData);
      setTotalItems(datasetsData.length); // Set total items for initial load
    } catch (error) {
      console.error('Failed to load data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load data');
      // Fallback to hardcoded categories if API fails
      setCategories([
        { id: '1', name: 'Finance', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: '2', name: 'Energy', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: '3', name: 'Environment', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: '4', name: 'Agri and Food', createdAt: new Date().toISOString(), createdBy: 'system' },
        { id: '5', name: 'Economics', createdAt: new Date().toISOString(), createdBy: 'system' }
      ]);
      setSources([]);
      setDatasets([]);
    } finally {
      setLoading(false);
    }
  };

  const loadFilteredDatasets = async (
    currentPage: number,
    itemsPerPage: number,
    searchQuery: string,
    selectedCategories: string[],
    selectedSourceId: string,
    paid: boolean,
    superType?: string
  ) => {
    try {
      setError(null);
      
      // Check if any filters are actually applied
      const hasFilters = !!(
        (searchQuery && searchQuery.trim()) ||
        paid ||
        selectedCategories.length > 0 ||
        selectedSourceId ||
        superType
      );

      // If no filters are applied, use the appropriate endpoint based on auth
      if (!hasFilters) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        let allData;
        if (token) {
          // Authenticated: use authenticated endpoint
          allData = await UserApiService.getAllUploadedDatasets(itemsPerPage, (currentPage - 1) * itemsPerPage);
        } else {
          // Unauthenticated: use public endpoint
          allData = await UserApiService.getAllUploadedDatasetsPublic(itemsPerPage, (currentPage - 1) * itemsPerPage);
        }
        setDatasets(allData.map((d: any) => ({
          ...d,
          tags: d.tags || [],
        })));
        setTotalItems(allData.length); // Set total items for unfiltered data
        return;
      }

      // Build params object for filtering - limit is required by backend
      const params = {
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        search: searchQuery && searchQuery.trim() ? searchQuery.trim() : undefined,
        isPaid: paid ? true : undefined,
        category: selectedCategories.length > 0 ? selectedCategories[0] : undefined,
        source: selectedSourceId || undefined,
        superType: superType || undefined
      };

      console.log('Filtering with params:', params); // Debug log

      const filteredData = await UserApiService.getFilteredDatasetsPublic(params);
      setDatasets(filteredData.map((d: any) => ({
        ...d,
        tags: d.tags || [],
      })));
      
      // Estimate total items - if we got less than itemsPerPage, we're on the last page
      // Otherwise, estimate based on current data
      if (filteredData.length < itemsPerPage) {
        setTotalItems((currentPage - 1) * itemsPerPage + filteredData.length);
      } else {
        // Estimate higher for pagination (this is a rough estimate)
        setTotalItems(currentPage * itemsPerPage + 1);
      }
      
    } catch (error) {
      console.error('Failed to load filtered datasets:', error);
      setError(error instanceof Error ? error.message : 'Failed to load filtered datasets');
      
      // On error, fallback to showing all datasets
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        let allData;
        if (token) {
          // Authenticated: use authenticated endpoint
          allData = await UserApiService.getAllUploadedDatasets(itemsPerPage, (currentPage - 1) * itemsPerPage);
        } else {
          // Unauthenticated: use public endpoint
          allData = await UserApiService.getAllUploadedDatasetsPublic(itemsPerPage, (currentPage - 1) * itemsPerPage);
        }
        setDatasets(allData.map((d: any) => ({
          ...d,
          tags: d.tags || [],
        })));
        setTotalItems(allData.length);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
      }
    }
  };

  return {
    datasets,
    categories,
    sources,
    loading,
    error,
    totalItems,
    loadData,
    loadFilteredDatasets,
  };
};
