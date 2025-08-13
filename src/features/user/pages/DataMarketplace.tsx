import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Switch } from "@/shared/components/ui/switch";
import { Slider } from "@/shared/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Download,
  Filter,
  Search,
  Menu,
  X,
  ShoppingCart,
  User as UserIcon,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { OverlayTriggers, useOverlay } from "@/features/user/components/GlobalOverlaySystem";
import { motion, AnimatePresence } from "framer-motion";

const datasets = [
  {
    id: 1,
    title: "E-commerce Sales Data 2024",
    description: "Comprehensive sales data from major e-commerce platforms including transaction details, customer demographics, and product categories.",
    category: "Finance",
    price: "$299",
    isFree: false,
    downloadCount: "1.2K",
    tags: ["ecommerce", "sales", "analytics"],
    size: "2.5 GB",
    lastUpdated: "2024-07-15",
  },
  {
    id: 2,
    title: "Global Climate Data Archive",
    description: "Historical and real-time climate data from weather stations worldwide, including temperature, precipitation, and atmospheric pressure.",
    category: "Environment",
    price: "Free",
    isFree: true,
    downloadCount: "890",
    tags: ["climate", "weather", "environment"],
    size: "1.8 GB",
    lastUpdated: "2024-07-20",
  },
  {
    id: 3,
    title: "Social Media Sentiment Analysis",
    description: "Curated social media posts with sentiment labels for machine learning and natural language processing applications.",
    category: "Economics",
    price: "$149",
    isFree: false,
    downloadCount: "2.1K",
    tags: ["sentiment", "nlp", "social-media"],
    size: "890 MB",
    lastUpdated: "2024-07-28",
  },
  {
    id: 4,
    title: "Healthcare Patient Records (Anonymized)",
    description: "Anonymized patient records including demographics, diagnoses, treatments, and outcomes for healthcare analytics.",
    category: "Agri and Food",
    price: "$399",
    isFree: false,
    downloadCount: "650",
    tags: ["healthcare", "patient", "analytics"],
    size: "3.2 GB",
    lastUpdated: "2024-07-10",
  },
  {
    id: 5,
    title: "Financial Transactions Dataset",
    description: "Detailed financial transactions from multiple institutions for fraud detection and financial modeling.",
    category: "Finance",
    price: "$249",
    isFree: false,
    downloadCount: "1.8K",
    tags: ["finance", "transactions", "fraud"],
    size: "2.1 GB",
    lastUpdated: "2024-07-18",
  },
  {
    id: 6,
    title: "Technology Product Reviews",
    description: "User reviews and ratings for technology products, including sentiment and feature extraction labels.",
    category: "Energy",
    price: "Free",
    isFree: true,
    downloadCount: "2.5K",
    tags: ["technology", "reviews", "sentiment"],
    size: "1.1 GB",
    lastUpdated: "2024-07-22",
  },
];

const categories = [
  "Finance",
  "Energy",
  "Environment",
  "Agri and Food",
  "Economics"
];

