'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const [cartCount] = useState(3);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#F9F6F0]/85 border-b border-[#2D4030]/10 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2D4030] group-hover:text-[#C86D51] transition-colors">
            DownTheGap
          </span>        
        </Link>

        <nav className="hidden md:flex items-center space-x-8 font-medium text-[#2D4030]">
          <Link href="/" className="hover:text-[#C86D51] transition-colors">
            Αρχική
          </Link>
          <Link href="/about" className="hover:text-[#C86D51] transition-colors">
            Σχετικά με εμάς
          </Link>
          <Link href="/products" className="hover:text-[#C86D51] transition-colors">
            Φάρμα & Προϊόντα
          </Link>
          <Link href="/contact" className="hover:text-[#C86D51] transition-colors">
            Επικοινωνία
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="relative p-2.5 rounded-full bg-[#2D4030] text-[#F9F6F0] hover:bg-[#C86D51] transition-colors flex items-center justify-center"
            aria-label="Καλάθι"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#E8A838] text-[#2D4030] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#F9F6F0]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};