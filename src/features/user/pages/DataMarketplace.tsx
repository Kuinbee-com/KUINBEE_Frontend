import * as React from 'react'; 
import { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import ResponsiveHeader from "../components/ResponsiveHeader";
import HeroSection from "../components/marketplace/HeroSection";
import SearchAndSortBar from "../components/marketplace/SearchAndSortBar";
import CategoryPills from "../components/marketplace/CategoryPills";
import FilterSidebar from "../components/marketplace/FilterSidebar";
import DataTable from "../components/marketplace/DataTable";
import { useMarketplaceData } from "../hooks/useMarketplaceData";

const DataMarketplace: React.FC = () => {
  
  const {
    datasets,
    categories,
    sources,
    loading,
    error,
    totalItems,
    loadData,
    loadFilteredDatasets
  } = useMarketplaceData();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [superType, setSuperType] = useState("");
  const [sourceSearchQuery, setSourceSearchQuery] = useState("");
  const [sourceDropdownOpen, setSourceDropdownOpen] = useState(false);
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  
  // UI states
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  // Effect to handle filtering when filter values change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (categories.length > 0) { // Only filter after categories are loaded
        setCurrentPage(1); // Reset to first page when filters change
        loadFilteredDatasets(
          currentPage,
          itemsPerPage,
          searchQuery,
          selectedCategories,
          selectedSourceId,
          paid,
          superType
        );
      }
    }, 300); // Debounce to avoid too many API calls

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, selectedCategories, selectedSourceId, paid, superType]);

  // Effect to handle pagination changes (without resetting page)
  useEffect(() => {
    if (categories.length > 0) {
      loadFilteredDatasets(
        currentPage,
        itemsPerPage,
        searchQuery,
        selectedCategories,
        selectedSourceId,
        paid,
        superType
      );
    }
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Early return for error state only
  if (error) {
    return (
      <div className="min-h-screen relative bg-[#f7f8fa] pb-32">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
        <div className="relative z-20">
          <ResponsiveHeader />
          <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md p-8">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Data</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={loadData}
                className="bg-[#1a2240] hover:bg-[#24305e] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Add extra vertical height to ensure filter section is visible
  return (
    <div className="min-h-screen relative bg-[#f7f8fa] pb-32">
      {/* Main gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <ResponsiveHeader />

        {/* Hero Section */}
        <HeroSection />

        {/* Search and Sort Bar */}
        <SearchAndSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedSort={selectedSort}
          setSelectedSort={setSelectedSort}
          sortDropdownOpen={sortDropdownOpen}
          setSortDropdownOpen={setSortDropdownOpen}
        />

        {/* Category Pills Section with fixed height to prevent CLS */}
        <div className="max-w-[1600px] mx-auto px-4 pb-32">
          <div className="min-h-[60px] mb-8">
            {categories.length > 0 ? (
              <CategoryPills
                categories={categories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                paid={paid}
                setPaid={setPaid}
              />
            ) : (
              // Enhanced skeleton for category pills
              <div className="space-y-4">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-32 mb-4"></div>
                <div className="flex flex-wrap gap-3 animate-pulse">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center px-4"
                      style={{ width: `${100 + Math.random() * 80}px` }}
                    >
                      <div className="h-4 bg-white/60 rounded w-full"></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
                  <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area with Sidebar and Table */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Left Sidebar with fixed width to prevent CLS */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <FilterSidebar
                categories={categories}
                sources={sources}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                paid={paid}
                setPaid={setPaid}
                price={price}
                setPrice={setPrice}
                sourceSearchQuery={sourceSearchQuery}
                setSourceSearchQuery={setSourceSearchQuery}
                selectedSource={selectedSource}
                setSelectedSource={setSelectedSource}
                selectedSourceId={selectedSourceId}
                setSelectedSourceId={setSelectedSourceId}
                sourceDropdownOpen={sourceDropdownOpen}
                setSourceDropdownOpen={setSourceDropdownOpen}
                superType={superType}
                setSuperType={setSuperType}
                filtersOpen={filtersOpen}
                setFiltersOpen={setFiltersOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {/* Right Side - Enhanced Data Table with Progressive Loading */}
            <div className="flex-1 min-h-[600px]">
              {loading ? (
                // Enhanced skeleton loading for DataTable
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px] focus:outline-none" style={{ outline: 'none' }}>
                  <div className="p-6">
                    {/* Table header skeleton */}
                    <div className="flex justify-between items-center mb-6 pb-4 border-b">
                      <div className="h-6 bg-gray-200 rounded animate-pulse" style={{ width: '200px' }}></div>
                      <div className="h-5 bg-gray-200 rounded animate-pulse" style={{ width: '100px' }}></div>
                    </div>
                    
                    {/* Table rows skeleton */}
                    <div className="space-y-4">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-4 border-b border-gray-100 animate-pulse">
                          <div className="flex-1">
                            <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3" style={{ width: `${60 + Math.random() * 30}%` }} />
                            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2" style={{ width: `${40 + Math.random() * 20}%` }} />
                            <div className="flex gap-2">
                              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded" style={{ width: '60px' }} />
                              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded" style={{ width: '80px' }} />
                            </div>
                          </div>
                          <div className="flex gap-3 items-center">
                            <div className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full" />
                            <div className="h-9 w-24 bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 rounded-lg" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pagination skeleton */}
                    <div className="flex justify-center mt-8 pt-6 border-t">
                      <div className="flex gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : datasets.length > 0 ? (
                <DataTable
                  datasets={datasets}
                  categories={categories}
                  selectedCategories={selectedCategories}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={totalItems}
                />
              ) : (
                // Improved empty state with better design
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[600px] flex items-center justify-center focus:outline-none" style={{ outline: 'none' }}>
                  <div className="text-center max-w-md px-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1a2240]/10 to-[#1a2240]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-[#1a2240]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No datasets found</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      We couldn't find any datasets matching your current filters. Try adjusting your search criteria or browse our available categories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategories([]);
                          setSelectedSourceId("");
                          setPaid(false);
                          setSuperType("");
                        }}
                        className="px-6 py-3 bg-[#1a2240] hover:bg-[#24305e] text-white font-medium rounded-lg transition-colors shadow-sm"
                      >
                        Clear All Filters
                      </button>
                      <button
                        onClick={() => loadData()}
                        className="px-6 py-3 bg-white hover:bg-gray-50 text-[#1a2240] font-medium rounded-lg transition-colors border border-[#1a2240]/20 hover:border-[#1a2240]/30"
                      >
                        Refresh Data
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMarketplace;
