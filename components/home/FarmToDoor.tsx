// components/home/FarmToDoor.tsx
'use client';


import { motion } from 'framer-motion';

export const FarmToDoor = () => {
  const values = [
    {
      title: '100% Βιολογική Καλλιέργεια',
      description: 'Χωρίς συνθετικά φυτοφάρμακα, με πλήρη σεβασμό στον φυσικό κύκλο της γης.'
    },
    {
      title: 'Καθημερινή Συγκομιδή',
      description: 'Μαζεύουμε τα προϊόντα την ημέρα της παράδοσης για μέγιστη φρεσκάδα.'
    },
    {
      title: 'Άμεση Διανομή',
      description: 'Απευθείας από τα χωράφια μας στο καλάθι και την πόρτα σας.'
    }
  ];

  return (
    <section className="py-20 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4030] mb-4">
            Από τη Φάρμα στο Σπίτι σας
          </h2>
          <p className="text-[#2D4030]/80 text-lg">
            Η δέσμευσή μας για αγνή, αυθεντική διατροφή χωρίς συμβιβασμούς στην ποιότητα.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-[#2D4030]/5 text-center"
            >
              <div className="w-14 h-14 bg-[#C86D51]/10 text-[#C86D51] rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                0{idx + 1}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2D4030] mb-3">{item.title}</h3>
              <p className="text-[#2D4030]/75 leading-relaxed text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};