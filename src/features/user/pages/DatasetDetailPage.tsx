"use client"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Database, Users, Shield, CheckCircle, FileText, MapPin, Download, ShoppingCart } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { OverlayTriggers } from "@/features/user/components/GlobalOverlaySystem";

// Sample dataset for demonstration
const sampleDataset = {
  title: "Global Climate Data Archive",
  primaryCategoryId: "Environment",
  sourceId: "NASA",
  superTypes: "Time Series",
  status: "Active",
  license: "Open Data Commons",
  isPaid: false,
  price: 0,
  aboutDatasetInfo: {
    overview: "Historical and real-time climate data from weather stations worldwide, including temperature, precipitation, and atmospheric pressure.",
    dataQuality: "Verified by NASA and cross-checked with global weather stations.",
    features: [
      { content: "Temperature, precipitation, pressure, humidity, wind" },
      { content: "Global coverage, 50+ years" },
      { content: "NASA verified" },
      { content: "Optimized for research" }
    ],
    dataFormatInfo: {
      rows: 1000000,
      cols: 12,
      fileFormat: "CSV"
    }
  },
  locationInfo: {
    region: "Global",
    country: "Worldwide"
  },
  createdAt: "2022-01-01T00:00:00Z",
  updatedAt: "2025-08-01T00:00:00Z",
  categories: [{ id: "Climate" }, { id: "Environment" }]
};

