"use client"
import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/shared/components/ui/button"
import { Link } from "react-router-dom"
import Footer from "@/features/user/pages/landing/footer"
import ResponsiveHeader from "@/features/user/components/ResponsiveHeader"
import { 
  Heart, 
  Users, 
  Shield, 
  Lightbulb, 
  MessageCircle, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Globe,
  Target,
  Zap,
  Phone,
  ExternalLink
} from "lucide-react"

const mentalHealthStats = [
  { number: "1 in 4", label: "people experience mental health issues" },
  { number: "40%", label: "of employees report workplace stress" },
  { number: "76%", label: "say mental health affects their work" },
  { number: "60%", label: "want workplace mental health support" }
]

const features = [
  {
    icon: MessageCircle,
    title: "Interactive Webinars",
    description: "Expert-led sessions on stress management, emotional wellbeing, and resilience building"
  },
  {
    icon: Users,
    title: "Virtual Support Circles",
    description: "Safe spaces for peer support and sharing experiences in a judgment-free environment"
  },
  {
    icon: Lightbulb,
    title: "Awareness Campaigns",
    description: "Educational initiatives to destigmatize mental health conversations in the workplace"
  },
  {
    icon: Shield,
    title: "Professional Resources",
    description: "Access to qualified mental health professionals and crisis support systems"
  },
  {
    icon: Globe,
    title: "Remote-Friendly Design",
    description: "Accessible support regardless of location, perfect for distributed teams"
  },
  {
    icon: Target,
    title: "Personalized Tools",
    description: "Customized stress management and wellbeing tools for individual needs"
  }
]

const benefits = [
  "Reduced workplace stress and burnout",
  "Improved employee engagement and productivity",
  "Enhanced emotional resilience",
  "Stronger team connections and support",
  "Stigma-free mental health conversations",
  "Better work-life balance"
]

