import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import type { MarketplaceDataset, Category } from '../../types';
import { CATEGORY_HASHTAGS } from '../../utils/categoryHashtags';

// Helper to normalize category names for hashtag lookup
function normalizeCategoryKey(category: string): string {
  return category
    .replace(/&/g, 'and')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

// Build a normalized hashtag map for robust lookup
const NORMALIZED_CATEGORY_HASHTAGS: Record<string, string[]> = Object.fromEntries(
  Object.entries(CATEGORY_HASHTAGS).map(([key, value]) => [normalizeCategoryKey(key), value])
);
import { getPaginationInfo, getPageNumbers } from '../../utils/marketplaceHelpers';

interface DataTableProps {
  datasets: MarketplaceDataset[];
  categories: Category[];
  selectedCategories: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

const DataTable: React.FC<DataTableProps> = ({
  datasets,
  categories,
  selectedCategories,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalItems,
}) => {
  const navigate = useNavigate();
  
  const { totalPages, startItem, endItem } = getPaginationInfo(currentPage, itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex-1 w-full lg:min-w-[700px]">
      <div className="bg-white border border-[#e3e6f3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ boxShadow: '0 8px 32px 0 rgba(26,34,64,0.12)' }}>
        {/* Table Header */}
        <div className="px-4 lg:px-8 py-4 lg:py-6 bg-gradient-to-r from-[#ffffff] to-[#ffffff] border-b border-[#e3e6f3]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
              {selectedCategories.length === 0
                ? "All Datasets"
                : `${categories.filter(cat => selectedCategories.includes(cat.id)).map(cat => cat.name).join(", ")} Datasets`}
            </h2>
            
            {/* Pagination Info and Controls */}
            {totalItems > 0 && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Showing {startItem}-{endItem} of {totalItems} datasets
                </span>
                
                {/* Pagination Controls - only show if more than 1 page */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0 rounded-full border border-[#e3e6f3] bg-white text-[#1a2240] font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 hover:bg-[#e3e6f3] active:bg-[#bfc6e0] shadow-none"
                    >
                      ←
                    </Button>
                    {getPageNumbers(currentPage, totalPages).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`h-8 w-8 p-0 rounded-full border font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 shadow-none
                          ${currentPage === page
                            ? "bg-[#1a2240] text-white border-[#1a2240] hover:bg-[#24305e] hover:text-white active:bg-[#050a24]"
                            : "border-[#e3e6f3] bg-white text-[#1a2240] hover:bg-[#e3e6f3] hover:text-[#1a2240] active:bg-[#bfc6e0]"}
                        `}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0 rounded-full border border-[#e3e6f3] bg-white text-[#1a2240] font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 hover:bg-[#e3e6f3] active:bg-[#bfc6e0] shadow-none"
                    >
                      →
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] border-b-2 border-[#e3e6f3] hover:bg-gradient-to-r hover:from-[#f9fbfd] hover:to-[#f2f7fb]">
                <TableHead className="h-14 px-6 text-left align-middle text-[#1a2240] font-bold text-base tracking-wide">
                  Dataset Information
                </TableHead>
                <TableHead className="text-[#1a2240] font-bold text-base text-center">
                  Category
                </TableHead>
                <TableHead className="text-[#1a2240] font-bold text-base text-center">
                  Downloads
                </TableHead>
                <TableHead className="text-[#1a2240] font-bold text-base text-center">
                  Price
                </TableHead>
                <TableHead className="text-center text-[#1a2240] font-bold text-base">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset, index) => (
                <TableRow
                  key={dataset.id}
                  className={`border-b-4 border-[#e3e6f3] hover:bg-gradient-to-r hover:from-[#f9fbfd]/70 hover:to-[#f2f7fb]/50 transition-all duration-300 group ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-[#fdfefe] to-[#fbfdff]'
                  } hover:shadow-lg`} 
                  style={{ boxShadow: '0 2px 0 0 #e3e6f3', marginBottom: '4px' }}
                >
                  {/* Dataset Information Column */}
                  <TableCell className="px-6 py-6">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <h3 className="font-bold text-[#1a2240] text-lg leading-tight max-w-md group-hover:text-[#24305e] transition-colors">
                          {dataset.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 max-w-lg">
                        {dataset.overview?.trim()
                          ? dataset.overview
                          : 'No description available'}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {/* Category descriptive hashtags (robust lookup) */}
                          {(NORMALIZED_CATEGORY_HASHTAGS[normalizeCategoryKey(dataset.category)] || []).map((hashtag) => (
                            <Badge
                              key={hashtag}
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-[#1a2240]/10 to-[#1a2240]/15 text-[#1a2240] border-none px-2 py-0.5 font-medium hover:from-[#1a2240]/15 hover:to-[#1a2240]/20 transition-all duration-200"
                            >
                              {hashtag}
                            </Badge>
                          ))}
                          {/* Tags as hashtags */}
                          {(dataset.tags || []).slice(0, 3).map((tag: string) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-[#1a2240]/8 to-[#1a2240]/12 text-[#1a2240] border-none px-2 py-0.5 font-medium hover:from-[#1a2240]/15 hover:to-[#1a2240]/20 transition-all duration-200"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          Updated {dataset.lastUpdatedAt ? new Date(dataset.lastUpdatedAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="bg-white text-[#1a2240] border-2 border-[#1a2240]/20 text-sm px-3 py-1.5 font-semibold rounded-lg shadow-sm hover:border-[#1a2240]/40 hover:shadow-md transition-all duration-200"
                    >
                      {dataset.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="p-1.5 bg-[#1a2240]/10 rounded-full">
                        <Download className="w-4 h-4 text-[#1a2240]" />
                      </div>
                      <span className="text-base font-bold text-[#1a2240]">{dataset.totalDownloads || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center">
                      <span
                        className={`font-bold text-xl ${
                          !dataset.isPaid 
                            ? "text-emerald-600" 
                            : "text-[#1a2240]"
                        }`}
                      >
                        {dataset.isPaid ? `$${dataset.price || 0}` : "Free"}
                      </span>
                      {!dataset.isPaid && (
                        <span className="text-xs text-emerald-500 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                          No cost
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#1a2240] to-[#24305e] hover:from-[#24305e] hover:to-[#2c3a6b] text-white border-none px-4 py-2 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigate(`/user/dataset/${dataset.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-8 py-6 bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f4] border-t border-[#e3e6f3]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">
                Last updated: 2 hours ago
              </span>
              {totalItems > 0 && (
                <span className="text-xs text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
              )}
            </div>
            
            {/* Additional pagination controls for larger screens */}
            {totalPages > 1 && (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="text-xs"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="text-xs"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
