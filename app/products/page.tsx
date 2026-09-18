// app/products/page.tsx
'use client';

import React, { useState } from 'react';
import { FilterPills } from '../../components/products/FilterPills';
import { ProductCard } from '../../components/products/ProductCard';
import { FarmMap } from '../../components/products/FarmMap';
import { MOCK_PRODUCTS } from '../../data/mockProducts';
import { CategoryType } from '../../types';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');

  const filteredProducts = selectedCategory === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="font-serif text-4xl font-bold text-[#2D4030] mb-3">
          Ο Κατάλογος της Σοδειάς
        </h1>
        <p className="text-[#2D4030]/80">
          Επιλέξτε ανάμεσα στα πιο φρέσκα βιολογικά προϊόντα της ημέρας.
        </p>
      </div>

      <FilterPills
        activeCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <FarmMap />
    </div>
  );
}