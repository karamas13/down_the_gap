'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Κλείσιμο του mobile menu όταν αλλάζει η διαδρομή (route change)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Εντοπισμός scroll για προσθήκη διακριτικού σκιασμού
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Αρχική' },
    { href: '/about', label: 'Σχετικά με εμάς' },
    { href: '/products', label: 'Φάρμα & Προϊόντα' },
    { href: '/contact', label: 'Επικοινωνία' },
  ];

  return (
    <header
      className={`relative top-0 z-50 transition-all duration-300 backdrop-blur-md bg-[#FAF7F2]/90 border-b ${
        scrolled ? 'border-[#2D4030]/15 shadow-sm' : 'border-[#2D4030]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between ">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-xl">🌱</span>
          <span className="font-serif text-2xl font-black tracking-tight text-[#2D4030] group-hover:text-[#C86D51] transition-colors">
            DownTheGap
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-[#2D4030]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-[#C86D51] ${
                  isActive ? 'text-[#C86D51] font-bold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C86D51] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden p-2.5 rounded-xl text-[#2D4030] hover:bg-[#2D4030]/5 transition-colors focus:outline-none"
          aria-label="Μενού πλοήγησης"
          aria-expanded={isOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-t border-[#2D4030]/10 bg-[#FAF7F2] overflow-hidden"
          >
            <div className="px-5 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block py-3 px-4 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-[#2D4030] text-[#FAF7F2]'
                        : 'text-[#2D4030] hover:bg-[#2D4030]/5 hover:text-[#C86D51]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};