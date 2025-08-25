import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="w-full pt-10 sm:pt-20 pb-6 px-0 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 relative z-10">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-[700] mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-none pt-4 sm:pt-8 text-center"
            style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
          >
            Discover Premium Datasets
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 text-center">
            Access high-quality, curated datasets for your machine learning, analytics, and research projects
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mt-8 sm:mt-12 px-4">
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="text-2xl sm:text-3xl font-bold text-[#1a2240] mb-2">10,000+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Premium Datasets</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200">
              <div className="text-2xl sm:text-3xl font-bold text-[#1a2240] mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-200 sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#1a2240] mb-2">120,000+</div>
              <div className="text-sm sm:text-base text-gray-600 font-medium">Total Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
