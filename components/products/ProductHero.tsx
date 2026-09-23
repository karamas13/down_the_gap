'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ProductHero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-[#2D4030] text-[#FAF7F2] py-20 lg:py-28 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fill3.avif"
          alt="Product Hero Background"
          fill
          priority // Φορτώνει άμεσα (preloaded)
          sizes="100vw" // Responsive μεγέθη για αποφυγή download τεράστιων assets
          quality={75} // Βελτιστοποίηση μεγέθους αρχείου
          placeholder="blur"
          // Ελαφρύ SVG blur data-url για ακαριαία εμφάνιση φόντου πριν φορτώσει η εικόνα
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMyRDQwMzAiLz48L3N2Zz4="
          className="object-cover object-center pointer-events-none"
        />
        
        {/* Dark & Earthy Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-[#2D4030]/70 bg-linear-to-t via-[#2D4030]/10 to-[#2D4030]/10 pointer-events-none" />
      </div>

      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C86D51]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#E8A838]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Text & Headlines */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-extrabold uppercase tracking-widest text-[#E8A838]"
            >
              <span>🌾</span>
              <span>100% Φυσική Καλλιέργεια</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl font-black tracking-tight leading-tight"
            >
              Οι Θησαυροί της Γης μας σε Κάθε Εποχή
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-[#FAF7F2]/80 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light"
            >
              Στα κτήματα μας δεν πιέζουμε τη φύση. Καλλιεργούμε αποκλειστικά στην ώρα τους θερινούς και χειμερινούς καρπούς, προσφέροντάς σας αυθεντική γεύση και μέγιστη θρεπτική αξία.
            </motion.p>

            {/* Quick Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-white/10 max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-black text-[#E8A838]">0%</span>
                <span className="text-xs text-[#FAF7F2]/70 font-sans">Χημικά & Λιπάσματα</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-black text-[#E8A838]">24h</span>
                <span className="text-xs text-[#FAF7F2]/70 font-sans">Από τη Συγκομιδή</span>
              </div>
              <div>
                <span className="block font-serif text-2xl sm:text-3xl font-black text-[#E8A838]">2</span>
                <span className="text-xs text-[#FAF7F2]/70 font-sans">Εποχιακοί Κύκλοι</span>
              </div>
            </motion.div>
          </div>

          {/* Feature Badge Cards Layout */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="p-3 rounded-2xl bg-[#C86D51]/20 text-[#C86D51] text-2xl shrink-0">
                ☀️
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Θερινή Σοδειά</h3>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  Γλυκές ντομάτες, δροσερά αγγούρια, μελιτζάνες και καρποί γεμάτοι από τον καλοκαιρινό ήλιο.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex items-start gap-4 hover:bg-white/10 transition-colors"
            >
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-300 text-2xl shrink-0">
                ❄️
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Χειμερινή Σοδειά</h3>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  Πλούσια μπρόκολα, τραγανά κουνουπίδια, κρεμμυδάκι φρέσκο και εσπεριδοειδή γεμάτα βιταμίνες.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};