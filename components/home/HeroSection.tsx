'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#F9F6F0] py-20 lg:py-28">
      {/* Ambient Radial Gradient Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E8A838]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#C86D51]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: High Impact Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-8 z-10"
        >
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-[#2D4030]/10 rounded-full shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A838] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8A838]"></span>
            </span>
            <span className="text-[#2D4030] font-semibold text-xs sm:text-sm tracking-wide uppercase">
              Αυθεντική Παράδοση 3 Γενεών
            </span>
          </div>

          {/* Dynamic Headline with SVG Accent */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-[#2D4030] leading-[1.1] tracking-tight">
            Φρέσκα από τα Χωράφια μας στο{' '}
            <span className="relative inline-block text-[#C86D51]">
              Τραπέζι σας
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-[#E8A838]/50 -z-10"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="8" />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#2D4030]/80 max-w-2xl leading-relaxed font-sans">
            Απευθείας από τη γη μας στην καρδιά της οικογένειάς σας. Καλλιεργούμε με μεράκι, σεβασμό στη φύση και 100% βιολογικές μεθόδους.
          </p>

          {/* CTA Actions Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#E8A838] hover:bg-[#e09b25] text-[#2D4030] font-bold text-base sm:text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-center"
            >
              Εξερευνήστε τη Σοδειά
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/60 hover:bg-white text-[#2D4030] border border-[#2D4030]/20 font-bold text-base sm:text-lg rounded-2xl transition-all duration-300 text-center hover:-translate-y-0.5"
            >
              Η Ιστορία μας
            </Link>
          </div>

      {/* Embedded Live Counting Stats Bar */}
          <div className="pt-8 border-t border-[#2D4030]/15 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4030]">
                <AnimatedCounter from={0} to={100} suffix="%" duration={1.8} />
              </p>
              <p className="text-xs text-[#2D4030]/70 font-medium">Βιολογικά</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#C86D51]">
                <AnimatedCounter from={1900} to={1954} duration={2} />
              </p>
              <p className="text-xs text-[#2D4030]/70 font-medium">Έτος Ίδρυσης</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4030]">
                <AnimatedCounter from={0} to={24} suffix="h" duration={1.5} />
              </p>
              <p className="text-xs text-[#2D4030]/70 font-medium">Από τη Συγκομιδή</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Floating Interactive Glassmorphism Visual Layer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 relative mt-6 lg:mt-0"
        >
          {/* Main Cinematic Image Frame */}
          <div className="relative h-[480px] sm:h-[560px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
              alt="Οικογένεια στη φάρμα DownTheGap"
              fill
              className="object-cover scale-105 hover:scale-100 transition-transform duration-700 ease-out"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#2D4030]/40 via-transparent to-transparent" />
          </div>

          {/* Floating Badge 1: Morning Harvest Indicator */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -left-6 sm:-left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E8A838]/20 flex items-center justify-center text-xl">
              🌱
            </div>
            <div>
              <p className="text-[10px] text-[#2D4030]/60 font-semibold uppercase tracking-wider">ΒΙΟΛΟΓΙΚΗ</p>
              <p className="text-xs sm:text-sm font-bold text-[#2D4030]">Καλλιέργεια</p>
            </div>
          </motion.div>

          {/* Floating Badge 2: Social Proof & Rating */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#2D4030]/95 backdrop-blur-md text-[#F9F6F0] p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4"
          >
            <div className="flex -space-x-2 overflow-hidden">              
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-[#2D4030] bg-emerald-600 text-[10px] font-bold text-white">
                <strong className='text-3xl'>★</strong>
              </span>
            </div>
            <div>
              <p className="text-[10px] text-[#F9F6F0]/70 uppercase tracking-wider">Διαχρονική</p>
              <p className="text-xs sm:text-sm font-bold text-[#E8A838]">Εμπιστοσύνη και Αξιοπιστία</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};