import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,  
  Package, 
  Download, 
  Edit3, 
  Save, 
  Calendar,
  Loader2
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow} from '@/shared/components/ui/table';
import { UserApiService } from '../services/userApiService';
import { toast } from 'sonner';
import type { UserProfile, Dataset, EditingProfile, DownloadedDataset } from '../types';

const UserProfilePage: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [downloadedDatasets, setDownloadedDatasets] = useState<DownloadedDataset[]>([]);
  const [activeTab, setActiveTab] = useState<'account' | 'purchases' | 'downloads'>('account');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProfile, setEditingProfile] = useState<EditingProfile>({
    occupation: '',
    institution: '',
    city: '',
    country: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { value: 'account' as const, label: 'Account', icon: <User /> },
    { value: 'purchases' as const, label: 'Purchases', icon: <Package /> },
    { value: 'downloads' as const, label: 'Downloads', icon: <Download /> },
  ];

  const getTabIndex = (tabValue: string) => {
    return tabs.findIndex(tab => tab.value === tabValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user profile and downloaded datasets in parallel
        const [profileResponse, datasetsResponse] = await Promise.all([
          UserApiService.getUserProfile(),
          UserApiService.getDownloadedDatasets()
        ]);
        setUserProfile(profileResponse);
        setDownloadedDatasets(datasetsResponse.map((item) => item));

        // Initialize editing profile with current values
        if (profileResponse?.UserProfileInfo) {
          setEditingProfile({
            occupation: profileResponse.UserProfileInfo.occupation || '',
            institution: profileResponse.UserProfileInfo.institution || '',
            city: profileResponse.UserProfileInfo.city || '',
            country: profileResponse.UserProfileInfo.country || '',
            bio: profileResponse.UserProfileInfo.bio || ''
          });
        }
      } catch (error: unknown) {
        console.error('Error fetching data:', error);
        // Type guard for error with response.status
        const isAxiosError = (err: unknown): err is { response: { status: number }, message?: string } =>
          typeof err === 'object' && err !== null && 'response' in err && typeof (err as any).response?.status === 'number';
        const isTokenError = (err: unknown): err is { message: string } =>
          typeof err === 'object' && err !== null && 'message' in err && typeof (err as any).message === 'string' && (err as any).message.toLowerCase().includes('token');
        if (isAxiosError(error) && (error.response.status === 401 || error.response.status === 403) || isTokenError(error)) {
          setError('Session expired. Please log in again.');
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        } else {
          setError('Login again');
          toast.error('Login again');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (!userProfile) return;
    
    setLoading(true);
    try {
      const updatedProfile = await UserApiService.updateUserProfile({
        occupation: editingProfile.occupation,
        institution: editingProfile.institution,
        city: editingProfile.city,
        country: editingProfile.country,
        bio: editingProfile.bio
      });
      
      // Update the profile with the new data, ensuring UserProfileInfo structure is maintained
      const newProfile = {
        ...userProfile,
        UserProfileInfo: {
          ...userProfile.UserProfileInfo,
          occupation: editingProfile.occupation,
          institution: editingProfile.institution,
          city: editingProfile.city,
          country: editingProfile.country,
          bio: editingProfile.bio
        }
      };
      
      setUserProfile(newProfile);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // Initialize editing profile with current values when entering edit mode
    if (userProfile?.UserProfileInfo) {
      setEditingProfile({
        occupation: userProfile.UserProfileInfo.occupation || '',
        institution: userProfile.UserProfileInfo.institution || '',
        city: userProfile.UserProfileInfo.city || '',
        country: userProfile.UserProfileInfo.country || '',
        bio: userProfile.UserProfileInfo.bio || ''
      });
    }
    setIsEditing(true);
  };

  const handleDownload = async (datasetId: string) => {
    try {
      const downloadResponse = await UserApiService.generateDatasetDownloadURL(datasetId, {
        fileFormat: 'csv',
        isPaid: false,
        userId: '',
        isAgreedToLicense: true
      });
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = downloadResponse.downloadURL;
      link.download = `dataset-${datasetId}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Download started!');
    } catch (error) {
      console.error('Error downloading dataset:', error);
      toast.error('Failed to download dataset');
    }
  };

  if (loading && !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#1a2240]" />
          <span className="text-lg font-medium text-[#1a2240]">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg font-medium text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-6 relative overflow-x-hidden">
      {/* Profile Header Card */}
      <div 
        className="bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-4 sm:mb-6" 
        style={{ boxShadow: "0 20px 60px 0 rgba(26,34,64,0.15)" }}
      >
        <div className="p-3 sm:p-4 lg:p-5">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#50587c] to-[#1a2240] shadow-xl transition-transform duration-200 hover:scale-110 hover:shadow-2xl focus:outline-none text-white text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold ring-2 sm:ring-4 ring-white/40 flex-shrink-0">
                {userProfile.name.split(" ").map((n: string) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#1a2240] mb-1 truncate sm:break-words">{userProfile.name}</h2>
                <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-gray-600 mb-0.5 break-all sm:break-words">{userProfile.email}</p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:gap-6 w-full lg:w-auto">
              <div className="text-center min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 flex items-center justify-center mx-auto mb-1">
                  <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#1a2240] text-sm sm:text-base lg:text-lg">₹</span>
                </div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-[#1a2240] truncate">₹0</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="text-center min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 flex items-center justify-center mx-auto mb-1">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#1a2240]" />
                </div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-[#1a2240] truncate">{downloadedDatasets.filter(d => d?.isPaid).length}</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">Purchases</div>
              </div>
              <div className="text-center min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 flex items-center justify-center mx-auto mb-1">
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#1a2240]" />
                </div>
                <div className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-[#1a2240] truncate">{downloadedDatasets.length}</div>
                <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="w-full isolate overflow-x-hidden">
        {/* Tab Navigation */}
        <div className="relative bg-gradient-to-r from-[#f8fafc]/80 via-[#f1f5f9]/90 to-[#e2e8f0]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg border border-white/40 p-1 sm:p-2 lg:p-4 mb-3 sm:mb-5">
          <div className="relative flex overflow-x-auto scrollbar-hide sm:overflow-x-visible">
            {/* Moving Spotlight Background */}
            <motion.div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] rounded-lg shadow-lg z-0"
              style={{
                width: `${100 / tabs.length}%`,
                left: `${(getTabIndex(activeTab) * 100) / tabs.length}%`,
              }}
              initial={false}
              animate={{
                left: `${(getTabIndex(activeTab) * 100) / tabs.length}%`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />

            {/* Tab Buttons */}
            <div className="flex w-full relative z-10">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 lg:py-4 rounded-lg transition-all duration-300 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap ${
                    activeTab === tab.value
                      ? "text-white shadow-lg transform scale-105"
                      : "text-[#1a2240] hover:text-[#4e5a7e] hover:scale-105"
                  }`}
                >
                  {React.cloneElement(tab.icon, {
                    className: "w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2"
                  })}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.slice(0, 3)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* Account Settings Tab */}
          {activeTab === "account" && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden mb-6" 
              style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
            >
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                  Account Settings
                </h3>
                <Button
                  onClick={() => isEditing ? handleSave() : handleEdit()}
                  disabled={loading}
                  className="bg-gradient-to-r from-[#111831] via-[#4e5a7e] to-[#111831] text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm"
                >
                  {loading ? (
                    <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 animate-spin" />
                  ) : (
                    <>
                      {isEditing ? (
                        <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                      ) : (
                        <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                      )}
                      {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </>
                  )}
                </Button>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 account-container" style={{ maxHeight: '70vh', overflowY: 'auto', background: '#f1f5f9' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-semibold text-[#1a2240] block">
                        Full Name
                      </label>
                      <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200">
                        {userProfile.name}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-[#1a2240] block">
                        Email Address
                      </label>
                      <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200 break-all sm:break-words">
                        {userProfile.email}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-[#1a2240] block">
                        Phone Number
                      </label>
                      <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200">
                        {userProfile.phNo || 'Not provided'}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="occupation" className="text-sm font-semibold text-[#1a2240] block">
                        Occupation
                      </label>
                      {isEditing ? (
                        <Input
                          id="occupation"
                          value={editingProfile.occupation || ''}
                          onChange={(e) => 
                            setEditingProfile(prev => ({ ...prev, occupation: e.target.value }))
                          }
                          placeholder="Enter your occupation"
                          className="h-10 sm:h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 bg-white focus:bg-white outline-none shadow-sm focus:shadow-md transition-all duration-200"
                        />
                      ) : (
                        <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200">
                          {userProfile.UserProfileInfo?.occupation || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="institution" className="text-sm font-semibold text-[#1a2240] block">
                        Institution
                      </label>
                      {isEditing ? (
                        <Input
                          id="institution"
                          value={editingProfile.institution || ''}
                          onChange={(e) => 
                            setEditingProfile(prev => ({ ...prev, institution: e.target.value }))
                          }
                          placeholder="Enter your institution"
                          className="h-10 sm:h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 bg-white focus:bg-white outline-none shadow-sm focus:shadow-md transition-all duration-200"
                        />
                      ) : (
                        <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200">
                          {userProfile.UserProfileInfo?.institution || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="city" className="text-sm font-semibold text-[#1a2240] block">
                        City
                      </label>
                      {isEditing ? (
                        <Input
                          id="city"
                          value={editingProfile.city || ''}
                          onChange={(e) => 
                            setEditingProfile(prev => ({ ...prev, city: e.target.value }))
                          }
                          placeholder="Enter your city"
                          className="h-10 sm:h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 bg-white focus:bg-white outline-none shadow-sm focus:shadow-md transition-all duration-200"
                        />
                      ) : (
                        <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200">
                          {userProfile.UserProfileInfo?.city || 'Not provided'}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="country" className="text-sm font-semibold text-[#1a2240] block">
                        Country
                      </label>
                      {isEditing ? (
                        <Input
                          id="country"
                          value={editingProfile.country || ''}
                          onChange={(e) => 
                            setEditingProfile(prev => ({ ...prev, country: e.target.value }))
                          }
                          placeholder="Enter your country"
                          className="h-10 sm:h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg px-3 py-2 sm:px-3 sm:py-2.5 bg-white focus:bg-white outline-none shadow-sm focus:shadow-md transition-all duration-200"
                        />
                      ) : (
                        <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2.5 px-3 sm:py-3 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 transition-colors duration-200">
                          {userProfile.UserProfileInfo?.country || 'Not provided'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mt-4 space-y-2">
                  <label htmlFor="bio" className="text-sm font-semibold text-[#1a2240] block">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      rows={4}
                      value={editingProfile.bio || ''}
                      onChange={(e) => 
                        setEditingProfile(prev => ({ ...prev, bio: e.target.value }))
                      }
                      placeholder="Tell us about yourself..."
                      className="w-full text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg p-3 sm:p-3.5 resize-none transition-colors duration-200 bg-white focus:bg-white hover:bg-gray-50/50 outline-none shadow-sm focus:shadow-md"
                      style={{ 
                        backgroundColor: 'white',
                        color: '#1a2240'
                      }}
                    />
                  ) : (
                    <div className="text-sm sm:text-base text-[#1a2240] font-medium py-3 px-3 sm:py-3.5 sm:px-3.5 bg-gray-50/50 rounded-lg border border-gray-100 min-h-[100px] transition-colors duration-200">
                      {userProfile.UserProfileInfo?.bio || 'No bio provided'}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Purchases Tab */}
          {activeTab === "purchases" && (
            <motion.div
              key="purchases"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {downloadedDatasets.filter(dataset => dataset.isPaid).length === 0 ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-8 sm:p-12 text-center" style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#1a2240]/10 to-[#1a2240]/20 flex items-center justify-center">
                    <Package className="w-8 h-8 text-[#1a2240]/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a2240] mb-2">No Purchased Datasets</h3>
                  <p className="text-gray-600 mb-4">You haven't purchased any datasets yet. Browse our marketplace to find datasets that suit your needs.</p>
                  <Button
                    onClick={() => window.location.href = '/marketplace'}
                    className="bg-gradient-to-r from-[#111831] via-[#4e5a7e] to-[#111831] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                  >
                    Browse Marketplace
                  </Button>
                </div>
              ) : (
              <Table className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40" style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)", borderRadius: '1rem' }}>
                <TableHeader>
                  <TableRow className="border-b border-gray-100 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <TableHead className="text-[#1a2240] font-bold text-sm">Dataset</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Category</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Price</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Date</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downloadedDatasets
                    .filter(dataset => dataset?.isPaid)
                    .map((dataset, index) => (
                  <TableRow
                      key={index}
                      
                      className="hover:bg-gradient-to-r hover:from-[#24305e]/10 hover:to-[#4e5a7e]/10 border-b border-gray-50 transition-all duration-300 group"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-[#1a2240] text-xs sm:text-sm">{dataset.title}</h4>
                          <Badge
                            variant="outline"
                            className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
                          >
                            Active
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-white/80 text-[#1a2240] border border-gray-200 text-xs px-1.5 py-1 shadow-sm"
                        >
                          {dataset.primaryCategoryName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-xs sm:text-sm text-[#1a2240]">
                          ${dataset.price || 0}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                          <span className="text-xs">{dataset.purchaseDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(dataset.id)}
                          className="bg-gradient-to-r from-[#111831] via-[#4e5a7e] to-[#111831] text-white border-none px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              )}
            </motion.div>
          )}

          {/* Downloads Tab */}
          {activeTab === "downloads" && (
            <motion.div
              key="downloads"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              {downloadedDatasets.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 p-8 sm:p-12 text-center" style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#1a2240]/10 to-[#1a2240]/20 flex items-center justify-center">
                    <Download className="w-8 h-8 text-[#1a2240]/60" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a2240] mb-2">No Downloaded Datasets</h3>
                  <p className="text-gray-600 mb-4">You haven't downloaded any datasets yet. Visit our marketplace to discover and download datasets.</p>
                  <Button
                    onClick={() => window.location.href = '/marketplace'}
                    className="bg-gradient-to-r from-[#111831] via-[#4e5a7e] to-[#111831] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                  >
                    Browse Marketplace
                  </Button>
                </div>
              ) : (
              <Table className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40" style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}>
                <TableHeader>
                  <TableRow className="border-b border-gray-100 bg-gradient-to-r from-[#f8fafc] to-[#f1f5f9]">
                    <TableHead className="text-[#1a2240] font-bold text-sm">Dataset</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Category</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Type</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Downloaded</TableHead>
                    <TableHead className="text-[#1a2240] font-bold text-sm text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downloadedDatasets.map((dataset,index) => {
                    // Use type assertions to access API-only fields
                    console.log(dataset);
                    const purchaseDate = dataset?.purchaseDate;
                    const primaryCategoryName = dataset?.primaryCategoryName || 'N/A';
                    return (
                      <TableRow
                        key={index}
                        className="hover:bg-gradient-to-r hover:from-[#24305e]/10 hover:to-[#4e5a7e]/10 border-b border-gray-50 transition-all duration-300 group"
                      >
                        <TableCell>
                          <div className="space-y-1">
                            <h4 className="font-semibold text-[#1a2240] text-xs sm:text-sm">{dataset?.title}</h4>
                            <Badge
                              variant="outline"
                              className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200"
                            >
                              Active
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-white/80 text-[#1a2240] border border-gray-200 text-xs px-1.5 py-1 shadow-sm"
                          >
                            {primaryCategoryName}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              dataset?.isPaid 
                                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {dataset?.isPaid ? 'Paid' : 'Free'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                            <span className="text-xs">
                              {purchaseDate ? new Date(purchaseDate).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            onClick={() => handleDownload(dataset?.id)}
                            className="bg-gradient-to-r from-[#111831] via-[#4e5a7e] to-[#111831] hover:from-[#24305e] hover:to-[#2c3a6b] text-white border-none px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                          >
                            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                            Re-download
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfilePage;
