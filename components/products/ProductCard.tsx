'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, description, imageUrl, isAvailable, category } = product;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative h-full flex flex-col justify-between bg-white rounded-3xl p-4 border border-[#2D4030]/10 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#2D4030]/25"
    >
      {/* UPPER SECTION: IMAGE & BADGES */}
      <div>
        {/* Fixed Aspect Image Container */}
        <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
              !isAvailable ? 'grayscale-[30%] opacity-80' : ''
            }`}
          />

          {/* Dark Overlay Gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

          {/* SAFE BADGES CONTAINER (Flex Row - No Overlap Guarantee) */}
          <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            {/* Availability Badge */}
            <div className="pointer-events-auto shrink-0">
              {isAvailable ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md text-[#2D4030] text-[11px] font-extrabold rounded-full shadow-md border border-white/50">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  Διαθέσιμο
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1E2C22]/85 backdrop-blur-md text-[#FAF7F2] text-[11px] font-bold rounded-full shadow-md border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Εκτός Εποχής
                </span>
              )}
            </div>

            {/* Category Badge */}
            {category && (
              <span className="pointer-events-auto truncate max-w-[110px] px-2.5 py-1 bg-[#1E2C22]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10 shadow-sm">
                {category}
              </span>
            )}
          </div>
        </div>

        {/* CONTENT SECTION (Fixed Typography Spacing) */}
        <div className="pt-4 px-1 space-y-2">
          {/* Title: Strict 1 line to maintain grid alignment */}
          <h3 className="font-serif text-lg font-extrabold text-[#2D4030] group-hover:text-[#C86D51] transition-colors leading-snug line-clamp-1">
            {title}
          </h3>

          {/* Description: Controlled 2 lines with fixed min-height */}
          <p className="text-xs text-[#2D4030]/70 leading-relaxed font-sans line-clamp-2 min-h-[2.25rem]">
            {description}
          </p>
        </div>
      </div>

      {/* FOOTER SECTION: FIXED AT BOTTOM */}
      <div className="pt-4 mt-4 border-t border-[#2D4030]/10 flex items-center justify-between gap-2 px-1 shrink-0">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 flex items-center gap-1.5">
          {isAvailable ? '🌱 Φρέσκο' : '⏳ Αναμένεται'}
        </span>

        <button className="px-3.5 py-1.5 bg-[#2D4030] group-hover:bg-[#C86D51] text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-1 shadow-sm group-hover:shadow-md">
          <span>Προβολή</span>
          <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </motion.div>
  );
};