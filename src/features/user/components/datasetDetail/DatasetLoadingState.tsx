import React from 'react';

const DatasetLoadingState: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2240] mx-auto mb-4"></div>
      <p className="text-gray-600">Loading dataset...</p>
    </div>
  </div>
);

export default DatasetLoadingState;
