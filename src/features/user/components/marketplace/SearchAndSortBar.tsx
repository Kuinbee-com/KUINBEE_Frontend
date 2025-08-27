import * as React from "react"; 
import { useRef } from 'react';
import { Search } from 'lucide-react';
import { SORT_OPTIONS } from '../../utils/marketplaceHelpers';

interface SearchAndSortBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
  sortDropdownOpen: boolean;
  setSortDropdownOpen: (open: boolean) => void;
}

const SearchAndSortBar: React.FC<SearchAndSortBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedSort,
  setSelectedSort,
  sortDropdownOpen,
  setSortDropdownOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-[1600px] mx-auto pb-8 px-4 relative z-50">
      <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6 relative">
        <div className="flex-1 w-full">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a2240] opacity-80 w-6 h-6" />
            <input
              type="text"
              placeholder="Search datasets, tags, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-5 h-14 w-full text-lg font-medium bg-white rounded-full shadow-md focus:shadow-lg focus:shadow-[#1a2240]/30 focus:ring-2 focus:ring-[#1a2240]/20 outline-none transition-all duration-200 placeholder:text-gray-400"
              autoComplete="off"
              style={{ boxShadow: '0 2px 12px 0 rgba(26,34,64,0.10)' }}
            />
          </div>
        </div>
        <div className="w-full md:w-64 mt-4 md:mt-0 flex justify-end relative z-[60]">
          <div className="w-full flex flex-col items-end">
            <div className="relative w-full" ref={dropdownRef}>
              <button
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                className="h-10 sm:h-11 w-full rounded-full bg-white text-[#1a2240] text-sm sm:text-base font-semibold shadow-md px-2 sm:px-3 pr-4 sm:pr-6 focus:shadow-lg focus:shadow-[#1a2240]/30 focus:ring-2 focus:ring-[#1a2240]/20 outline-none transition-all duration-200 hover:shadow-lg hover:shadow-[#1a2240]/20 cursor-pointer border-none text-left flex items-center justify-between"
                style={{
                  boxShadow: '0 0.125rem 0.75rem 0 rgba(26,34,64,0.10), inset 0 0.0625rem 0.25rem 0 rgba(26,34,64,0.04)'
                }}
              >
                <span className="text-[#1a2240] font-semibold">Sort By</span>
                <div className="flex items-center justify-center bg-white rounded-full shadow-sm w-5 h-5 border border-[#e3e6f3] ml-2">
                  <svg className={`w-3.8 h-3.8 fill-current transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                  </svg>
                </div>
              </button>
              {sortDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#e3e6f3] z-[9999] overflow-hidden"
                     style={{ boxShadow: '0 8px 32px 0 rgba(26,34,64,0.15)' }}>
                  <div className="py-2">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedSort(option.value);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-base font-semibold transition-all duration-200 hover:bg-gradient-to-r hover:from-[#1a2240]/10 hover:to-[#1a2240]/5 ${
                          selectedSort === option.value 
                            ? 'bg-gradient-to-r from-[#1a2240]/15 to-[#1a2240]/10 text-[#1a2240]' 
                            : 'text-gray-700 hover:text-[#1a2240]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
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

export default SearchAndSortBar;
