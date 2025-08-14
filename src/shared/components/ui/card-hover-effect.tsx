// import Link from "next/link"
"use client"

import type React from "react"

import { cn } from "../../utils"
import { AnimatePresence, motion } from "framer-motion"

import { useState } from "react"


export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    link: string
    icon: React.ElementType
    color: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Special animated glare/glow for the first (Discord) card */}
          {idx === 0 && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 rounded-3xl"
              initial={{ opacity: 0.5, scale: 0.98 }}
              animate={{
                opacity: [0.38, 0.5, 0.38],
                scale: [0.98, 1.02, 0.98],
                filter: [
                  'blur(0px) brightness(1.10)',
                  'blur(18px) brightness(1.18)',
                  'blur(0px) brightness(1.10)'
                ],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, #bfc9d1 0%, #8bb4f7 30%, #3b5fff 60%, #fff0 80%)',
                boxShadow:
                  '0 0 40px 12px #bfc9d1cc, 0 0 80px 24px #3b5fff88',
                opacity: 0.5,
              }}
            />
          )}
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className={cn(
                  "absolute inset-0 h-full w-full block rounded-3xl transition-colors duration-300",
                  "bg-gradient-to-br from-[#1a2240]/15 to-[#24305e]/20", // Lighter hover effect
                )}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card icon={item.icon} iconColor={item.color}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  )
}

export const Card = ({
  className,
  children,
  icon: Icon,
  iconColor,
}: {
  className?: string
  children: React.ReactNode
  icon: React.ElementType
  iconColor: string
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 overflow-hidden relative z-20 flex flex-col items-center text-center transition-colors duration-300",
        "bg-gradient-to-br from-[#f8fafc]/85 via-[#f1f5f9]/90 to-[#e2e8f0]/85 border-white/40", // Light mode card background
        className,
      )}
      style={{
        boxShadow: "0 10px 40px 0 rgba(26,34,64,0.12)", // Light mode shadow
      }}
    >
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg transition-colors duration-300",
          `bg-gradient-to-br ${iconColor}`, // Use the passed iconColor
        )}
      >
        <Icon className="w-8 h-8 text-[#1a2240]" /> {/* Light mode icon color */}
      </div>
      <div className="relative z-50 flex flex-col items-center text-center">{children}</div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <h4 className={cn("text-2xl font-bold mb-2 text-[#1a2240]", className)}>{children}</h4>
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return <p className={cn("text-base mb-6 text-gray-600", className)}>{children}</p>
}
