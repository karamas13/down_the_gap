'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase'; 

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  caption: string;
  display_order?: number;
}

export const AboutGallery = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(true);

  // Fetch Gallery Items from Supabase
  useEffect(() => {
    setMounted(true);

    const fetchGallery = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('gallery_items')
          .select('*')
          .order('display_order', { ascending: true })
          .order('id', { ascending: false });

        if (error) throw error;
        if (data) setGalleryImages(data);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Lock Body Scroll
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

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, galleryImages.length]);

  const handleNextImage = () => {
    if (activeImageIndex !== null && galleryImages.length > 0) {
      setIsImgLoading(true);
      setActiveImageIndex((activeImageIndex + 1) % galleryImages.length);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex !== null && galleryImages.length > 0) {
      setIsImgLoading(true);
      setActiveImageIndex((activeImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  const openLightbox = (index: number) => {
    setIsImgLoading(true);
    setActiveImageIndex(index);
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

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse bg-gray-200 h-64 rounded-2xl w-full" />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && galleryImages.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-sans">
            Δεν υπάρχουν ακόμα διαθέσιμες φωτογραφίες στη συλλογή.
          </div>
        )}

        {/* Adaptive 3-Column Masonry Grid */}
        {!loading && galleryImages.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                onClick={() => openLightbox(idx)}
                className="break-inside-avoid group cursor-pointer"
              >
                <div className="relative w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 border border-[#2D4030]/10 shadow-sm group-hover:shadow-md transition-all duration-300">
                  <Image
                    src={img.src}
                    alt={img.alt || img.title}
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
                  {img.caption && (
                    <p className="text-xs text-[#2D4030]/75 mt-1 leading-relaxed">
                      {img.caption}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* LIGHTBOX MODAL */}
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

                {/* Close Button */}
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

                  {/* Image Display Container */}
                  <div className="relative w-full flex-1 max-w-6xl my-4 flex items-center justify-center pointer-events-auto">
                    
                    {/* Spinner Overlay */}
                    {isImgLoading && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin mb-2" />
                        <span className="text-xs text-white/70 font-sans tracking-wide">Φόρτωση...</span>
                      </div>
                    )}

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
                          alt={galleryImages[activeImageIndex].alt || galleryImages[activeImageIndex].title}
                          fill
                          priority
                          sizes="100vw"
                          onLoad={() => setIsImgLoading(false)}
                          className={`object-contain transition-opacity duration-300 ${
                            isImgLoading ? 'opacity-0' : 'opacity-100'
                          }`}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-white hover:text-black text-white transition-all border border-white/15 backdrop-blur-md shadow-xl z-30"
                      aria-label="Προηγούμενη"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/40 hover:bg-white hover:text-black text-white transition-all border border-white/15 backdrop-blur-md shadow-xl z-30"
                      aria-label="Επόμενη"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Floating Info Card */}
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