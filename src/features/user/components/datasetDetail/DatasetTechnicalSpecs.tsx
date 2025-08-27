import React from 'react';
import { Badge } from '@/shared/components/ui/badge';
import { FileText } from 'lucide-react';

interface DataFormatInfo {
  rows?: number;
  cols?: number;
  fileFormat?: string;
}

interface DatasetTechnicalSpecsProps {
  dataFormatInfo?: DataFormatInfo;
}

const DatasetTechnicalSpecs: React.FC<DatasetTechnicalSpecsProps> = ({ dataFormatInfo }) => (
  <div className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden" style={{ boxShadow: '0 10px 40px 0 rgba(26,34,64,0.12)' }}>
    <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/70 bg-gradient-to-r from-[#1a2240]/5 to-[#1a2240]/5">
      <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Technical Specs
      </h3>
    </div>
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium text-sm">Rows:</span>
        <span className="font-bold text-[#1a2240] text-sm">{dataFormatInfo?.rows?.toLocaleString()}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 font-medium text-sm">Columns:</span>
        <span className="font-bold text-[#1a2240] text-sm">{dataFormatInfo?.cols}</span>
      </div>
      {dataFormatInfo?.fileFormat && (
        <div>
          <span className="text-gray-600 font-medium text-sm block mb-1">Format:</span>
          <Badge variant="outline" className="bg-white/70 text-[#1a2240] border-[#1a2240]/20 font-semibold text-xs">{dataFormatInfo.fileFormat}</Badge>
        </div>
      )}
    </div>
  </div>
);

export default DatasetTechnicalSpecs;
