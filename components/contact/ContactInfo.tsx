'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export const ContactInfo = () => {
  return (
    <section className="py-20 bg-[#2D4030] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E8A838] block mb-2">
            Άμεση Επικοινωνία
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-black">
            Είμαστε Δίπλα Σας
          </h2>
          <p className="text-sm text-[#FAF7F2]/75 mt-3 font-light leading-relaxed">
            Επικοινωνήστε απευθείας μαζί μας για πληροφορίες σχετικά με τη διαθεσιμότητα των προϊόντων ή επισκεφθείτε μας στους πάγκους μας στις Λαϊκές Αγορές.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Phone Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C86D51]/20 text-[#C86D51] flex items-center justify-center text-2xl mb-6">
                📞
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E8A838] block mb-1">
                Τηλεφωνικα
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">Καλέστε μας</h3>
              <p className="text-xs text-[#FAF7F2]/70 font-light leading-relaxed mb-6">
                Δευτέρα έως Σάββατο: 08:00 - 18:00
              </p>
              <a
                href="tel:+302100000000"
                className="text-lg font-bold text-[#FAF7F2] hover:text-[#E8A838] transition-colors block font-mono"
              >
                +30 210 000 0000
              </a>
            </div>
            
            <a
              href="tel:+302100000000"
              className="mt-8 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 text-xs font-bold hover:bg-white text-white hover:text-[#2D4030] transition-colors"
            >
              <span>Άμεση Κλήση</span>
            </a>
          </motion.div>

          {/* Email Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition-all"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center text-2xl mb-6">
                ✉️
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E8A838] block mb-1">
                Ηλεκτρονικα
              </span>
              <h3 className="font-serif text-2xl font-bold mb-2">Στείλτε Email</h3>
              <p className="text-xs text-[#FAF7F2]/70 font-light leading-relaxed mb-6">
                Απαντάμε σε όλα τα γραπτά αιτήματα.
              </p>
              <a
                href="mailto:downthegapk@gmai.com"
                className="text-base font-bold text-[#FAF7F2] hover:text-[#E8A838] transition-colors block font-mono break-all"
              >
                downthegapk@gmai.com
              </a>
            </div>

            <a
              href="mailto:info@farm.gr"
              className="mt-8 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/10 text-xs font-bold hover:bg-white text-white hover:text-[#2D4030] transition-colors"
            >
              <span>Αποστολή Email</span>
            </a>
          </motion.div>

          {/* Location / Markets Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between hover:bg-white/10 transition-all"
          >
            <div>
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl mb-6">
               📍
             </div>
             <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#E8A838] block mb-1">
               Φυσικη Παρουσια
             </span>
             <h3 className="font-serif text-2xl font-bold mb-2">Το Κτήμα & οι Λαϊκές</h3>
             <p className="text-xs text-[#FAF7F2]/70 font-light leading-relaxed mb-4">
               <strong>Κτήματα:</strong> Κόρινθος, Ελλάδα<br />
               <strong>Λαϊκές:</strong> Επισκεφθείτε μας στις τοπικές αγορές της Αθήνας.
             </p>
              
              <Link
                href="/#marketarray"
                className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold rounded-xl bg-[#E8A838] text-[#2D4030] hover:bg-[#E8A838]/90 transition-all shadow-xs hover:shadow-md"
              >
                Βρείτε Μας
              </Link>
            </div>
            <div className="pt-4 border-t border-white/10">
              <span className="inline-block px-3 py-1 bg-[#E8A838]/20 text-[#E8A838] text-[10px] font-extrabold uppercase rounded-full">
                Φρέσκα Καθημερινά
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};