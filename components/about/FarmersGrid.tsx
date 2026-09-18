// components/about/FarmersGrid.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { FARMER_PROFILES } from '../../data/mockProducts';

export const FarmersGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4030] mb-4">
            Γνωρίστε την Οικογένεια
          </h2>
          <p className="text-[#2D4030]/80">
            Οι άνθρωποι πίσω από τη καθημερινή φροντίδα της φάρμας μας.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FARMER_PROFILES.map((farmer) => (
            <div key={farmer.id} className="bg-[#F9F6F0] rounded-2xl overflow-hidden border border-[#2D4030]/10 p-6 text-center">
              <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                <Image src={farmer.imageUrl} alt={farmer.name} fill className="object-cover" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2D4030] mb-1">{farmer.name}</h3>
              <span className="inline-block text-xs font-semibold text-[#C86D51] uppercase tracking-wider mb-4">
                {farmer.role}
              </span>
              <p className="text-sm text-[#2D4030]/80 italic">"{farmer.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};