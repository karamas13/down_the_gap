'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  caption: string;
}

const categories = ['Όλα', 'Συγκομιδή', 'Το Κτήμα', 'Προϊόντα', 'Λαϊκή Αγορά'];

const galleryImages: GalleryItem[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Πρωινή συγκομιδή',
    title: 'Πρωινή Συγκομιδή',
    category: 'Συγκομιδή',
    caption: 'Μαζεύοντας τους καρπούς με την πρώτη δροσιά του πρωινού.',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb23659?auto=format&fit=crop&w=1200&q=80',
    alt: 'Φρέσκα λαχανικά',
    title: 'Αγνά Βιολογικά Προϊόντα',
    category: 'Προϊόντα',
    caption: 'Φρέσκα λαχανικά χωρίς χημικά φίλτρα & επεξεργασία.',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    alt: 'Το κτήμα μας',
    title: 'Το Φυσικό Κτήμα',
    category: 'Το Κτήμα',
    caption: 'Ένα ζωντανό οικοσύστημα καλλιέργειας με σεβασμό στο έδαφος.',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Προετοιμασία τελάρων',
    title: 'Προετοιμασία για τη Λαϊκή',
    category: 'Λαϊκή Αγορά',
    caption: 'Προσεκτική διαλογή και τοποθέτηση την ίδια ημέρα συγκομιδής.',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Στατάρια & Χωράφια',
    title: 'Χρυσές Καλλιέργειες',
    category: 'Το Κτήμα',
    caption: 'Παραδοσιακές τεχνικές φροντίδας και αμειψισποράς.',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Φρέσκες ντομάτες',
    title: 'Ντομάτες Εποχής',
    category: 'Προϊόντα',
    caption: 'Γεμάτη γεύση και άρωμα κατευθείαν από το μποστάνι.',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    alt: 'Πατάτες & Ρίζες',
    title: 'Καρποί της Γης',
    category: 'Συγκομιδή',
    caption: 'Φυσική συλλογή χωρίς συνθετικά λιπάσματα.',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Πάγκος στη λαϊκή',
    title: 'Στον Πάγκο μας',
    category: 'Λαϊκή Αγορά',
    caption: 'Άμεση επαφή και συζήτηση με τους καταναλωτές κάθε εβδομάδα.',
  },
];

export const AboutGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('Όλα');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Φιλτράρισμα εικόνων βάσει κατηγορίας
  const filteredImages = galleryImages.filter(
    (img) => selectedCategory === 'Όλα' || img.category === selectedCategory
  );

  // Ομαλή κύλιση Carousel αριστερά/δεξιά
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Πλοήγηση στο Lightbox
  const handleNextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredImages.length);
    }
  };

  const handlePrevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-[#2D4030]/10 text-[#2D4030]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C86D51] block mb-2">
              Φωτογραφικό Υλικό
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#2D4030]">
              Μια Ημέρα στη Φάρμα
            </h2>
            <p className="text-sm sm:text-base text-[#2D4030]/75 max-w-xl mt-3 leading-relaxed">
              Στιγμιότυπα από την καθημερινή μας ενασχόληση με τη γη, τη φροντίδα των καλλιεργειών και την προετοιμασία της συγκομιδής.
            </p>
          </div>

          {/* Carousel Arrows Controls */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="p-3.5 rounded-2xl border border-[#2D4030]/15 bg-[#FAF7F2] hover:bg-[#2D4030] hover:text-[#FAF7F2] transition-colors duration-200"
              aria-label="Προηγούμενο"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3.5 rounded-2xl border border-[#2D4030]/15 bg-[#FAF7F2] hover:bg-[#2D4030] hover:text-[#FAF7F2] transition-colors duration-200"
              aria-label="Επόμενο"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

       
        {/* Horizontal Carousel Track */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 pt-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredImages.map((img, idx) => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative flex-none w-[280px] sm:w-[340px] h-[420px] rounded-3xl overflow-hidden bg-[#2D4030]/5 cursor-pointer snap-start border border-[#2D4030]/10 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 280px, 340px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
                        
              {/* Hover Zoom Icon Indicator */}
              <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>

              {/* Gradient & Bottom Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-0 inset-x-0 p-6 text-white transform transition-transform duration-300">
                <h3 className="font-serif text-xl font-bold leading-snug">{img.title}</h3>
                <p className="text-xs text-white/80 mt-1.5 font-light line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && filteredImages[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveImageIndex(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#1A261C] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Κλείσιμο"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Full Image Container */}
              <div className="relative w-full md:w-3/5 h-[300px] sm:h-[450px]">
                <Image
                  src={filteredImages[activeImageIndex].src}
                  alt={filteredImages[activeImageIndex].alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Sidebar Info */}
              <div className="p-6 sm:p-8 w-full md:w-2/5 flex flex-col justify-between text-[#FAF7F2]">
                <div>       
                  <h3 className="font-serif text-2xl font-bold mb-3 py-8">
                    {filteredImages[activeImageIndex].title}
                  </h3>
                  <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
                    {filteredImages[activeImageIndex].caption}
                  </p>
                </div>

                {/* Modal Navigation Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
                  <span className="text-xs text-white/50 font-mono">
                    {activeImageIndex + 1} / {filteredImages.length}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevImage}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                      aria-label="Προηγούμενη εικόνα"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
                      aria-label="Επόμενη εικόνα"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};