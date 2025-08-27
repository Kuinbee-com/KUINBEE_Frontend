"use client"
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Database, AlertCircle } from "lucide-react";
import { datasetSuperTypeOptions } from "../constants/index";
import { Button } from "@/shared/components/ui/button";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";
import {
  DatasetHeader,
  DatasetDescription,
  DatasetFeatures,
  DatasetQuality,
  DatasetSidebar,
  DatasetTechnicalSpecs,
  DatasetLocationInfo,
  DatasetInfo,
  DatasetCategories,
  DatasetTagsStats,
  DatasetErrorState,
  DatasetLoadingState
} from "../components/datasetDetail";
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

  // Utility function to handle file downloads using a direct link for best performance
  const downloadFile = async (url: string, filename: string) => {
    try {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Download started!');
      return true;
    } catch (error) {
      console.error('Direct link download failed:', error);
      toast.error('Failed to start download.');
      window.open(url, '_blank');
      return false;
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
    return <DatasetLoadingState />;
  }
  if (error) {
    return <DatasetErrorState error={error} onRetry={() => id && loadDataset(id)} id={id} />;
  }

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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
                <DatasetHeader
                  title={dataset.title}
                  category={dataset.primaryCategoryName || 'Uncategorized'}
                  source={dataset.sourceName || 'Unknown Source'}
                  superType={(dataset as any).superType || (dataset as any).superTypes}
                  superTypeOptions={[...datasetSuperTypeOptions]}
                  overview={dataset.aboutDatasetInfo?.overview}
                />
                {/* Tags and Stats - aligned with other badges */}
                <DatasetTagsStats license={dataset.license} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content - Takes 3/4 width */}
        <div className="lg:col-span-3 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-[#1a2240]">Description</h2>
            </div>
            <div className="p-4 sm:p-8 space-y-8">
              <DatasetDescription description={dataset.aboutDatasetInfo?.description} />
              <DatasetFeatures features={dataset.aboutDatasetInfo?.features} icon="dot" />
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <DatasetQuality dataQuality={dataset.aboutDatasetInfo?.dataQuality} />
          </motion.div>
          {/* Dataset Features Card (below Data Quality) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <DatasetFeatures features={dataset.aboutDatasetInfo?.features} title="Dataset Features" icon="check" />
          </motion.div>
        </div>

        {/* Sidebar - Takes 1/4 width */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <DatasetSidebar
              isPaid={!!dataset.isPaid}
              price={dataset.price}
              user={user}
              isAddingToCart={isAddingToCart}
              isDownloading={isDownloading}
              agreedToTerms={agreedToTerms}
              hasDownloaded={hasDownloaded}
              onAddToCart={handleAddToCart}
              onDownload={handleDirectDownload}
              setAgreedToTerms={setAgreedToTerms}
              license={dataset.license}
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <DatasetTechnicalSpecs dataFormatInfo={dataset.aboutDatasetInfo?.dataFormatInfo} />
          </motion.div>
          {dataset.locationInfo && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <DatasetLocationInfo locationInfo={dataset.locationInfo} />
            </motion.div>
          )}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <DatasetInfo birthInfo={dataset.birthInfo} />
          </motion.div>
          {dataset.categories && dataset.categories.length > 0 && dataset.categories.some(cat => cat.id) && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <DatasetCategories categories={dataset.categories} />
            </motion.div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetailPage;
