
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PartyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const PartyButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '' 
}: PartyButtonProps) => {
  const baseClasses = "font-bold rounded-xl transition-all duration-200 border-2 shadow-lg";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-purple-300 hover:from-pink-600 hover:to-purple-700",
    secondary: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border-cyan-300 hover:from-blue-600 hover:to-cyan-700",
    success: "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-emerald-300 hover:from-green-600 hover:to-emerald-700",
    warning: "bg-gradient-to-r from-orange-500 to-red-600 text-white border-red-300 hover:from-orange-600 hover:to-red-700"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </motion.button>
  );
};
