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
      
      // For initial load, we need to estimate total items
      // If we got less than requested, that's the total
      if (datasetsData.length < 20) {
        setTotalItems(datasetsData.length);
      } else {
        // If we got exactly 20, there might be more - check next page
        try {
          const nextPageData = isAuthenticated 
            ? await UserApiService.getAllUploadedDatasets(1, 20)
            : await UserApiService.getAllUploadedDatasetsPublic(1, 20);
          
          if (nextPageData && nextPageData.length > 0) {
            // Conservative estimate - there are more than 20 items
            setTotalItems(25); // Estimate at least 25
          } else {
            // Exactly 20 items
            setTotalItems(20);
          }
        } catch (error) {
          // If check fails, conservative estimate
          setTotalItems(25);
        }
      }
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
      
      console.log('loadFilteredDatasets called:', { 
        currentPage, 
        itemsPerPage, 
        searchQuery, 
        selectedCategories, 
        selectedSourceId, 
        paid, 
        superType 
      });
      
      // Check if any filters are actually applied
      const hasFilters = !!(
        (searchQuery && searchQuery.trim()) ||
        paid ||
        selectedCategories.length > 0 ||
        selectedSourceId ||
        superType
      );

      console.log('hasFilters:', hasFilters);

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
        
        // For unfiltered data, estimate total items properly
        console.log('Unfiltered data received:', allData.length, 'items');
        if (allData.length < itemsPerPage) {
          // If we got less than requested, that's the total for this page
          const totalCount = (currentPage - 1) * itemsPerPage + allData.length;
          console.log('Setting totalItems to:', totalCount, '(partial page)');
          setTotalItems(totalCount);
        } else {
          // If we got exactly itemsPerPage, check if there are more
          try {
            const nextPageData = token
              ? await UserApiService.getAllUploadedDatasets(1, currentPage * itemsPerPage)
              : await UserApiService.getAllUploadedDatasetsPublic(1, currentPage * itemsPerPage);
            
            if (nextPageData && nextPageData.length > 0) {
              // There are more items
              const estimatedTotal = currentPage * itemsPerPage + Math.min(5, nextPageData.length);
              console.log('Setting totalItems to:', estimatedTotal, '(estimated - more items exist)');
              setTotalItems(estimatedTotal);
            } else {
              // No more items, exact total
              const exactTotal = currentPage * itemsPerPage;
              console.log('Setting totalItems to:', exactTotal, '(exact - no more items)');
              setTotalItems(exactTotal);
            }
          } catch (error) {
            // Conservative estimate
            const conservativeTotal = currentPage * itemsPerPage + 1;
            console.log('Setting totalItems to:', conservativeTotal, '(conservative estimate)');
            setTotalItems(conservativeTotal);
          }
        }
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
      console.log('Filtered data received:', filteredData.length, 'items');
      
      setDatasets(filteredData.map((d: any) => ({
        ...d,
        tags: d.tags || [],
      })));
      
      // Better estimation logic for pagination without backend changes
      if (filteredData.length < itemsPerPage) {
        // If we got less than requested, we're on the last page
        const totalCount = (currentPage - 1) * itemsPerPage + filteredData.length;
        console.log('Setting totalItems to:', totalCount, '(filtered - partial page)');
        setTotalItems(totalCount);
      } else {
        // If we got exactly itemsPerPage, there might be more pages
        // Make another request to check if there are more items
        try {
          const nextPageParams = {
            ...params,
            limit: 1, // Just check if there's one more item
            offset: currentPage * itemsPerPage
          };
          const nextPageData = await UserApiService.getFilteredDatasetsPublic(nextPageParams);
          
          if (nextPageData && nextPageData.length > 0) {
            // There are more items, estimate conservatively
            const estimatedTotal = currentPage * itemsPerPage + Math.min(5, nextPageData.length);
            console.log('Setting totalItems to:', estimatedTotal, '(filtered - more items exist)');
            setTotalItems(estimatedTotal);
          } else {
            // No more items, set exact total
            const exactTotal = (currentPage - 1) * itemsPerPage + filteredData.length;
            console.log('Setting totalItems to:', exactTotal, '(filtered - exact total)');
            setTotalItems(exactTotal);
          }
        } catch (error) {
          // If check fails, use conservative estimate
          const conservativeTotal = currentPage * itemsPerPage + 1;
          console.log('Setting totalItems to:', conservativeTotal, '(filtered - conservative estimate)');
          setTotalItems(conservativeTotal);
        }
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
