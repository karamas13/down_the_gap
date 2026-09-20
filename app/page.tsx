// app/page.tsx

import { HeroSection } from '@/components/home/HeroSection';
import { MarketArray } from '../components/home/MarketArray';
import { FarmToDoor } from '../components/home/FarmToDoor';
import { SeasonalProducts } from '../components/home/SeasonalProducts';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FarmToDoor />
      <MarketArray />      
      <SeasonalProducts />      
    </div>
  );
}