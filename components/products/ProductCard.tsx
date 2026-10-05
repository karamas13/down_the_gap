'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sprout, 
  Hourglass, 
  Sun, 
  Snowflake, 
  Leaf, 
  ArrowRight, 
  X 
} from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { title, description, imageUrl, isAvailable, category, season } = product;

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayImage =
    imageUrl && imageUrl.trim() !== ''
      ? imageUrl
      : '/images/placeholder-vegetable.jpg';

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
        className="group relative h-full flex flex-col justify-between bg-white rounded-3xl p-4 border border-[#2D4030]/15 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* UPPER SECTION: IMAGE & BADGES */}
        <div>
          <div className="relative h-52 w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 shrink-0">
            {/* Native lazy loading applied automatically by next/image */}
            <Image
              src={displayImage}
              alt={title || 'Προϊόν'}
              fill
              quality={75}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                !isAvailable ? 'grayscale-30 opacity-80' : ''
              }`}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
              <div className="pointer-events-auto shrink-0">
                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121B15] text-white text-[11px] font-extrabold rounded-full shadow-md border border-white/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Διαθέσιμο
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121B15] text-[#FAF7F2] text-[11px] font-bold rounded-full shadow-md border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Μη Διαθέσιμο
                  </span>
                )}
              </div>

              {category && (
                /* Enhanced contrast: Solid background badge `#121B15` */
                <span className="pointer-events-auto truncate max-w-27.5 px-2.5 py-1 bg-[#121B15] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/20 shadow-sm">
                  {category}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 px-1 space-y-2">
            {/* Heading Level set to H3 for correct descending sequence */}
            <h3 className="font-serif text-lg font-extrabold text-[#121B15] group-hover:text-[#C86D51] transition-colors leading-snug line-clamp-1">
              {title}
            </h3>

            {/* Enhanced contrast: bumped opacity from 70% to 85% (#2D4030) */}
            <p className="text-xs text-[#2D4030]/85 leading-relaxed font-sans line-clamp-2 min-h-9 font-normal">
              {description}
            </p>
          </div>
        </div>

        {/* CARD FOOTER */}
        <div className="pt-4 mt-4 border-t border-[#2D4030]/15 flex items-center justify-between gap-2 px-1 shrink-0">
          {/* Enhanced contrast: dark green text (#1E2C22) instead of light opacity */}
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#1E2C22] flex items-center gap-1.5">
            {isAvailable ? (
              <>
                <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                <span>Φρέσκο</span>
              </>
            ) : (
              <>
                <Hourglass className="w-3.5 h-3.5 text-amber-700" />
                <span>Αναμένεται</span>
              </>
            )}
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
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>

      {/* REACT PORTAL FOR FULLSCREEN MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
                {/* BACKDROP */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-md"
                />

                {/* MODAL DIALOG */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 20 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl border border-[#2D4030]/10 z-10 my-auto overflow-hidden text-[#121B15]"
                >
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white text-[#121B15] font-black text-lg flex items-center justify-center transition-all shadow-md hover:scale-105 border border-[#2D4030]/20"
                    title="Κλείσιμο (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
                    <div className="lg:col-span-5 relative h-72 sm:h-96 lg:h-full min-h-70 sm:min-h-90 w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 shrink-0 shadow-sm border border-[#2D4030]/10">
                      <Image
                        src={displayImage}
                        alt={title || 'Προϊόν Φάρμας'}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
                        {category && (
                          <span className="px-3 py-1 bg-[#121B15] text-white text-[11px] font-extrabold uppercase tracking-wider rounded-xl border border-white/20 shadow-sm">
                            {category}
                          </span>
                        )}
                        {season && (
                          <span className="px-3 py-1 bg-white text-[#121B15] text-[11px] font-extrabold rounded-xl shadow-sm border border-black/10 flex items-center gap-1.5">
                            {season === 'summer' ? (
                              <>
                                <Sun className="w-3.5 h-3.5 text-amber-600" />
                                <span>Θερινή Σοδειά</span>
                              </>
                            ) : (
                              <>
                                <Snowflake className="w-3.5 h-3.5 text-blue-600" />
                                <span>Χειμερινή Σοδειά</span>
                              </>
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div>
                          {isAvailable ? (
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-extrabold rounded-full">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                              </span>
                              Διαθέσιμο στο Πόστο μας
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold rounded-full">
                              <span className="w-2 h-2 rounded-full bg-amber-600" />
                              Μη Διαθέσιμο / Αναμένεται Σοδειά
                            </span>
                          )}
                        </div>

                        <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#121B15] leading-tight">
                          {title}
                        </h2>

                        <div className="h-1 w-16 bg-[#C86D51] rounded-full" />

                        {/* Enhanced contrast ratio for long text description */}
                        <p className="text-sm sm:text-base text-[#1E2C22] leading-relaxed font-sans max-h-48 overflow-y-auto pr-2">
                          {description || 'Δεν υπάρχει διαθέσιμη αναλυτική περιγραφή για αυτό το προϊόν.'}
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#2D4030]/15">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E2C22] block">
                              Εποχικότητα
                            </span>
                            <span className="text-xs font-bold text-[#121B15] flex items-center gap-1.5 mt-0.5">
                              {season === 'summer' ? (
                                <>
                                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                                  <span>Καλοκαιρινό</span>
                                </>
                              ) : (
                                <>
                                  <Snowflake className="w-3.5 h-3.5 text-blue-600" />
                                  <span>Χειμερινό</span>
                                </>
                              )}
                            </span>
                          </div>
                          <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#2D4030]/15">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1E2C22] block">
                              Καλλιέργεια
                            </span>
                            <span className="text-xs font-bold text-[#121B15] flex items-center gap-1.5 mt-0.5">
                              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                              <span>100% Φυσική</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pt-2 border-t border-[#2D4030]/15">        
                        <div className="flex items-center gap-3">
                          <a
                            href="/products"
                            className="flex-1 py-3.5 bg-[#2D4030] hover:bg-[#C86D51] text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all text-center shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <span>Δείτε όλα τα Προϊόντα</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-5 py-3.5 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold text-xs sm:text-sm rounded-2xl transition-colors"
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