import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { MarketArray } from '@/components/home/MarketArray';
import { FarmToDoor } from '@/components/home/FarmToDoor';
import { SeasonalProducts } from '@/components/home/SeasonalProducts';

export const metadata: Metadata = {
  title: 'Κάτω απο το Αυλάκι | Βιολογικά Προϊόντα & Καλλιέργειες',
  description:
    'Ανακαλύψτε φρέσκα βιολογικά προϊόντα απευθείας από το χωράφι μας στο τραπέζι σας. Υγιεινά, αγνά λαχανικά εποχής βιολογικής καλλιέργειας.',
  keywords: [
    'βιολογικά προϊόντα',
    'φρέσκα λαχανικά',
    'βιολογικές καλλιέργειες',
    'φάρμα',
    'katoapotoaylaki',
    'φρούτα εποχής',
    'κάτω απο το αυλάκι',
    'κόρινθος',
    'αθήνα',
    'βιολογικές αγορές',
    'kato apo to aylaki',
  ],
  alternates: {
    canonical: 'https://katoapotoaylaki.gr',
  },
  openGraph: {
    title: 'Κάτω απο το Αυλάκι | Φρέσκα Βιολογικά Προϊόντα',
    description:
      'Αγνά, φρέσκα βιολογικά προϊόντα κατευθείαν από τη γη μας στο τραπέζι σας.',
    url: 'https://katoapotoaylaki.gr',
    siteName: 'Κάτω απο το Αυλάκι',
    images: [
      {
        url: 'https://katoapotoaylaki.gr/og-image.png', // Must be PNG or JPG (1200x630)
        width: 1200,
        height: 630,
        alt: 'Κάτω απο το Αυλάκι - Βιολογικές Καλλιέργειες',
      },
    ],
    locale: 'el_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Κάτω απο το Αυλάκι | Φρέσκα Βιολογικά Προϊόντα',
    description:
      'Αγνά, φρέσκα βιολογικά προϊόντα κατευθείαν από τη γη μας στο τραπέζι σας.',
    images: ['https://katoapotoaylaki.gr/og-image.png'],
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Κάτω απο το Αυλάκι',
    url: 'https://katoapotoaylaki.gr',
    logo: 'https://katoapotoaylaki.gr/images/MainLogo.avif',
    image: 'https://katoapotoaylaki.gr/og-image.png',
    description:
      'Φρέσκα βιολογικά προϊόντα απευθείας από το χωράφι μας στο τραπέζι σας.',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      postalCode: '20100',
      addressCountry: 'GR',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        <HeroSection />
        <FarmToDoor />
        <MarketArray />
        <SeasonalProducts />
      </main>
    </>
  );
}