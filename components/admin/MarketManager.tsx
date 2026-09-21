'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Market } from '@/types';

export const MarketManager = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [editingMarket, setEditingMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(false);

  // Υπολογισμός της σημερινής ημέρας (mon, tue, wed, thu, fri, sat, sun)
  const todayCode = useMemo(() => {
    const dayIndex = new Date().getDay(); // 0: Sun, 1: Mon, ... 6: Sat
    const dayMap: Record<number, string> = {
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
      0: 'sun',
    };
    return dayMap[dayIndex] || 'mon';
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('markets')
      .select('*')
      .order('id', { ascending: true });

    if (!error && data) {
      setMarkets(
        data.map((m) => ({
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
        }))
      );
    }
    setLoading(false);
  };

  const handleToggleActive = async (market: Market) => {
    const newActiveState = !market.isActive;

    // Optimistic UI Update για ακαριαία απόκριση
    setMarkets((prev) =>
      prev.map((m) => (m.id === market.id ? { ...m, isActive: newActiveState } : m))
    );

    const { error } = await supabase
      .from('markets')
      .update({ is_active: newActiveState })
      .eq('id', market.id);

    if (error) {
      console.error('Σφάλμα ενημέρωσης κατάστασης:', error);
      fetchMarkets(); // Rollback σε περίπτωση σφάλματος
    }
  };

  const handleSaveMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarket) return;

    const { error } = await supabase
      .from('markets')
      .update({
        location_name: editingMarket.locationName,
        address: editingMarket.address,
        hours: editingMarket.hours,
        stand_info: editingMarket.standInfo,
        is_organic_only: editingMarket.isOrganicOnly,
        google_maps_url: editingMarket.googleMapsUrl,
        is_active: editingMarket.isActive,
      })
      .eq('id', editingMarket.id);

    if (!error) {
      setEditingMarket(null);
      fetchMarkets();
    } else {
      alert('Αποτυχία αποθήκευσης αλλαγών.');
    }
  };

  // Metrics Bar
  const stats = useMemo(() => {
    return {
      total: markets.length,
      active: markets.filter((m) => m.isActive).length,
      organic: markets.filter((m) => m.isOrganicOnly && m.isActive).length,
    };
  }, [markets]);

  return (
    <div className="space-y-6 sm:space-y-8 text-[#2D4030]">

      {/* QUICK STATS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Προγραμμα Ημερων</span>
            <span className="text-2xl font-serif font-black">{stats.total} Ημέρες</span>
          </div>
          <span className="text-2xl">📅</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Ενεργες Λαικες</span>
            <span className="text-2xl font-serif font-black text-emerald-700">{stats.active} Πόστα</span>
          </div>
          <span className="text-2xl">📍</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Βιολογικες Αγορες</span>
            <span className="text-2xl font-serif font-black text-[#C86D51]">{stats.organic} Πόστα</span>
          </div>
          <span className="text-2xl">🌿</span>
        </div>
      </div>

      {/* HEADER TITLE */}
      <div className="flex items-center justify-between pb-2">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C86D51] block mb-0.5">
            Προγραμματισμος
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2D4030]">
            Διαχείριση Εβδομαδιαίου Προγράμματος
          </h2>
        </div>
      </div>

      {/* LOADING OR MARKETS GRID */}
      {loading ? (
        <div className="bg-white/80 p-12 text-center rounded-3xl border border-[#2D4030]/10 shadow-xs">
          <span className="w-6 h-6 border-2 border-[#2D4030]/30 border-t-[#2D4030] rounded-full animate-spin inline-block mb-3" />
          <p className="text-xs font-bold text-[#2D4030]">Φόρτωση προγράμματος λαϊκών...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {markets.map((market) => {
            const isToday = market.dayCode === todayCode;

            return (
              <div
                key={market.id}
                className={`bg-white p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  market.isActive
                    ? isToday
                      ? 'border-[#E8A838] ring-2 ring-[#E8A838]/40 shadow-md'
                      : 'border-[#2D4030]/15 shadow-xs hover:shadow-md'
                    : 'border-dashed border-gray-300 bg-gray-50/60 opacity-60'
                }`}
              >
                {/* CARD HEADER */}
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2D4030]/10">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-2xl font-black text-[#2D4030]">
                        {market.day}
                      </span>
                      {isToday && (
                        <span className="px-2.5 py-0.5 bg-[#C86D51] text-white text-[10px] font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8A838] animate-pulse" />
                          Σήμερα
                        </span>
                      )}
                    </div>

                    {/* TOGGLE ACTIVE SWITCH */}
                    <button
                      type="button"
                      role="switch"
                      aria-checked={market.isActive}
                      onClick={() => handleToggleActive(market)}
                      title={market.isActive ? 'Απενεργοποίηση' : 'Ενεργοποίηση'}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        market.isActive ? 'bg-emerald-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          market.isActive ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* MARKET DETAILS */}
                  <div className="space-y-2.5 text-xs text-[#2D4030]/80 mb-6">
                    <div className="flex items-start gap-2">
                      <span className="text-sm shrink-0">📍</span>
                      <div>
                        <strong className="font-bold text-[#2D4030] block">
                          {market.locationName || 'Δεν ορίστηκε τοποθεσία'}
                        </strong>
                        <span className="text-[#2D4030]/60 block">{market.address || '-'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm shrink-0">🕒</span>
                      <span>
                        <strong>Ωράριο:</strong> {market.hours || '-'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm shrink-0">🎯</span>
                      <span>
                        <strong>Πόστο:</strong>{' '}
                        <span className="font-bold text-[#C86D51]">{market.standInfo || '-'}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {market.isOrganicOnly ? (
                        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-extrabold uppercase rounded-lg">
                          🌿 Αποκλειστικά Βιολογική
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-lg">
                          🌾 Συμβατική & Βιολογική
                        </span>
                      )}

                      {market.googleMapsUrl && (
                        <a
                          href={market.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          <span>Maps</span>
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* EDIT BUTTON */}
                <button
                  type="button"
                  onClick={() => setEditingMarket(market)}
                  className="w-full py-2.5 bg-[#2D4030] hover:bg-[#C86D51] text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>✏️</span>
                  <span>Επεξεργασία Στοιχείων</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT MARKET MODAL WITH BACKDROP BLUR */}
      {editingMarket && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setEditingMarket(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl border border-[#2D4030]/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Αποφυγή κλεισίματος με κλικ εντός του modal
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2D4030]/10">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C86D51] block mb-0.5">
                  Επεξεργασία
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2D4030]">
                  Λαϊκή: {editingMarket.day}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingMarket(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-sm flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveMarket} className="space-y-4">
              {/* Location Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                  Όνομα Τοποθεσίας / Λαϊκής *
                </label>
                <input
                  type="text"
                  required
                  placeholder="π.χ. Λαϊκή Αγορά Κηφισιάς"
                  value={editingMarket.locationName}
                  onChange={(e) =>
                    setEditingMarket({ ...editingMarket, locationName: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] bg-[#FAF7F2]/50"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                  Διεύθυνση
                </label>
                <input
                  type="text"
                  placeholder="π.χ. Λ. Κηφισίας & Τατοΐου"
                  value={editingMarket.address}
                  onChange={(e) =>
                    setEditingMarket({ ...editingMarket, address: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] bg-[#FAF7F2]/50"
                />
              </div>

              {/* Hours & Stand Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                    Ωράριο
                  </label>
                  <input
                    type="text"
                    placeholder="07:00 - 14:00"
                    value={editingMarket.hours}
                    onChange={(e) =>
                      setEditingMarket({ ...editingMarket, hours: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] bg-[#FAF7F2]/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                    Πόστο / Σημείο
                  </label>
                  <input
                    type="text"
                    placeholder="Πάγκος 12"
                    value={editingMarket.standInfo}
                    onChange={(e) =>
                      setEditingMarket({ ...editingMarket, standInfo: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] bg-[#FAF7F2]/50"
                  />
                </div>
              </div>

              {/* Google Maps Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                  Google Maps URL
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={editingMarket.googleMapsUrl || ''}
                  onChange={(e) =>
                    setEditingMarket({ ...editingMarket, googleMapsUrl: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] bg-[#FAF7F2]/50"
                />
              </div>

              {/* TOGGLE SWITCHES IN MODAL */}
              <div className="space-y-3 pt-2">
                {/* Organic Only Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-2xl border border-[#2D4030]/10">
                  <div>
                    <span className="text-xs font-bold block text-[#2D4030]">Αποκλειστικά Βιολογική</span>
                    <span className="text-[10px] text-[#2D4030]/60">Προβάλλει την ειδική σήμανση Bio</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={editingMarket.isOrganicOnly}
                    onClick={() =>
                      setEditingMarket({
                        ...editingMarket,
                        isOrganicOnly: !editingMarket.isOrganicOnly,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      editingMarket.isOrganicOnly ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        editingMarket.isOrganicOnly ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Active Day Toggle */}
                <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-2xl border border-[#2D4030]/10">
                  <div>
                    <span className="text-xs font-bold block text-[#2D4030]">Ενεργή Ημέρα</span>
                    <span className="text-[10px] text-[#2D4030]/60">Εμφάνιση στο πρόγραμμα πελατών</span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={editingMarket.isActive}
                    onClick={() =>
                      setEditingMarket({
                        ...editingMarket,
                        isActive: !editingMarket.isActive,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      editingMarket.isActive ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                        editingMarket.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-2 pt-4 border-t border-[#2D4030]/10">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#2D4030] hover:bg-[#C86D51] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-xs"
                >
                  Αποθήκευση Αλλαγών
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMarket(null)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition-colors"
                >
                  Ακύρωση
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};