"use client"

import { motion } from "framer-motion"
import { Linkedin, Twitter, Instagram, Github, MapPin } from "lucide-react"
import { FaDiscord, FaLinkedin, FaTwitter, FaInstagram, FaRedditAlien, FaYoutube, FaGithub } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-gradient-to-br from-[#1a2240] via-[#1a2240] to-[#2a3454] text-white min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-6 gap-8"
        >
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
              Kuinbee
            </h3>
            <p className="text-blue-200 leading-relaxed max-w-md">
              The world's datasets, aggregated for you. Discover, understand, and act on data with speed and confidence.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-blue-200 hover:text-white transition-colors duration-200">
                  Data Marketplace
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-blue-200 hover:text-white transition-colors duration-200">
                  Analytics
                </Link>
              </li>
              <li>
                <button
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-left w-full bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => {
                    const secSection = document.getElementById('security');
                    if (secSection) {
                      secSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/', { state: { scrollTo: 'security' } });
                    }
                  }}
                >
                  Security
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-blue-200 hover:text-white transition-colors duration-200">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-blue-200 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/community" className="text-blue-200 hover:text-white transition-colors duration-200">
                  Kuinbee Community Hub
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-blue-200 hover:text-white transition-colors duration-200">
                  For Researchers
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-blue-200 hover:text-white transition-colors duration-200">
                  For Students & Professionals
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <button
                  className="text-blue-200 hover:text-white transition-colors duration-200 text-left w-full bg-transparent border-0 p-0 cursor-pointer"
                  onClick={() => {
                    const faqSection = document.getElementById('faq');
                    if (faqSection) {
                      faqSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-8 pt-8"
        >
          {/* Office Addresses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-semibold text-blue-300 mb-2">Registered Office - India</h5>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    S NO 71/8/2/1 Vasudha Itasha Apt Wing B FN 804,<br />
                    Kothrud, Pune 411038, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-300 mt-1 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-semibold text-blue-300 mb-2">International Office - UK</h5>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    6 Brook Street,<br />
                    Oxford, England, OX1 4JT, United Kingdom
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8"
        >
          <div className="max-w-md mx-auto text-center space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay ahead with data</h4>
            <p className="text-blue-200 text-sm">
              Subscribe to get updates on datasets, features, and community insights.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-8 pt-8"
        >
          {/* Social Media */}
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://discord.gg/NhqGDsmzrM" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="Discord">
              <FaDiscord className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/kuinbee" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="LinkedIn">
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/the_kuinbee" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="Instagram">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/Kuinbee00" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="Twitter">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://www.reddit.com/user/Kuinbee00" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="Reddit">
              <FaRedditAlien className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@kuinbee" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="YouTube">
              <FaYoutube className="w-5 h-5" />
            </a>
            <a href="https://github.com/kuinbee" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200" aria-label="Github">
              <FaGithub className="w-5 h-5" />
            </a>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm">
              © 2025 Kuinbee information services pvt ltd. All rights reserved. Built with security, clarity, and community at the core.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/terms" className="text-blue-200 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
