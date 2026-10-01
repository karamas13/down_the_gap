'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, SunDim, Store } from 'lucide-react';

export const FarmToDoor = () => {
  const values = [
    {
      step: '01',
      title: '100% Βιολογική Καλλιέργεια',
      description:
        'Στους πάγκους μας δεν θα βρεις απλώς προϊόντα. Θα βρεις την αγάπη μας για το καλό, καθαρό φαγητό. Όλα μας τα προϊόντα προέρχονται από πιστοποιημένες βιολογικές καλλιέργειες, χωρίς χημικά και περιττές παρεμβάσεις.',
      icon: <Sprout className="w-8 h-8 sm:w-9 sm:h-9" />,
    },
    {
      step: '02',
      title: 'Καθημερινή Συγκομιδή',
      description:
        'Οι καλλιέργειές μας ακολουθούν τη ζήτηση και τις ανάγκες των πελατών μας, ανεξάρτητα από την εποχή. Καλοκαιρινά προϊόντα τον χειμώνα; Χειμερινά το κατακαλόκαιρο; Το κάνουμε πράξη!',
      icon: <SunDim className="w-8 h-8 sm:w-9 sm:h-9" />,
    },
    {
      step: '03',
      title: 'Πλατείες με Γεύση',
      description:
        'Κάθε εβδομάδα, με χαμόγελο και φροντίδα, ερχόμαστε κοντά σου μέσα από τις λαϊκές αγορές. Εκεί όπου οι γεύσεις, τα χρώματα και οι μυρωδιές θυμίζουν κάτι από παιδική ηλικία.',
      icon: <Store className="w-8 h-8 sm:w-9 sm:h-9" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#1E2B20] via-[#2D4030] to-[#19241B] text-[#F9F6F0] relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-80 sm:h-96 bg-[#E8A838]/10 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 sm:left-10 sm:translate-x-0 w-60 h-60 sm:w-72 sm:h-72 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-20"
        >
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Από το Κτήμα στο Σπίτι σας
          </h2>
          <p className="text-[#F9F6F0]/75 text-sm sm:text-base md:text-lg mt-3 sm:mt-4 font-light leading-relaxed">
            Η δέσμευσή μας για αγνή, αυθεντική διατροφή σε 3 απλά στάδια χωρίς
            συμβιβασμούς στην ποιότητα.
          </p>
        </motion.div>

        {/* Timeline Grid Container */}
        <div className="relative">
          {/* Mobile Vertical Connecting Dotted Line */}
          <div className="block md:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-[#E8A838]/30 pointer-events-none z-0" />

          {/* Desktop Curved Dotted Connecting Line */}
          <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-12 pointer-events-none z-0">
            <svg className="w-full h-full overflow-visible" fill="none">
              <path
                d="M 0 10 Q 250 45, 500 10 T 1000 10"
                stroke="rgba(232, 168, 56, 0.3)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-8 relative z-10">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group bg-[#1E2B20]/40 md:bg-transparent p-6 md:p-0 rounded-3xl md:rounded-none border border-white/5 md:border-none backdrop-blur-xs md:backdrop-blur-none"
              >
                {/* Icon Circle Node */}
                <div className="relative mb-6 sm:mb-8 shrink-0">
                  {/* Outer Pulsing Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#E8A838]/20 to-[#C86D51]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Central Circle */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 group-hover:border-[#E8A838] text-[#E8A838] flex items-center justify-center relative z-10 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8A838] group-hover:text-[#2D4030]">
                    {item.icon}
                  </div>

                  {/* Step Badge */}
                  <span className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-1 px-2 sm:px-2.5 py-0.5 bg-[#C86D51] text-white font-mono text-[10px] sm:text-[11px] font-bold rounded-full shadow-md z-20 border border-[#2D4030]">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="w-full max-w-xs space-y-2 sm:space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#E8A838] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#F9F6F0]/70 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};