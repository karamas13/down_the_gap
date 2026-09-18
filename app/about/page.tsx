// app/about/page.tsx
import React from 'react';
import { Timeline } from '../../components/about/Timeline';
import { SustainablePractices } from '../../components/about/SustainablePractices';
import { FarmersGrid } from '../../components/about/FarmersGrid';

export default function AboutPage() {
  return (
    <div className="py-12">
      <section className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2D4030] mb-4">
          Οι Ρίζες και η Κληρονομιά μας
        </h1>
        <p className="text-lg text-[#2D4030]/80 max-w-2xl mx-auto leading-relaxed">
          Μια οικογενειακή παράδοση τριών γενεών αφιερωμένη στην αγνή καλλιέργεια, το σεβασμό στη φύση και την προσφορά των πιο ποιοτικών προϊόντων.
        </p>
      </section>

      <Timeline />
      <SustainablePractices />
      <FarmersGrid />
    </div>
  );
}