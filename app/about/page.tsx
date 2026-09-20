import { AboutHero } from '@/components/about/AboutHero';
import { CoreValues } from '@/components/about/CoreValues';
import { AboutGallery } from '@/components/about/AboutGallery';

export default function AboutPage() {
  return (
    <main className="bg-[#FAF7F2]">
      <AboutHero />
      <CoreValues />
      <AboutGallery />
    </main>
  );
}