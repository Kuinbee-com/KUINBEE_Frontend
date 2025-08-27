import * as React from 'react';
import { Switch } from '@/shared/components/ui/switch';
import type { Category } from '../../types';

interface CategoryPillsProps {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  paid: boolean;
  setPaid: (paid: boolean) => void;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  paid,
  setPaid,
}) => {
  const handleCategoryToggle = (categoryId: string) => {
    // Single category selection - if same category is clicked, deselect it
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories([]);
    } else {
      // Replace with new single category selection
      setSelectedCategories([categoryId]);
    }
  };

  return (
    <div className="mb-8 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Category Pills - Left Side with more width */}
        <div className="w-full lg:max-w-5xl lg:flex-1">
          {/* Mobile - Horizontal scroll */}
          <div className="flex lg:hidden w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 pb-2 min-w-max items-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-5 sm:px-7 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md border border-[#e3e6f3] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 ${
                    selectedCategories.includes(category.id)
                      ? "bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] text-white scale-105 border-none"
                      : "bg-white text-[#1a2240] hover:bg-gradient-to-r hover:from-[#e3e6f3] hover:to-[#f7f8fa]"
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Desktop - Flexible wrap layout to prevent overlap */}
          <div className="hidden lg:block">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-md border border-[#e3e6f3] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 ${
                    selectedCategories.includes(category.id)
                      ? "bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] text-white scale-105 border-none"
                      : "bg-white text-[#1a2240] hover:bg-gradient-to-r hover:from-[#e3e6f3] hover:to-[#f7f8fa]"
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Paid Toggle - Right Side */}
        <div className="flex lg:justify-end w-full lg:w-auto lg:flex-shrink-0">
          <div className="px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold flex items-center gap-3 whitespace-nowrap shadow-md border border-[#e3e6f3] bg-white text-[#1a2240] hover:scale-105 hover:shadow-lg transition-all duration-200">
            <span className="font-semibold">Paid</span>
            <Switch
              checked={paid}
              onCheckedChange={setPaid}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#1a2240] data-[state=checked]:to-[#24305e] data-[state=unchecked]:bg-[#e3e6f3] border-2 border-[#e3e6f3] shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPills;