const DatasetDetailPage = () => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 1500);
  };

  const handleDirectDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1500);
  };

  const dataset = sampleDataset; // Use your actual dataset logic here

  return (
    <div className="relative z-10 max-w-screen-2xl mx-auto">
      {/* Top Navigation - Consistent with marketplace */}
      <div className="w-full">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Left side: Back to Marketplace */}
          <div className="flex-1">
            <Link to="/user/marketplace">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white/90 border border-[#e2e8f0] shadow hover:shadow-md transition-all duration-200 hover:scale-105">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#1a2240]" />
                <span className="font-bold text-sm sm:text-base text-[#1a2240]">Back to Marketplace</span>
              </button>
            </Link>
          </div>
          {/* Right side: Cart and Profile Icons */}
          <div className="flex items-center gap-4 justify-end flex-1">
            <OverlayTriggers />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">{/* Hero Section with Category & Source */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-white/70 overflow-hidden mb-6 sm:mb-8"
          style={{ boxShadow: "0 20px 60px 0 rgba(26,34,64,0.15)" }}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1a2240] via-[#4d5473] to-[#1a2240] flex items-center justify-center shadow-xl">
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-tight"
                  style={{ fontFamily: 'Impact, sans-serif' }}
                >
                  {dataset.title}
                </h1>
                {/* Category, Source, and Supertypes in Header */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Category:</span>
                    <Badge className="bg-gradient-to-r from-[#1a2240]/10 to-[#24305e]/10 text-[#1a2240] border border-[#1a2240]/20 px-2 sm:px-4 py-1 sm:py-2 font-semibold text-xs sm:text-sm">
                      {dataset.primaryCategoryId}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Source:</span>
                    <Badge
                      variant="outline"
                      className="bg-white/80 text-gray-700 border-gray-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm"
                    >
                      {dataset.sourceId}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-600">Types:</span>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 font-medium"
                    >
                      {dataset.superTypes}
                    </Badge>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-4xl">
                  {dataset.aboutDatasetInfo?.overview}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge
                    variant="outline"
                    className="bg-white/80 text-gray-700 border-gray-200 px-4 py-2 font-medium"
                  >
                    {dataset.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2 font-medium"
                  >
                    {dataset.license}
                  </Badge>
                </div>
                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">5,247 downloads</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content - Takes 3/4 width */}
          <div className="lg:col-span-3 space-y-8">
            {/* Description - Clean & Professional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-[#1a2240]">
                  Description
                </h2>
              </div>
              <div className="p-4 sm:p-8">
                <div className="space-y-8">
                  {/* Main Description - Consistent font size */}
                  <div className="space-y-4">
                    <p className="text-lg text-[#1a2240] leading-relaxed">
                      This extensive climate dataset provides detailed environmental information collected from thousands of weather stations worldwide and satellite observations spanning the last 50 years.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The dataset includes temperature readings, precipitation data, atmospheric pressure measurements, humidity levels, and wind patterns. Perfect for climate researchers, environmental scientists, and data analysts studying global warming trends, weather pattern analysis, or building climate prediction models.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The data is continuously updated and maintained by NASA's Earth Science Division, ensuring high accuracy and reliability for scientific research and educational purposes.
                    </p>
                  </div>
                  {/* Key Features Grid */}
                  <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-[#1a2240] mb-6">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {dataset.aboutDatasetInfo.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-[#1a2240] mb-1">{feature.content}</h4>
                            <p className="text-gray-700 text-sm">Feature details</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Data Quality - Clean Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-50">
                <h2 className="text-xl font-bold text-[#1a2240] flex items-center gap-3">
                  <Shield className="w-6 h-6 text-emerald-600" />
                  Data Quality & Verification
                </h2>
              </div>
              <div className="p-4 sm:p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {dataset.aboutDatasetInfo?.dataQuality}
                </p>
              </div>
            </motion.div>

            {/* Features & Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-[#1a2240]">
                  Dataset Features
                </h2>
              </div>
              <div className="p-4 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {dataset.aboutDatasetInfo?.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-800 font-medium leading-relaxed">{feature.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Takes 1/4 width */}
          <div className="lg:col-span-1 space-y-6">
            {/* Download Card - Subtle Design */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/50 shadow-xl"
            >
              <div className="text-center mb-6">
                {dataset.isPaid ? (
                  <div className="text-4xl font-black bg-gradient-to-r from-[#1a2240] to-[#24305e] bg-clip-text text-transparent">
                    ${dataset.price}
                  </div>
                ) : (
                  <div className="text-3xl font-black text-emerald-600">Free</div>
                )}
                <div className="text-sm text-gray-500">
                  {dataset.isPaid ? "One-time purchase" : "Open access dataset"}
                </div>
              </div>
              {dataset.isPaid ? (
                <div className="space-y-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full bg-gradient-to-r from-[#1a2240] to-[#24305e] hover:from-[#24305e] hover:to-[#2c3a6b] text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-[#1a2240]/25 hover:shadow-xl hover:shadow-[#1a2240]/40 transition-all duration-300 hover:scale-105 text-lg"
                  >
                    {isAddingToCart ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/40 transition-all duration-300 hover:scale-105 text-lg"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      Download Dataset
                    </>
                  )}
                </Button>
              )}
              {dataset.isPaid && <p className="text-xs text-gray-500 text-center mt-3">Secure payment processing</p>}
            </motion.div>

            {/* Technical Specifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden"
              style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
            >
              <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/70 bg-gradient-to-r from-[#1a2240]/5 to-[#1a2240]/5">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Technical Specs
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-sm">Rows:</span>
                  <span className="font-bold text-[#1a2240] text-sm">
                    {dataset.aboutDatasetInfo?.dataFormatInfo.rows?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium text-sm">Columns:</span>
                  <span className="font-bold text-[#1a2240] text-sm">
                    {dataset.aboutDatasetInfo?.dataFormatInfo.cols}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium text-sm block mb-1">Format:</span>
                  <Badge
                    variant="outline"
                    className="bg-white/70 text-[#1a2240] border-[#1a2240]/20 font-semibold text-xs"
                  >
                    {dataset.aboutDatasetInfo?.dataFormatInfo.fileFormat}
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Location Info */}
            {dataset.locationInfo && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
                style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
              >
                <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Data Coverage
                  </h3>
                </div>
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium text-sm">Region:</span>
                    <span className="font-medium text-[#1a2240] text-sm">{dataset.locationInfo.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium text-sm">Coverage:</span>
                    <span className="font-medium text-[#1a2240] text-sm">{dataset.locationInfo.country}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Dataset Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
              style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
            >
              <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                  Dataset Info
                </h3>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium text-sm">Created:</span>
                  <span className="font-medium text-[#1a2240] text-sm">
                    {new Date(dataset.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium text-sm">Updated:</span>
                  <span className="font-medium text-[#1a2240] text-sm">
                    {new Date(dataset.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            {dataset.categories && dataset.categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-[#ffffff] via-[#f1f5f9]/15 to-[#ffffff] backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden"
                style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
              >
                <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                    Categories
                  </h3>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap gap-2">
                    {dataset.categories.map((cat, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-white/70 text-gray-700 border-gray-200 px-3 py-1 font-medium text-xs"
                      >
                        {cat.id}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetailPage;
