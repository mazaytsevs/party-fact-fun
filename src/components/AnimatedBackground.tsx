
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Confetti = ({ delay = 0 }: { delay?: number }) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-sm"
      style={{ backgroundColor: color }}
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: -10,
        rotate: 0,
        opacity: 1
      }}
      animate={{
        y: window.innerHeight + 10,
        rotate: 360,
        opacity: [1, 1, 0]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: Math.random() * 5
      }}
    />
  );
};

const Balloon = ({ delay = 0 }: { delay?: number }) => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div
      className="absolute"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        rotate: 0
      }}
      animate={{
        y: -100,
        x: Math.random() * window.innerWidth,
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 10
      }}
    >
      <div 
        className="w-8 h-10 rounded-full shadow-lg"
        style={{ backgroundColor: color }}
      />
      <div className="w-0.5 h-8 bg-gray-400 mx-auto" />
    </motion.div>
  );
};

export const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Конфетти */}
      {Array.from({ length: 15 }, (_, i) => (
        <Confetti key={`confetti-${i}`} delay={i * 0.2} />
      ))}
      
      {/* Шарики */}
      {Array.from({ length: 5 }, (_, i) => (
        <Balloon key={`balloon-${i}`} delay={i * 1.5} />
      ))}
      
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 opacity-30" />
    </div>
  );
};
