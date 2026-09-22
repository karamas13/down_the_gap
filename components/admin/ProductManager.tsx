'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const ProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Search & Filter state για τη λίστα του admin
  const [searchQuery, setSearchQuery] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<'all' | 'summer' | 'winter'>('all');

  // Drag & drop dragover state
  const [isDragging, setIsDragging] = useState(false);

  // States για τη διαχείριση του αρχείου εικόνας
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Product>>({
    title: '',
    description: '',
    imageUrl: '',
    season: 'summer',
    isAvailable: true,
    category: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(
        data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          imageUrl: p.image_url,
          season: p.season,
          isAvailable: p.is_available,
          category: p.category,
        }))
      );
    }
  };

  // Process selected image file
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Παρακαλώ επιλέξτε ένα έγκυρο αρχείο εικόνας (PNG, JPG, WEBP).');
      return;
    }
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setForm((prev) => ({ ...prev, imageUrl: '' }));
  };

  // Upload εικόνας στο Supabase Storage
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Σφάλμα κατά το ανέβασμα της εικόνας:', error);
      alert('Αποτυχία ανεβάσματος εικόνας.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalImageUrl = form.imageUrl || '';

    if (selectedFile) {
      const uploadedUrl = await uploadImage(selectedFile);
      if (!uploadedUrl) return;
      finalImageUrl = uploadedUrl;
    }

    if (!finalImageUrl) {
      alert('Παρακαλώ προσθέστε μια εικόνα για το προϊόν.');
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      image_url: finalImageUrl,
      season: form.season,
      is_available: form.isAvailable,
      category: form.category,
    };

    if (editingProductId) {
      await supabase.from('products').update(payload).eq('id', editingProductId);
    } else {
      await supabase.from('products').insert([payload]);
    }

    resetForm();
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setForm(product);
    setImagePreview(product.imageUrl);
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το προϊόν;')) {
      await supabase.from('products').delete().eq('id', id);
      if (editingProductId === id) resetForm();
      fetchProducts();
    }
  };

  const resetForm = () => {
    setEditingProductId(null);
    setSelectedFile(null);
    setImagePreview(null);
    setForm({
      title: '',
      description: '',
      imageUrl: '',
      season: 'summer',
      isAvailable: true,
      category: '',
    });
  };

  // Metrics
  const stats = useMemo(() => {
    return {
      total: products.length,
      available: products.filter((p) => p.isAvailable).length,
      summer: products.filter((p) => p.season === 'summer').length,
      winter: products.filter((p) => p.season === 'winter').length,
    };
  }, [products]);

  // Filtered Products for Admin List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSeason = seasonFilter === 'all' || p.season === seasonFilter;
      return matchesSearch && matchesSeason;
    });
  }, [products, searchQuery, seasonFilter]);

  return (
    <div className="space-y-6 sm:space-y-8 text-[#2D4030]">

      {/* QUICK STATS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Συνολο</span>
            <span className="text-xl sm:text-2xl font-serif font-black">{stats.total}</span>
          </div>
          <span className="text-xl sm:text-2xl">🧺</span>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Διαθεσιμα</span>
            <span className="text-xl sm:text-2xl font-serif font-black text-emerald-700">{stats.available}</span>
          </div>
          <span className="text-xl sm:text-2xl">🌱</span>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Καλοκαιρινα</span>
            <span className="text-xl sm:text-2xl font-serif font-black text-[#C86D51]">{stats.summer}</span>
          </div>
          <span className="text-xl sm:text-2xl">☀️</span>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#2D4030]/10 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#2D4030]/60 block">Χειμερινα</span>
            <span className="text-xl sm:text-2xl font-serif font-black text-blue-900">{stats.winter}</span>
          </div>
          <span className="text-xl sm:text-2xl">❄️</span>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* FORM SIDEBAR (Sticky ONLY on lg screens) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-7 rounded-3xl border border-[#2D4030]/10 shadow-sm lg:sticky lg:top-6">
          <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#2D4030]/10">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C86D51] block mb-0.5">
                {editingProductId ? 'Επεξεργασια' : 'Δημιουργια'}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-black text-[#2D4030]">
                {editingProductId ? 'Επεξεργασία Προϊόντος' : 'Νέο Προϊόν'}
              </h2>
            </div>
            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors"
              >
                + Νέο
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 sm:space-y-5">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                Τίτλος Προϊόντος *
              </label>
              <input
                type="text"
                required
                placeholder="π.χ. Ντομάτες Βιολογικές"
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030] bg-[#FAF7F2]/40"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                Περιγραφή *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Σύντομη περιγραφή γεύσης, καλλιέργειας ή προέλευσης..."
                value={form.description || ''}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030] bg-[#FAF7F2]/40 resize-none"
              />
            </div>

            {/* DRAG & DROP IMAGE UPLOADER */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                Εικόνα Προϊόντος *
              </label>
              
              {imagePreview || form.imageUrl ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#2D4030]/15 bg-[#FAF7F2] p-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={imagePreview || form.imageUrl}
                      alt="Preview"
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-[#2D4030]/10 shrink-0"
                    />
                    <div className="truncate">
                      <span className="text-xs font-bold block truncate text-[#2D4030]">
                        {selectedFile ? selectedFile.name : 'Επιλεγμένη εικόνα'}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        {selectedFile ? '✓ Έτοιμη για ανέβασμα' : '✓ Τρέχουσα εικόνα'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold transition-colors shrink-0"
                    title="Αφαίρεση εικόνας"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#C86D51] bg-[#C86D51]/5 scale-[0.99]'
                      : 'border-[#2D4030]/20 hover:border-[#2D4030]/40 bg-[#FAF7F2]/40'
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="space-y-1.5 pointer-events-none">
                    <div className="w-9 h-9 rounded-full bg-[#2D4030]/10 text-[#2D4030] flex items-center justify-center mx-auto text-base">
                      📷
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#2D4030]">
                        Σύρετε την εικόνα εδώ ή <span className="text-[#C86D51] underline">επιλέξτε αρχείο</span>
                      </p>
                      <p className="text-[10px] text-[#2D4030]/50 mt-0.5">PNG, JPG, WEBP έως 5MB</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Category Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                Κατηγορία
              </label>
              <input
                type="text"
                placeholder="π.χ. Λαχανικά, Φρούτα, Μαρμελάδες"
                value={form.category || ''}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2D4030]/15 text-sm focus:outline-none focus:border-[#2D4030] focus:ring-1 focus:ring-[#2D4030] bg-[#FAF7F2]/40"
              />
            </div>

            {/* VISUAL SEASON SELECTOR (PILLS) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#2D4030]/80">
                Εποχή
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, season: 'summer' })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    form.season === 'summer'
                      ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-sm'
                      : 'bg-[#FAF7F2]/60 text-[#2D4030]/70 border-[#2D4030]/15 hover:border-[#2D4030]/30'
                  }`}
                >
                  <span>☀️</span>
                  <span>Καλοκαίρι</span>
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, season: 'winter' })}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    form.season === 'winter'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                      : 'bg-[#FAF7F2]/60 text-[#2D4030]/70 border-[#2D4030]/15 hover:border-[#2D4030]/30'
                  }`}
                >
                  <span>❄️</span>
                  <span>Χειμώνας</span>
                </button>
              </div>
            </div>

            {/* BORDER-PERFECT TOGGLE SWITCH FOR AVAILABILITY */}
            <div className="pt-2 flex items-center justify-between p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#2D4030]/10 gap-3">
              <div className="pr-2">
                <span className="text-xs font-bold block text-[#2D4030]">Κατάσταση Διαθεσιμότητας</span>
                <span className="text-[11px] text-[#2D4030]/60 block mt-0.5">
                  {form.isAvailable ? '🌱 Εμφανίζεται στο κατάστημα' : '⏳ Εκτός διαθεσιμότητας'}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={form.isAvailable ?? true}
                onClick={() => setForm({ ...form, isAvailable: !form.isAvailable })}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  form.isAvailable ? 'bg-emerald-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    form.isAvailable ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* SUBMIT & CANCEL BUTTONS */}
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 py-3 bg-[#2D4030] hover:bg-[#C86D51] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Ανέβασμα...</span>
                  </>
                ) : editingProductId ? (
                  'Ενημέρωση Προϊόντος'
                ) : (
                  '+ Προσθήκη Προϊόντος'
                )}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs sm:text-sm transition-colors"
                >
                  Ακύρωση
                </button>
              )}
            </div>
          </form>
        </div>

        {/* PRODUCT LIST SECTION */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-5">
          
          {/* SEARCH & FILTER CONTROLS */}
          <div className="bg-white p-3.5 sm:p-4 rounded-3xl border border-[#2D4030]/10 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Αναζήτηση στη λίστα..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#2D4030]/15 focus:outline-none focus:border-[#2D4030]"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#2D4030]/40">🔍</span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-[#2D4030]/10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setSeasonFilter('all')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  seasonFilter === 'all' ? 'bg-[#2D4030] text-white shadow-xs' : 'text-[#2D4030]/60'
                }`}
              >
                Όλα
              </button>
              <button
                type="button"
                onClick={() => setSeasonFilter('summer')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  seasonFilter === 'summer' ? 'bg-[#C86D51] text-white shadow-xs' : 'text-[#2D4030]/60'
                }`}
              >
                ☀️ Θερινά
              </button>
              <button
                type="button"
                onClick={() => setSeasonFilter('winter')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-center ${
                  seasonFilter === 'winter' ? 'bg-blue-900 text-white shadow-xs' : 'text-[#2D4030]/60'
                }`}
              >
                ❄️ Χειμερινά
              </button>
            </div>
          </div>

          {/* LIST OF CARDS */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white/80 p-8 sm:p-12 text-center rounded-3xl border border-[#2D4030]/10">
              <span className="text-3xl block mb-2">🌿</span>
              <p className="font-serif font-bold text-lg text-[#2D4030]">Δεν βρέθηκαν προϊόντα</p>
              <p className="text-xs text-[#2D4030]/60 mt-1">
                Δοκιμάστε να αλλάξετε τους όρους αναζήτησης ή να προσθέσετε ένα νέο προϊόν.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((p) => {
                const isBeingEdited = editingProductId === p.id;

                return (
                  <div
                    key={p.id}
                    className={`bg-white p-4 rounded-3xl border transition-all duration-300 flex flex-col justify-between hover:shadow-md ${
                      isBeingEdited
                        ? 'border-[#C86D51] ring-2 ring-[#C86D51]/30 shadow-md'
                        : 'border-[#2D4030]/10 hover:border-[#2D4030]/30'
                    }`}
                  >
                    <div>
                      {/* Image + Badges Header */}
                      <div className="relative h-36 sm:h-40 w-full rounded-2xl overflow-hidden bg-[#2D4030]/5 mb-3">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1 pointer-events-none">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold backdrop-blur-md shadow-xs ${
                              p.isAvailable
                                ? 'bg-white/90 text-emerald-800'
                                : 'bg-[#1E2C22]/85 text-amber-300'
                            }`}
                          >
                            {p.isAvailable ? '🌱 Διαθέσιμο' : '⏳ Εκτός'}
                          </span>
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                            {p.season === 'summer' ? '☀️ Θερινό' : '❄️ Χειμερινό'}
                          </span>
                        </div>
                      </div>

                      {/* Title & Info */}
                      <div className="space-y-1 px-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-serif font-bold text-base text-[#2D4030] truncate">
                            {p.title}
                          </h3>
                          {p.category && (
                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#2D4030]/10 text-[#2D4030] rounded-md shrink-0">
                              {p.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#2D4030]/70 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-3 mt-3 border-t border-[#2D4030]/10 flex items-center justify-end gap-2 px-1">
                      <button
                        onClick={() => handleEdit(p)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          isBeingEdited
                            ? 'bg-[#C86D51] text-white'
                            : 'bg-[#2D4030]/10 hover:bg-[#2D4030] hover:text-white text-[#2D4030]'
                        }`}
                      >
                        <span>✏️</span>
                        <span>{isBeingEdited ? 'Επεξεργάζεται' : 'Επεξεργασία'}</span>
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Διαγραφή"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};