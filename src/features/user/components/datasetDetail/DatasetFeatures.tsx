import React from 'react';

interface Feature {
  content: string;
}

interface DatasetFeaturesProps {
  features?: Feature[];
  title?: string;
  icon?: 'dot' | 'check';
}

const DatasetFeatures: React.FC<DatasetFeaturesProps> = ({ features, title = "Key Features", icon = 'dot' }) => (
  <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-gray-100">
    <h3 className="text-lg font-bold text-[#1a2240] mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {features && features.length > 0 ? (
        features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-4">
            {icon === 'check' ? (
              <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <span className="w-3 h-3 bg-emerald-500 rounded-full inline-block flex-shrink-0"></span>
            )}
            <span className="font-semibold text-[#1a2240] text-base">{feature.content}</span>
          </div>
        ))
      ) : (
        <div className="col-span-2 text-center text-gray-500">No features available</div>
      )}
    </div>
  </div>
);

export default DatasetFeatures;
