import React from 'react';
import { Badge } from '@/shared/components/ui/badge';

interface DatasetHeaderProps {
  title: string;
  category: string;
  source: string;
  superType?: string | string[];
  superTypeOptions: string[];
  overview?: string;
}

const DatasetHeader: React.FC<DatasetHeaderProps> = ({ title, category, source, superType, superTypeOptions, overview }) => (
  <div className="flex-1 min-w-0">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-tight" style={{ fontFamily: 'Impact, sans-serif' }}>{title}</h1>
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-semibold text-gray-600">Category:</span>
        <Badge className="bg-gradient-to-r from-[#1a2240]/10 to-[#24305e]/10 text-[#1a2240] border border-[#1a2240]/20 px-2 sm:px-4 py-1 sm:py-2 font-semibold text-xs sm:text-sm">{category}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs sm:text-sm font-semibold text-gray-600">Source:</span>
        <Badge variant="outline" className="bg-white/80 text-gray-700 border-gray-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm">{source}</Badge>
      </div>
      {superType && (
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-gray-600">Type:</span>
          {Array.isArray(superType)
            ? superType.map((type, idx) => superTypeOptions.includes(type) && (
                <Badge key={type + idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm">{type}</Badge>
              ))
            : superTypeOptions.includes(superType) && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm">{superType}</Badge>
              )}
        </div>
      )}
    </div>
    {overview && (
      <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-4xl">{overview}</p>
    )}
  </div>
);

export default DatasetHeader;
