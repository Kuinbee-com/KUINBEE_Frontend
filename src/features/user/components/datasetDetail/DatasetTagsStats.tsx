import React from 'react';
import { Badge } from '@/shared/components/ui/badge';

interface DatasetTagsStatsProps {
  license?: string;
}

const DatasetTagsStats: React.FC<DatasetTagsStatsProps> = ({ license }) => (
  <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
    <Badge
      variant="outline"
      className="bg-emerald-50 text-emerald-700 border-emerald-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm"
    >
      Active
    </Badge>
    {license && (
      <Badge
        variant="outline"
        className="bg-purple-50 text-purple-700 border-purple-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm"
      >
        {license}
      </Badge>
    )}
  </div>
);

export default DatasetTagsStats;
