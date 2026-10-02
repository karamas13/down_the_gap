'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingBasket, 
  MapPin, 
  Clock, 
  Sprout, 
  Store, 
  ExternalLink 
} from 'lucide-react'; 
import { DayCode, Market } from '../../types';

interface DayConfig {
  code: DayCode;
  label: string;
  short: string;
  dayIndex: number;
}

const DAYS_CONFIG: DayConfig[] = [
  { code: 'mon', label: 'Δευτέρα', short: 'ΔΕΥ', dayIndex: 1 },
  { code: 'tue', label: 'Τρίτη', short: 'ΤΡΙ', dayIndex: 2 },
  { code: 'wed', label: 'Τετάρτη', short: 'ΤΕΤ', dayIndex: 3 },
  { code: 'thu', label: 'Πέμπτη', short: 'ΠΕΜ', dayIndex: 4 },
  { code: 'fri', label: 'Παρασκευή', short: 'ΠΑΡ', dayIndex: 5 },
  { code: 'sat', label: 'Σάββατο', short: 'ΣΑΒ', dayIndex: 6 },
  { code: 'sun', label: 'Κυριακή', short: 'ΚΥΡ', dayIndex: 0 },
];

type CategoryTab = 'athens' | 'corinth';

export const MarketArray = () => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>('athens');
  const [athensMarkets, setAthensMarkets] = useState<Market[]>([]);
  const [corinthMarkets, setCorinthMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayCode, setTodayCode] = useState<DayCode>('mon');
  const [todayLabel, setTodayLabel] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    const currentDayIdx = new Date().getDay();
    const currentDayObj = DAYS_CONFIG.find((d) => d.dayIndex === currentDayIdx) || DAYS_CONFIG[0];
    
    setTodayCode(currentDayObj.code);
    setTodayLabel(currentDayObj.label);

    fetchAllMarkets();
  }, []);

  useEffect(() => {
    if (!loading && window.location.hash === '#marketarray') {
      const element = document.getElementById('marketarray');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [loading]);

  const mapMarketData = (data: any[]): Market[] => {
    return data.map((m) => ({
      id: m.id,
      dayCode: m.day_code,
      day: m.day,
      locationName: m.location_name,
      address: m.address,
      hours: m.hours,
      standInfo: m.stand_info,
      isOrganicOnly: m.is_organic_only,
      googleMapsUrl: m.google_maps_url,
      isActive: m.is_active,
    }));
  };

  const fetchAllMarkets = async () => {
    try {
      setLoading(true);

      const [corinthRes, athensRes] = await Promise.all([
        supabase.from('markets_v2').select('*').order('id', { ascending: true }),
        supabase.from('markets').select('*').order('id', { ascending: true }),
      ]);

      if (!athensRes.error && athensRes.data) {
        setAthensMarkets(mapMarketData(athensRes.data));
      }

      if (!corinthRes.error && corinthRes.data) {
        setCorinthMarkets(mapMarketData(corinthRes.data));
      }
    } catch (err) {
      console.error('Error fetching markets:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeAthensMarkets = athensMarkets.filter((m) => m.isActive);
  const activeCorinthMarkets = corinthMarkets.filter((m) => m.isActive);

  const todayAthensMarkets = activeAthensMarkets.filter(
    (m) => m.dayCode.toLowerCase() === todayCode.toLowerCase()
  );
  const todayCorinthMarkets = activeCorinthMarkets.filter(
    (m) => m.dayCode.toLowerCase() === todayCode.toLowerCase()
  );
  
  const allTodayMarkets = [
    ...todayAthensMarkets.map((m) => ({ ...m, categoryLabel: 'Βιολογική Αθήνας' })),
    ...todayCorinthMarkets.map((m) => ({ ...m, categoryLabel: 'Συμβατική Κορίνθου' })),
  ];

  const currentDisplayMarkets = activeTab === 'athens' ? activeAthensMarkets : activeCorinthMarkets;

  const renderMarketCard = (market: Market) => {
    const isToday = market.dayCode.toLowerCase() === todayCode.toLowerCase();

    return (
      <div
        key={market.id}
        className={`group relative bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
          isToday
            ? 'border-[#E8A838] shadow-md ring-2 ring-[#E8A838]/40'
            : 'border-[#3C281B]/10 shadow-sm hover:border-[#3C281B]/30'
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#3C281B]/10">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl font-black text-[#3C281B]">
                {market.day}
              </span>
              {market.isOrganicOnly && (
                <span className="px-2.5 py-0.5 bg-amber-100/80 text-amber-900 text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
                  <Sprout className="w-3 h-3 text-amber-800" />
                  Bio
                </span>
              )}
            </div>

            {isToday ? (
              <span className="px-3 py-1 bg-[#B85B35] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A838] animate-pulse" />
                Σήμερα
              </span>
            ) : (
              <span className="text-xs font-bold text-[#3C281B]/70 bg-[#FAF6F0] px-2.5 py-1 rounded-lg border border-[#3C281B]/10 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#3C281B]/50" />
                {market.hours}
              </span>
            )}
          </div>

          <div className="space-y-2 mb-6">
            <h4 className="font-serif text-xl font-bold text-[#3C281B] group-hover:text-[#B85B35] transition-colors">
              {market.locationName}
            </h4>
            <p className="text-sm text-[#3C281B]/75 flex items-start gap-2 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#B85B35] shrink-0 mt-0.5" />
              <span>{market.address}</span>
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[#3C281B]/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#3C281B]/40 block tracking-wider">
              Σημείο Πάγκου
            </span>
            <span className="text-xs font-bold text-[#B85B35]">
              {market.standInfo}
            </span>
          </div>

          {market.googleMapsUrl && (
            <a
              href={market.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#3C281B] group-hover:bg-[#B85B35] text-white font-bold text-xs rounded-xl transition-colors duration-300 flex items-center gap-1.5"
            >
              <span>Χάρτης</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <section 
      id="marketarray" 
      className="scroll-mt-28 py-20 lg:py-28 text-[#3C281B] relative overflow-hidden bg-[#1A120B]"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cropscloseup.avif"
          alt="Πανοραμική θέα κτήματος"
          fill
          priority
          className="object-cover object-center opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#FAF6F0]/55 via-[#f0debf]/30 to-[#1A120B]" />
      </div>    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[#3C281B]">
            Εβδομαδιαίο Πρόγραμμα Λαϊκών
          </h2>
          <p className="text-base sm:text-lg text-[#3C281B]/80 mt-3 font-medium">
            Φρέσκα λαχανικά κατευθείαν από το κτήμα στο πόστο μας.
          </p>
        </div>

        {/* Featured "Today" Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-[#2A1C14]/90 backdrop-blur-md text-[#FAF6F0] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white/10"
        >
          <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#E8A838]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#B85B35] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E8A838] animate-pulse" />
              Σήμερα: {todayLabel}
            </div>

            {loading ? (
              <div className="py-4 text-white/70 text-sm animate-pulse">
                Φόρτωση προγράμματος...
              </div>
            ) : allTodayMarkets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/15">
                {allTodayMarkets.map((market, idx) => (
                  <div key={market.id} className={`${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''} space-y-3`}>
                    <span className="text-xs font-semibold text-[#E8A838] uppercase tracking-wider block">
                      {market.categoryLabel}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                      {market.locationName}
                    </h3>
                    <p className="text-white/80 text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#E8A838] shrink-0" />
                      <span>{market.address}</span>
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl text-xs font-semibold text-white border border-white/10 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-white/80" />
                        {market.hours}
                      </span>
                      <span className="px-3 py-1 bg-[#E8A838]/20 backdrop-blur-md text-[#E8A838] rounded-xl text-xs font-bold border border-[#E8A838]/30 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E8A838]" />
                        Πόστο: {market.standInfo}
                      </span>
                    </div>

                    {market.googleMapsUrl && (
                      <div className="pt-2">
                        <a
                          href={market.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E8A838] hover:bg-[#d89727] text-[#2A1C14] font-extrabold text-xs rounded-xl transition-all shadow-md"
                        >
                          <span>Οδηγίες Χάρτη</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Σήμερα δεν έχουμε προγραμματισμένο πάγκο σε κάποια λαϊκή.
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Δείτε παρακάτω το πρόγραμμα για τις υπόλοιπες ημέρες της εβδομάδας!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Pill Navigation Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 bg-[#2A1C14]/85 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg">
            <button
              onClick={() => setActiveTab('athens')}
              className={`relative px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2 ${
                activeTab === 'athens' ? 'text-[#2A1C14]' : 'text-white/80 hover:text-white'
              }`}
            >
              {activeTab === 'athens' && (
                <motion.div
                  layoutId="activeMarketTab"
                  className="absolute inset-0 bg-[#E8A838] rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Sprout className="w-4 h-4" />
                Βιολογικές Λαϊκές Αθήνας
              </span>
            </button>

            <button
              onClick={() => setActiveTab('corinth')}
              className={`relative px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors duration-200 flex items-center gap-2 ${
                activeTab === 'corinth' ? 'text-[#2A1C14]' : 'text-white/80 hover:text-white'
              }`}
            >
              {activeTab === 'corinth' && (
                <motion.div
                  layoutId="activeMarketTab"
                  className="absolute inset-0 bg-[#E8A838] rounded-xl shadow-md"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Store className="w-4 h-4" />
                Συμβατικές Λαϊκές Κορίνθου
              </span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <div className="col-span-full text-center py-12 text-[#3C281B]/60 font-medium">
                Φόρτωση προγράμματος...
              </div>
            ) : currentDisplayMarkets.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white/95 backdrop-blur-md rounded-3xl border border-[#3C281B]/10 shadow-sm">
                <Store className="w-10 h-10 text-[#3C281B]/40 mx-auto mb-3" />
                <h4 className="font-serif text-lg font-bold text-[#3C281B]">
                  Δεν υπάρχουν προγραμματισμένες λαϊκές σε αυτή την κατηγορία.
                </h4>
              </div>
            ) : (
              currentDisplayMarkets.map((market) => renderMarketCard(market))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Contact CTA Card */}
        <div className="mt-14 p-8 bg-white/95 backdrop-blur-md rounded-3xl border border-[#3C281B]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <ShoppingBasket className="w-10 h-10 text-[#3C281B] shrink-0" />
            <div>
              <h4 className="font-serif text-lg font-bold text-[#3C281B]">
                Ειδικές Πληροφορίες για τη Λαϊκή
              </h4>
              <p className="text-xs sm:text-sm text-[#3C281B]/75 mt-0.5">
                Θέλετε περαιτέρω πληροφορίες; Επικοινωνήστε μαζί μας.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 bg-[#3C281B] hover:bg-[#B85B35] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Επικοινωνία
          </a>
        </div>

      </div>
    </section>
  );
};