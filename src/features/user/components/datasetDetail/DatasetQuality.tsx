import React from 'react';
import { Shield } from 'lucide-react';

interface DatasetQualityProps {
  dataQuality?: string;
}

const DatasetQuality: React.FC<DatasetQualityProps> = ({ dataQuality }) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
    <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-50">
      <h2 className="text-xl font-bold text-[#1a2240] flex items-center gap-3">
        <Shield className="w-6 h-6 text-emerald-600" />
        Data Quality & Verification
      </h2>
    </div>
    <div className="p-4 sm:p-8">
      <p className="text-lg text-gray-700 leading-relaxed">{dataQuality}</p>
    </div>
  </div>
);

export default DatasetQuality;
