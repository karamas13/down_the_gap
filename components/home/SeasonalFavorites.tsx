// components/home/SeasonalFavorites.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../../data/mockProducts';

export const SeasonalFavorites = () => {
  const favorites = MOCK_PRODUCTS.slice(0, 3);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4030] mb-4">
            Εποχιακά Αγαπημένα
          </h2>
          <p className="text-[#2D4030]/75">
            Ανακαλύψτε τα πιο φρέσκα προϊόντα που συλλέξαμε σήμερα το πρωί.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favorites.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#F9F6F0] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-[#2D4030]/5"
            >
              <div>
                <div className="relative h-56 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isFreshPicked && (
                    <span className="absolute top-3 left-3 bg-[#E8A838] text-[#2D4030] text-xs font-bold px-3 py-1 rounded-full shadow">
                      Σοδειά Σήμερα
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D4030] mb-1">{product.name}</h3>
                <p className="text-sm text-[#2D4030]/70 mb-4">{product.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#2D4030]/10">
                <span className="text-xl font-bold text-[#C86D51]">
                  €{product.price.toFixed(2)} <span className="text-xs font-normal text-[#2D4030]/70">/ {product.unit}</span>
                </span>
                <button className="px-5 py-2.5 bg-[#E8A838] hover:bg-[#e09b25] text-[#2D4030] font-bold rounded-xl text-sm transition-colors shadow">
                  Προσθήκη
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};