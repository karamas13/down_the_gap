import { ProductHero } from '../../components/products/ProductHero';
import { ProductsCatalog } from '@/components/products/ProductsCatalog';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <ProductHero />
      <ProductsCatalog />
    </main>
  );
}