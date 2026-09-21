'use client';

import React, { useState } from 'react';
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
    src: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Πρωινή συγκομιδή',
    title: 'Πρωινή Συγκομιδή',
    caption: 'Μαζεύοντας τους καρπούς με την πρώτη δροσιά του πρωινού.',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb23659?auto=format&fit=crop&w=1200&q=80',
    alt: 'Φρέσκα λαχανικά',
    title: 'Αγνά Βιολογικά Προϊόντα',
    caption: 'Φρέσκα λαχανικά χωρίς χημικά φίλτρα & επεξεργασία.',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
    alt: 'Το κτήμα μας',
    title: 'Το Φυσικό Κτήμα',
    caption: 'Ένα ζωντανό οικοσύστημα καλλιέργειας με σεβασμό στο έδαφος.',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Προετοιμασία τελάρων',
    title: 'Προετοιμασία για τη Λαϊκή',
    caption: 'Προσεκτική διαλογή και τοποθέτηση την ίδια ημέρα συγκομιδής.',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Στατάρια & Χωράφια',
    title: 'Χρυσές Καλλιέργειες',
    caption: 'Παραδοσιακές τεχνικές φροντίδας και αμειψισποράς.',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Φρέσκες ντομάτες',
    title: 'Ντομάτες Εποχής',
    caption: 'Γεμάτη γεύση και άρωμα κατευθείαν από το μποστάνι.',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    alt: 'Πατάτες & Ρίζες',
    title: 'Καρποί της Γης',
    caption: 'Φυσική συλλογή χωρίς συνθετικά λιπάσματα.',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Πάγκος στη λαϊκή',
    title: 'Στον Πάγκο μας',
    caption: 'Άμεση επαφή και συζήτηση με τους καταναλωτές κάθε εβδομάδα.',
  },
];

export const AboutGallery = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Πλοήγηση στο Lightbox
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
            Μια Ημέρα στη Φάρμα
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
              {/* Clean Image Container */}
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

              {/* Text Below Image */}
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && galleryImages[activeImageIndex] && (
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
              className="relative max-w-5xl w-full bg-[#1A261C] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row"
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
              <div className="relative w-full md:w-3/5 h-[350px] sm:h-[500px]">
                <Image
                  src={galleryImages[activeImageIndex].src}
                  alt={galleryImages[activeImageIndex].alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Sidebar Info */}
              <div className="p-6 sm:p-8 w-full md:w-2/5 flex flex-col justify-between text-[#FAF7F2]">
                <div> 
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
                    {galleryImages[activeImageIndex].title}
                  </h3>
                  <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
                    {galleryImages[activeImageIndex].caption}
                  </p>
                </div>

                {/* Modal Navigation Controls */}
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6">
                  <span className="text-xs text-white/50 font-mono">
                    {activeImageIndex + 1} / {galleryImages.length}
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