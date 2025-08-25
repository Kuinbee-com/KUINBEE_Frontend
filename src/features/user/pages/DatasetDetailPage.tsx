"use client"
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Database, Users, Shield, CheckCircle, FileText, MapPin, Download, ShoppingCart, AlertCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";
import { UserApiService } from "../services/userApiService";
import type { Dataset, DownloadOptions } from "../types";
import { useAppSelector } from "@/shared/hooks/hooks";
import { toast } from "sonner";

const DatasetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  
  const { user } = useAppSelector((state) => state.auth);
  const overlay = useOverlay();

  // Utility function to handle file downloads with multiple fallback methods
  // 1. First tries fetch + blob for better CORS handling and progress
  // 2. Falls back to direct link download
  // 3. Finally opens in new tab as last resort
  const downloadFile = async (url: string, filename: string) => {
    try {
      // Try fetch approach first for better compatibility
      toast.loading('Preparing download...');
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      toast.dismiss(); // Remove loading toast
      toast.loading('Downloading file...');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(downloadUrl);
      
      toast.dismiss(); // Remove downloading toast
      return true;
    } catch (fetchError) {
      toast.dismiss(); // Remove any loading toasts
      console.warn('Fetch download failed, trying direct link method:', fetchError);
      
      // Fallback to direct link method
      try {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return true;
      } catch (linkError) {
        console.warn('Direct link download failed, opening in new tab:', linkError);
        window.open(url, '_blank');
        return false;
      }
    }
  };

  useEffect(() => {
    if (id) {
      loadDataset(id);
    }
  }, [id]);

  const loadDataset = async (datasetId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await UserApiService.getDatasetByIdPublic(datasetId);
      setDataset(data);
      
      // Check if user has already downloaded this dataset
      if (user) {
        try {
          const downloadHistory = await UserApiService.getDownloadedDatasets();
          const hasDownloadedDataset = downloadHistory.some(
            (download: any) => download.datasetId === datasetId || download.dataset?.id === datasetId
          );
          setHasDownloaded(hasDownloadedDataset);
        } catch (downloadError) {
          console.warn('Could not check download history:', downloadError);
          // Don't show error to user, just couldn't check download status
        }
      }
    } catch (error) {
      console.error('Failed to load dataset:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load dataset';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!dataset) {
      toast.error('Dataset not loaded');
      return;
    }
    
    // Check if user is authenticated - if not, trigger login modal
    if (!user) {
      toast.error('Please log in to add items to cart');
      // Trigger the login modal from OverlayTriggers
      const loginButton = document.querySelector('[data-login-trigger]');
      if (loginButton) {
        (loginButton as HTMLElement).click();
      } else {
        // Fallback: try to find and click any login-related button
        const authButton = document.querySelector('.auth-trigger, [aria-label*="login"], [aria-label*="Login"]');
        if (authButton) {
          (authButton as HTMLElement).click();
        }
      }
      return;
    }
    
    setIsAddingToCart(true);
    try {
      // This would use CartService when implemented
      console.log('Adding to cart:', dataset.id);
      // await CartService.addToCart(dataset.id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Dataset added to cart!');
      setIsAddingToCart(false);
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Failed to add to cart');
      setIsAddingToCart(false);
    }
  };

  const handleDirectDownload = async () => {
    if (!dataset) {
      toast.error('Dataset not loaded');
      return;
    }

    // Check if user is authenticated - if not, trigger login modal
    if (!user) {
      toast.error('Please log in to download datasets.');
      overlay.showLogin();
      return;
    }
    
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions before downloading.');
      setError('Please agree to the terms and conditions before downloading.');
      return;
    }
    
    if (dataset.isPaid) {
      // For paid datasets, show license modal first
      setShowLicenseModal(true);
      return;
    }
    
    // For free datasets, proceed with download
    await initiateDownload();
  };

  const initiateDownload = async () => {
    if (!dataset || !user) return;
    
    setIsDownloading(true);
    setError(null);
    try {
      // Ensure we have a valid userId
      const userId = user.userId || user.id || '';
      
      if (!userId) {
        throw new Error('User ID not found. Please log in again.');
      }

      const downloadOptions: DownloadOptions = {
        fileFormat: (dataset.aboutDatasetInfo?.dataFormatInfo?.fileFormat || 'CSV').toLowerCase(),
        isPaid: dataset.isPaid || false,
        userId: userId,
        isAgreedToLicense: agreedToTerms
      };
      
      console.log('Download request:', { 
        datasetId: dataset.id, 
        downloadOptions,
        userInfo: {
          userId: user.userId,
          id: user.id,
          email: user.email
        }
      });
      
      const { downloadURL } = await UserApiService.generateDatasetDownloadURL(dataset.id, downloadOptions);
      
      // Generate filename based on dataset info
      const fileExtension = dataset.aboutDatasetInfo?.dataFormatInfo.fileFormat?.toLowerCase() || 'zip';
      const sanitizedTitle = dataset.title.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${sanitizedTitle}_dataset.${fileExtension}`;
      
      // Attempt to download the file
      const downloadSuccess = await downloadFile(downloadURL, filename);
      
      if (downloadSuccess) {
        toast.success('Download started successfully!');
        setHasDownloaded(true); // Mark as downloaded on success
      } else {
        toast.success('Download link opened in new tab');
        setHasDownloaded(true); // Still mark as downloaded since URL was generated
      }
      
      setTimeout(() => setIsDownloading(false), 1500);
    } catch (error: any) {
      console.error('Download failed:', error);
      
      let errorMessage = 'Download failed';
      
      // Handle specific error cases
      if (error?.response?.status === 409) {
        const responseData = error.response?.data;
        console.log('409 Error full response:', error.response);
        
        if (responseData?.message?.includes('Duplicate value for userId') || responseData?.field === 'userId') {
          errorMessage = 'You have already downloaded this dataset. Multiple downloads are not allowed for this dataset.';
          setHasDownloaded(true); // Mark as already downloaded
        } else if (responseData?.error) {
          errorMessage = responseData.error;
        } else if (responseData?.message) {
          errorMessage = responseData.message;
        } else {
          errorMessage = 'Conflict: This dataset may have already been downloaded or there\'s a permission issue. Please try again later.';
        }
      } else if (error?.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in again.';
      } else if (error?.response?.status === 403) {
        errorMessage = 'Access forbidden. You may not have permission to download this dataset.';
      } else if (error?.response?.status === 404) {
        errorMessage = 'Dataset not found or no longer available for download.';
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      setIsDownloading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a2240] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dataset...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dataset</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => id && loadDataset(id)} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No dataset found
  if (!dataset) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Dataset Not Found</h2>
          <p className="text-gray-600 mb-4">The requested dataset could not be found.</p>
          <Link to="/user/marketplace">
            <Button variant="outline">Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

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
                      {dataset.primaryCategoryName}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-600">Source:</span>
                    <Badge
                      variant="outline"
                      className="bg-white/80 text-gray-700 border-gray-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm"
                    >
                      {dataset.sourceName}
                    </Badge>
                  </div>
                  {dataset.superTypes && typeof dataset.superTypes === 'string' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-semibold text-gray-600">Type:</span>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 px-2 sm:px-4 py-1 sm:py-2 font-medium text-xs sm:text-sm"
                      >
                        {dataset.superTypes}
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-4xl">
                  {dataset.aboutDatasetInfo?.overview}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge
                    variant="outline"
                    className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 px-4 py-2 font-medium"
                  >
                      Active
                    </Badge>
                    {dataset.license && (
                      <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200 px-4 py-2 font-medium"
                    >
                      {dataset.license}
                    </Badge>
                  )}
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
                  {/* Main Description - Dynamic from API */}
                  <div className="space-y-4">
                    {dataset.aboutDatasetInfo?.overview && (
                      <p className="text-lg text-[#1a2240] leading-relaxed">
                        {dataset.aboutDatasetInfo.overview}
                      </p>
                    )}
                    {/* Show description if present */}
                    {dataset.aboutDatasetInfo?.overview && (
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {dataset.aboutDatasetInfo.overview}
                      </p>
                    )}
                  </div>
                  {/* Key Features Grid */}
                  <div className="bg-white/90 rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-[#1a2240] mb-6">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {dataset.aboutDatasetInfo?.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-[#1a2240] mb-1">{feature.content}</h4>
                            <p className="text-gray-700 text-sm">Feature details</p>
                          </div>
                        </div>
                      )) || (
                        <div className="col-span-2 text-center text-gray-500">
                          No features available
                        </div>
                      )}
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
                    {!user ? (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart (Login Required)
                      </>
                    ) : isAddingToCart ? (
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
                <div className="space-y-4">
                  {/* Terms and Conditions Checkbox - Only show when user is logged in */}
                  {user && (
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="terms-checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="terms-checkbox" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{' '}
                        <a href="/terms" target="_blank" className="text-emerald-600 hover:text-emerald-700 underline">
                          terms and conditions
                        </a>{' '}
                        and understand the data usage policies.
                      </label>
                    </div>
                  )}
                  <Button
                    onClick={handleDirectDownload}
                    disabled={isDownloading || (!!user && (!agreedToTerms || hasDownloaded))}
                    className={`w-full px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      hasDownloaded && user
                        ? 'bg-gray-500 text-white' 
                        : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-emerald-600/25 hover:shadow-emerald-600/40'
                    }`}
                  >
                    {!user ? (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Download Dataset 
                      </>
                    ) : hasDownloaded ? (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Already Downloaded
                      </>
                    ) : isDownloading ? (
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
                  
                  {hasDownloaded && (
                    <div className="text-sm text-gray-600 text-center mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                      ℹ️ You have already downloaded this dataset. Check your downloads folder.
                    </div>
                  )}
                  
                  {/* Debug info - Remove this in production */}
                  <div className="text-xs text-gray-500 mt-2 p-2 bg-gray-50 rounded">
                    <p><strong>Debug Info:</strong></p>
                    <p>User ID: {user?.userId || user?.id || 'Not found'}</p>
                    <p>Dataset ID: {dataset?.id}</p>
                    <p>Is Paid: {dataset?.isPaid ? 'Yes' : 'No'}</p>
                    <p>Terms Agreed: {agreedToTerms ? 'Yes' : 'No'}</p>
                    <p>File Format: {dataset?.aboutDatasetInfo?.dataFormatInfo?.fileFormat || 'Not specified'}</p>
                    <p>Already Downloaded: {hasDownloaded ? 'Yes' : 'No'}</p>
                  </div>
                </div>
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
                {dataset.aboutDatasetInfo?.dataFormatInfo.fileFormat && (
                  <div>
                    <span className="text-gray-600 font-medium text-sm block mb-1">Format:</span>
                    <Badge
                      variant="outline"
                      className="bg-white/70 text-[#1a2240] border-[#1a2240]/20 font-semibold text-xs"
                    >
                      {dataset.aboutDatasetInfo.dataFormatInfo.fileFormat}
                    </Badge>
                  </div>
                )}
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
                  <span className="text-gray-600 font-medium text-sm">Updated:</span>
                  <span className="font-medium text-[#1a2240] text-sm">
                    {dataset.birthInfo?.lastUpdatedAt
                      ? new Date(dataset.birthInfo.lastUpdatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            {dataset.categories && dataset.categories.length > 0 && dataset.categories.some(cat => cat.id) && (
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
                    {dataset.categories.filter(cat => cat.id).map((cat, idx) => (
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
