'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { title, description, imageUrl, isAvailable, category, season } = product;

  // Διασφάλιση client-side mounting για το React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fallback εικόνας αν λείπει από τη βάση
  const displayImage =
    imageUrl && imageUrl.trim() !== ''
      ? imageUrl
      : '/images/placeholder-vegetable.jpg';

  // Κλείδωμα scroll της σελίδας όταν το modal είναι ανοιχτό
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Κλείσιμο modal με το πλήκτρο ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* CARD COMPONENT */}
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => setIsOpen(true)}
        className="group relative h-full flex flex-col justify-between bg-white rounded-3xl p-4 border border-[#2D4030]/10 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-[#2D4030]/25 cursor-pointer"
      >
        {/* UPPER SECTION: IMAGE & BADGES */}
        <div>
          <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 shrink-0">
            <Image
              src={displayImage}
              alt={title || 'Προϊόν Φάρμας'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                !isAvailable ? 'grayscale-[30%] opacity-80' : ''
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

            <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
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

              {category && (
                <span className="pointer-events-auto truncate max-w-[110px] px-2.5 py-1 bg-[#1E2C22]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10 shadow-sm">
                  {category}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 px-1 space-y-2">
            <h3 className="font-serif text-lg font-extrabold text-[#2D4030] group-hover:text-[#C86D51] transition-colors leading-snug line-clamp-1">
              {title}
            </h3>

            <p className="text-xs text-[#2D4030]/70 leading-relaxed font-sans line-clamp-2 min-h-[2.25rem]">
              {description}
            </p>
          </div>
        </div>

        {/* CARD FOOTER */}
        <div className="pt-4 mt-4 border-t border-[#2D4030]/10 flex items-center justify-between gap-2 px-1 shrink-0">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 flex items-center gap-1.5">
            {isAvailable ? '🌱 Φρέσκο' : '⏳ Αναμένεται'}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="px-3.5 py-1.5 bg-[#2D4030] group-hover:bg-[#C86D51] text-white text-xs font-bold rounded-xl transition-all duration-300 flex items-center gap-1 shadow-sm group-hover:shadow-md"
          >
            <span>Προβολή</span>
            <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
          </button>
        </div>
      </motion.div>

      {/* REACT PORTAL FOR FULLSCREEN MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {/* BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/65 backdrop-blur-md"
                />

                {/* MODAL DIALOG (EXPANDED MAX-WIDTH TO 4XL) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl border border-[#2D4030]/10 z-10 my-auto overflow-hidden text-[#2D4030]"
                >
                  {/* FLOATING CLOSE BUTTON */}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#2D4030] font-black text-lg flex items-center justify-center transition-all shadow-md hover:scale-105 border border-[#2D4030]/10"
                    title="Κλείσιμο (Esc)"
                  >
                    ✕
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    
                    {/* LARGE IMAGE COLUMN (5 cols on lg) */}
                    <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-[280px] sm:min-h-[360px] w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 shrink-0 shadow-sm border border-[#2D4030]/10">
                      <Image
                        src={displayImage}
                        alt={title || 'Προϊόν Φάρμας'}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                        priority
                      />

                      {/* Dark Gradient Overlay for Badges */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

                      {/* Top Badges over Image */}
                      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                        {category && (
                          <span className="px-3 py-1 bg-[#1E2C22]/85 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider rounded-xl border border-white/15 shadow-sm">
                            {category}
                          </span>
                        )}
                        {season && (
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#2D4030] text-[11px] font-extrabold rounded-xl shadow-sm border border-white/50">
                            {season === 'summer' ? '☀️ Θερινή Σοδειά' : '❄️ Χειμερινή Σοδειά'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* DETAILS CONTENT COLUMN (7 cols on lg) */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        
                        {/* Status Badge */}
                        <div>
                          {isAvailable ? (
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-extrabold rounded-full">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                              </span>
                              Διαθέσιμο στο Πόστο μας
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full">
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              Εκτός Εποχής / Αναμένεται Σοδειά
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#2D4030] leading-tight">
                          {title}
                        </h2>

                        <div className="h-1 w-16 bg-[#C86D51] rounded-full" />

                        {/* Full Description */}
                        <p className="text-sm sm:text-base text-[#2D4030]/80 leading-relaxed font-sans max-h-48 overflow-y-auto pr-2">
                          {description || 'Δεν υπάρχει διαθέσιμη αναλυτική περιγραφή για αυτό το προϊόν.'}
                        </p>

                        {/* KEY INFORMATION GRID */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#2D4030]/10">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D4030]/50 block">
                              Εποχικότητα
                            </span>
                            <span className="text-xs font-bold text-[#2D4030] flex items-center gap-1 mt-0.5">
                              {season === 'summer' ? '☀️ Καλοκαιρινό' : '❄️ Χειμερινό'}
                            </span>
                          </div>
                          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#2D4030]/10">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D4030]/50 block">
                              Καλλιέργεια
                            </span>
                            <span className="text-xs font-bold text-[#2D4030] flex items-center gap-1 mt-0.5">
                              🌿 100% Φυσική
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM HIGHLIGHT & ACTIONS */}
                      <div className="space-y-4 pt-2 border-t border-[#2D4030]/10">
                        <div className="flex items-center gap-3 text-xs text-[#2D4030]/75 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#2D4030]/10">
                          <span className="text-2xl shrink-0">🧺</span>
                          <p className="leading-snug">
                            Συλλέγεται καθημερινά με φροντίδα και διατίθεται άμεσα στις λαϊκές αγορές της εβδομάδας.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href="/markets"
                            className="flex-1 py-3.5 bg-[#2D4030] hover:bg-[#C86D51] text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all text-center shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <span>📍 Βρείτε μας στη Λαϊκή</span>
                            <span>→</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-5 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-2xl transition-colors"
                          >
                            Κλείσιμο
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};