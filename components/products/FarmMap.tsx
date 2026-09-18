// components/products/FarmMap.tsx
'use client';

import React from 'react';

export const FarmMap = () => {
  const locations = [
    { title: 'Τοποθεσία Φάρμας 1', desc: 'Κεντρικά θερμοκήπια & λαχανόκηποι' },
    { title: 'Τοποθεσία Φάρμας 2', desc: 'Βιολογικοί οπωρώνες' }
  ];

  return (
    <section className="py-16 bg-[#2D4030] text-[#F9F6F0] rounded-3xl my-12 p-8 md:p-12">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="font-serif text-3xl font-bold mb-3">Οι Τοποθεσίες Καλλιέργειας</h2>
        <p className="text-[#F9F6F0]/80">
          Δείτε πού βρίσκονται τα κτήματα και τα θερμοκήπιά μας.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((loc, index) => (
          <div key={index} className="bg-[#F9F6F0]/10 p-6 rounded-2xl border border-[#F9F6F0]/15 flex items-start gap-4">
            <div className="w-10 h-10 bg-[#E8A838] text-[#2D4030] rounded-full flex items-center justify-center font-bold shrink-0">
              📍
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#F9F6F0] mb-1">{loc.title}</h3>
              <p className="text-sm text-[#F9F6F0]/80">{loc.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};