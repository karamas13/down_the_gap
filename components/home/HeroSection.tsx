'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sprout, Star } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const HeroSection = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  
  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, 0]), springConfig);
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.1, 0.9], [-25, 2]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    mouseX.set(mouseXPos / rect.width - 0.5);
    mouseY.set(mouseYPos / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-green-100 via-amber-200 to-red-100 py-12 sm:py-20 lg:py-28">
      {/* Organic Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#2D4030 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Light Contour SVG Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 text-[#2D4030] overflow-hidden">
        <svg
          className="absolute -top-12 -left-12 w-[120%] h-[120%] stroke-current"
          fill="none"
          strokeWidth="1.2"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path d="M-100,200 C200,100 400,350 700,200 C900,100 1100,250 1200,200" />
          <path d="M-100,400 C150,300 350,500 650,380 C850,280 1050,420 1200,350" />
        </svg>
      </div>

      {/* Optimized Ambient Radial Glows */}
      <div className="absolute top-0 right-1/4 -mt-20 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#E8A838]/20 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#C86D51]/15 blur-2xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10 mt-20">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
        >
          <div className="inline-flex items-center gap-2 py-1 rounded-full">
            <span className="text-[#2D4030] font-semibold text-lg xs:text-xl sm:text-3xl tracking-wide uppercase leading-tight">
              ΚΑΤΩ ΑΠ' <span className="text-[#C86D51]">ΤΟ ΑΥΛΑΚΙ</span>
              <br />
              <span className="text-emerald-600">Βιολογικά</span> Προϊόντα
            </span>
          </div>

          <h1 className="font-serif text-3xl xs:text-4xl sm:text-6xl xl:text-7xl font-bold text-[#2D4030] leading-[1.15] sm:leading-[1.1] tracking-tight">
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

          <p className="text-base sm:text-lg text-[#2D4030]/80 max-w-2xl leading-relaxed font-sans">
            Απευθείας από τη γη μας στην καρδιά της οικογένειάς σας. Καλλιεργούμε με μεράκι, σεβασμό στη φύση και 100% βιολογικές μεθόδους.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/products"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#E8A838] hover:bg-[#e09b25] text-[#2D4030] font-bold text-base sm:text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 text-center"
            >
              Εξερευνήστε τη Σοδειά
            </Link>
            <Link
              href="/about"
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-white/70 hover:bg-white text-[#2D4030] border border-[#2D4030]/20 font-bold text-base sm:text-lg rounded-2xl transition-all duration-300 text-center hover:-translate-y-0.5 shadow-xs"
            >
              Η Ιστορία μας
            </Link>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-[#2D4030]/15 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#2D4030]">
                <AnimatedCounter from={0} to={100} suffix="%" duration={1.5} />
              </p>
              <p className="text-xs text-[#2D4030]/70 font-medium mt-0.5">Βιολογικά</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#C86D51]">
                <AnimatedCounter from={1900} to={1980} duration={1.5} />
              </p>
              <p className="text-xs text-[#2D4030]/70 font-medium mt-0.5">Έτος Ίδρυσης</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#2D4030]">
                <AnimatedCounter from={0} to={24} suffix="h" duration={1.2} />
              </p>
              <p className="text-xs text-[#2D4030]/70 font-medium mt-0.5">Από τη Συγκομιδή</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: LCP Hero Image Container */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0 perspective-distant w-full max-w-lg lg:max-w-none mx-auto">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX: mouseRotateX,
              rotateY: mouseRotateY,
              transformStyle: 'preserve-3d',
            }}
            className="relative cursor-pointer"
          >
            {/* LCP Target Image with Explicit Responsive Sizes */}
            <div className="relative h-80 xs:h-96 sm:h-120 lg:h-130 rounded-4xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/Kalampoki4.avif"
              alt="Καλλιέργεια Καλαμποκιού"
              fill
              priority
              
              fetchPriority="high"
              sizes="(max-width: 496px) 372px, (max-width: 1024px) 45vw, 500px"
              quality={75}
              className="object-cover"
            />
              <div className="absolute inset-0 bg-linear-to-t from-[#2D4030]/40 via-transparent to-transparent" />
            </div>

            {/* Floating Badges */}
            <motion.div
              style={{ transform: 'translateZ(45px)' }}
              className="absolute -top-4 -left-2 xs:-left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-white/60 flex items-center gap-2.5 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#E8A838]/20 flex items-center justify-center text-[#2D4030]">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] text-[#2D4030]/60 font-semibold uppercase tracking-wider">
                  ΒΙΟΛΟΓΙΚΗ
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#2D4030]">Καλλιέργεια</p>
              </div>
            </motion.div>

            <motion.div
              style={{ transform: 'translateZ(55px)' }}
              className="absolute -bottom-4 -right-2 xs:-right-4 sm:-right-6 bg-[#2D4030]/95 backdrop-blur-md text-[#F9F6F0] p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-600/30 flex items-center justify-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8A838] fill-[#E8A838]" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] text-[#F9F6F0]/70 uppercase tracking-wider">
                  Διαχρονική
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#E8A838]">
                  Εμπιστοσύνη & Αξιοπιστία
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};