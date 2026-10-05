'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { Product } from '@/types/index';
import { supabase } from '@/lib/supabase';
import { Sprout, Sun, Snowflake, CheckCircle2, Search, X, Leaf } from 'lucide-react';

interface ProductsCatalogProps {
  products?: Product[];
}

type SeasonFilter = 'available' | 'all' | 'summer' | 'winter';

// Θεματικές ρυθμίσεις ανά εποχή/κατάσταση με Radial Gradient central gradient bg 
const SEASON_CONFIG = {
  available: {
    bgRadial: 'radial-gradient(circle at center, rgba(34, 197, 94, 0.35) 25%, rgba(245, 240, 230, 0.85) 55%, #FAF7F2 100%)',
    badgeBg: 'bg-green-600/10 text-green-700',
    border: 'border-green-600/20',
    bannerTitle: 'Διαθέσιμα Τώρα',
    bannerDesc: 'Φρέσκα λαχανικά που συλλέγονται αυτή τη στιγμή από τα κτήματά μας και είναι έτοιμα για κατανάλωση.',
    icon: CheckCircle2,
  },
  all: {
    bgRadial: 'radial-gradient(circle at center, rgba(40, 130, 1, 0.35) 35%, rgba(245, 240, 230, 0.85) 55%, #FAF7F2 120%)',
    badgeBg: 'bg-[#2D4030]/10 text-[#2D4030]',
    border: 'border-[#2D4030]/20',
    bannerTitle: 'Όλη η Σοδειά μας',
    bannerDesc: 'Ανακαλύψτε το σύνολο των φρέσκων λαχανικών μας, καλλιεργημένων με 100% βιολογικές πρακτικές.',
    icon: Sprout,
  },
  summer: {
    bgRadial: 'radial-gradient(circle at center, rgba(200, 109, 81, 0.40) 25%, rgba(253, 240, 230, 0.85) 55%, #FAF7F2 100%)',
    badgeBg: 'bg-[#C86D51]/10 text-[#C86D51]',
    border: 'border-[#C86D51]/30',
    bannerTitle: 'Θερινή Συγκομιδή',
    bannerDesc: 'Λαχανικά γεμάτα ήλιο, άρωμα και γλυκύτητα. Από το μποστάνι μας κατευθείαν στο τραπέζι σας.',
    icon: Sun,
  },
  winter: {
    bgRadial: 'radial-gradient(circle at center, rgba(19, 105, 180, 0.80) 25%, rgba(235, 242, 250, 0.85) 55%, #FAF7F2 100%)',
    badgeBg: 'bg-blue-600/10 text-blue-900',
    border: 'border-blue-900/20',
    bannerTitle: 'Χειμερινή Συγκομιδή',
    bannerDesc: 'Πλούσια θρεπτικά λαχανικά ανθεκτικά στις κρύες μέρες του χειμώνα.',
    icon: Snowflake,
  },
};

