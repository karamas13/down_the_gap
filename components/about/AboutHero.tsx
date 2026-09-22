'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import  PepperBackround  from "@/public/images/PepperBackground.avif"

export const AboutHero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-[#2D4030] text-[#FAF7F2] overflow-hidden h-screen">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 h-screen">
        <Image
          src={ PepperBackround }
          alt="DownTheGap Organic Farm"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t via-[#2D4030]/60 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-[#E8A838] uppercase tracking-widest mb-6"
        >
          <span>🌱</span>
          <span>Η Φιλοσοφία μας</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Από τη γη μας στο τραπέζι σας με σεβασμό στη φύση και την παράδοση.
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