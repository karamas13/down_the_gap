'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  onComplete,
  duration = 3000,
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setProgress(0);

    const intervalTime = 30;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 200);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLoading, duration, onComplete]);

  // Αν το isLoading είναι εξαρχής false, μην επιστρέψεις ΚΑΝΕΝΑ HTML element
  if (!isLoading && !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF7F2] text-[#2D4030] overflow-hidden select-none"
        >
          {/* Subtle Ambient Background Glowing Spheres */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8A838]/20 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#C86D51]/15 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Container with Radial Progress Ring */}
            <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64 mb-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-[#2D4030]/10"
                  strokeWidth="3"
                  fill="transparent"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-[#C86D51]"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * progress) / 100}
                  transition={{ ease: 'easeOut' }}
                />
              </svg>

              <motion.div
                animate={{ scale: [0.96, 1.02, 0.96] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-4 flex items-center justify-center p-4"
              >
                <Image
                  src="/images/MainLogo.avif"
                  alt="DownTheGap Logo"
                  width={220}
                  height={80}
                  priority
                  quality={100}
                  className="w-full h-auto object-contain drop-shadow-sm"
                />
              </motion.div>
            </div>

            {/* Bouncing Produce Icons */}
            <div className="flex items-center gap-3 mb-4">
              {['🥬', '🥕', '🧺', '🍅'].map((icon, idx) => (
                <motion.span
                  key={idx}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: idx * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="text-xl sm:text-2xl"
                >
                  {icon}
                </motion.span>
              ))}
            </div>

            {/* Progress Percentage & Tagline */}
            <div className="text-center space-y-1">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#C86D51]">
                {Math.round(progress)}%
              </span>
              <p className="font-serif text-sm sm:text-base font-bold text-[#2D4030]/80 tracking-wide">
                Φρέσκα προϊόντα στη στιγμή...
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};