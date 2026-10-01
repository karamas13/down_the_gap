'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sprout, ShieldCheck, Clock, Handshake } from 'lucide-react';

const values = [
  {
    icon: Sprout,
    title: 'Από τη γη μας, για ανθρώπους σαν κι εμάς.',
    description:
      'Στο «Κάτω Από Το Αυλάκι» δεν φροντίζουμε απλώς καλλιέργειες, φροντίζουμε ιδέες, αξίες και σχέσεις. Ξεκινήσαμε σαν μια μικρή οικογενειακή προσπάθεια, με σεβασμό στη γη και στους ανθρώπους που την τιμούν με τον ιδρώτα τους.',
    highlight: '100% Βιολογικά',
  },
  {
    icon: ShieldCheck,
    title: 'Μηδενικά Χημικά & Συνθετικά',
    description:
      'Κάθε μας προϊόν είναι καρπός αγνής φροντίδας, φυσικής καλλιέργειας και αυθεντικής ελληνικής γεύσης. Δεν κυνηγάμε την ποσότητα· κυνηγάμε την ποιότητα. Πιστεύουμε πως η διατροφή είναι πράξη αγάπης. Κι αυτό προσπαθούμε να δείξουμε σε κάθε καλάθι που φεύγει από το χωράφι μας.',
    highlight: '0% Φυτοφάρμακα',
  },
  {
    icon: Clock,
    title: 'Γεύση που ξεκινά από το χώμα',
    description:
      'Θέλουμε να ξέρεις τι τρως, από πού έρχεται, και να νιώθεις σιγουριά όταν το βάζεις στο πιάτο σου. Γιατί για εμάς, το φαγητό είναι τρόπος ζωής, κι αυτή τη ζωή, τη ζούμε τίμια. Φροντίζουμε για την υγεία του εδάφους, και μαζεύουμε τους καρπούς μας τη σωστή στιγμή, όταν είναι πραγματικά έτοιμοι να σας θρέψουν.',
    highlight: '24h Συγκομιδή',
  },
  {
    icon: Handshake,
    title: 'Μια οικογένεια, μία γη, ένας σκοπός',
    description:
      'Είμαστε μια μικρή οικογενειακή επιχείρηση που καλλιεργεί με σεβασμό και υπευθυνότητα τη γη του τόπου μας, λίγο «κάτω από το αυλάκι», στη νότια Ελλάδα. Τα προϊόντα μας τα διαθέτουμε κατευθείαν στον καταναλωτή, χωρίς μεσάζοντες, μέσω τοπικών αγορών εντός της Κορινθίας καθώς και εκτός.',
    highlight: '100% Διαφάνεια',
  },
];

export const CoreValues = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#121B15] text-[#F9F6F0] relative overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/panoramicfarm.avif"
          alt="Panoramic Farm View"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-luminosity"
        />
        {/* Dark Natural Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#121B15]/80 via-[#19241C]/40 to-[#121B15]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">      

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Οι Θεμέλιοι Λίθοι της Καλλιέργειάς μας
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-lg text-[#F9F6F0]/75 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Η παραγωγή μας βασίζεται στην υπαίθρια καλλιέργεια και καλύπτει μια ευρεία γκάμα προϊόντων τόσο για τη θερινή όσο και για τη χειμερινή περίοδο.
          </motion.p>
        </div>

        {/* Values Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group relative h-full bg-[#19241C]/80 backdrop-blur-md p-7 sm:p-8 rounded-2xl border border-white/10 hover:border-[#E8A838]/40 transition-all duration-300 flex flex-col justify-between items-center text-center"
              >
                <div className="flex flex-col items-center">
                  {/* Centered Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-[#E8A838]/10 border border-white/10 group-hover:border-[#E8A838]/30 flex items-center justify-center text-[#E8A838] transition-all duration-300 mb-6">
                    <IconComponent className="w-7 h-7 stroke-[1.75]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#E8A838] transition-colors duration-200 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F9F6F0]/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer: Centered Highlight */}
                <div className="pt-6 mt-6 border-t border-white/10 w-full flex justify-center">
                  <span className="text-xs font-medium text-[#E8A838] flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8A838]" />
                    {item.highlight}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};