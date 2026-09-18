// app/page.tsx

import { HeroSection } from '@/components/home/HeroSection';
import { SeasonalFavorites } from '../components/home/SeasonalFavorites';
import { FarmToDoor } from '../components/home/FarmToDoor';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <SeasonalFavorites />
      <FarmToDoor />
    </div>
  );
}