// components/layout/Footer.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Ευχαριστούμε για την εγγραφή σας!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2D4030] text-[#F9F6F0] pt-16 pb-12 border-t border-[#2D4030]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#C86D51] rounded-2xl p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2 text-[#F9F6F0]">
              Εγγραφείτε στο Newsletter μας
            </h3>
            <p className="text-[#F9F6F0]/90">
              Λάβετε ενημερώσεις για τις νέες εποχιακές σοδειές και ειδικές οικογενειακές προσφορές.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Εισάγετε το email σας"
              required
              className="px-5 py-3 rounded-xl text-[#2D4030] bg-[#F9F6F0] focus:outline-none focus:ring-2 focus:ring-[#E8A838] min-w-[280px]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#E8A838] hover:bg-[#e09b25] text-[#2D4030] font-bold rounded-xl transition-colors shadow-md"
            >
              Εγγραφή
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h4 className="font-serif text-2xl font-bold mb-4">DownTheGap</h4>
            <p className="text-[#F9F6F0]/80 text-sm leading-relaxed">
              Αυθεντική οικογενειακή φάρμα με αφοσίωση στη βιώσιμη καλλιέργεια και τα αγνά προϊόντα.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-[#E8A838]">Πλοήγηση</h5>
            <ul className="space-y-2 text-sm text-[#F9F6F0]/80">
              <li><Link href="/" className="hover:text-white transition-colors">Αρχική</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Σχετικά με εμάς</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Φάρμα & Προϊόντα</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Επικοινωνία</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-[#E8A838]">Ώρες Λειτουργίας</h5>
            <p className="text-sm text-[#F9F6F0]/80 leading-relaxed">
              Δευτέρα - Κυριακή:<br />
              8:00 πμ - 5:00 μμ
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4 text-[#E8A838]">Επικοινωνία</h5>
            <p className="text-sm text-[#F9F6F0]/80 leading-relaxed">
              Οδός Πεννοούσι 1220,<br />
              Φανίννορο, 00 21500<br />
              Τηλ: (223) 500-8057
            </p>
          </div>
        </div>

        <div className="border-t border-[#F9F6F0]/10 pt-8 text-center text-sm text-[#F9F6F0]/60">
          © {new Date().getFullYear()} DownTheGap. Όλα τα δικαιώματα διατηρούνται.
        </div>
      </div>
    </footer>
  );
};