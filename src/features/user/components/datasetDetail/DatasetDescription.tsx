import React from 'react';

interface DatasetDescriptionProps {
  description?: string;
}

const DatasetDescription: React.FC<DatasetDescriptionProps> = ({ description }) => (
  <div className="space-y-4">
    <p className="text-lg text-[#1a2240] leading-relaxed">
      {description && description.trim().length > 0
        ? description
        : 'No description available.'}
    </p>
  </div>
);

export default DatasetDescription;
