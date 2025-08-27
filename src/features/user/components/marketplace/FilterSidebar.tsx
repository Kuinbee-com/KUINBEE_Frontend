import React, { useRef, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Switch } from '@/shared/components/ui/switch';
import { Slider } from '@/shared/components/ui/slider';
import type { Category } from '../../types';
import type { Source } from '../../utils/marketplaceHelpers';
import { datasetSuperTypeOptions } from '../../constants';

interface FilterSidebarProps {
  categories: Category[];
  sources: Source[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  paid: boolean;
  setPaid: (paid: boolean) => void;
  price: number;
  setPrice: (price: number) => void;
  sourceSearchQuery: string;
  setSourceSearchQuery: (query: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  selectedSourceId: string;
  setSelectedSourceId: (sourceId: string) => void;
  sourceDropdownOpen: boolean;
  setSourceDropdownOpen: (open: boolean) => void;
  superType: string;
  setSuperType: (superType: string) => void;
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  sources,
  selectedCategories,
  setSelectedCategories,
  paid,
  setPaid,
  price,
  setPrice,
  sourceSearchQuery,
  setSourceSearchQuery,
  selectedSource,
  setSelectedSource,
  selectedSourceId,
  setSelectedSourceId,
  sourceDropdownOpen,
  setSourceDropdownOpen,
  superType,
  setSuperType,
  filtersOpen,
  setFiltersOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const sourceDropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside for source dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(event.target as Node)) {
        setSourceDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSourceDropdownOpen]);

