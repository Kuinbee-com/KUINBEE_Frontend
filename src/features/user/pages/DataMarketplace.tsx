import React, { useState, useEffect, useRef } from "react";
import { AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";
import HeroSection from "../components/marketplace/HeroSection";
import SearchAndSortBar from "../components/marketplace/SearchAndSortBar";
import CategoryPills from "../components/marketplace/CategoryPills";
import FilterSidebar from "../components/marketplace/FilterSidebar";
import DataTable from "../components/marketplace/DataTable";
import MobileMenu from "../components/marketplace/MobileMenu";
import { useMarketplaceData } from "../hooks/useMarketplaceData";

const DataMarketplace: React.FC = () => {
  const { showProfile, showCart } = useOverlay();
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  // Early return for loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2240] mx-auto mb-4"></div>
          <p className="text-[#1a2240] font-medium">Loading datasets...</p>
        </div>
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8fa]">
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
    );
  }

    // Add extra vertical height to ensure filter section is visible
    return (
  <div className="min-h-screen relative bg-[#f7f8fa] pb-32">
      {/* Main gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <div className="sticky top-0 z-50 w-full  border-gray-200/20" style={{background: 'transparent'}}>
          <div className="flex items-center justify-center w-full px-4 sm:px-8 py-4 min-h-[72px] relative">
            {/* Center - Navbar */}
            <div className="flex-grow w-full max-w-4xl">
              <Navbar />
            </div>
            
            {/* Right side - Icons and Hamburger - Positioned absolutely */}
            <div className="absolute right-4 sm:right-8 flex items-center gap-4">
              {/* Desktop Icons */}
              <div className="hidden lg:flex">
                <OverlayTriggers />
              </div>
              
              {/* Mobile Menu */}
              <MobileMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
                showCart={showCart}
                showProfile={showProfile}
              />
            </div>
          </div>
        </div>

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

        {/* Category Pills Section */}
  <div className="max-w-[1600px] mx-auto px-4 pb-32">
          <CategoryPills
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            paid={paid}
            setPaid={setPaid}
          />

          {/* Main Content Area with Sidebar and Table */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Left Sidebar */}
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

            {/* Right Side - Enhanced Data Table */}
            <DataTable
              datasets={datasets}
              categories={categories}
              selectedCategories={selectedCategories}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMarketplace;