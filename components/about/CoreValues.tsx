'use client';

import React from 'react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: '🌱',
    tag: 'Φυσική Ανάπτυξη',
    title: 'Σεβασμός στον Κύκλο της Φύσης',
    description:
      'Καλλιεργούμε αυστηρά στην εποχή τους. Δεν πιέζουμε τη γη με τεχνητά μέσα, αφήνοντας τους καρπούς να αναπτύξουν το πλήρες γευστικό τους προφίλ.',
    highlight: '100% Εποχιακά',
  },
  {
    icon: '🐝',
    tag: 'Βιολογικές Μέθοδοι',
    title: 'Μηδενικά Χημικά & Συνθετικά',
    description:
      'Επιστρατεύουμε τη φυσική προστασία, την αμειψισπορά και την κομποστοποίηση για να διατηρήσουμε το έδαφος ζωντανό και τα προϊόντα μας απόλυτα αγνά.',
    highlight: '0% Φυτοφάρμακα',
  },
  {
    icon: '☀️',
    tag: 'Από τη Γη στο Πιάτο',
    title: 'Εγγύηση Ασημένιας Φρεσκάδας',
    description:
      'Η συγκομιδή γίνεται τις πρώτες πρωινές ώρες, μόλις 24 ώρες πριν τη διάθεση στη λαϊκή ή την παράδοση, διατηρώντας ακέραια τα θρεπτικά συστατικά.',
    highlight: '24h Συγκομιδή',
  },
  {
    icon: '🤝',
    tag: 'Άμεση Σχέση',
    title: 'Αυθεντική Σχέση Εμπιστοσύνης',
    description:
      'Χωρίς μεσάζοντες και βιομηχανικά στάδια. Γνωρίζετε προσωπικά τον άνθρωπο που καλλιεργεί την τροφή σας και την ακριβή διαδρομή κάθε καρπού.',
    highlight: '100% Διαφάνεια',
  },
];

export const CoreValues = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] text-[#2D4030] relative overflow-hidden">
      {/* Decorative Ambient Background Elements */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-[#2D4030]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#C86D51]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">      

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#2D4030] leading-tight"
          >
            Οι Θεμέλιοι Λίθοι της Καλλιέργειάς μας
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-[#2D4030]/75 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Πίσω από κάθε καρπό που φτάνει στο τραπέζι σας κρύβεται μια αδιάκοπη αφοσίωση στη φύση, την υγεία και την αυθεντική γεύση.
          </motion.p>
        </div>

        {/* Values Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="group relative h-full bg-white p-7 sm:p-8 rounded-3xl border border-[#2D4030]/10 shadow-sm hover:shadow-xl hover:border-[#C86D51]/30 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle Top Accent Line on Hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-[#2D4030] to-[#C86D51] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header Row: Icon & Tag */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-13 h-13 rounded-2xl bg-[#2D4030]/5 group-hover:bg-[#C86D51]/10 flex items-center justify-center text-2xl transition-colors duration-300 group-hover:scale-105 transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 bg-[#2D4030]/5 px-2.5 py-1 rounded-lg">
                    {item.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl font-bold text-[#2D4030] group-hover:text-[#C86D51] transition-colors duration-200 mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2D4030]/75 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              {/* Card Footer: Highlight Pill */}
              <div className="pt-6 mt-6 border-t border-[#2D4030]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#C86D51] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] animate-pulse" />
                  {item.highlight}
                </span>
                <span className="text-xs text-[#2D4030]/40 font-serif font-extrabold">
                  0{idx + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};