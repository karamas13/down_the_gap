'use client';

import { motion } from 'framer-motion';

export const FarmToDoor = () => {
  const values = [
    {
      step: '01',
      title: '100% Βιολογική Καλλιέργεια',
      description: 'Χωρίς συνθετικά φυτοφάρμακα, με πλήρη σεβασμό στον φυσικό κύκλο της γης.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      )
    },
    {
      step: '02',
      title: 'Καθημερινή Συγκομιδή',
      description: 'Μαζεύουμε τα προϊόντα την ημέρα της παράδοσης για μέγιστη φρεσκάδα.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      step: '03',
      title: 'Άμεση Διανομή',
      description: 'Απευθείας από τα χωράφια μας στο καλάθι και το πιάτο σας.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#1E2B20] via-[#2D4030] to-[#19241B] text-[#F9F6F0] relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#E8A838]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 left-10 w-72 h-72 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 text-[#E8A838] font-bold text-xs rounded-full uppercase tracking-widest mb-4 shadow-sm">
            Η Διαδρομή
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Από τη Φάρμα στο Σπίτι σας
          </h2>
          <p className="text-[#F9F6F0]/75 text-base sm:text-lg mt-4 font-light leading-relaxed">
            Η δέσμευσή μας για αγνή, αυθεντική διατροφή σε 3 απλά στάδια χωρίς συμβιβασμούς στην ποιότητα.
          </p>
        </motion.div>

        {/* Timeline Grid Container */}
        <div className="relative">
          {/* Desktop Curved Dotted Connecting Line */}
          <div className="hidden md:block absolute top-[45px] left-[16%] right-[16%] h-[2px] pointer-events-none z-0">
            <svg className="w-full h-12 overflow-visible" fill="none">
              <path
                d="M 0 0 Q 250 30, 500 0 T 1000 0"
                stroke="rgba(232, 168, 56, 0.3)"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {values.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon Circle Node */}
                <div className="relative mb-8">
                  {/* Outer Pulsing Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#E8A838]/20 to-[#C86D51]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Central Circle */}
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 group-hover:border-[#E8A838] text-[#E8A838] flex items-center justify-center relative z-10 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E8A838] group-hover:text-[#2D4030]">
                    {item.icon}
                  </div>

                  {/* Step Badge */}
                  <span className="absolute -bottom-2 -right-1 px-2.5 py-0.5 bg-[#C86D51] text-white font-mono text-[11px] font-bold rounded-full shadow-md z-20 border border-[#2D4030]">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="max-w-xs space-y-3">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#E8A838] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[#F9F6F0]/70 text-sm leading-relaxed font-normal">
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