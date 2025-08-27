import React from 'react';
import { Badge } from '@/shared/components/ui/badge';

interface Category {
  id: string;
}

interface DatasetCategoriesProps {
  categories: Category[];
}

const DatasetCategories: React.FC<DatasetCategoriesProps> = ({ categories }) => (
  <div className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden" style={{ boxShadow: '0 10px 40px 0 rgba(26,34,64,0.12)' }}>
    <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
      <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">Categories</h3>
    </div>
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap gap-2">
        {categories.filter(cat => cat.id).map((cat, idx) => (
          <Badge key={idx} variant="outline" className="bg-white/70 text-gray-700 border-gray-200 px-3 py-1 font-medium text-xs">{cat.id}</Badge>
        ))}
      </div>
    </div>
  </div>
);

export default DatasetCategories;
