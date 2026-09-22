'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#FAF7F2] text-[#2D4030] border-t border-[#2D4030]/10">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        
        {/* Main Centered Grid with Even Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start text-center pb-10 border-b border-[#2D4030]/10">
          
          {/* Column 1: Brand / Logo */}
          <div className="flex flex-col items-center justify-center w-full space-y-3">
            <Link href="/" className="inline-block">
              <img
                src="/images/MainLogo.avif"
                alt="DownTheGap Logo"
                className="w-44 sm:w-52 md:w-56 h-auto block mx-auto"
              />
            </Link>
            <p className="text-sm text-[#2D4030]/75 max-w-xs leading-relaxed mx-auto">
              Αγνά, βιολογικά προϊόντα απευθείας από την οικογενειακή μας καλλιέργεια στο τραπέζι σας.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center justify-center w-full">
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

          {/* Column 3: Contact */}
          <div className="flex flex-col items-center justify-center w-full">
            <h5 className="font-bold text-xs uppercase tracking-widest text-[#C86D51] mb-4">
              Επικοινωνία
            </h5>
            <ul className="space-y-2.5 text-sm text-[#2D4030]/80">
              <li>
                Τηλ:{' '}
                <a href="tel:2235008057" className="hover:text-[#C86D51] transition-colors font-semibold">
                  +30 6981234567
                </a>
              </li>
              <li>
                Email:{' '}
                <a href="mailto:info@downthegap.gr" className="hover:text-[#C86D51] transition-colors font-semibold">
                  downthegapk@gmai.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 text-center text-xs text-[#2D4030]/60">
          <p>© {new Date().getFullYear()} DownTheGap. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};