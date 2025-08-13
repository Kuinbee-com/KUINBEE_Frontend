// import Link from "next/link"
"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Twitter, Linkedin,MessageCircle, Youtube, Github, DiscIcon as Discord, Rss, Instagram, ShoppingCart, User as UserIcon, Menu, X } from "lucide-react" // Removed Sun, Moon icons
import { HoverEffect } from "@/shared/components/ui/card-hover-effect"
import Navbar from "@/features/user/components/Navbar";
import { useOverlay, OverlayTriggers } from "@/features/user/components/GlobalOverlaySystem";
import { useState } from "react";
import RedditIcon from '@mui/icons-material/Reddit';


// Define the social media platforms and their details


const socialPlatforms = [
  {
    title: "Twitter (X)",
    icon: Twitter,
    link: "https://twitter.com/vercel",
    description:
      "Stay up-to-date with our latest announcements, quick tips, and industry insights. Join the conversation!",
    color: "from-[#1DA1F2]/10 to-[#1DA1F2]/5", // Twitter blue
  },
  {
    title: "LinkedIn",
    icon: Linkedin,
    link: "https://www.linkedin.com/company/kuinbee",
    description:
      "Connect with our team, explore career opportunities, and get professional updates on our company culture and achievements.",
    color: "from-[#0077B5]/10 to-[#0077B5]/5", // LinkedIn blue
  },
 
  {
    title: "Reddit",
    icon: (props: any) => <RedditIcon style={{ color: "#FF4500" }} fontSize="large" {...props} />,
    link: "https://www.reddit.com/user/Kuinbee00",
    description:
      "Explore our open-source projects, contribute to our codebase, and collaborate with developers from around the world.",
    color: "from-[#333]/10 to-[#333]/5",
  },
  {
    title: "Discord",
    icon: Discord,
    link: "https://discord.gg/NhqGDsmzrM",
    description:
      "Join our vibrant developer community for real-time support, discussions, and direct interaction with our team and other users.",
    color: "from-[#5865F2]/10 to-[#5865F2]/5",
  },
  {
    title: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/the_kuinbee",
    description:
      "See behind-the-scenes, visual updates, and snippets of our work and culture. Follow us for a creative perspective.",
    color: "from-[#C13584]/10 to-[#C13584]/5",
  },
];

const CommunityPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { showCart, showProfile } = useOverlay();

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
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <h1
                className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-none pt-8 text-center"
                style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}
              >Join Our Community</h1>
          <p className="text-base sm:text-lg lg:text-xl text-center text-[#24305e] mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto">
            Welcome to the Kuinbee Community! Connect, share, and grow with other users. Explore our channels below:
          </p>
          <HoverEffect items={socialPlatforms} className="mb-12 sm:mb-16" />
          <section className="mt-8 sm:mt-12 text-center max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-4 text-[#1a2240]">Get Involved</h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#24305e] mb-3 sm:mb-4">
              Have questions, feedback, or want to contribute? Reach out on any platform above or email us at <a href="mailto:community@kuinbee.com" className="text-cyan-600 underline">community@kuinbee.com</a>.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-[#24305e]">
              Stay tuned for upcoming events, webinars, and more ways to connect!
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
