"use client"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/features/user/pages/landing/footer";
import { OverlayTriggers } from "@/features/user/components/GlobalOverlaySystem";
import { motion } from "framer-motion";
import {
  FileText,
  AlertCircle,
  Calendar,
  Mail,
  ArrowLeft,
  Shield,
  Building2,
  Users,
  BookOpen,
  Lock,
  Scale,
  CheckCircle2,
  Eye
} from "lucide-react";
import ResponsiveHeader from "../components/ResponsiveHeader";

export default function LegalCompliancePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <ResponsiveHeader theme="default" />

        {/* Back Navigation */}
        <section className="relative pt-8 pb-4">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.button
              onClick={handleGoBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-[#1a2240] hover:text-[#4e5a7e] transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium">Back</span>
            </motion.button>
          </div>
        </section>

        {/* Header Section */}
        <section className="relative pt-4 md:pt-8 lg:pt-12 pb-8 md:pb-12 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-6 md:space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2240]/5 rounded-full border border-[#1a2240]/10"
              >
                <Shield className="w-4 h-4 text-[#1a2240]" />
                <span className="text-sm font-medium text-[#1a2240]">Legal Framework</span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-normal py-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Legal & Compliance
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Comprehensive legal and regulatory compliance framework for Kuinbee Information Services Pvt Ltd's data marketplace operations.
              </motion.p>

              <motion.div
                className="flex items-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Calendar className="w-4 h-4" />
                <span>Last updated: September 13, 2025</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Overview Section */}
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12 p-6 bg-blue-50 border-l-4 border-[#1a2240] rounded-r-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-[#1a2240] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-[#1a2240] mb-3">Compliance Framework Overview</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This document outlines the comprehensive legal and regulatory compliance framework of Kuinbee Information Services Pvt Ltd, 
                    demonstrating our commitment to operating within all applicable laws and regulations while maintaining the highest standards 
                    of data governance and corporate responsibility.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Compliance Content */}
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="prose prose-lg max-w-none"
            >
              {/* Section 1 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">1. Corporate Incorporation and Governance</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Kuinbee Information Services Pvt Ltd was incorporated on 16 July 2025 under the 
                    Companies Act, 2013 and is registered with the Registrar of Companies, Pune. As a 
                    private company limited by shares, Kuinbee maintains statutory registers, files annual 
                    returns and audited statements, and conducts governance in conformity with the 
                    requirements of Indian company law.
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">2. Startup Recognition and Regulatory Incentives</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Kuinbee qualifies for Startup India and DPIIT recognition, being less than ten years from 
                    incorporation and operating with a turnover well below the prescribed threshold. Such 
                    recognition entitles the company to tax exemptions, procedural relaxations, and access to 
                    procurement and funding benefits. Kuinbee intends to leverage these benefits in strict 
                    conformity with statutory norms.
                  </p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">3. Data Licensing and Source Integrity</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    The foundation of Kuinbee's marketplace rests upon the lawful use of datasets. Open data 
                    sources, including those licensed under GODL-India, Creative Commons regimes, or 
                    public domain frameworks, are lawfully used with appropriate attribution. Restricted 
                    datasets from regulators and government bodies are accessed only after obtaining 
                    express permissions or licenses. Commercial or subscription datasets are acquired under 
                    formal licensing arrangements. Kuinbee does not employ data deemed confidential, 
                    exempt under Section 8 of the RTI Act, 2005, or otherwise inaccessible.
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">4. Intellectual Property Compliance</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Kuinbee respects intellectual property rights and safeguards them through proper 
                    attribution, avoidance of unauthorized use of trademarks, and execution of contributor 
                    agreements ensuring lawful title and originality of datasets. These practices insulate the 
                    company and its users from potential infringement claims.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">5. Data Protection and Privacy</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    In alignment with the Digital Personal Data Protection Act, 2023 and the Information 
                    Technology Act, 2000, Kuinbee ensures that personal data, if processed, is handled 
                    lawfully and transparently. Users are granted rights of access, correction, and erasure. 
                    Security measures, including encryption, access controls, and breach-notification 
                    protocols, are maintained. A Grievance Officer is appointed in compliance with statutory 
                    mandates.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">6. Employment and Labour Law Compliance</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Kuinbee complies with the Shops and Establishments Act, Maharashtra, and undertakes 
                    to adhere to central labour statutes such as the EPF Act and ESI Act upon reaching 
                    statutory thresholds. Employment and internship engagements are documented through 
                    contracts incorporating confidentiality and IP protection.
                  </p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">7. Contractual and Platform Policies</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    The company maintains a framework of terms of service, privacy policy, and licensing 
                    policy governing platform use. These specify permissible uses, restrict redistribution of 
                    data, and provide liability disclaimers. Vendor and client arrangements are also governed 
                    by formal agreements.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-[#1a2240]" />
                  <h2 className="text-2xl font-bold text-[#1a2240] mb-0">8. Transparency and Accountability</h2>
                </div>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Kuinbee commits to publishing an annual compliance and transparency report, setting out 
                    its data sources, licensing permissions, security measures, and grievance statistics. This 
                    ensures accountability to regulators, investors, and platform users.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Section */}
            <motion.div 
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-12 p-6 bg-gradient-to-r from-[#1a2240] to-[#4e5a7e] rounded-lg text-white"
            >
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-3">Questions About Our Compliance Framework?</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    If you have any questions about our legal and compliance framework, please contact us at:
                  </p>
                  <div className="space-y-1 text-white/90">
                    <p>Email: legal@kuinbee.com</p>
                    <p>Website: kuinbee.com/support</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <Footer />
      </div>

     
    </div>
  );
}
