"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Activity, Code, UserCheck } from "lucide-react"

const securityFeatures = [
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Zero-trust architecture and defense-in-depth protect your data from day one.",
    angle: -90, // Fixed angle to position at top (12 o'clock)
  },
  {
    icon: Lock,
    title: "Data-Centric Protection",
    description:
      "End-to-end encryption, strict access controls, and anonymization ensure sensitive data is always safe.",
    angle: -30, // Fixed angle for top-right position
  },
  {
    icon: UserCheck,
    title: "Least Privilege Access",
    description: "Role-based controls and identity management minimize risks by default.",
    angle: 30, // Fixed angle for bottom-right position
  },
  {
    icon: Activity,
    title: "Continuous Monitoring",
    description: "Real-time logging, audit trails, and anomaly detection keep threats in check.",
    angle: 90, // Fixed angle for bottom position (6 o'clock)
  },
  {
    icon: Code,
    title: "DevSecOps at the Core",
    description: "Security is part of every build, deployment, and update — not an afterthought.",
    angle: 150, // Fixed angle for bottom-left position
  },
  {
    icon: Eye,
    title: "Privacy by Default",
    description: "GDPR-ready, transparent policies with privacy-first practices you can trust.",
    angle: -150, // Fixed angle for top-left position
  },
]
export default function SecuritySection() {
  return (
  <section id="security" className="py-16 md:py-24 bg-white min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium mb-4 md:mb-6">
            <Shield className="w-4 h-4" />
            Enterprise Security
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-[#1a2240] mb-4 md:mb-6">
            Enterprise-Grade Data Security <span className="font-semibold">You Can Trust</span>
          </h2>

          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            At Kuinbee, security isn't an add-on, it's built into our DNA. From zero-trust design to end-to-end
            encryption, every layer of our platform is engineered to keep your data safe, compliant, and private.
          </p>
        </motion.div>

        {/* Orbit layout for md+ screens */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Central Security Hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-[600px] h-[600px] mx-auto"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#1a2240] via-[#2a3454] to-[#4e5a7e] rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
              <div className="text-center text-white">
                <Shield className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Kuinbee</h3>
                <p className="text-base text-blue-100">Security Core</p>
                <div className="mt-3 flex justify-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>

            {/* Orbiting Security Features */}
            {securityFeatures.map((feature, index) => {
              const radius = 220
              const angleRad = (feature.angle * Math.PI) / 180
              const x = Math.cos(angleRad) * radius + 300
              const y = Math.sin(angleRad) * radius + 300

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="absolute group cursor-pointer"
                  style={{
                    left: `${x - 48}px`,
                    top: `${y - 48}px`,
                  }}
                >
                  {/* Connection Line */}
                  <div
                    className="absolute w-0.5 bg-gradient-to-r from-blue-200 to-transparent opacity-60"
                    style={{
                      width: `${radius - 80}px`,
                      height: "2px",
                      left: "48px",
                      top: "47px",
                      transform: `rotate(${feature.angle + 180}deg)`,
                      transformOrigin: "left center",
                    }}
                  ></div>

                  <div
                    className="w-24 h-24 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 hover:border-blue-300 transition-all duration-300 relative z-20"
                    style={{ pointerEvents: "auto" }}
                  >
                    <feature.icon className="w-10 h-10 text-[#1a2240] group-hover:text-blue-600 transition-colors duration-300" />
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-72 p-5 bg-gradient-to-br from-[#1a2240] via-[#2a3454] to-[#4e5a7e] rounded-xl shadow-2xl border border-slate-200 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 pointer-events-none">
                    <h4 className="font-semibold text-white mb-3 text-base">{feature.title}</h4>
                    <p className="text-sm text-blue-100 leading-relaxed font-medium">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-50 rounded-full">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">All systems secure</span>
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Shield className="w-4 h-4" />
                <span className="font-medium">6 layers of protection</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stacked feature list for mobile */}
        <div className="block md:hidden">
          <div className="flex flex-col gap-6">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-[#1a2240] via-[#2a3454] to-[#4e5a7e] rounded-full flex items-center justify-center shadow-2xl border-4 border-white mb-6">
              <div className="text-center text-white">
                <Shield className="w-10 h-10 mx-auto mb-2" />
                <h3 className="text-lg font-bold mb-1">Kuinbee</h3>
                <p className="text-xs text-blue-100">Security Core</p>
              </div>
            </div>
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-blue-100 shadow">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full border-2 border-blue-200 flex items-center justify-center shadow">
                  <feature.icon className="w-7 h-7 text-[#1a2240]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a2240] mb-1 text-base">{feature.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{feature.description}</p>
                </div>
              </div>
            ))}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-xs text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">All systems secure</span>
                <span className="mx-2">|</span>
                <Shield className="w-4 h-4" />
                <span className="font-medium">6 layers of protection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
