"use client"

import { motion } from "framer-motion"
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import TextField from '@mui/material/TextField';
import Navbar from "@/features/user/components/Navbar";
import Footer from "@/features/user/pages/landing/footer";
import { OverlayTriggers } from "@/features/user/components/GlobalOverlaySystem";
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Mail, Phone, Clock, ArrowRight } from "lucide-react"
import { AnimatePresence } from 'framer-motion';
import ResponsiveHeader from "../components/ResponsiveHeader";
/*
If you see "Cannot find module '@/shared/components/ui/label'" or similar errors for other UI components,
it means those components are either missing, not exported, or the path is incorrect.

You should check if the component exists at:
src/shared/components/ui/label.tsx

If it does not exist, you need to create it or install the UI library/package that provides it.
If you are using a UI library (like shadcn/ui, radix-ui, or similar), follow their installation instructions.

If these are your own components, make sure they are implemented and exported correctly.
*/
export default function SupportPage() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen relative bg-[#f7f8fa]">
      {/* Main gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <ResponsiveHeader theme="default" />

        
      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-sm">
              <span className="bg-gradient-to-r from-[#1a2240] via-[#24305e] to-[#4e5a7e] bg-clip-text text-transparent filter drop-shadow-lg">
                Contact & Support
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-sm">
              Whether you need help, have questions, or want to get in touch, we're here for you. Our team is ready to
              assist with both general inquiries and technical support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2240] mb-4 drop-shadow-sm">How Can We Help?</h2>
            <p className="text-base text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Choose the best way to reach us for general inquiries, technical support, or any questions you may have
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 border-0 shadow-lg shadow-slate-200/60 bg-white/80 backdrop-blur-sm hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#24305e] via-[#4e5a7e] to-[#1a2240] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/30 group-hover:shadow-xl group-hover:shadow-blue-900/40 transition-all duration-500 group-hover:scale-110">
                    <Mail className="w-8 h-8 text-white drop-shadow-sm" />
                  </div>
                  <CardTitle className="text-xl text-[#1a2240] mb-2 font-bold">Email Support</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    Send us a detailed message about your issue
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <div className="flex items-center justify-center text-xs text-gray-600 mb-4 bg-slate-50 rounded-full py-1.5 px-3 mx-auto w-fit">
                    <Clock className="w-3 h-3 mr-1.5 text-green-600" />
                    Response within 2 hours
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#1a2240] text-[#1a2240] hover:bg-[#1a2240] hover:text-white bg-transparent transition-all duration-300 py-4 text-base font-semibold hover:shadow-lg hover:shadow-blue-900/30"
                  >
                    Send Email
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 border-0 shadow-lg shadow-slate-200/60 bg-white/80 backdrop-blur-sm hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4e5a7e] via-[#1a2240] to-[#24305e] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/30 group-hover:shadow-xl group-hover:shadow-blue-900/40 transition-all duration-500 group-hover:scale-110">
                    <Phone className="w-8 h-8 text-white drop-shadow-sm" />
                  </div>
                  <CardTitle className="text-xl text-[#1a2240] mb-2 font-bold">Phone Support</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    Speak directly with our support specialists
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <div className="flex items-center justify-center text-xs text-gray-600 mb-4 bg-slate-50 rounded-full py-1.5 px-3 mx-auto w-fit">
                    <Phone className="w-3 h-3 mr-1.5 text-blue-600" />
                    +44 7825600683 • +91 7796137098
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-2 border-[#1a2240] text-[#1a2240] hover:bg-[#1a2240] hover:text-white bg-transparent transition-all duration-300 py-4 text-base font-semibold hover:shadow-lg hover:shadow-blue-900/30"
                  >
                    Schedule a call
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-50 via-white to-slate-50 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-blue-50/30"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2240] mb-4 drop-shadow-sm">Get In Touch</h2>
            <p className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Send us a message for general inquiries, support requests, or any questions. We'll get back to you as soon
              as possible.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-2xl shadow-slate-300/40 border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <TextField
                          fullWidth
                          margin="normal"
                          id="name"
                          label="Full Name"
                          placeholder="Enter your full name"
                          variant="outlined"
                          autoComplete="off"
                          sx={{
                            backgroundColor: 'white',
                            '& input': { backgroundColor: 'white !important' },
                            '& .MuiInputBase-root': { backgroundColor: 'white !important' },
                          }}
                        />
                    </div>
                    <div className="space-y-2">
                        <TextField
                          fullWidth
                          margin="normal"
                          id="email"
                          label="Email Address"
                          placeholder="Enter your email"
                          type="email"
                          variant="outlined"
                          autoComplete="off"
                          sx={{
                            backgroundColor: 'white',
                            '& input': { backgroundColor: 'white !important' },
                            '& .MuiInputBase-root': { backgroundColor: 'white !important' },
                          }}
                        />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <TextField
                      fullWidth
                      margin="normal"
                      id="subject"
                      label="Subject"
                      placeholder="What's this about?"
                      variant="outlined"
                      autoComplete="off"
                      sx={{
                        backgroundColor: 'white',
                        '& input': { backgroundColor: 'white !important' },
                        '& .MuiInputBase-root': { backgroundColor: 'white !important' },
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    {/* Message label handled by TextField */}
                      <TextField
                        fullWidth
                        margin="normal"
                        id="message"
                        label="Message"
                        placeholder="Describe your issue or question in detail..."
                        multiline
                        rows={4}
                        variant="outlined"
                        autoComplete="off"
                        sx={{
                          backgroundColor: 'white',
                          '& textarea': { backgroundColor: 'white !important' },
                          '& .MuiInputBase-root': { backgroundColor: 'white !important' },
                        }}
                      />
                  </div>
                  <Button
                    className="w-full bg-gradient-to-r from-[#1a2240] via-[#24305e] to-[#4e5a7e] hover:from-[#24305e] hover:via-[#4e5a7e] hover:to-[#1a2240] text-base py-5 font-semibold shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300 hover:-translate-y-1"
                    style={{ color: 'white', fontWeight: 700 }}
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a2240] mb-4 drop-shadow-sm">Quick Answers</h2>
            <p className="text-base text-gray-700 leading-relaxed">Find answers to commonly asked questions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-500 border-0 shadow-md shadow-slate-200/50 bg-white/90 backdrop-blur-sm hover:-translate-y-1 group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#1a2240] leading-relaxed group-hover:text-[#24305e] transition-colors duration-300">
                    How does Kuinbee ensure data security and accuracy?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Kuinbee follows strict protocols to guarantee data security and integrity. All data and analytics
                    are verified, structured, and validated before being published. Our platform uses encryption, access
                    controls, and continuous monitoring to keep your information safe and reliable.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-500 border-0 shadow-md shadow-slate-200/50 bg-white/90 backdrop-blur-sm hover:-translate-y-1 group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#1a2240] leading-relaxed group-hover:text-[#24305e] transition-colors duration-300">
                    Can businesses request private or industry-specific data?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Yes. Kuinbee allows businesses, researchers, and enterprises to request private, industry-specific,
                    or custom data and analytics. Our team sources, structures, and delivers exactly what you need for
                    decision-making, while ensuring compliance with security and regulatory standards.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-500 border-0 shadow-md shadow-slate-200/50 bg-white/90 backdrop-blur-sm hover:-translate-y-1 group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#1a2240] leading-relaxed group-hover:text-[#24305e] transition-colors duration-300">
                    What payment methods does Kuinbee support?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Kuinbee supports multiple payment options, including credit/debit cards, UPI, bank transfers, and
                    digital wallets. For enterprises and large-scale data projects, we also offer invoicing and
                    subscription-based billing options.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-500 border-0 shadow-md shadow-slate-200/50 bg-white/90 backdrop-blur-sm hover:-translate-y-1 group">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-[#1a2240] leading-relaxed group-hover:text-[#24305e] transition-colors duration-300">
                    How can I collaborate or partner with Kuinbee?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Kuinbee actively collaborates with researchers, freelancers, enterprises, and institutions. You can
                    partner with us to provide data, sell your analytics, or co-develop projects. Simply reach out
                    through our contact form or community to explore partnership opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
      <Footer />
    </div>
  );
}

