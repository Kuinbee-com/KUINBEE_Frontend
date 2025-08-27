import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationInfo {
  region?: string;
  country?: string;
}

interface DatasetLocationInfoProps {
  locationInfo?: LocationInfo;
}

const DatasetLocationInfo: React.FC<DatasetLocationInfoProps> = ({ locationInfo }) => (
  <div className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden" style={{ boxShadow: '0 10px 40px 0 rgba(26,34,64,0.12)' }}>
    <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
      <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent flex items-center gap-2">
        <MapPin className="w-4 h-4" />
        Data Coverage
      </h3>
    </div>
    <div className="p-4 sm:p-6 space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-600 font-medium text-sm">Region:</span>
        <span className="font-medium text-[#1a2240] text-sm">{locationInfo?.region}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600 font-medium text-sm">Coverage:</span>
        <span className="font-medium text-[#1a2240] text-sm">{locationInfo?.country}</span>
      </div>
    </div>
  </div>
);

export default DatasetLocationInfo;
