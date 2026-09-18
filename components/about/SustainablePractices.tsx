// components/about/SustainablePractices.tsx
'use client';

import React from 'react';

export const SustainablePractices = () => {
  const practices = [
    {
      title: 'Προστασία Υπεδάφους',
      desc: 'Χρήση φυσικών κομπόστ και αμειψισποράς για τη διατήρηση των θρεπτικών συστατικών του εδάφους.'
    },
    {
      title: 'Διαχείριση Νερού',
      desc: 'Συστήματα σταγονίδην άρδευσης για τη μέγιστη εξοικονόμηση φυσικών πόρων.'
    },
    {
      title: 'Βιοποικιλότητα',
      desc: 'Δημιουργία φυσικών καταφυγίων για ωφέλιμα έντομα και επικονιαστές.'
    }
  ];

  return (
    <section className="py-16 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl font-bold text-[#2D4030] mb-3">
            Βιώσιμες Πρακτικές
          </h2>
          <p className="text-[#2D4030]/80">
            Καλλιεργούμε με γνώμονα το μέλλον και την προστασία του οικοσυστήματος.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {practices.map((practice, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#2D4030]/5">
              <div className="w-12 h-12 bg-[#E8A838]/20 text-[#2D4030] rounded-xl flex items-center justify-center font-bold text-xl mb-4">
                ✓
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2D4030] mb-2">{practice.title}</h3>
              <p className="text-sm text-[#2D4030]/80 leading-relaxed">{practice.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};