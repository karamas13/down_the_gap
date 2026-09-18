// components/products/FilterPills.tsx
'use client';

import React from 'react';
import { CategoryType } from '../../types';

interface FilterPillsProps {
  activeCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

export const FilterPills: React.FC<FilterPillsProps> = ({ activeCategory, onSelectCategory }) => {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'Όλα τα Προϊόντα' },
    { id: 'root', label: 'Ριζώδη Λαχανικά' },
    { id: 'leafy', label: 'Φυλλώδη Λαχανικά' },
    { id: 'boxes', label: 'Εποχιακά Κουτιά' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
            activeCategory === cat.id
              ? 'bg-[#2D4030] text-[#F9F6F0]'
              : 'bg-white text-[#2D4030] hover:bg-[#2D4030]/10 border border-[#2D4030]/10'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};