'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Aποτυχία σύνδεσης: Ελέγξτε τα στοιχεία σας.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-[#2D4030]/10 shadow-xl">
        <h1 className="font-serif text-3xl font-bold text-[#2D4030] text-center mb-6">
          Admin Login
        </h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2D4030]/70 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D4030]/20 focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#2D4030]/70 mb-1">Κωδικός</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-[#2D4030]/20 focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#2D4030] text-white font-bold rounded-xl hover:bg-[#C86D51] transition-colors"
          >
            {loading ? 'Σύνδεση...' : 'Είσοδος'}
          </button>
        </form>
      </div>
    </div>
  );
}