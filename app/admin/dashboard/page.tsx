'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ProductManager } from '@/components/admin/ProductManager';
import { MarketManager } from '@/components/admin/MarketManager';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'markets'>('products');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center font-bold text-[#2D4030]">
        Φόρτωση Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D4030]">
      {/* Top Navigation */}
      <header className="bg-[#2D4030] text-white px-8 py-5 flex items-center justify-between shadow-md">
        <h1 className="font-serif text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#C86D51] hover:bg-[#b05a40] rounded-xl text-xs font-bold transition-colors"
        >
          Αποσύνδεση
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 border-b border-[#2D4030]/10 pb-4">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'products'
                ? 'bg-[#2D4030] text-white shadow-sm'
                : 'bg-white text-[#2D4030]/70 hover:bg-[#2D4030]/10'
            }`}
          >
            Διαχείριση Προϊόντων
          </button>
          <button
            onClick={() => setActiveTab('markets')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'markets'
                ? 'bg-[#2D4030] text-white shadow-sm'
                : 'bg-white text-[#2D4030]/70 hover:bg-[#2D4030]/10'
            }`}
          >
            Πρόγραμμα Λαϊκών
          </button>
        </div>

        {/* Tab Content Components */}
        {activeTab === 'products' ? <ProductManager /> : <MarketManager />}
      </main>
    </div>
  );
}