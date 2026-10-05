'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <section className="py-20 bg-[#2D4030] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white">
            Είμαστε Δίπλα Σας
          </h2>
          <p className="text-sm text-[#FAF7F2] mt-3 font-normal leading-relaxed">
            Επικοινωνήστε απευθείας μαζί μας για πληροφορίες σχετικά με τη διαθεσιμότητα των προϊόντων ή επισκεφθείτε μας στους πάγκους μας στις Λαϊκές Αγορές.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Phone Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-[#1E2C22] border border-white/15 flex flex-col justify-between hover:bg-[#1A261D] transition-all shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C86D51]/30 text-[#FF9E80] flex items-center justify-center mb-6 border border-[#C86D51]/40">
                <Phone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FDE047] block mb-1">
                Τηλεφωνικα
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2 text-white">Καλέστε μας</h3>
              <p className="text-xs text-[#FAF7F2] font-normal leading-relaxed mb-6">
                Δευτέρα έως Σάββατο: 08:00 - 18:00
              </p>
              <a
                href="tel:+302100000000"
                className="text-lg font-bold text-white hover:text-[#FDE047] transition-colors block font-mono"
              >
                +30 210 000 0000
              </a>
            </div>
            
            <a
              href="tel:+302100000000"
              className="mt-8 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/15 text-xs font-black text-white hover:bg-white hover:text-[#2D4030] transition-colors border border-white/20"
            >
              <span>Άμεση Κλήση</span>
            </a>
          </motion.div>

          {/* Email Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-[#1E2C22] border border-white/15 flex flex-col justify-between hover:bg-[#1A261D] transition-all shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/30 text-sky-200 flex items-center justify-center mb-6 border border-sky-400/30">
                <Mail className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FDE047] block mb-1">
                Ηλεκτρονικα
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2 text-white">Στείλτε Email</h3>
              <p className="text-xs text-[#FAF7F2] font-normal leading-relaxed mb-6">
                Απαντάμε σε όλα τα γραπτά αιτήματα.
              </p>
              <a
                href="mailto:downthegapk@gmail.com"
                className="text-base font-bold text-white hover:text-[#FDE047] transition-colors block font-mono break-all"
              >
                downthegapk@gmail.com
              </a>
            </div>

            <a
              href="mailto:downthegapk@gmail.com"
              className="mt-8 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/15 text-xs font-black text-white hover:bg-white hover:text-[#2D4030] transition-colors border border-white/20"
            >
              <span>Αποστολή Email</span>
            </a>
          </motion.div>

          {/* Location / Markets Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-[#1E2C22] border border-white/15 flex flex-col justify-between hover:bg-[#1A261D] transition-all shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/30 text-emerald-200 flex items-center justify-center mb-6 border border-emerald-400/30">
                <MapPin className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FDE047] block mb-1">
                Φυσικη Παρουσια
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2 text-white">Το Κτήμα & οι Λαϊκές</h3>
              <p className="text-xs text-[#FAF7F2] font-normal leading-relaxed mb-4">
                <strong className="text-white">Κτήματα:</strong> Κόρινθος, Ελλάδα<br />
                <strong className="text-white">Λαϊκές:</strong> Επισκεφθείτε μας στις τοπικές αγορές της Αθήνας.
              </p>
              
              <Link
                href="/#marketarray"
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-black rounded-xl bg-[#FDE047] text-[#121B15] hover:bg-amber-300 transition-all shadow-sm"
              >
                Βρείτε Μας
              </Link>
            </div>

            {/* High contrast Badge replacing low contrast transparent yellow */}
            <div className="pt-4 border-t border-white/15 mt-6">
              <span className="inline-block px-3.5 py-1.5 bg-[#FDE047] text-[#121B15] text-[10px] font-black uppercase rounded-full shadow-xs">
                Φρέσκα Καθημερινά
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};