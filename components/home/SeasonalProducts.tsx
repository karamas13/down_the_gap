'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../products/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase'; 
import { Product } from '@/types'; 
import soilBg from '@/public/images/soil.avif'; 
import { Broccoli } from 'lucide-react';

export const SeasonalProducts = () => {
  const [seasonalProducts, setSeasonalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeasonalProducts = async () => {
      try {
        setIsLoading(true);

        // Ανάκτηση ΜΟΝΟ των διαθέσιμων προϊόντων απευθείας από τη βάση
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_available', true);

        if (error) {
          console.error('Σφάλμα κατά την ανάκτηση προϊόντων:', error);
          return;
        }

        if (data) {
          // Μετατροπή των πεδίων στον τύπο Product
          const formattedProducts: Product[] = data.map((item: any) => ({
            id: String(item.id),
            title: item.title || '',
            description: item.description || '',
            imageUrl: item.image_url || item.imageUrl || '',
            isAvailable: Boolean(item.is_available ?? item.isAvailable ?? false),
            category: item.category || '',
            season: item.season || '',
          }));

          // Κρατάμε ΟΛΑ τα διαθέσιμα προϊόντα (χωρίς .slice)
          setSeasonalProducts(formattedProducts);
        }
      } catch (err) {
        console.error('Απρόσμενο σφάλμα:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasonalProducts();
  }, []);

  return (
    <section className="py-24 lg:py-32 text-[#FAF7F2] relative overflow-hidden bg-[#18231A]">
      {/* Background Image με Next.js Image Component */}
      <div className="absolute inset-0 z-0">
        <Image
          src={soilBg}
          alt="Soil texture background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30"
        />
        {/* Dark Gradient Overlay για διατήρηση της αναγνωσιμότητας του κειμένου */}
        <div className="absolute inset-0 bg-linear-to-b from-[#18231A]/50 via-[#233326]/10 to-[#18231A]/50 mix-blend-multiply" />
      </div>

      {/* Decorative Ambient Lighting & Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-175 h-87.5 bg-[#E8A838]/10 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#2D4030]/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Φρέσκα Εποχιακά Προϊόντα
            </h2>

            <p className="text-base sm:text-lg text-white/75 mt-3 font-normal leading-relaxed">
              Συγκομίζονται καθημερινά από τα κτήματά μας και είναι διαθέσιμα για άμεση παραγγελία ή παραλαβή από τη λαϊκή.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs sm:text-sm font-extrabold text-[#E8A838] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-md group shrink-0"
          >
            <span>Δείτε όλα τα προϊόντα</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Product Cards Grid / Skeleton / Fallback */}
        {isLoading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="h-95 rounded-3xl bg-white/5 border border-white/10 animate-pulse p-4 flex flex-col justify-between"
              >
                <div className="w-full h-52 bg-white/10 rounded-2xl" />
                <div className="space-y-3 my-4">
                  <div className="h-5 bg-white/10 rounded-md w-3/4" />
                  <div className="h-3 bg-white/10 rounded-md w-full" />
                  <div className="h-3 bg-white/10 rounded-md w-2/3" />
                </div>
                <div className="h-8 bg-white/10 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : seasonalProducts.length > 0 ? (
          /* Real Available Products Grid - Εμφανίζει ΟΛΑ τα διαθέσιμα */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {seasonalProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
                className="hover:-translate-y-1.5 transition-transform duration-300"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Fallback σε περίπτωση που δεν υπάρχουν διαθέσιμα προϊόντα */
          <div className="text-center py-16 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg">
            <span className="text-4xl block mb-3">🌱</span>
            <h3 className="font-serif text-xl font-bold text-white">
              Αυτή τη στιγμή ετοιμάζεται η νέα συγκομιδή!
            </h3>
            <p className="text-sm text-white/70 mt-1">
              Επιστρέψτε σύντομα για νέα φρέσκα βιολογικά προϊόντα.
            </p>
          </div>
        )}

        {/* Bottom Feature Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 p-6 sm:p-8 bg-linear-to-r from-[#e4957d] via-[#ff845f] to-[#ff7650] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Ambient Glow */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#E8A838]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <Broccoli color="#008a29" className='size-10'/>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                Εγγύηση Απολύτως Φρέσκου Προϊόντος
              </h4>
              <p className="text-xs sm:text-sm text-white/85 mt-0.5 font-light">
                Όλα τα διαθέσιμα προϊόντα μαζεύονται εντός 24 ωρών πριν την παράδοση.
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="px-6 py-3.5 bg-[#18231A] hover:bg-[#233326] text-[#E8A838] hover:text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0 border border-[#E8A838]/30 relative z-10"
          >
            Μάθετε για την Καλλιέργειά μας
          </Link>
        </motion.div>

      </div>
    </section>
  );
};