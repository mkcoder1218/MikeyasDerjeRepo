
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  // Base styles
  const baseStyles = "group relative px-8 py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 overflow-hidden transition-all duration-300";
  
  // Variants
  const variants = {
    // Primary: Gradient Background + Glow
    primary: "text-white shadow-[0_0_30px_-10px_rgba(139,92,246,0.6)] hover:shadow-[0_0_40px_-5px_rgba(6,182,212,0.5)]",
    // Secondary: Border Gradient + Glass
    secondary: "bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
  };

  return (
    <motion.button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {/* Gradient Background for Primary */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 group-hover:scale-110 transition-transform duration-500" />
      )}

      <span className="relative z-10 flex items-center gap-2">{children}</span>
      
      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20 pointer-events-none" />
    </motion.button>
  );
};
    