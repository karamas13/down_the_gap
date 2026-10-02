'use client';

import  { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '../products/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase'; 
import { Product } from '@/types'; 
import { Broccoli } from 'lucide-react';

export const SeasonalProducts = () => {
  const [seasonalProducts, setSeasonalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeasonalProducts = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_available', true);

        if (error) {
          console.error('Σφάλμα κατά την ανάκτηση προϊόντων:', error);
          return;
        }

        if (data) {
          const formattedProducts: Product[] = data.map((item: any) => ({
            id: String(item.id),
            title: item.title || '',
            description: item.description || '',
            imageUrl: item.image_url || item.imageUrl || '',
            isAvailable: Boolean(item.is_available ?? item.isAvailable ?? false),
            category: item.category || '',
            season: item.season || '',
          }));

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
    <section className="py-24 lg:py-32 text-[#FAF6F0] relative overflow-hidden bg-[#1A120B]">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src= "@/public/images/soil.avif"
          alt="Soil texture background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        {/* Dark Brown Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#1A120B] via-[#2A1C14]/30 to-[#1A120B]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Φρέσκα Εποχιακά Προϊόντα
            </h2>

            <p className="text-base sm:text-lg text-white/80 mt-3 font-normal leading-relaxed">
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
          className="mt-16 p-6 sm:p-8 bg-linear-to-r from-[#8B4513] via-[#B85B35] to-[#D97736] text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-white/10"
        >
          {/* Ambient Glow */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#E8A838]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <Broccoli className="size-10 text-[#E8A838]" />
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                Εγγύηση Απολύτως Φρέσκου Προϊόντος
              </h4>
              <p className="text-xs sm:text-sm text-white/90 mt-0.5 font-light">
                Όλα τα διαθέσιμα προϊόντα μαζεύονται εντός 24 ωρών πριν την παράδοση.
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="px-6 py-3.5 bg-[#1A120B] hover:bg-[#2A1C14] text-[#E8A838] hover:text-white font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0 border border-[#E8A838]/30 relative z-10"
          >
            Μάθετε για την Καλλιέργειά μας
          </Link>
        </motion.div>

      </div>
    </section>
  );
};