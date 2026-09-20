'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../products/ProductCard';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import Link from 'next/link';

export const SeasonalProducts = () => {
  // Φιλτράρισμα προϊόντων: Μόνο τα διαθέσιμα εποχιακά προϊόντα
  const availableSeasonalProducts = MOCK_PRODUCTS.filter(
    (product) => product.isAvailable && (product.isAvailable ?? true)
  ).slice(0, 4); // Προβολή των πρώτων 4 στην αρχική σελίδα

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#18231A] via-[#233326] to-[#18231A] text-[#FAF7F2] relative overflow-hidden">
      {/* Decorative Ambient Lighting & Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E8A838]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2D4030]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Glass Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/15 text-[#E8A838] rounded-full text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#E8A838] animate-pulse" />
              Τώρα στην Εποχή τους
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Φρέσκα Εποχιακά Προϊόντα
            </h2>

            <p className="text-base sm:text-lg text-white/75 mt-3 font-normal leading-relaxed">
              Συγκομίζονται καθημερινά από τα κτήματά μας και είναι διαθέσιμα για άμεση παραγγελία ή παραλαβή από τη λαϊκή.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-extrabold text-[#E8A838] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-md group shrink-0"
          >
            <span>Δείτε όλα τα προϊόντα</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product Cards Grid */}
        {availableSeasonalProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {availableSeasonalProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="hover:-translate-y-1.5 transition-transform duration-300"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Fallback σε περίπτωση που δεν υπάρχουν διαθέσιμα προϊόντα */
          <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg">
            <span className="text-4xl block mb-3">🌱</span>
            <h3 className="font-serif text-xl font-bold text-white">
              Αυτή τη στιγμή ετοιμάζεται η νέα συγκομιδή!
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Επιστρέψτε σύντομα για νέα φρέσκα βιολογικά προϊόντα.
            </p>
          </div>
        )}

        {/* Bottom Feature Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 p-6 sm:p-8 bg-gradient-to-r from-[#C86D51] via-[#b85e43] to-[#A34B32] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Ambient Glow */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#E8A838]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shrink-0 shadow-inner">
              🌿
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                Εγγύηση Απολύτως Φρέσκου Προϊόντος
              </h4>
              <p className="text-xs sm:text-sm text-white/85 mt-0.5 font-light">
                Όλα τα διαθέσιμα προϊόντα μαζεύονται εντός 24 ωρών πριν την παράδοση.
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="px-6 py-3.5 bg-[#18231A] hover:bg-[#233326] text-[#E8A838] hover:text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0 border border-[#E8A838]/30 relative z-10"
          >
            Μάθετε για την Καλλιέργειά μας
          </Link>
        </motion.div>

      </div>
    </section>
  );
};