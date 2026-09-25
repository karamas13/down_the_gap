'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const AboutHero = () => {
  return (
    <section className="relative h-screen min-h-150 flex items-center justify-center bg-[#2D4030] text-[#FAF7F2] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/PepperBackground.avif"
          alt="DownTheGap Organic Farm"
          fill
          priority 
          quality={75} 
          placeholder="blur"          
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMyRDQwMzAiLz48L3N2Zz4="
          className="object-cover object-center pointer-events-none"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t via-[#2D4030]/60 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        {/* Subtitle Badge */}
  

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-20"
        >
          Από τη γη μας στο τραπέζι σας με σεβασμό  
          <span className='text-transparent tracking-tight bg-clip-text bg-linear-to-r from bg-yellow-200 via-red-500 to-green-600'> στη φύση και την παράδοση.</span>
        </motion.h1>

        {/* Subtitle / Intro Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-[#FAF7F2]/85 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Σαν <strong className="font-semibold text-white">Κάτω απ' το Αυλάκι</strong>, καλλιεργούμε βιολογικά προϊόντα με τις ίδιες αγνές μεθόδους που παραλάβαμε από τις προηγούμενες γενιές, χωρίς χημικά και βιαστικές σοδειές.
        </motion.p>
      </div>
    </section>
  );
};