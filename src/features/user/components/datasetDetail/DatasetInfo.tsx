import React from 'react';

interface BirthInfo {
  lastUpdatedAt?: string;
}

interface DatasetInfoProps {
  birthInfo?: BirthInfo;
}

const DatasetInfo: React.FC<DatasetInfoProps> = ({ birthInfo }) => (
  <div className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden" style={{ boxShadow: '0 10px 40px 0 rgba(26,34,64,0.12)' }}>
    <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
      <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">Dataset Info</h3>
    </div>
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex justify-between">
        <span className="text-gray-600 font-medium text-sm">Updated:</span>
        <span className="font-medium text-[#1a2240] text-sm">{birthInfo?.lastUpdatedAt ? new Date(birthInfo.lastUpdatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' }) : 'N/A'}</span>
      </div>
    </div>
  </div>
);

export default DatasetInfo;