const DataMarketplace: React.FC = () => {
  const navigate = useNavigate();
  const { showProfile, showCart } = useOverlay();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [paid, setPaid] = useState(false);
  const [price, setPrice] = useState(0);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("featured");
  // State for mobile filter collapse
  const [filtersOpen, setFiltersOpen] = useState(false);
  // State for mobile navigation
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter datasets by selected categories
  const filteredDatasets = selectedCategories.length === 0
    ? datasets
    : datasets.filter(d => selectedCategories.includes(d.category));

  return (
    <div className="min-h-screen relative bg-[#f7f8fa]">
      {/* Main gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <div className="sticky top-0 z-50 w-full  border-gray-200/20" style={{background: 'transparent'}}>
          <div className="flex items-center justify-center w-full px-4 sm:px-8 py-4 min-h-[72px] relative">
            {/* Center - Navbar */}
            <div className="flex-grow w-full max-w-4xl">
              <Navbar />
            </div>
            
            {/* Right side - Icons and Hamburger - Positioned absolutely */}
            <div className="absolute right-4 sm:right-8 flex items-center gap-4">
              {/* Desktop Icons */}
              <div className="hidden lg:flex">
                <OverlayTriggers />
              </div>
              
              {/* Mobile Hamburger Menu */}
              <button 
                className="lg:hidden p-2 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#1a2240]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#1a2240]" />
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Overlay - Only for cart and profile icons with animation */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Backdrop to close menu on click */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/20 z-40"
                  onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Menu Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="lg:hidden absolute top-full right-4 w-20 bg-transparent z-50"
                  style={{ position: 'fixed', top: '72px' }}
                >
                  <div className="py-2 flex flex-col items-center gap-4">
                    <button
                      onClick={() => {
                        showCart();
                        setMobileMenuOpen(false);
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
                      aria-label="Cart"
                    >
                      <ShoppingCart className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#10b981]" />
                    </button>
                    <button
                      onClick={() => {
                        showProfile();
                        setMobileMenuOpen(false);
                      }}
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#1a2240] via-[#4d5473] to-[#1a2240] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-xl focus:outline-none"
                      aria-label="Profile"
                    >
                      <UserIcon className="w-6 h-6 text-white transition-colors duration-200 hover:text-[#3b82f6]" />
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <div className="w-full pt-20 pb-6 px-0 relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 relative z-10">
              <h1
                className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-none pt-8 text-center"
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
                  <div className="text-2xl sm:text-3xl font-bold text-[#1a2240] mb-2">50,000+</div>
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

        {/* Search Bar */}
        <div className="max-w-[1600px] mx-auto pb-8 px-4">
          <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="relative w-full max-w-lg">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1a2240] opacity-80 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Search datasets, tags, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-5 h-14 w-full text-lg font-medium bg-white rounded-full shadow-md focus:shadow-lg focus:shadow-[#1a2240]/30 focus:ring-2 focus:ring-[#1a2240]/20 outline-none transition-all duration-200 placeholder:text-gray-400"
                  autoComplete="off"
                  style={{ boxShadow: '0 2px 12px 0 rgba(26,34,64,0.10)' }}
                />
              </div>
            </div>
            <div className="w-full md:w-64 mt-4 md:mt-0 flex justify-end">
              <div className="w-full flex flex-col items-end">
                <div className="relative w-full" ref={dropdownRef}>
                  <button
                    onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                    className="h-10 sm:h-11 w-full rounded-full bg-white text-[#1a2240] text-sm sm:text-base font-semibold shadow-md px-2 sm:px-3 pr-4 sm:pr-6 focus:shadow-lg focus:shadow-[#1a2240]/30 focus:ring-2 focus:ring-[#1a2240]/20 outline-none transition-all duration-200 hover:shadow-lg hover:shadow-[#1a2240]/20 cursor-pointer border-none text-left flex items-center justify-between"
                    style={{
                      boxShadow: '0 0.125rem 0.75rem 0 rgba(26,34,64,0.10), inset 0 0.0625rem 0.25rem 0 rgba(26,34,64,0.04)'
                    }}
                  >
                    <span className="text-[#1a2240] font-semibold">Sort By</span>
                    <div className="flex items-center justify-center bg-white rounded-full shadow-sm w-5 h-5 border border-[#e3e6f3] ml-2">
                      <svg className={`w-3.8 h-3.8 fill-current transition-transform duration-200 ${sortDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                      </svg>
                    </div>
                  </button>
                  {sortDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#e3e6f3] z-50 overflow-hidden"
                         style={{ boxShadow: '0 8px 32px 0 rgba(26,34,64,0.15)' }}>
                      <div className="py-2">
                        {[
                          { value: "featured", label: "Featured" },
                          { value: "downloads", label: "Most Downloaded" },
                          { value: "price-low", label: "Price: Low to High" },
                          { value: "price-high", label: "Price: High to Low" }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSelectedSort(option.value);
                              setSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-base font-semibold transition-all duration-200 hover:bg-gradient-to-r hover:from-[#1a2240]/10 hover:to-[#1a2240]/5 ${
                              selectedSort === option.value 
                                ? 'bg-gradient-to-r from-[#1a2240]/15 to-[#1a2240]/10 text-[#1a2240]' 
                                : 'text-gray-700 hover:text-[#1a2240]'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Category & Filter Controls */}
          <div className="mb-12 w-full flex flex-col gap-4">
            {/* Mobile - Category pills with Paid toggle beside them */}
            <div className="flex lg:hidden w-full overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 pb-2 min-w-max items-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md border border-[#e3e6f3] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 ${
                      selectedCategories.includes(category)
                        ? "bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] text-white scale-105 border-none"
                        : "bg-white text-[#1a2240] hover:bg-gradient-to-r hover:from-[#e3e6f3] hover:to-[#f7f8fa]"
                    }`}
                    onClick={() => {
                      if (selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category));
                      } else {
                        setSelectedCategories([...selectedCategories, category]);
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
                
                {/* Paid toggle beside category pills in mobile */}
                <div className="px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold flex items-center gap-3 whitespace-nowrap shadow-md border border-[#e3e6f3] bg-white text-[#1a2240] hover:scale-105 hover:shadow-lg transition-all duration-200 ml-2">
                  <span className="font-semibold">Paid</span>
                  <Switch
                    checked={paid}
                    onCheckedChange={setPaid}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#1a2240] data-[state=checked]:to-[#24305e] data-[state=unchecked]:bg-[#e3e6f3] border-2 border-[#e3e6f3] shadow"
                  />
                </div>
              </div>
            </div>
            
            {/* Desktop - Side by side */}
            <div className="hidden lg:flex w-full items-center pb-4 px-1 scrollbar-hide justify-between">
              <div className="flex gap-3 flex-1 overflow-x-auto lg:overflow-x-visible lg:scrollbar-hide pb-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-6 py-2 rounded-full text-base font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shadow-md border border-[#e3e6f3] hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30 ${
                      selectedCategories.includes(category)
                        ? "bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] text-white scale-105 border-none"
                        : "bg-white text-[#1a2240] hover:bg-gradient-to-r hover:from-[#e3e6f3] hover:to-[#f7f8fa]"
                    }`}
                    onClick={() => {
                      if (selectedCategories.includes(category)) {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category));
                      } else {
                        setSelectedCategories([...selectedCategories, category]);
                      }
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div
                className="px-6 py-2 rounded-full text-base font-semibold flex items-center gap-3 whitespace-nowrap shadow-md border border-[#e3e6f3] bg-white text-[#1a2240] hover:scale-105 hover:shadow-lg transition-all duration-200 ml-4 flex-shrink-0"
                style={{ minWidth: '120px' }}
              >
                <span className="font-semibold">Paid</span>
                <Switch
                  checked={paid}
                  onCheckedChange={setPaid}
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#1a2240] data-[state=checked]:to-[#24305e] data-[state=unchecked]:bg-[#e3e6f3] border-2 border-[#e3e6f3] shadow"
                />
              </div>
            </div>
          </div>

          {/* Main Content Area with Sidebar and Table */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Left Sidebar */}
            <div className="w-full lg:w-80 lg:flex-shrink-0">
              <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)]">
                {/* Collapsible filter sidebar */}
                <aside className="bg-white rounded-3xl border border-[#e3e6f3] shadow-xl p-6 lg:p-8 flex flex-col gap-6 lg:gap-8 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto scrollbar-white" style={{ boxShadow: '0 4px 24px 0 rgba(26,34,64,0.10)', background: '#fff' }}>
                  <div className="flex items-center gap-2 mb-2 lg:mb-4">
                    <Filter className="h-6 w-6 text-[#24305e]" />
                    <h3 className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">Filters</h3>
                    <button className="ml-auto lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setFiltersOpen((prev) => !prev)}>
                      <svg className={`w-5 h-5 transition-transform duration-200 ${filtersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                  </div>
                  <div className={`flex flex-col gap-6 lg:gap-8 transition-all duration-300 ${filtersOpen ? 'block' : 'hidden lg:flex'}`}>
                    {/* Paid Toggle */}
                    <section>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-lg font-bold text-[#24305e]">Paid</span>
                        <Switch checked={paid} onCheckedChange={setPaid} className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#1a2240] data-[state=checked]:to-[#24305e] data-[state=unchecked]:bg-[#e3e6f3] border-2 border-[#e3e6f3] shadow" />
                      </div>
                    </section>
                    {/* Price Bar - only when paid is enabled */}
                    {paid && (
                      <section>
                        <span className="text-base font-semibold text-[#24305e] mb-2 block">Price:</span>
                        <Slider value={[price]} onValueChange={([val]) => setPrice(val)} min={0} max={500} step={1} className="w-full h-3 bg-[#e3e6f3] rounded-full shadow-md [&_.slider-thumb]:bg-gradient-to-r [&_.slider-thumb]:from-[#1a2240] [&_.slider-thumb]:to-[#24305e] [&_.slider-thumb]:border-2 [&_.slider-thumb]:border-white [&_.slider-thumb]:shadow-lg [&_.slider-thumb]:rounded-full" />
                        <div className="flex justify-between text-[#24305e] font-bold text-base mt-1">
                          <span>$0</span>
                          <span>$500+</span>
                        </div>
                      </section>
                    )}
                    {/* Category Filter */}
                    <section>
                      <h4 className="text-lg font-bold text-[#24305e] mb-3">Category</h4>
                      <div className="flex flex-col gap-2">
                        {categories.map((category) => (
                          <label key={category} className={`flex items-center gap-3 cursor-pointer rounded-lg px-2 py-1 transition-colors ${selectedCategories.includes(category) ? "bg-gradient-to-r from-[#e3e6f3] to-[#f7f8fa]" : "hover:bg-[#f7f8fa]"}`}>
                            <input type="checkbox" name="category" value={category} checked={selectedCategories.includes(category)} onChange={(e) => { if (e.target.checked) { setSelectedCategories([...selectedCategories, category]); } else { setSelectedCategories(selectedCategories.filter((c) => c !== category)); } }} className="appearance-none w-6 h-6 rounded-full border-2 border-[#1a2240] checked:bg-[#1a2240] checked:border-[#1a2240] flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#1a2240]/30" style={{ boxShadow: '0 0 0 2px #e3e6f3' }} />
                            <span className={`text-base font-medium ${selectedCategories.includes(category) ? "text-[#24305e]" : "text-gray-700"}`}>{category}</span>
                          </label>
                        ))}
                      </div>
                    </section>
                    {/* Source Filter */}
                    <section>
                      <h4 className="text-lg font-bold text-[#24305e] mb-3">Source</h4>
                      <input type="text" placeholder="Source name..." className="w-full px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white focus:ring-2 focus:ring-[#1a2240]/20 focus:border-[#1a2240] transition-all" />
                    </section>
                    {/* Location Filter */}
                    <section>
                      <h4 className="text-lg font-bold text-[#24305e] mb-3">Location</h4>
                      <div className="flex flex-col gap-2">
                        <input type="text" placeholder="Region" className="w-full px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white" />
                        <input type="text" placeholder="Country" className="w-full px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white" />
                        <input type="text" placeholder="State" className="w-full px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white" />
                        <input type="text" placeholder="City" className="w-full px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white" />
                      </div>
                    </section>
                    {/* Type Filter */}
                    <section>
                      <h4 className="text-lg font-bold text-[#24305e] mb-3">Type</h4>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" className="accent-[#1a2240] w-5 h-5" />
                          <span className="text-base text-[#1a2240]">Time Series</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="type" className="accent-[#1a2240] w-5 h-5" />
                          <span className="text-base text-[#1a2240]">Cross Sectional</span>
                        </label>
                      </div>
                    </section>
                    {/* Rows & Columns Filter */}
                    <section>
                      <h4 className="text-lg font-bold text-[#24305e] mb-3">Rows & Columns</h4>
                      <div className="flex gap-4">
                        <input type="number" min="0" placeholder="Rows" className="w-1/2 px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white" />
                        <input type="number" min="0" placeholder="Columns" className="w-1/2 px-4 py-2 border border-[#e3e6f3] rounded-lg bg-white" />
                      </div>
                    </section>
                    {/* Clear Filters Button */}
                    <Button variant="outline" className="w-full border-2 border-[#e3e6f3] bg-white text-[#24305e] hover:bg-[#f7f8fa] hover:text-[#24305e] text-base py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg" onClick={() => setSelectedCategories([])}>
                      Clear All Filters
                    </Button>
                  </div>
                </aside>
              </div>
            </div>

            {/* Right Side - Enhanced Data Table */}
            <div className="flex-1 w-full lg:min-w-[700px]">
              <div className="bg-white border border-[#e3e6f3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ boxShadow: '0 8px 32px 0 rgba(26,34,64,0.12)' }}>
                {/* Table Header */}
                <div className="px-4 lg:px-8 py-4 lg:py-6 bg-gradient-to-r from-[#ffffff] to-[#ffffff] border-b border-[#e3e6f3]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-[#050a24] to-[#1a2240] bg-clip-text text-transparent">
                      {selectedCategories.length === 0
                        ? "All Datasets"
                        : `${selectedCategories.join(", ")} Datasets`}
                    </h2>
                  </div>
                </div>

                {/* Enhanced Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-[#ffffff] to-[#ffffff] border-b-2 border-[#e3e6f3] hover:bg-gradient-to-r hover:from-[#f9fbfd] hover:to-[#f2f7fb]">
                        <TableHead className="h-14 px-6 text-left align-middle text-[#1a2240] font-bold text-base tracking-wide">
                          Dataset Information
                        </TableHead>
                        <TableHead className="text-[#1a2240] font-bold text-base text-center">
                          Category
                        </TableHead>
                        <TableHead className="text-[#1a2240] font-bold text-base text-center">
                          Downloads
                        </TableHead>
                        <TableHead className="text-[#1a2240] font-bold text-base text-center">
                          Price
                        </TableHead>
                        <TableHead className="text-center text-[#1a2240] font-bold text-base">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDatasets.map((dataset, index) => (
                        <TableRow
                          key={dataset.id}
                          className={`border-b-4 border-[#e3e6f3] hover:bg-gradient-to-r hover:from-[#f9fbfd]/70 hover:to-[#f2f7fb]/50 transition-all duration-300 group ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gradient-to-r from-[#fdfefe] to-[#fbfdff]'
                          } hover:shadow-lg`} 
                          style={{ boxShadow: '0 2px 0 0 #e3e6f3', marginBottom: '4px' }}
                        >
                          {/* Dataset Information Column */}
                          <TableCell className="px-6 py-6">
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <h3 className="font-bold text-[#1a2240] text-lg leading-tight max-w-md group-hover:text-[#24305e] transition-colors">
                                  {dataset.title}
                                </h3>
                              </div>
                              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 max-w-lg">
                                {dataset.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-1.5">
                                  {dataset.tags.slice(0, 3).map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs bg-gradient-to-r from-[#1a2240]/8 to-[#1a2240]/12 text-[#1a2240] border-none px-2 py-0.5 font-medium hover:from-[#1a2240]/15 hover:to-[#1a2240]/20 transition-all duration-200"
                                    >
                                      #{tag}
                                    </Badge>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-400 font-medium">
                                  Updated {dataset.lastUpdated}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              variant="outline"
                              className="bg-white text-[#1a2240] border-2 border-[#1a2240]/20 text-sm px-3 py-1.5 font-semibold rounded-lg shadow-sm hover:border-[#1a2240]/40 hover:shadow-md transition-all duration-200"
                            >
                              {dataset.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <div className="p-1.5 bg-[#1a2240]/10 rounded-full">
                                <Download className="w-4 h-4 text-[#1a2240]" />
                              </div>
                              <span className="text-base font-bold text-[#1a2240]">{dataset.downloadCount}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col items-center">
                              <span
                                className={`font-bold text-xl ${
                                  dataset.isFree 
                                    ? "text-emerald-600" 
                                    : "text-[#1a2240]"
                                }`}
                              >
                                {dataset.price}
                              </span>
                              {dataset.isFree && (
                                <span className="text-xs text-emerald-500 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                                  No cost
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-[#1a2240] to-[#24305e] hover:from-[#24305e] hover:to-[#2c3a6b] text-white border-none px-4 py-2 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                                onClick={() => navigate(`/user/dataset/${dataset.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="px-8 py-6 bg-gradient-to-r from-[#f8f9fa] to-[#f1f3f4] border-t border-[#e3e6f3]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">
                        Last updated: 2 hours ago
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      className="bg-gradient-to-r from-[#1a2240] to-[#24305e] border-2 border-[#111a3a] text-white hover:bg-gradient-to-r hover:from-[#24305e] hover:to-[#04142c] hover:border-[#24305e] hover:text-white px-6 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      Load More Datasets
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataMarketplace;