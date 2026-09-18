// components/products/ProductCard.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#2D4030]/10 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
          <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
          {product.isFreshPicked && (
            <span className="absolute top-3 left-3 bg-[#E8A838] text-[#2D4030] text-xs font-bold px-3 py-1 rounded-full shadow">
              Σοδειά Σήμερα
            </span>
          )}
        </div>
        <h3 className="font-serif text-lg font-bold text-[#2D4030] mb-1">{product.name}</h3>
        <p className="text-xs text-[#2D4030]/70 mb-4">{product.description}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-[#C86D51]">
            €{product.price.toFixed(2)} <span className="text-xs font-normal text-[#2D4030]/60">/ {product.unit}</span>
          </span>

          <div className="flex items-center border border-[#2D4030]/20 rounded-lg overflow-hidden bg-[#F9F6F0]">
            <button
              onClick={decrement}
              className="px-2.5 py-1 text-[#2D4030] hover:bg-[#2D4030]/10 transition-colors font-bold"
            >
              -
            </button>
            <span className="px-3 text-sm font-bold text-[#2D4030]">{quantity}</span>
            <button
              onClick={increment}
              className="px-2.5 py-1 text-[#2D4030] hover:bg-[#2D4030]/10 transition-colors font-bold"
            >
              +
            </button>
          </div>
        </div>

        <button className="w-full py-3 bg-[#E8A838] hover:bg-[#e09b25] text-[#2D4030] font-bold rounded-xl text-sm transition-colors shadow">
          Προσθήκη στο Καλάθι
        </button>
      </div>
    </div>
  );
};