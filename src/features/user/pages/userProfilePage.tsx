import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Download, Package, Settings, Edit3, Save, Calendar, DollarSign } from 'lucide-react';

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  occupation: "Data Scientist",
  institution: "Kuinbee University",
  age: 30,
  joinDate: "2023-01-15",
  totalSpent: 1247,
  totalDownloads: 23,
  totalPurchases: 8,
};

const mockPurchases = [
  {
    id: 1,
    title: "E-commerce Sales Data 2024",
    category: "Sales",
    price: 299,
    purchaseDate: "2024-07-15",
    downloadCount: 3,
    status: "Active",
  },
  {
    id: 2,
    title: "Social Media Sentiment Analysis",
    category: "Social Media",
    price: 149,
    purchaseDate: "2024-07-10",
    downloadCount: 1,
    status: "Active",
  },
  {
    id: 3,
    title: "Financial Transactions Dataset",
    category: "Finance",
    price: 249,
    purchaseDate: "2024-06-28",
    downloadCount: 5,
    status: "Active",
  },
];

const mockDownloads = [
  {
    id: 1,
    title: "Global Climate Data Archive",
    category: "Environment",
    downloadDate: "2024-07-20",
    size: "1.8 GB",
    type: "Free",
  },
  {
    id: 2,
    title: "Technology Product Reviews",
    category: "Technology",
    downloadDate: "2024-07-18",
    size: "1.1 GB",
    type: "Free",
  },
];