  const handleCategoryToggle = (categoryId: string) => {
    // Single category selection - if same category is clicked, deselect it
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories([]);
    } else {
      // Replace with new single category selection
      setSelectedCategories([categoryId]);
    }
  };

  const handleSuperTypeToggle = (type: string) => {
    // If same type is clicked, deselect it (set to empty string)
    if (superType === type) {
      setSuperType("");
    } else {
      // Replace with new selection
      setSuperType(type);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSource("");
    setSelectedSourceId("");
    setSourceSearchQuery("");
    setPaid(false);
    setPrice(0);
    setSuperType("");
    setSearchQuery("");
  };

  return (
    <aside 
      className="w-full lg:w-80 lg:flex-shrink-0 bg-white rounded-3xl border border-[#e3e6f3] shadow-xl p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 overflow-y-auto scrollbar-white lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)]"
      style={{ boxShadow: '0 4px 24px 0 rgba(26,34,64,0.10)', background: '#fff' }}
    >
          <div className="flex items-center gap-2 mb-2 lg:mb-4">
            <Filter className="h-6 w-6 text-[#24305e]" />
            <h3 className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">Filters</h3>
            <button className="ml-auto lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setFiltersOpen((prev) => !prev)}>
              <svg className={`w-5 h-5 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <div className={`flex flex-col gap-6 lg:gap-8 transition-all duration-300 ${filtersOpen ? 'block' : 'hidden lg:flex'}`}>
            {/* Paid Toggle */}
            <section>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg font-bold text-[#24305e]">Paid</span>
                <Switch checked={paid} onCheckedChange={setPaid} className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#1a2240] data-[state=checked]:to-[#24305e] data-[state=unchecked]:bg-[#e3e6f3] border-2 border-[#e3e6f3] shadow" />
              </div>
            </section>
            {/* Price Bar - only when paid is enabled */}
            {paid && (
              <section>
                <span className="text-base font-semibold text-[#24305e] mb-2 block">Price:</span>
                <div className="relative w-full">
                  <Slider
                    value={[price]}
                    onValueChange={([val]) => setPrice(val)}
                    min={0}
                    max={5000}
                    step={1}
                    className="w-full h-3 bg-[#e3e6f3] rounded-full shadow-md [&_.slider-thumb]:bg-gradient-to-r [&_.slider-thumb]:from-[#1a2240] [&_.slider-thumb]:to-[#24305e] [&_.slider-thumb]:border-2 [&_.slider-thumb]:border-white [&_.slider-thumb]:shadow-lg [&_.slider-thumb]:rounded-full"
                  />
                  {/* Value label above thumb */}
                  <div
                    className="absolute left-0 -top-7 z-10"
                    style={{
                      left: `calc(${price / 500 * 10}% - 24px)`
                    }}
                  >
                    <span className="bg-[#1a2240] text-white text-xs font-bold px-2 py-1 rounded shadow">
                      ₹{price}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-[#24305e] font-bold text-base mt-1">
                  <span>₹0</span>
                  <span>₹500+</span>
                </div>
              </section>
            )}
            {/* Category Filter */}
            <section>
              <h4 className="text-lg font-bold text-[#24305e] mb-3">Category</h4>
              <div className="flex flex-col gap-2">
                {categories.map((category) => (
                  <div key={category.id} 
                    className={`flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 transition-colors ${selectedCategories.includes(category.id) ? "bg-gradient-to-r from-[#e3e6f3] to-[#f7f8fa]" : "hover:bg-[#f7f8fa]"}`}
                    onClick={() => handleCategoryToggle(category.id)}
                  >
                    <div
                      className={`w-6 h-6 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 flex items-center justify-center ${selectedCategories.includes(category.id) ? 'bg-[#1a2240] border-[#1a2240]' : 'border-[#1a2240] bg-white hover:bg-[#f7f8fa]'}`}
                      style={{ boxShadow: '0 0 0 2px #e3e6f3' }}
                    >
                      {selectedCategories.includes(category.id) && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className={`text-base font-medium ${selectedCategories.includes(category.id) ? "text-[#24305e]" : "text-gray-700"}`}>{category.name}</span>
                  </div>
                ))}
              </div>
            </section>
            {/* Source Filter */}
            <section>
              <h4 className="text-lg font-bold text-[#24305e] mb-3">Source</h4>
              <div ref={sourceDropdownRef} className="relative">
                <input
                  type="text"
                  placeholder={selectedSource || "Search sources..."}
                  value={sourceSearchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSourceSearchQuery(e.target.value);
                    setSourceDropdownOpen(true);
                  }}
                  onClick={() => {
                    if (sourceDropdownOpen) {
                      // If dropdown is open, close it
                      setSourceDropdownOpen(false);
                    } else {
                      // If dropdown is closed, open it and clear search to show all sources
                      if (sourceSearchQuery === selectedSource) {
                        setSourceSearchQuery("");
                      }
                      setSourceDropdownOpen(true);
                    }
                  }}
                  className="w-full px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white focus:ring-2 focus:ring-[#1a2240]/20 focus:border-[#1a2240] transition-all cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.5rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em',
                    paddingRight: '2.5rem'
                  }}
                />
                {sourceDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e3e6f3] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    <button
                      className="w-full px-4 py-3 text-left hover:bg-[#f7f8fa] transition-colors border-b border-gray-100 text-[#24305e] font-medium"
                      onClick={() => {
                        setSelectedSource("");
                        setSelectedSourceId("");
                        setSourceSearchQuery("");
                        setSourceDropdownOpen(false);
                      }}
                    >
                      All Sources
                    </button>
                    {sources
                      .filter(source => 
                        source.name.toLowerCase().includes(sourceSearchQuery.toLowerCase())
                      )
                      .map((source) => (
                        <button
                          key={source.id}
                          className={`w-full px-4 py-3 text-left hover:bg-[#f7f8fa] transition-colors text-gray-700 ${
                            selectedSourceId === source.id ? 'bg-[#e3e6f3] text-[#24305e] font-medium' : ''
                          }`}
                          onClick={() => {
                            setSelectedSource(source.name);
                            setSelectedSourceId(source.id);
                            setSourceSearchQuery(source.name);
                            setSourceDropdownOpen(false);
                          }}
                        >
                          {source.name}
                        </button>
                      ))
                    }
                    {sources.filter(source => 
                      source.name.toLowerCase().includes(sourceSearchQuery.toLowerCase())
                    ).length === 0 && sourceSearchQuery && (
                      <div className="px-4 py-3 text-gray-500 text-center">
                        No sources found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>
            {/* SuperType Filter */}
            <section>
              <h4 className="text-lg font-bold text-[#24305e] mb-3">Dataset Type</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 cursor-pointer group" onClick={() => handleSuperTypeToggle("")}>
                  <div className="relative mt-0.5" style={{ flexShrink: 0 }}>
                    <div 
                      className={`rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        superType === '' 
                          ? 'border-[#1a2240] bg-[#1a2240]' 
                          : 'border-[#e3e6f3] bg-white group-hover:border-[#bfc6e0]'
                      }`}
                      style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }}
                    >
                      {superType === '' && (
                        <div 
                          className="bg-white rounded-full" 
                          style={{ width: '8px', height: '8px' }}
                        ></div>
                      )}
                    </div>
                  </div>
                  <span className={`transition-colors leading-4 ${
                    superType === '' 
                      ? 'text-[#24305e] font-medium' 
                      : 'text-gray-700 group-hover:text-[#1a2240]'
                  }`}>All Types</span>
                </div>
                {datasetSuperTypeOptions.map((option) => (
                  <div key={option} className="flex items-start space-x-3 cursor-pointer group" onClick={() => handleSuperTypeToggle(option)}>
                    <div className="relative mt-0.5" style={{ flexShrink: 0 }}>
                      <div 
                        className={`rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          superType === option 
                            ? 'border-[#1a2240] bg-[#1a2240]' 
                            : 'border-[#e3e6f3] bg-white group-hover:border-[#bfc6e0]'
                        }`}
                        style={{ width: '16px', height: '16px', minWidth: '16px', minHeight: '16px' }}
                      >
                        {superType === option && (
                          <div 
                            className="bg-white rounded-full" 
                            style={{ width: '8px', height: '8px' }}
                          ></div>
                        )}
                      </div>
                    </div>
                    <span className={`transition-colors leading-4 ${
                      superType === option 
                        ? 'text-[#24305e] font-medium' 
                        : 'text-gray-700 group-hover:text-[#1a2240]'
                    }`}>{option}</span>
                  </div>
                ))}
              </div>
            </section>
            {/* Clear Filters Button */}
            <Button variant="outline" className="w-full border-2 border-[#e3e6f3] bg-white text-[#24305e] hover:bg-[#f7f8fa] hover:text-[#24305e] text-base py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg" onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          </div>
    </aside>
  );
};

export default FilterSidebar;