export default function ProjectSiddhi() {
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#1a2240] via-[#ffffff] to-[#1a2240] opacity-20 pointer-events-none z-0" />
      <div className="relative z-20">
        <ResponsiveHeader theme="default" />
      
        {/* Hero Section */}
        <section className="relative pt-20 pb-20 px-6 sm:px-8 lg:px-12 overflow-hidden">
          {/* Background Elements - matching your hero section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                x: [0, 30, 0], 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute top-20 right-20 w-64 h-64 bg-[#1a2240]/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                x: [0, -40, 0], 
                y: [0, 30, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute bottom-20 left-20 w-96 h-96 bg-[#1a2240]/5 rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a2240]/5 rounded-full border border-[#1a2240]/10"
                  >
                    <Heart className="w-4 h-4 text-[#1a2240]" />
                    <span className="text-sm font-medium text-[#1a2240]">Mental Health Initiative</span>
                  </motion.div>
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#1a2240] leading-tight">
                    <div className="mb-2 sm:mb-4">Project{" "}</div>
                    <motion.span
                      className="font-medium bg-gradient-to-r from-[#1a2240] via-[#4e5a7e] to-[#1a2240] bg-clip-text text-transparent bg-size-200 animate-gradient"
                      initial={{ backgroundPosition: "0% 50%" }}
                      animate={{ backgroundPosition: "100% 50%" }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    >
                      Siddhi
                    </motion.span>
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl">
                    Building safe, supportive, and resilient workplaces through comprehensive mental health and wellbeing support. 
                    Because mental health is as essential as physical health.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/project-siddhi/join" className="flex-1 sm:flex-none">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-[#1a2240] text-white hover:bg-[#4e5a7e] px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Join Our Community
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/project-siddhi/resources" className="flex-1 sm:flex-none">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-[#1a2240]/20 text-[#1a2240] hover:bg-[#1a2240]/5 hover:border-[#1a2240]/30 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Get Resources
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right Content - Interactive Feature Showcase */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#1a2240]/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-center space-y-6"
                    >
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#1a2240] to-[#4e5a7e] rounded-2xl flex items-center justify-center">
                        {React.createElement(features[activeFeature].icon, {
                          className: "w-8 h-8 text-white"
                        })}
                      </div>
                      <h3 className="text-2xl font-medium text-[#1a2240]">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {features[activeFeature].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Feature Navigation Dots */}
                  <div className="flex justify-center gap-2 mt-8">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeature(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === activeFeature 
                            ? "bg-[#1a2240] w-8" 
                            : "bg-[#1a2240]/20 hover:bg-[#1a2240]/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-[#1a2240] text-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-light mb-4">
                The Mental Health Reality
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Understanding the scope helps us build better solutions
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {mentalHealthStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <div className="text-3xl sm:text-4xl font-medium mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 px-6 sm:px-8 lg:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a2240]">
                    Our Mission & Vision
                  </h2>
                  <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                    <p>
                      Project Siddhi was created with the belief that mental health is as essential as physical health, 
                      and that every individual deserves access to care, awareness, and hope.
                    </p>
                    <p>
                      We envision a future where employees are empowered to thrive, companies embrace holistic wellbeing, 
                      and hope is carried forward into every corner of professional life.
                    </p>
                    <p>
                      What makes us unique is our remote-friendly design, ensuring that support, awareness, and community 
                      are accessible to all, regardless of location.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#1a2240]/5 rounded-xl border border-[#1a2240]/10">
                    <Zap className="w-6 h-6 text-[#1a2240]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#1a2240]">Not Just a Program</h3>
                    <p className="text-slate-600">A movement towards healthier workplaces and societies</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#1a2240]/10 shadow-lg">
                  <h3 className="text-2xl font-medium text-[#1a2240] mb-6">Benefits You'll Experience</h3>
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-[#1a2240] flex-shrink-0" />
                        <span className="text-slate-600">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mental Health Resources & Support */}
        <section className="py-20 bg-[#1a2240] text-white">
          <div className="max-w-5xl mx-auto text-center px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light">
                Need Immediate Support?
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                If you or someone you know is struggling with mental health, remember that help is available. 
                You are not alone, and reaching out is a sign of strength.
              </p>
              
              {/* Government Mental Health Helplines */}
              <div className="pt-8">
                <h3 className="text-2xl font-medium mb-6 text-center">
                  Government Mental Health Helplines
                </h3>
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-white/20 rounded-2xl">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium">Tele-MANAS</h4>
                        <p className="text-sm text-white/70">National Tele Mental Health Programme</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <a 
                          href="tel:14416" 
                          className="block text-3xl font-medium text-white hover:text-white/80 transition-colors"
                        >
                          14416
                        </a>
                        <p className="text-lg text-white/90">or</p>
                        <a 
                          href="tel:+918009144416" 
                          className="block text-2xl font-medium text-white hover:text-white/80 transition-colors"
                        >
                          1800-891-4416
                        </a>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-white/80 text-sm leading-relaxed">
                          24×7 mental health counselling & support<br/>
                          Available in multiple Indian languages<br/>
                          Ministry of Health & Family Welfare
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
                  >
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="p-3 bg-white/20 rounded-2xl">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium">KIRAN Helpline</h4>
                        <p className="text-sm text-white/70">National Mental Health Programme</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <a 
                          href="tel:+918005990019" 
                          className="block text-3xl font-medium text-white hover:text-white/80 transition-colors"
                        >
                          1800-599-0019
                        </a>
                      </div>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-white/80 text-sm leading-relaxed">
                          Nationwide coverage, 24×7 support<br/>
                          Mental health rehabilitation services<br/>
                          Early screening & psychological support<br/>
                          Crisis management & intervention
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="pt-12">
                <h3 className="text-2xl font-medium mb-8 text-center">
                  Additional Mental Health Resources
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  <motion.a
                    href="https://www.nimhans.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Shield className="w-5 h-5" />
                      </div>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h4 className="font-medium mb-1">NIMHANS</h4>
                    <p className="text-sm text-white/70">National Institute of Mental Health</p>
                  </motion.a>

                  <motion.a
                    href="https://manastha.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Globe className="w-5 h-5" />
                      </div>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h4 className="font-medium mb-1">Manastha</h4>
                    <p className="text-sm text-white/70">Online Mental Health Platform</p>
                  </motion.a>

                  <motion.a
                    href="https://www.thelivelovelaughfoundation.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Heart className="w-5 h-5" />
                      </div>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h4 className="font-medium mb-1">Live Love Laugh</h4>
                    <p className="text-sm text-white/70">Mental Health Awareness</p>
                  </motion.a>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/20"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                    </div>
                    <h4 className="font-medium mb-1 text-center">Crisis Text Line</h4>
                    <p className="text-sm text-white/70 text-center">Text "HELLO" to</p>
                    <p className="text-lg font-medium text-center mt-1">741741</p>
                  </motion.div>
                </div>
              </div>

              <div className="pt-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-3xl mx-auto"
                >
                  <p className="text-lg text-white/90 italic text-center leading-relaxed">
                    "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
                  </p>
                  <p className="text-sm text-white/60 text-center mt-3">Remember: It's okay to not be okay. Seeking help is brave.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}