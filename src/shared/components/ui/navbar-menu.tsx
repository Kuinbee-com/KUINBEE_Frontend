"use client";
import React from "react";
import { motion } from "motion/react";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      className="relative"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:opacity-90"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.9rem)] left-1/2 transform -translate-x-1/2 pt-2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent bg-[#050a24] shadow-input flex justify-center space-x-4 px-8 py-4 "
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  className = "",
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  className?: string;
}) => {
  return (
    <a href={href} className={`flex space-x-3 ${className}`}>
      <img
        src={src}
        width={40}
        height={40}
        alt={title}
        className="shrink-0 rounded-lg shadow-lg"
      />
      <div>
        <h4 className="text-base font-semibold mb-0.5 text-white tracking-wide">
          {title}
        </h4>
        <p className="text-white/70 text-xs max-w-[11rem] leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-white hover:text-gray-200"
    >
      {children}
    </a>
  );
};

export const LogoItem = ({
  src,
  alt,
  href,
  className = "",
}: {
  src: string;
  alt: string;
  href?: string;
  className?: string;
}) => {
  const logoElement = (
    <div className="relative group cursor-pointer">
      {/* Stronger multi-layered glow effects on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-cyan-500/40 rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-90 transition-all duration-700 ease-out animate-pulse pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-blue-400/50 to-purple-400/50 rounded-full blur-2xl scale-125 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none"></div>
      <div className="absolute inset-0 bg-white/25 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out pointer-events-none"></div>
      
      {/* Logo with enhanced stronger glow */}
      <img 
        src={src}
        alt={alt}
        className={`relative h-[1.2em] w-auto object-contain filter brightness-110 transition-all duration-500 ease-out group-hover:drop-shadow-[0_0_50px_rgba(0,180,255,1)] group-hover:brightness-130 group-hover:scale-105 ${className}`}
        style={{backgroundColor: 'transparent'}}
      />
    </div>
  );

  if (href) {
    return (
      <a href={href}>
        {logoElement}
      </a>
    );
  }

  return logoElement;
};
