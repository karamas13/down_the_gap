'use client';

import Image from 'next/image';

export const AboutHero = () => {
  return (
    <section className="relative h-screen min-h-150 flex items-center justify-center bg-[#121B15] text-[#FAF7F2] overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* LCP Optimized Background Image */}
        <Image
          src="/images/PepperBackground.avif"
          alt="DownTheGap Organic Farm"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75} 
          placeholder="blur"          
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMyRDQwMzAiLz48L3N2Zz4="
          className="object-cover object-center"
        />

        {/* Base Dark Tint Overlay */}
        <div className="absolute inset-0 bg-[#121B15]/60 mix-blend-multiply" />

        {/* Directional Radial/Linear Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#121B15]/10 via-[#19241C]/10 to-[#121B15]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10 text-center">
        {/* Main Headline (Standard HTML tag for instant LCP paint) */}
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-8 sm:mb-10 mt-20 sm:mt-40">
          Από τη γη μας στο τραπέζι σας με σεβασμό{' '}
          <span className="text-transparent tracking-tight bg-clip-text bg-linear-to-r from-yellow-200 via-red-400 to-emerald-400">
            στη φύση και την παράδοση.
          </span>
        </h1>

        {/* LCP Target Element: Removed opacity/delay to trigger instant paint in Lighthouse */}
        <p className="text-base sm:text-xl text-[#FAF7F2]/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-sm">
          Η οικογένεια <strong className="font-semibold text-white">Γκότζη</strong>, γεννημένη και μεγαλωμένη στην πανέμορφη Κόρινθο και στην ορεινή Κορινθία, (Κάτω από το Αυλάκι) έχει βαθιές ρίζες στην αγροτική παραγωγή. Από γενιά σε γενιά, για πάνω από 70 χρόνια, ασχολούμαστε με την ολοκληρωμένη καλλιέργεια και πλέον, εδώ και 8 χρόνια, έχουμε επενδύσει με πάθος και αφοσίωση στη βιολογική παραγωγή.
        </p>
      </div>
    </section>
  );
};