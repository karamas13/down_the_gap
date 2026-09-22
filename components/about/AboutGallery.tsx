'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption: string;
}

const galleryImages: GalleryItem[] = [
  {
    id: 1,
    src: '/images/tomatesextra.avif',
    alt: 'Άγουρη Τομάτα',
    title: 'Άγουρη Τομάτα',
    caption: 'Άγουρος καρπός τομάτας',
  },
  {
    id: 2,
    src: '/images/laxano1.avif',
    alt: 'Λάχανο',
    title: 'Καλλιέργεια Λαχάνων',
    caption: 'Ένα ζωντανό οικοσύστημα καλλιέργειας με σεβασμό στο έδαφος.',
  },
  {
    id: 3,
    src: '/images/laxano3.avif',
    alt: 'Λάχανο',
    title: 'Φρέσκο Λάχανο',
    caption: 'Φρέσκο Λάχανο πρίν την συγκομιδή.',
  },
  {
    id: 4,
    src: '/images/fill8.avif',
    alt: 'Πάγκος Λαϊκής',
    title: 'Ποικιλία φρέσκων προϊόντων',
    caption: 'Προσεκτική διαλογή και τοποθέτηση την ίδια ημέρα συγκομιδής.',
  },
  {
    id: 5,
    src: '/images/fill2.avif',
    alt: 'Πάγκος Λαϊκής',
    title: 'Ο Πάγκος μας',
    caption: 'Ένα συνονθύλευμα χρωμάτων και γεύσεων.',
  },
  {
    id: 6,
    src: '/images/tomates2.avif',
    alt: 'Φυτό Τομάτας',
    title: 'Φυτό Τομάτας',
    caption: 'Παραδοσιακές τεχνικές φροντίδας και αμειψισποράς.',
  },
  {
    id: 7,
    src: '/images/kounoupidi4.avif',
    alt: 'Κουνουπίδι',
    title: 'Φρέσκο Κουνουπίδι',
    caption: 'Φυσική συλλογή χωρίς συνθετικά λιπάσματα.',
  },
  {
    id: 8,
    src: '/images/melitzanes4.avif',
    alt: 'Μελιτζάνα',
    title: 'Φρέσκια Μελιτζάνα',
    caption: 'Φρέσκια μελιτζάνα πρίν την συγκομιδή.',
  },
  {
    id: 9,
    src: '/images/Ellies2.avif',
    alt: 'Ελλιά',
    title: 'Δέντρο Ελλιάς',
    caption: 'Δέντρο Ελλιάς στο κτήμα μας.',
  },
  {
    id: 10,
    src: '/images/piperies3.avif',
    alt: 'Πιπεριές',
    title: 'Φρέσκες Πιπεριές',
    caption: 'Φρέσκια πιπεριά πρίν την συγκομιδή.',
  },
];

export const AboutGallery = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Κλείδωμα Scroll
  useEffect(() => {
    if (activeImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeImageIndex]);

  // Πλοήγηση με πληκτρολόγιο
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex]);

  const handleNextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-[#2D4030]/10 text-[#2D4030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C86D51] block mb-2">
            Φωτογραφικό Υλικό
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2D4030]">
            Μια Ημέρα στο Κτήμα
          </h2>
          <p className="text-sm sm:text-base text-[#2D4030]/75 max-w-xl mt-3 leading-relaxed">
            Στιγμιότυπα από την καθημερινή μας ενασχόληση με τη γη, τη φροντίδα των καλλιεργειών και την προετοιμασία της συγκομιδής.
          </p>
        </div>

        {/* Adaptive 3-Column Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveImageIndex(idx)}
              className="break-inside-avoid group cursor-pointer"
            >
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 border border-[#2D4030]/10 shadow-sm group-hover:shadow-md transition-all duration-300">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-3 px-1">
                <h3 className="font-serif text-lg font-bold text-[#2D4030] group-hover:text-[#C86D51] transition-colors">
                  {img.title}
                </h3>
                <p className="text-xs text-[#2D4030]/75 mt-1 leading-relaxed">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* MODERN FULLSCREEN LIGHTBOX MODAL */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeImageIndex !== null && galleryImages[activeImageIndex] && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveImageIndex(null)}
                  className="fixed inset-0 bg-black/92 backdrop-blur-lg"
                />

                {/* Close Button Top Right */}
                <button
                  onClick={() => setActiveImageIndex(null)}
                  className="fixed top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all border border-white/10 shadow-lg"
                  aria-label="Κλείσιμο"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Main Lightbox Content */}
                <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 z-10 pointer-events-none">
                  
                  {/* Top Counter */}
                  <div className="pointer-events-auto mt-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/80 text-xs font-mono border border-white/10">
                    {activeImageIndex + 1} / {galleryImages.length}
                  </div>

                  {/* Image Display Area */}
                  <div className="relative w-full flex-1 max-w-6xl my-4 flex items-center justify-center pointer-events-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full h-full max-h-[75vh] flex items-center justify-center"
                      >
                        <Image
                          src={galleryImages[activeImageIndex].src}
                          alt={galleryImages[activeImageIndex].alt}
                          fill
                          priority
                          sizes="100vw"
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-white hover:text-black text-white transition-all border border-white/15 backdrop-blur-md shadow-xl"
                      aria-label="Προηγούμενη"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-white hover:text-black text-white transition-all border border-white/15 backdrop-blur-md shadow-xl"
                      aria-label="Επόμενη"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Floating Bottom Info Card */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="pointer-events-auto max-w-xl w-full bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center text-white shadow-2xl mb-2"
                  >
                    <h3 className="font-serif text-lg sm:text-xl font-bold">
                      {galleryImages[activeImageIndex].title}
                    </h3>
                    {galleryImages[activeImageIndex].caption && (
                      <p className="text-xs sm:text-sm text-white/80 font-light mt-1 leading-relaxed">
                        {galleryImages[activeImageIndex].caption}
                      </p>
                    )}
                  </motion.div>

                </div>

              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};