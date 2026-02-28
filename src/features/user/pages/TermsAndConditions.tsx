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
} from "lucide-react";
import ResponsiveHeader from "../components/ResponsiveHeader";

export default function TermsAndConditionsPage() {
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
                <FileText className="w-4 h-4 text-[#1a2240]" />
                <span className="text-sm font-medium text-[#1a2240]">Legal Information</span>
              </motion.div>

              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Terms & Conditions
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                This Terms and Conditions Agreement governs all sales, deliveries, and use of curated datasets provided by Kuinbee Information Services Pvt. Ltd.
              </motion.p>

              <motion.div
                className="flex items-center gap-2 text-sm text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Calendar className="w-4 h-4" />
                <span>Last updated: August 27, 2025</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="relative py-8 md:py-12 lg:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Agreement Section */}
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
                  <h3 className="text-xl font-bold text-[#1a2240] mb-3">Agreement Overview</h3>
                  <p className="text-gray-700 leading-relaxed">
                    This Terms and Conditions Agreement ("Agreement") is entered into by and between Kuinbee Information Services Pvt. Ltd., a company incorporated under the Companies Act, 2013, having its registered office in India (hereinafter referred to as "Kuinbee", "Company", "We", "Us", or "Our") and the client purchasing datasets (hereinafter referred to as "Client", "You" or "Your").
                    <br /><br />
                    By placing an order or receiving a dataset, you acknowledge that you have read, understood, and agreed to be bound by this Agreement. This Agreement applies to all current and future orders unless superseded by a new written agreement.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Terms Content */}
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
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">1. Definitions</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p><strong>1.1 Dataset</strong> - Any virtual collection of structured data curated by Kuinbee, including ready-made or custom datasets, validated, encrypted, and delivered as per this Agreement.</p>
                  <p><strong>1.2 Service</strong> - The provision of curated datasets and associated services by Kuinbee.</p>
                  <p><strong>1.3 Official Sources</strong> - Publicly accessible data repositories maintained by statutory or regulatory authorities (e.g., data.gov.in), or websites of government/statutory origin.</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">2. Acceptance and Scope</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>By placing an order or receiving a dataset, you acknowledge that you have read, understood, and agreed to be bound by this Agreement.</p>
                  <p>This Agreement applies to all current and future orders unless superseded by a new written agreement.</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">3. Dataset Delivery and Customisation</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee maintains a repository of regularly updated datasets for purchase and download.</p>
                  <p>On request, Kuinbee may collect, compile, curate, visualize, and deliver bespoke datasets tailored to your specifications, subject to feasibility and commercial agreement.</p>
                  <p>Datasets are delivered in standard formats (CSV, JSON, Excel, etc.) via secure digital means, unless otherwise agreed.</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">4. Sourcing and Accuracy</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>All datasets are derived from publicly available and officially recognized sources or legally permissible empirical data collection.</p>
                  <p>Kuinbee ensures integrity and accuracy but does not guarantee absolute correctness or completeness.</p>
                  <p>Kuinbee disclaims representation or affiliation with statutory/regulatory authorities or third-party respondents.</p>
                  <p>Empirical data may involve estimation or variability; Kuinbee is not liable for decisions based solely on such data.</p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">5. License and Usage Restrictions</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Upon full payment, you receive a non-exclusive, non-transferable, limited license for internal business, research, or analytical purposes.</p>
                  <p>Redistribution, resale, sublicensing, or publication without Kuinbee's consent is prohibited.</p>
                  <p>Re-identifying anonymized data, reverse-engineering, or unlawful usage is strictly prohibited.</p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">6. User Privacy and Data Protection</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee does not collect or process personal data without explicit consent.</p>
                  <p>Personally Identifiable Information (PII) will never be sold, leased, or transferred except where legally mandated.</p>
                  <p>The website may track anonymized usage metrics for security and analytics.</p>
                  <p>Industry-standard security protocols are applied.</p>
                  <p>Any sensitive information shared will be treated as confidential.</p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">7. Intermediary Status and Compliance</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee operates as a digital platform facilitating lawful interactions and dataset exchanges.</p>
                  <p>Under Section 79 of the IT Act, 2000, Kuinbee functions as an intermediary and is not liable for third-party data/content.</p>
                  <p>Kuinbee complies with IT (Intermediary Guidelines & Digital Media Ethics Code) Rules, 2021.</p>
                  <p>Kuinbee reserves the right to remove unlawful/prohibited content.</p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">8. Payment Terms</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Prices are as agreed at order confirmation.</p>
                  <p>Custom dataset costs depend on complexity and delivery timelines.</p>
                  <p>Invoices must be paid within 30 days; delays incur 2% weekly interest.</p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">9. Confidentiality and Data Security</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Both parties agree to maintain confidentiality of proprietary information.</p>
                  <p>Kuinbee encrypts, stores, and transmits datasets securely.</p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">10. Warranties and Disclaimers</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee warrants that it has lawful rights to compile and distribute datasets.</p>
                  <p>Datasets are provided "AS IS", with no warranties of merchantability, fitness, or completeness.</p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">11. Limitation of Liability</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee's liability shall not exceed the fees paid for the dataset in question.</p>
                  <p>Kuinbee is not liable for indirect, incidental, or consequential damages (loss of profit, corruption, disruption, etc.).</p>
                </div>
              </div>

              {/* Section 12 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">12. Termination</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee may terminate the Agreement if you breach any provision.</p>
                  <p>Upon termination, you must cease dataset usage and delete all copies.</p>
                </div>
              </div>

              {/* Section 13 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">13. Indemnification</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>You agree to indemnify and hold Kuinbee harmless from any claims arising from misuse, breach, or unlawful actions.</p>
                </div>
              </div>

              {/* Section 14 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">14. Governing Law and Disputes</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Governed by the laws of India.</p>
                  <p>Disputes fall under jurisdiction of competent Indian courts.</p>
                </div>
              </div>

              {/* Section 15 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">15. Amendments</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>Kuinbee may amend these Terms at any time.</p>
                  <p>Continued use of services after changes constitutes acceptance.</p>
                </div>
              </div>

              {/* Section 16 */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1a2240] mb-4">16. Miscellaneous</h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>If any clause is unenforceable, the rest remain valid.</p>
                  <p>No waiver of a breach shall be deemed a waiver of future breaches.</p>
                  <p>Any changes must be in writing and signed by both parties.</p>
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
                  <h3 className="text-xl font-bold mb-3">Questions About These Terms?</h3>
                  <p className="text-white/90 leading-relaxed mb-4">
                    If you have any questions about these Terms and Conditions, please contact us at:
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
