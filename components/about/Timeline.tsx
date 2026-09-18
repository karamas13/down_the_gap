// components/about/Timeline.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TIMELINE_ITEMS } from '../../data/mockProducts';

export const Timeline = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold text-[#2D4030] mb-12 text-center">
          Η Ιστορική μας Διαδρομή
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {TIMELINE_ITEMS.map((item, index) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-[#F9F6F0] rounded-2xl p-6 border border-[#2D4030]/10 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-4 py-1 bg-[#2D4030] text-[#E8A838] font-bold text-lg rounded-full mb-4">
                  {item.year}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#2D4030] mb-2">{item.title}</h3>
                <p className="text-sm text-[#2D4030]/80 leading-relaxed mb-6">{item.description}</p>
              </div>
              {item.imageUrl && (
                <div className="relative h-44 rounded-xl overflow-hidden">
                  <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};