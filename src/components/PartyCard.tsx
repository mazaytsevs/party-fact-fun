
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PartyCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const PartyCard = ({ children, className = '', delay = 0 }: PartyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 ${className}`}
    >
      {children}
    </motion.div>
  );
};
