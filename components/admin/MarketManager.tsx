'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Market } from '@/types';
import {
  Wheat,
  MapPin,
  Leaf,
  Sparkles,
  Clock,
  Target,
  ExternalLink,
  Pencil,
  X,
  Loader2,
} from 'lucide-react';

type MarketSource = 'markets' | 'markets_v2';

interface MarketWithSource extends Market {
  sourceTable: MarketSource;
}

export const MarketManager = () => {
  const [markets, setMarkets] = useState<MarketWithSource[]>([]);
  const [activeTab, setActiveTab] = useState<MarketSource>('markets');
  const [editingMarket, setEditingMarket] = useState<MarketWithSource | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const todayCode = useMemo(() => {
    const dayIndex = new Date().getDay();
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

    try {
      const [resMarkets, resMarketsV2] = await Promise.all([
        supabase.from('markets').select('*').order('id', { ascending: true }),
        supabase.from('markets_v2').select('*').order('id', { ascending: true }),
      ]);

      const mapMarketData = (data: any[], sourceTable: MarketSource): MarketWithSource[] => {
        if (!data) return [];
        return data.map((m) => ({
          id: m.id,
          dayCode: m.day_code ?? m.dayCode ?? 'mon',
          day: m.day ?? '',
          locationName: m.location_name ?? m.locationName ?? '',
          address: m.address ?? '',
          hours: m.hours ?? '',
          standInfo: m.stand_info ?? m.standInfo ?? '',
          isOrganicOnly: Boolean(m.is_organic_only ?? m.isOrganicOnly ?? sourceTable === 'markets_v2'),
          googleMapsUrl: m.google_maps_url ?? m.googleMapsUrl ?? '',
          isActive: m.is_active ?? m.isActive ?? true,
          sourceTable,
        }));
      };

      const marketsData = mapMarketData(resMarkets.data || [], 'markets');
      const marketsV2Data = mapMarketData(resMarketsV2.data || [], 'markets_v2');

      setMarkets([...marketsData, ...marketsV2Data]);
    } catch (error) {
      console.error('Σφάλμα κατά την ανάκτηση των λαϊκών:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (market: MarketWithSource) => {
    const newActiveState = !market.isActive;

    // Optimistic UI Update
    setMarkets((prev) =>
      prev.map((m) =>
        m.id === market.id && m.sourceTable === market.sourceTable
          ? { ...m, isActive: newActiveState }
          : m
      )
    );

    const { error } = await supabase
      .from(market.sourceTable)
      .update({ is_active: newActiveState })
      .eq('id', market.id);

    if (error) {
      console.error(`[Supabase Update Error on ${market.sourceTable}]:`, error.message, error.details);
      alert(`Αποτυχία ενημέρωσης: ${error.message}`);
      fetchMarkets(); // Revert state
    }
  };

  const handleSaveMarket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMarket) return;

    setSaving(true);

    const payload = {
      day_code: editingMarket.dayCode,
      day: editingMarket.day,
      location_name: editingMarket.locationName,
      address: editingMarket.address,
      hours: editingMarket.hours,
      stand_info: editingMarket.standInfo,
      is_organic_only: editingMarket.isOrganicOnly,
      google_maps_url: editingMarket.googleMapsUrl,
      is_active: editingMarket.isActive,
    };

    try {
      const { error, data } = await supabase
        .from(editingMarket.sourceTable)
        .update(payload)
        .eq('id', editingMarket.id)
        .select();

      if (error) {
        console.error(`[Supabase Save Error on ${editingMarket.sourceTable}]:`, error);
        alert(`Αποτυχία αποθήκευσης: ${error.message}`);
      } else {
        setEditingMarket(null);
        await fetchMarkets();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Προέκυψε απρόσμενο σφάλμα.');
    } finally {
      setSaving(false);
    }
  };

  const filteredMarkets = useMemo(() => {
    return markets.filter((m) => m.sourceTable === activeTab);
  }, [markets, activeTab]);

  const stats = useMemo(() => {
    const corinth = markets.filter((m) => m.sourceTable === 'markets');
    const athens = markets.filter((m) => m.sourceTable === 'markets_v2');

    return {
      totalCorinth: corinth.length,
      activeCorinth: corinth.filter((m) => m.isActive).length,
      totalAthens: athens.length,
      activeAthens: athens.filter((m) => m.isActive).length,
    };
  }, [markets]);

  return (
    <div className="space-y-6 sm:space-y-8 text-[#2D4030]">
      {/* QUICK STATS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">
              Συμβατικές Κορίνθου (markets)
            </span>
            <span className="text-2xl font-serif font-black">{stats.totalCorinth} Πόστα</span>
          </div>
          <Wheat className="w-6 h-6 text-[#2D4030]/70" />
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">
              Ενεργές Κορίνθου
            </span>
            <span className="text-2xl font-serif font-black text-emerald-700">
              {stats.activeCorinth} Ενεργές
            </span>
          </div>
          <MapPin className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">
              Βιολογικές Αθήνας (markets_v2)
            </span>
            <span className="text-2xl font-serif font-black text-[#C86D51]">
              {stats.totalAthens} Πόστα
            </span>
          </div>
          <Leaf className="w-6 h-6 text-[#C86D51]" />
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">
              Ενεργές Αθήνας
            </span>
            <span className="text-2xl font-serif font-black text-emerald-700">
              {stats.activeAthens} Ενεργές
            </span>
          </div>
          <Sparkles className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* HEADER TITLE */}
      <div className="pb-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C86D51] block mb-0.5">
          Προγραμματισμός
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#2D4030]">
          Διαχείριση Εβδομαδιαίου Προγράμματος
        </h2>
      </div>

      {/* TABS KORINTHOS / ATHENS */}
      <div className="flex border-b border-[#2D4030]/10 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('markets')}
          className={`pb-3 px-4 font-bold text-sm transition-all flex items-center gap-2 relative ${
            activeTab === 'markets'
              ? 'text-[#2D4030] border-b-2 border-[#2D4030]'
              : 'text-[#2D4030]/50 hover:text-[#2D4030]'
          }`}
        >
          <Wheat className="w-4 h-4" />
          <span>Συμβατικές Λαϊκές Κορίνθου ({stats.totalCorinth})</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('markets_v2')}
          className={`pb-3 px-4 font-bold text-sm transition-all flex items-center gap-2 relative ${
            activeTab === 'markets_v2'
              ? 'text-[#C86D51] border-b-2 border-[#C86D51]'
              : 'text-[#2D4030]/50 hover:text-[#2D4030]'
          }`}
        >
          <Leaf className="w-4 h-4" />
          <span>Βιολογικές Λαϊκές Αθήνας ({stats.totalAthens})</span>
        </button>
      </div>

      {/* MARKETS LIST */}
      {loading ? (
        <div className="bg-white/80 p-12 text-center rounded-3xl border border-[#2D4030]/10 shadow-xs flex flex-col items-center justify-center">
          <Loader2 className="w-6 h-6 text-[#2D4030] animate-spin mb-3" />
          <p className="text-xs font-bold text-[#2D4030]">Φόρτωση προγράμματος λαϊκών...</p>
        </div>
      ) : filteredMarkets.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-3xl border border-dashed border-gray-300">
          <p className="text-sm text-gray-500 font-medium">
            Δεν υπάρχουν καταχωρημένες λαϊκές για την κατηγορία{' '}
            <strong>
              {activeTab === 'markets' ? 'Συμβατικές Κορίνθου' : 'Βιολογικές Αθήνας'}
            </strong>
            .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredMarkets.map((market) => {
            const isToday = market.dayCode === todayCode;

            return (
              <div
                key={`${market.sourceTable}-${market.id}`}
                className={`bg-white p-5 sm:p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  market.isActive
                    ? isToday
                      ? 'border-[#E8A838] ring-2 ring-[#E8A838]/40 shadow-md'
                      : 'border-[#2D4030]/15 shadow-xs hover:shadow-md'
                    : 'border-dashed border-gray-300 bg-gray-50/60 opacity-60'
                }`}
              >
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

                  <div className="space-y-2.5 text-xs text-[#2D4030]/80 mb-6">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 shrink-0 text-[#2D4030]/70 mt-0.5" />
                      <div>
                        <strong className="font-bold text-[#2D4030] block">
                          {market.locationName || 'Δεν ορίστηκε τοποθεσία'}
                        </strong>
                        <span className="text-[#2D4030]/60 block">{market.address || '-'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 shrink-0 text-[#2D4030]/70" />
                      <span>
                        <strong>Ωράριο:</strong> {market.hours || '-'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 shrink-0 text-[#2D4030]/70" />
                      <span>
                        <strong>Πόστο:</strong>{' '}
                        <span className="font-bold text-[#C86D51]">{market.standInfo || '-'}</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {market.sourceTable === 'markets_v2' ? (
                        <span className="px-2.5 py-1 bg-green-100 text-green-800 text-[10px] font-extrabold uppercase rounded-lg flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Βιολογική Αθήνας
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-lg flex items-center gap-1">
                          <Wheat className="w-3 h-3" />
                          Συμβατική Κορίνθου
                        </span>
                      )}

                      {market.googleMapsUrl && (
                        <a
                          href={market.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <span>Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEditingMarket(market)}
                  className="w-full py-2.5 bg-[#2D4030] hover:bg-[#C86D51] text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Επεξεργασία Στοιχείων</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT MODAL */}
      {editingMarket && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
          onClick={() => setEditingMarket(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl border border-[#2D4030]/10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#2D4030]/10">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C86D51] block mb-0.5">
                  Επεξεργασία ({editingMarket.sourceTable === 'markets' ? 'Κορίνθου' : 'Αθήνας'})
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-[#2D4030]">
                  Λαϊκή: {editingMarket.day}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingMarket(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveMarket} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                  Ημέρα *
                </label>
                <select
                  value={editingMarket.dayCode}
                  onChange={(e) => {
                    const daysMap: Record<string, string> = {
                      mon: 'Δευτέρα',
                      tue: 'Τρίτη',
                      wed: 'Τετάρτη',
                      thu: 'Πέμπτη',
                      fri: 'Παρασκευή',
                      sat: 'Σάββατο',
                      sun: 'Κυριακή',
                    };
                    const code = e.target.value;
                    setEditingMarket({
                      ...editingMarket,
                      dayCode: code as Market['dayCode'],
                      day: daysMap[code] || 'Δευτέρα',
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] bg-[#FAF7F2]/50 font-bold"
                >
                  <option value="mon">Δευτέρα</option>
                  <option value="tue">Τρίτη</option>
                  <option value="wed">Τετάρτη</option>
                  <option value="thu">Πέμπτη</option>
                  <option value="fri">Παρασκευή</option>
                  <option value="sat">Σάββατο</option>
                  <option value="sun">Κυριακή</option>
                </select>
              </div>

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

              <div className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-2xl border border-[#2D4030]/10">
                <div>
                  <span className="text-xs font-bold block text-[#2D4030]">Ενεργή Ημέρα</span>
                  <span className="text-[10px] text-[#2D4030]/60">
                    Εμφάνιση στο πρόγραμμα πελατών
                  </span>
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

              <div className="flex gap-2 pt-4 border-t border-[#2D4030]/10">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 bg-[#2D4030] hover:bg-[#C86D51] disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{saving ? 'Αποθήκευση...' : 'Αποθήκευση Αλλαγών'}</span>
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