const tabs = [
  { value: "account", label: "Account", icon: <Settings className="w-5 h-5 mr-2" /> },
  
  { value: "downloads", label: "Downloads", icon: <Download className="w-5 h-5 mr-2" /> },
  { value: "purchases", label: "Purchases", icon: <Package className="w-5 h-5 mr-2" /> },
  
];

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("purchases");


  const handleSave = () => {
    setIsEditing(false);
    // In a real application, you would send userInfo to a backend API here
    console.log("Saving user info:", userInfo);
  };

  const getTabIndex = (tabValue: string) => {
    return tabs.findIndex(tab => tab.value === tabValue);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
      {/* Back Button */}
     
      {/* Profile Header Card */}
      <div 
        className="bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-6" 
        style={{ boxShadow: "0 20px 60px 0 rgba(26,34,64,0.15)" }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#50587c] to-[#1a2240] shadow-xl transition-transform duration-200 hover:scale-110 hover:shadow-2xl focus:outline-none text-white text-2xl sm:text-3xl lg:text-4xl font-bold ring-4 ring-white/40">
                {/* Display user initials */}
                {userInfo.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1a2240] mb-1">{userInfo.name}</h2>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-0.5">{userInfo.email}</p>
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">Member since {userInfo.joinDate}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto">
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 flex items-center justify-center mx-auto mb-1">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a2240]" />
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-bold text-[#1a2240]">${userInfo.totalSpent}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 flex items-center justify-center mx-auto mb-1">
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a2240]" />
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-bold text-[#1a2240]">{userInfo.totalPurchases}</div>
                <div className="text-xs sm:text-sm text-gray-600">Purchases</div>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#1a2240]/20 to-[#1a2240]/30 flex items-center justify-center mx-auto mb-1">
                  <Download className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a2240]" />
                </div>
                <div className="text-base sm:text-lg lg:text-xl font-bold text-[#1a2240]">{userInfo.totalDownloads}</div>
                <div className="text-xs sm:text-sm text-gray-600">Downloads</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
  <div className="w-full isolate">
        {/* Tab Navigation with Fixed Linear Spotlight */}
  <div className="relative bg-gradient-to-r from-[#f8fafc]/80 via-[#f1f5f9]/90 to-[#e2e8f0]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 p-2 sm:p-4 mb-5">
          <div className="relative flex">
            {/* Moving Spotlight Background */}
            <motion.div
              className="absolute top-0 bottom-0 bg-gradient-to-r  from-[#111831] via-[#4e5a7e] to-[#111831] rounded-xl shadow-xl py-5"
              animate={{
                left: `${(getTabIndex(activeTab) * 100) / tabs.length}%`,
                width: `${95/ tabs.length}%`,
              }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth linear movement
              }}
              style={{
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
                width: `calc(${100 / tabs.length}% - 1rem)`,
              }}
            />
            
            {/* Tab Buttons */}
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative flex-1 rounded-xl font-semibold text-sm py-3 sm:py-4 flex items-center justify-center transition-all duration-300 ease-in-out z-10 mx-2 sm:mx-3.5 ${
                  activeTab === tab.value
                    ? "text-white scale-105 "
                    : "text-[#1a2240] hover:text-[#1a2240]/80 hover:scale-102"
                }`}
                
              >
                <div className={`flex items-center transition-all duration-300 ${activeTab === tab.value ? 'scale-110' : ''}`}>
                  {tab.icon}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content with AnimatePresence for better transitions */}
        <AnimatePresence mode="wait">
          {/* Account Settings Tab (now first) */}
          {activeTab === "account" && (
            <div className="relative">
             
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
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-gradient-to-r  from-[#111831] via-[#4e5a7e] to-[#111831] text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm"
                  >
                   
                        <Edit3 className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                        Edit Profile
                   
                  </Button>
                </div>
                <div className="p-4 sm:p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-6">
                    {/* Left Column */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-semibold text-[#1a2240] block">
                          Full Name
                        </label>
                        {isEditing ? (
                          <Input
                            id="name"
                            value={userInfo.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setUserInfo({ ...userInfo, name: e.target.value })
                            }
                            disabled={!isEditing}
                            className="h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] disabled:bg-gray-50 text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2 px-2 sm:py-3 sm:px-3 bg-gray-50/50 rounded-lg border border-gray-100">
                            {userInfo.name}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-[#1a2240] block">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <Input
                            id="phone"
                            type="tel"
                            value={userInfo.phone}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setUserInfo({ ...userInfo, phone: e.target.value })
                            }
                            disabled={!isEditing}
                            className="h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] disabled:bg-gray-50 text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2 px-2 sm:py-3 sm:px-3 bg-gray-50/50 rounded-lg border border-gray-100">
                            {userInfo.phone}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="occupation" className="text-sm font-semibold text-[#1a2240] block">
                          Occupation
                        </label>
                        {isEditing ? (
                          <Input
                            id="occupation"
                            value={userInfo.occupation}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setUserInfo({ ...userInfo, occupation: e.target.value })
                            }
                            disabled={!isEditing}
                            className="h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] disabled:bg-gray-50 text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2 px-2 sm:py-3 sm:px-3 bg-gray-50/50 rounded-lg border border-gray-100">
                            {userInfo.occupation}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-semibold text-[#1a2240] block">
                          Email Address
                        </label>
                        {isEditing ? (
                          <Input
                            id="email"
                            type="email"
                            value={userInfo.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setUserInfo({ ...userInfo, email: e.target.value })
                            }
                            disabled={!isEditing}
                            className="h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] disabled:bg-gray-50 text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2 px-2 sm:py-3 sm:px-3 bg-gray-50/50 rounded-lg border border-gray-100">
                            {userInfo.email}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="institution" className="text-sm font-semibold text-[#1a2240] block">
                          Institution
                        </label>
                        {isEditing ? (
                          <Input
                            id="institution"
                            value={userInfo.institution}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setUserInfo({ ...userInfo, institution: e.target.value })
                            }
                            disabled={!isEditing}
                            className="h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] disabled:bg-gray-50 text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2 px-2 sm:py-3 sm:px-3 bg-gray-50/50 rounded-lg border border-gray-100">
                            {userInfo.institution}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="age" className="text-sm font-semibold text-[#1a2240] block">
                          Age
                        </label>
                        {isEditing ? (
                          <Input
                            id="age"
                            type="number"
                            value={userInfo.age}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                              setUserInfo({ ...userInfo, age: Number(e.target.value) })
                            }
                            disabled={!isEditing}
                            className="h-11 text-sm border border-[#bfc8e6] focus:ring-2 focus:ring-[#24305e]/20 focus:border-[#24305e] disabled:bg-gray-50 text-[#1a2240] placeholder:text-[#24305e]/60 rounded-lg"
                          />
                        ) : (
                          <div className="text-sm sm:text-base text-[#1a2240] font-medium py-2 px-2 sm:py-3 sm:px-3 bg-gray-50/50 rounded-lg border border-gray-100">
                            {userInfo.age}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {isEditing && (
                    <div className="flex gap-2 sm:gap-3 pt-3 flex-wrap">
                      <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r  from-[#111831] via-[#4e5a7e] to-[#111831] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm"
                      >
                        <Save className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Purchases Tab (now second) */}
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
              className="bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden mb-6" 
              style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
            >
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                  Purchase History
                </h3>
              </div>
              <Table className="overflow-x-auto w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-100/80 to-blue-50/80 border-b border-gray-200/60 hover:from-slate-200/90 hover:to-blue-100/90 transition-all duration-300">
                    <TableHead className="h-12 px-2 sm:px-4 text-left align-middle text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Dataset
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Category
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Price
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Purchase Date
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Downloads
                    </TableHead>
                    <TableHead className="text-center text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPurchases.map((purchase) => (
                    <TableRow
                      key={purchase.id}
                      className="hover:bg-gradient-to-r hover:from-[#24305e]/10 hover:to-[#4e5a7e]/10 border-b border-gray-50 transition-all duration-300 group"
                    >
                      <TableCell>
                        <div className="space-y-1">
                          <h4 className="font-semibold text-[#1a2240] text-xs sm:text-sm">{purchase.title}</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              purchase.status === 'Active' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-gray-50 text-gray-700 border-gray-200'
                            }`}
                          >
                            {purchase.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-white/80 text-[#1a2240] border border-gray-200 text-xs px-1.5 py-1 shadow-sm"
                        >
                          {purchase.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-xs sm:text-sm text-[#1a2240]">
                          ${purchase.price}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                          <span className="text-xs">{purchase.purchaseDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#1a2240]" />
                          <span className="text-xs font-medium">{purchase.downloadCount}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r  from-[#111831] via-[#4e5a7e] to-[#111831] text-white border-none px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}

          {/* Downloads Tab (remains last) */}
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
              className="bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 overflow-hidden mb-6" 
              style={{ boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)" }}
            >
              <div className="px-4 sm:px-6 py-4 border-b border-gray-100/60 bg-gradient-to-r from-[#050a24]/5 to-[#1a2240]/5">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                  Download History
                </h3>
              </div>
              <Table className="overflow-x-auto w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-100/80 to-blue-50/80 border-b border-gray-200/60 hover:from-slate-200/90 hover:to-blue-100/90 transition-all duration-300">
                    <TableHead className="h-12 px-2 sm:px-4 text-left align-middle text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Dataset
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Category
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Size
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Type
                    </TableHead>
                    <TableHead className="text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Download Date
                    </TableHead>
                    <TableHead className="text-center text-[#1a2240] font-semibold text-xs sm:text-sm">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDownloads.map((download) => (
                    <TableRow
                      key={download.id}
                      className="hover:bg-gradient-to-r hover:from-[#24305e]/10 hover:to-[#4e5a7e]/10 border-b border-gray-50 transition-all duration-300 group"
                    >
                      <TableCell>
                        <h4 className="font-semibold text-[#1a2240] text-xs sm:text-sm">{download.title}</h4>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-white/80 text-[#1a2240] border border-gray-200 text-xs px-1.5 py-1 shadow-sm"
                        >
                          {download.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-medium">{download.size}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            download.type === 'Free' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-blue-50 text-blue-700 border-blue-200'
                          }`}
                        >
                          {download.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                          <span className="text-xs">{download.downloadDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          className="bg-gradient-to-r  from-[#111831] via-[#4e5a7e] to-[#111831] hover:from-[#24305e] hover:to-[#2c3a6b] text-white border-none px-2 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5" />
                          Re-download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
