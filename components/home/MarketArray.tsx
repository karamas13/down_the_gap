'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase'; // Βεβαιωθείτε ότι το path είναι σωστό
import { DayCode, Market } from '../../types'; // Βεβαιωθείτε ότι το path είναι σωστό

interface DayConfig {
  code: DayCode;
  label: string;
  short: string;
  dayIndex: number; // 0: Sun, 1: Mon, ... 6: Sat
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

export const MarketArray = () => {
  const [mounted, setMounted] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayCode, setTodayCode] = useState<DayCode>('mon');
  const [todayLabel, setTodayLabel] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('today');

  useEffect(() => {
    setMounted(true);
    const currentDayIdx = new Date().getDay();
    const currentDayObj = DAYS_CONFIG.find((d) => d.dayIndex === currentDayIdx) || DAYS_CONFIG[0];
    
    setTodayCode(currentDayObj.code);
    setTodayLabel(currentDayObj.label);

    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('markets')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data) {
        const formattedMarkets: Market[] = data.map((m) => ({
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
        setMarkets(formattedMarkets);
      }
    } catch (err) {
      console.error('Error fetching markets:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null; // Αποφυγή hydration mismatch
  }

  // Μόνο οι ενεργές λαϊκές
  const activeMarkets = markets.filter((m) => m.isActive);

  // Σημερινή λαϊκή (αν είναι ενεργή)
  const todayMarket = activeMarkets.find((m) => m.dayCode === todayCode);

  // Φιλτράρισμα προβαλλόμενων αγορών
  const displayedMarkets = activeMarkets.filter((market) => {
    if (selectedFilter === 'today') return market.dayCode === todayCode;
    if (selectedFilter === 'all') return true;
    return market.dayCode === selectedFilter;
  });

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] text-[#2D4030] relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#E8A838]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#C86D51]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2D4030]/10 rounded-full text-xs font-extrabold uppercase tracking-widest text-[#2D4030] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#C86D51] animate-ping" />
            Πού Θα Μας Βρείτε
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Εβδομαδιαίο Πρόγραμμα Λαϊκών
          </h2>
          <p className="text-base sm:text-lg text-[#2D4030]/70 mt-3 font-medium">
            Φρέσκα φρούτα & λαχανικά κατευθείαν από το κτήμα μας στο πόστο μας.
          </p>
        </div>

        {/* HERO STATUS BANNER: ΣΗΜΕΡΙΝΗ ΑΓΟΡΑ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 bg-[#1E2C22] text-[#FAF7F2] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-white/10"
        >
          <div className="absolute -right-16 -top-16 w-72 h-72 bg-[#E8A838]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C86D51] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#E8A838] animate-pulse" />
                Σήμερα: {todayLabel}
              </div>

              {loading ? (
                <div className="py-4 text-white/70 text-sm animate-pulse">
                  Φόρτωση προγράμματος...
                </div>
              ) : todayMarket ? (
                <>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white leading-snug">
                    {todayMarket.locationName}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base flex items-center gap-2">
                    <span className="text-[#E8A838]">📍</span> {todayMarket.address}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl text-xs font-semibold text-white border border-white/10">
                      🕒 {todayMarket.hours}
                    </span>
                    <span className="px-3 py-1 bg-[#E8A838]/20 backdrop-blur-md text-[#E8A838] rounded-xl text-xs font-bold border border-[#E8A838]/30">
                      📍 Πόστο: {todayMarket.standInfo}
                    </span>
                    {todayMarket.isOrganicOnly && (
                      <span className="px-3 py-1 bg-green-500/20 backdrop-blur-md text-green-300 rounded-xl text-xs font-bold border border-green-500/30">
                        🌿 Βιολογική
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="py-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                    Σήμερα δεν έχουμε προγραμματισμένο πάγκο σε κάποια λαϊκή.
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    Επιλέξτε μια από τις παρακάτω ημέρες για να δείτε πού θα μας βρείτε αυτή την εβδομάδα!
                  </p>
                </div>
              )}
            </div>

            {todayMarket && todayMarket.googleMapsUrl && (
              <a
                href={todayMarket.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8A838] hover:bg-[#d89727] text-[#1E2C22] font-extrabold text-sm rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 shrink-0"
              >
                <span>Οδηγίες Χάρτη</span>
                <span className="text-base">↗</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* CONTROLS & FILTER TABS */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 no-scrollbar gap-2">
          <div className="flex items-center bg-white p-1.5 rounded-2xl shadow-sm border border-[#2D4030]/10 shrink-0">
            <button
              onClick={() => setSelectedFilter('today')}
              className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 ${
                selectedFilter === 'today'
                  ? 'bg-[#C86D51] text-white shadow-md'
                  : 'text-[#2D4030]/70 hover:text-[#2D4030]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#E8A838] animate-pulse" />
              Σήμερα ({todayLabel})
            </button>

            <button
              onClick={() => setSelectedFilter('all')}
              className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                selectedFilter === 'all'
                  ? 'bg-[#2D4030] text-white shadow-md'
                  : 'text-[#2D4030]/70 hover:text-[#2D4030]'
              }`}
            >
              Όλη η Εβδομάδα ({activeMarkets.length})
            </button>
          </div>
        </div>

        {/* BENTO CARDS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              <div className="col-span-full text-center py-16 text-[#2D4030]/60 font-medium">
                Φόρτωση δεδομένων...
              </div>
            ) : displayedMarkets.length === 0 ? (
              <div className="col-span-full text-center py-16 bg-white/80 rounded-3xl border border-[#2D4030]/10 shadow-sm">
                <p className="text-4xl mb-3">🧺</p>
                <h4 className="font-serif text-xl font-bold text-[#2D4030]">
                  Δεν υπάρχει προγραμματισμένη λαϊκή για αυτή την επιλογή.
                </h4>
                <button
                  onClick={() => setSelectedFilter('all')}
                  className="mt-3 text-xs font-bold text-[#C86D51] underline underline-offset-4"
                >
                  Προβολή όλων των ημερών
                </button>
              </div>
            ) : (
              displayedMarkets.map((market) => {
                const isToday = market.dayCode === todayCode;

                return (
                  <div
                    key={market.id}
                    className={`group relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between hover:shadow-xl ${
                      isToday
                        ? 'border-[#E8A838] shadow-md ring-2 ring-[#E8A838]/40'
                        : 'border-[#2D4030]/10 shadow-sm hover:border-[#2D4030]/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2D4030]/10">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-2xl font-black text-[#2D4030]">
                            {market.day}
                          </span>
                          {market.isOrganicOnly && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase rounded-md">
                              Bio
                            </span>
                          )}
                        </div>

                        {isToday ? (
                          <span className="px-3 py-1 bg-[#C86D51] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A838] animate-pulse" />
                            Σήμερα
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[#2D4030]/60 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#2D4030]/10">
                            {market.hours}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 mb-6">
                        <h4 className="font-serif text-xl font-bold text-[#2D4030] group-hover:text-[#C86D51] transition-colors">
                          {market.locationName}
                        </h4>
                        <p className="text-sm text-[#2D4030]/75 flex items-start gap-2 leading-relaxed">
                          <span className="shrink-0">📍</span>
                          <span>{market.address}</span>
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#2D4030]/10 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#2D4030]/40 block tracking-wider">
                          Σημείο Πάγκου
                        </span>
                        <span className="text-xs font-bold text-[#C86D51]">
                          {market.standInfo}
                        </span>
                      </div>

                      {market.googleMapsUrl && (
                        <a
                          href={market.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-[#2D4030] group-hover:bg-[#C86D51] text-white font-bold text-xs rounded-xl transition-colors duration-300 flex items-center gap-1"
                        >
                          <span>Χάρτης</span>
                          <span className="text-xs">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Banner */}
        <div className="mt-12 p-8 bg-white rounded-3xl border border-[#2D4030]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8A838]/20 text-[#2D4030] flex items-center justify-center text-2xl shrink-0 font-bold">
              🧺
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#2D4030]">
                Ειδικές Παραγγελίες για τη Λαϊκή
              </h4>
              <p className="text-xs sm:text-sm text-[#2D4030]/75 mt-0.5">
                Θέλετε να σας κρατήσουμε συγκεκριμένη ποσότητα; Επικοινωνήστε μαζί μας από την προηγούμενη ημέρα.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 bg-[#2D4030] hover:bg-[#C86D51] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Επικοινωνία
          </a>
        </div>

      </div>
    </section>
  );
};