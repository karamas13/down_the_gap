'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { GalleryItem } from '@/components/about/AboutGallery';

export const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [alt, setAlt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  // Cleanup object URL when preview state changes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('display_order', { ascending: true })
        .order('id', { ascending: false });

      if (error) throw error;
      if (data) setItems(data);
    } catch (err) {
      console.error('Error loading gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCaption('');
    setAlt('');
    setFile(null);
    setPreviewUrl(null);
  };

  const handleEditClick = (item: GalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCaption(item.caption || '');
    setAlt(item.alt || '');
    setFile(null);
    setPreviewUrl(item.src); // Προβολή της υπάρχουσας εικόνας
    
    // Scroll ομαλά στη φόρμα για ευκολία
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Παρακαλώ συμπληρώστε τίτλο.');

    try {
      setUploading(true);
      let imageUrl = '';

      // Upload New Image
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('gallery')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('gallery')
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      if (editingId) {
        // UPDATE Existing Entry
        const updateData: Partial<GalleryItem> = {
          title,
          caption,
          alt: alt || title,
        };
        if (imageUrl) updateData.src = imageUrl;

        const { error } = await supabase
          .from('gallery_items')
          .update(updateData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        // INSERT New Entry
        if (!imageUrl) return alert('Παρακαλώ επιλέξτε μια εικόνα.');

        const { error } = await supabase.from('gallery_items').insert([
          {
            title,
            caption,
            alt: alt || title,
            src: imageUrl,
            display_order: items.length + 1,
          },
        ]);

        if (error) throw error;
      }

      resetForm();
      fetchItems();
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Σφάλμα κατά την αποθήκευση.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε τη φωτογραφία "${item.title}";`)) return;

    try {
      const { error } = await supabase.from('gallery_items').delete().eq('id', item.id);
      if (error) throw error;

      if (item.src.includes('/storage/v1/object/public/gallery/')) {
        const path = item.src.split('/storage/v1/object/public/gallery/')[1];
        if (path) {
          await supabase.storage.from('gallery').remove([path]);
        }
      }

      if (editingId === item.id) resetForm();
      fetchItems();
    } catch (err) {
      console.error('Error deleting item:', err);
      alert('Σφάλμα κατά τη διαγραφή.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#2D4030]">
            Διαχείριση Gallery
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Προσθέστε, επεξεργαστείτε ή διαγράψτε φωτογραφίες από το φωτογραφικό υλικό της ιστοσελίδας.
          </p>
        </div>
        <div className="bg-[#2D4030]/10 px-4 py-2 rounded-xl text-[#2D4030] font-bold text-xs self-start sm:self-auto">
          Σύνολο: {items.length} Εικόνες
        </div>
      </div>

      {/* Main Grid Layout: Form Left, Gallery Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm sticky top-6">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              {editingId ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Επεξεργασία Φωτογραφίας
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D4030]"></span>
                  Προσθήκη Νέας Φωτογραφίας
                </>
              )}
            </h3>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 underline"
              >
                + Νέα Καταχώρηση
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Image Upload Area / Preview */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Εικόνα {editingId ? '(Προαιρετικό)' : '*'}
              </label>

              <div className="relative group border-2 border-dashed border-gray-300 hover:border-[#2D4030] rounded-xl p-4 transition-all text-center bg-gray-50/50 hover:bg-gray-50">
                {previewUrl ? (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold bg-black/60 px-3 py-1.5 rounded-lg">
                        Αλλαγή Εικόνας
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center cursor-pointer">
                    <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs font-semibold text-gray-600">
                      Κάντε κλικ ή σύρετε την εικόνα εδώ
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">PNG, JPG, WEBP έως 5MB</p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  required={!editingId && !previewUrl}
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Τίτλος *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#2D4030] focus:border-transparent outline-none transition-all"
                placeholder="π.χ. Συγκομιδή Λαχανικών"
                required
              />
            </div>

            {/* Caption */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Λεζάντα (Περιγραφή)
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#2D4030] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Σύντομη περιγραφή που εμφανίζεται κάτω από την εικόνα..."
              />
            </div>

            {/* Alt Text */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Alt Text <span className="text-gray-400 font-normal lowercase">(για προσβασιμότητα & SEO)</span>
              </label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#2D4030] focus:border-transparent outline-none transition-all"
                placeholder="Αφήστε κενό για χρήση του τίτλου"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 py-3 bg-[#2D4030] text-white font-bold rounded-xl text-sm hover:bg-[#2D4030]/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {uploading && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {uploading ? 'Αποθήκευση...' : editingId ? 'Ενημέρωση Φωτογραφίας' : 'Προσθήκη στο Gallery'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-all"
                >
                  Ακύρωση
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Gallery Cards Display */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500 font-medium">
              Φόρτωση εικόνων...
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center text-gray-500">
              Δεν έχουν προστεθεί ακόμα εικόνες στο Gallery.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item) => {
                const isEditingThis = editingId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col justify-between group ${
                      isEditingThis
                        ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Image Preview */}
                    <div className="relative w-full h-44 bg-gray-100 overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt || item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isEditingThis && (
                        <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow">
                          Υπό Επεξεργασία
                        </div>
                      )}
                    </div>

                    {/* Content Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                          {item.title}
                        </h4>
                        {item.caption ? (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                            {item.caption}
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400 italic mt-1">Χωρίς λεζάντα</p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="flex-1 py-1.5 px-3 bg-gray-100 hover:bg-[#2D4030] text-gray-700 hover:text-white font-bold text-xs rounded-lg transition-colors text-center"
                        >
                          Επεξεργασία
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-lg transition-colors"
                          title="Διαγραφή"
                        >
                          Διαγραφή
                        </button>
                      </div>
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