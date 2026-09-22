'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/index';
import { supabase } from '@/lib/supabase';

interface ProductsCatalogProps {
  products?: Product[];
}

type SeasonFilter = 'all' | 'summer' | 'winter';

// Θεματικές ρυθμίσεις ανά εποχή
const SEASON_CONFIG = {
  all: {
    bgGlow: 'from-[#2D4030]/10 via-[#FAF7F2] to-[#FAF7F2]',
    badgeBg: 'bg-[#2D4030]/10 text-[#2D4030]',
    border: 'border-[#2D4030]/20',
    bannerTitle: 'Όλη η Σοδειά μας',
    bannerDesc: 'Ανακαλύψτε το σύνολο των φρέσκων λαχανικών μας, καλλιεργημένων με απόλυτο σεβασμό στον κύκλο της φύσης.',
    icon: '🌿',
  },
  summer: {
    bgGlow: 'from-[#C86D51]/15 via-[#FAF7F2] to-[#FAF7F2]',
    badgeBg: 'bg-[#C86D51]/10 text-[#C86D51]',
    border: 'border-[#C86D51]/30',
    bannerTitle: 'Θερινή Συγκομιδή ☀️',
    bannerDesc: 'Λαχανικά γεμάτα ήλιο, άρωμα και γλυκύτητα. Από το μποστάνι μας κατευθείαν στο τραπέζι σας.',
    icon: '☀️',
  },
  winter: {
    bgGlow: 'from-blue-900/15 via-[#FAF7F2] to-[#FAF7F2]',
    badgeBg: 'bg-blue-900/10 text-blue-900',
    border: 'border-blue-900/20',
    bannerTitle: 'Χειμερινή Συγκομιδή ❄️',
    bannerDesc: 'Πλούσια θρεπτικά λαχανικά ανθεκτικά στις κρύες μέρες του χειμώνα.',
    icon: '❄️',
  },
};

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState<boolean>(!initialProducts || initialProducts.length === 0);
  const [activeSeason, setActiveSeason] = useState<SeasonFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentTheme = SEASON_CONFIG[activeSeason];

  // Fetch προϊόντων από το Supabase αν δεν έχουν δοθεί ως props
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts);
      setLoading(false);
      return;
    }

    const fetchProductsFromBackend = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          // Αντιστοίχιση των πεδίων της βάσης (snake_case) με το TypeScript Interface (camelCase)
          const mappedProducts: Product[] = data.map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            imageUrl: p.image_url || p.imageUrl,
            season: p.season,
            isAvailable: p.is_available ?? p.isAvailable ?? true,
            category: p.category,
          }));
          setProducts(mappedProducts);
        }
      } catch (err) {
        console.error('Σφάλμα κατά την φόρτωση των προϊόντων:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromBackend();
  }, [initialProducts]);

  // Υπολογισμός πλήθους προϊόντων ανά εποχή
  const counts = useMemo(() => {
    return {
      all: products.length,
      summer: products.filter((p) => p.season === 'summer').length,
      winter: products.filter((p) => p.season === 'winter').length,
    };
  }, [products]);

  // Φιλτράρισμα αποκλειστικά βάσει εποχής ('summer' | 'winter') και αναζήτησης
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSeason = activeSeason === 'all' || product.season === activeSeason;
      const matchesSearch =
        searchQuery === '' ||
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSeason && matchesSearch;
    });
  }, [products, activeSeason, searchQuery]);

  const handleResetFilters = () => {
    setActiveSeason('all');
    setSearchQuery('');
  };

  return (
    <section className={`relative py-20 transition-colors duration-700 bg-linear-to-b ${currentTheme.bgGlow} text-[#2D4030]`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Seasonal Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-3xl bg-white/70 backdrop-blur-md border ${currentTheme.border} shadow-sm mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4`}
          >
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${currentTheme.badgeBg} mb-2`}>
                <span>{currentTheme.icon}</span>
                <span>Εποχιακή Ενότητα</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black">{currentTheme.bannerTitle}</h2>
              <p className="text-xs sm:text-sm text-[#2D4030]/75 mt-1 max-w-2xl font-light">
                {currentTheme.bannerDesc}
              </p>
            </div>

            {/* Quick Count Badge */}
            <div className="shrink-0 bg-white px-5 py-3 rounded-2xl border border-[#2D4030]/10 text-center shadow-xs">
              <span className="block text-2xl font-serif font-black">{filteredProducts.length}</span>
              <span className="text-[11px] font-bold text-[#2D4030]/60 uppercase tracking-wider">Λαχανικά</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls: Seasons Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-8">
          
          {/* Seasonal Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#2D4030]/10 shadow-sm overflow-x-auto">
            <button
              onClick={() => setActiveSeason('all')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSeason === 'all'
                  ? 'bg-[#2D4030] text-[#FAF7F2] shadow-sm'
                  : 'text-[#2D4030]/70 hover:text-[#2D4030] hover:bg-[#2D4030]/5'
              }`}
            >
              <span>🌿</span>
              <span>Όλα</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeSeason === 'all' ? 'bg-white/20 text-white' : 'bg-[#2D4030]/10 text-[#2D4030]'}`}>
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveSeason('summer')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSeason === 'summer'
                  ? 'bg-[#C86D51] text-white shadow-sm'
                  : 'text-[#2D4030]/70 hover:text-[#C86D51] hover:bg-[#C86D51]/5'
              }`}
            >
              <span>☀️</span>
              <span>Θερινά</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeSeason === 'summer' ? 'bg-white/20 text-white' : 'bg-[#C86D51]/10 text-[#C86D51]'}`}>
                {counts.summer}
              </span>
            </button>

            <button
              onClick={() => setActiveSeason('winter')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeSeason === 'winter'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-[#2D4030]/70 hover:text-blue-900 hover:bg-blue-900/5'
              }`}
            >
              <span>❄️</span>
              <span>Χειμερινά</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] ${activeSeason === 'winter' ? 'bg-white/20 text-white' : 'bg-blue-900/10 text-blue-900'}`}>
                {counts.winter}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Αναζήτηση λαχανικού..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-white border border-[#2D4030]/15 focus:outline-none focus:border-[#2D4030] shadow-xs placeholder-[#2D4030]/40"
            />
            <svg
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D4030]/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#2D4030]/50 hover:text-[#2D4030]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white/80 rounded-3xl h-80 border border-[#2D4030]/10 p-4 flex flex-col justify-between">
                <div className="bg-gray-200 h-48 rounded-2xl w-full"></div>
                <div className="space-y-2 pt-4">
                  <div className="bg-gray-200 h-4 rounded-md w-3/4"></div>
                  <div className="bg-gray-200 h-3 rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Product Grid Layout */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  key={product.id || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 px-4 bg-white/60 backdrop-blur-md rounded-3xl border border-[#2D4030]/10 mt-8"
          >
            <div className="text-4xl mb-3">🌱</div>
            <h3 className="font-serif text-lg font-bold text-[#2D4030]">Δεν βρέθηκαν λαχανικά</h3>
            <p className="text-xs text-[#2D4030]/70 mt-1 max-w-sm mx-auto">
              Δεν υπήρξαν αποτελέσματα με την επιλεγμένη εποχή ή τον όρο αναζήτησης.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#2D4030] text-[#FAF7F2] text-xs font-bold hover:bg-[#2D4030]/90 transition-colors shadow-sm"
            >
              Επαναφορά Φίλτρων
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};