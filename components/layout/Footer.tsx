'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[#FAF7F2] text-[#2D4030] border-t border-[#2D4030]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-[#2D4030]/10">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2 font-serif text-2xl font-black text-[#2D4030] tracking-tight">
              <span>🌱</span>
              <span>DownTheGap</span>
            </Link>
            <p className="text-sm text-[#2D4030]/75 max-w-sm leading-relaxed">
              Αγνά, βιολογικά προϊόντα απευθείας από την οικογενειακή μας φάρμα στο τραπέζι σας.
            </p>
          </div>

          {/* Navigation */}
          <div className='mx-auto text-center'>
            <h5 className="font-bold text-xs uppercase tracking-widest text-[#C86D51] mb-4">
              Πλοήγηση
            </h5>
            <ul className="space-y-2.5 text-sm font-medium text-[#2D4030]/80">
              <li>
                <Link href="/" className="hover:text-[#C86D51] transition-colors">
                  Αρχική
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C86D51] transition-colors">
                  Σχετικά με εμάς
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#C86D51] transition-colors">
                  Προϊόντα
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#C86D51] transition-colors">
                  Επικοινωνία
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className=''>
            <h5 className="font-bold text-xs uppercase tracking-widest text-[#C86D51] mb-4">
              Επικοινωνία
            </h5>
            <ul className="space-y-2.5 text-sm text-[#2D4030]/80">              
              <li>
                Τηλ:{' '}
                <a href="tel:2235008057" className="hover:text-[#C86D51] transition-colors font-semibold">
                  (223) 500-8057
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:info@downthegap.gr" className="hover:text-[#C86D51] transition-colors font-semibold">
                  info@downthegap.gr
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[#2D4030]/60 ">
          <p>© {new Date().getFullYear()} DownTheGap. Όλα τα δικαιώματα διατηρούνται.</p>   
        </div>

      </div>
    </footer>
  );
};