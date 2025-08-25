// Define a Source interface for better type safety
export interface Source {
  id: string;
  name: string;
  // Add other fields if needed
}

// Pagination helper functions
export const getPaginationInfo = (currentPage: number, itemsPerPage: number, totalItems: number) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return {
    totalPages,
    startItem,
    endItem
  };
};

// Generate page numbers for pagination
export const getPageNumbers = (currentPage: number, totalPages: number, maxVisiblePages: number = 5) => {
  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
};

// Sort options for marketplace
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "downloads", label: "Most Downloaded" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" }
];