export const ProductsCatalog: React.FC<ProductsCatalogProps> = ({ products: initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState<boolean>(!initialProducts || initialProducts.length === 0);
  //Default selected tab
  const [activeSeason, setActiveSeason] = useState<SeasonFilter>('available');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentTheme = SEASON_CONFIG[activeSeason];
  const IconBanner = currentTheme.icon;

  // Fetch προϊόντων από Supabase
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

  // Υπολογισμός αριθμού προϊόντων ανά κατηγορία
  const counts = useMemo(() => {
    return {
      all: products.length,
      available: products.filter((p) => p.isAvailable).length,
      summer: products.filter((p) => p.season === 'summer').length,
      winter: products.filter((p) => p.season === 'winter').length,
    };
  }, [products]);

  // Φιλτράρισμα βάσει tab, διαθεσιμότητας και αναζήτησης
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      let matchesTab = false;
      if (activeSeason === 'all') {
        matchesTab = true;
      } else if (activeSeason === 'available') {
        matchesTab = product.isAvailable === true;
      } else {
        matchesTab = product.season === activeSeason;
      }

      const matchesSearch =
        searchQuery === '' ||
        product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [products, activeSeason, searchQuery]);

  const handleResetFilters = () => {
    // Επαναφορά στο default tab 
    setActiveSeason('available');
    setSearchQuery('');
  };

  return (
    <section
      className="relative py-12 sm:py-20 text-[#2D4030] transition-all duration-700 bg-[#FAF7F2] overflow-hidden"
      style={{
        backgroundImage: currentTheme.bgRadial,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Seasonal/Availability Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-md border ${currentTheme.border} shadow-sm mb-8 sm:mb-10 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left`}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-5">
              <div className={`shrink-0 p-3 rounded-2xl ${currentTheme.badgeBg} border ${currentTheme.border}`}>
                <IconBanner className="w-8 h-8 sm:w-10 sm:h-10 stroke-[1.5]" />
              </div>
              <div>               
                <h2 className="font-serif text-2xl sm:text-3xl font-black">{currentTheme.bannerTitle}</h2>
                <p className="text-xs sm:text-sm text-[#2D4030]/75 mt-1 max-w-2xl font-light leading-relaxed">
                  {currentTheme.bannerDesc}
                </p>
              </div>
            </div>

            {/* Quick Count Badge */}
            <div className="shrink-0 bg-white px-5 py-3 rounded-2xl border border-[#2D4030]/10 text-center shadow-xs w-full md:w-auto">
              <span className="block text-3xl font-serif font-black">{filteredProducts.length}</span>
              <span className="text-[11px] font-bold text-[#2D4030] uppercase tracking-wider">Λαχανικά</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls: Seasons Tabs & Search Bar */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-5 pb-8 sm:pb-10">
          
          {/* Seasonal/Availability Tabs - Responsive scrollable container */}
          <div className="overflow-x-auto pb-2 -mb-2 xl:pb-0 xl:mb-0">
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#2D4030]/10 shadow-sm whitespace-nowrap w-max">
              {/* Tab Διαθέσιμα - Πρώτο στη σειρά */}
              <TabButton 
                filter="available" 
                activeFilter={activeSeason} 
                setActiveFilter={setActiveSeason}
                count={counts.available}
                themeColor="text-green-600"
                activeBg="bg-green-600"
                Icon={CheckCircle2}
                label="Διαθέσιμα Τώρα"
              />

              <TabButton 
                filter="all" 
                activeFilter={activeSeason} 
                setActiveFilter={setActiveSeason}
                count={counts.all}
                themeColor="text-[#2D4030]"
                activeBg="bg-[#2D4030]"
                Icon={Sprout}
                label="Όλα"
              />

              <TabButton 
                filter="summer" 
                activeFilter={activeSeason} 
                setActiveFilter={setActiveSeason}
                count={counts.summer}
                themeColor="text-[#C86D51]"
                activeBg="bg-[#C86D51]"
                Icon={Sun}
                label="Θερινά"
              />

              <TabButton 
                filter="winter" 
                activeFilter={activeSeason} 
                setActiveFilter={setActiveSeason}
                count={counts.winter}
                themeColor="text-blue-900"
                activeBg="bg-blue-900"
                Icon={Snowflake}
                label="Χειμερινά"
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full xl:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Αναζήτηση λαχανικού (π.χ. ντομάτα)..."
              className="w-full pl-11 pr-9 py-3 text-sm rounded-2xl bg-white border border-[#2D4030]/15 focus:outline-none focus:border-[#2D4030]/30 focus:ring-1 focus:ring-[#2D4030]/10 transition-all shadow-xs placeholder-[#2D4030]/40"
            />
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D4030]/40 pointer-events-none" />
            
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 text-[#2D4030]/50 hover:text-[#2D4030] transition-colors cursor-pointer"
                aria-label="Καθαρισμός αναζήτησης"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white/80 rounded-3xl h-90 border border-[#2D4030]/10 p-5 flex flex-col justify-between shadow-sm">
                <div className="bg-gray-200 h-52 rounded-2xl w-full"></div>
                <div className="space-y-3 pt-5">
                  <div className="bg-gray-200 h-5 rounded-md w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Product Grid Layout */
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  key={product.id || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  className="h-full"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-6 bg-white/60 backdrop-blur-md rounded-3xl border border-[#2D4030]/10 mt-8 shadow-inner"
          >
            <div className="inline-flex p-4 rounded-full bg-white border border-[#2D4030]/10 mb-5 shadow-xs text-[#2D4030]/30">
              <Leaf className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D4030]">Δεν βρέθηκαν λαχανικά</h3>
            <p className="text-sm text-[#2D4030]/70 mt-2 max-w-md mx-auto font-light leading-relaxed">
              Δεν υπήρξαν αποτελέσματα που να ταιριάζουν με το επιλεγμένο φίλτρο <span className='font-semibold'>{currentTheme.bannerTitle}</span> {searchQuery && <>και την αναζήτηση <span className='font-semibold'>"{searchQuery}"</span></>}.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-8 px-6 py-3 rounded-2xl bg-[#2D4030] text-[#FAF7F2] text-sm font-bold hover:bg-[#2D4030]/90 transition-colors shadow-md cursor-pointer flex items-center gap-2 mx-auto"
            >
              <Sprout className="w-4 h-4" />
              Επαναφορά στο "Διαθέσιμα Τώρα"
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

// Helper component για τα Tab Buttons για καθαρότερο κώδικα
interface TabButtonProps {
  filter: SeasonFilter;
  activeFilter: SeasonFilter;
  setActiveFilter: (filter: SeasonFilter) => void;
  count: number;
  themeColor: string;
  activeBg: string;
  Icon: React.ElementType;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ 
  filter, activeFilter, setActiveFilter, count, themeColor, activeBg, Icon, label 
}) => {
  const isActive = activeFilter === filter;
  
  return (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
        isActive
          ? `${activeBg} text-[#FAF7F2] shadow-md`
          : `text-[#2D4030]/70 hover:${themeColor} hover:bg-[#2D4030]/5`
      }`}
    >
      <Icon className={`w-4.5 h-4.5 stroke-2 ${isActive ? 'text-white' : themeColor}`} />
      <span>{label}</span>
      <span className={`ml-1 px-2.5 py-0.5 rounded-full text-[11px] font-black ${
        isActive 
          ? 'bg-white/20 text-white' 
          : `bg-[#2D4030]/5 ${themeColor}`
      }`}>
        {count}
      </span>
    </button>
  );
};