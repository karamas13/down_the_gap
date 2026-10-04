import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { CoreValues } from '@/components/about/CoreValues';
import { AboutGallery } from '@/components/about/AboutGallery';

export const metadata: Metadata = {
  title: 'Η Ιστορία & Οι Αξίες μας | Κάτω απο το Αυλάκι - Βιολογική Καλλιέργεια',
  description:
    'Μάθετε περισσότερα για το Κάτω απο το Αυλάκι, την φιλοσοφία μας γύρω από τις βιολογικές καλλιέργειες και την αφοσίωσή μας στην παραγωγή αγνών, φρέσκων προϊόντων.',
  keywords: [
    'σχετικά με εμάς',
    'ιστορία φάρμας',
    'βιολογική καλλιέργεια',
    'αξίες',
    'κάτω απο το αυλάκι',
    'βιολογικά προϊόντα',
    'φυσικές μέθοδοι',
    'κόρινθος',
  ],
  alternates: {
    canonical: 'https://katoapotoaylaki.gr/about',
  },
  openGraph: {
    title: 'Η Ιστορία & Οι Αξίες μας | Κάτω απο το Αυλάκι',
    description:
      'Γνωρίστε τη φάρμα μας, τις αξίες μας και το πάθος μας για αγνή βιολογική καλλιέργεια.',
    url: 'https://katoapotoaylaki.gr/about',
    siteName: 'Κάτω απο το Αυλάκι',
    images: [
      {
        url: 'https://katoapotoaylaki.gr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Κάτω απο το Αυλάκι - Σχετικά με εμάς',
      },
    ],
    locale: 'el_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Η Ιστορία & Οι Αξίες μας | Κάτω απο το Αυλάκι',
    description:
      'Γνωρίστε τη φάρμα μας, τις αξίες μας και το πάθος μας για αγνή βιολογική καλλιέργεια.',
    images: ['https://katoapotoaylaki.gr/og-image.png'],
  },
};

export default function AboutPage() {
  // Structured Data (JSON-LD) for About Page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Σχετικά με εμάς - Κάτω απο το Αυλάκι',
    url: 'https://katoapotoaylaki.gr/about',
    description:
      'Η ιστορία, η φιλοσοφία και οι αξίες της βιολογικής καλλιέργειας Κάτω απο το Αυλάκι.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Κάτω απο το Αυλάκι',
      url: 'https://katoapotoaylaki.gr',
      logo: 'https://katoapotoaylaki.gr/images/MainLogo.avif',
      address: {
        '@type': 'PostalAddress',
        postalCode: '20100',
        addressCountry: 'GR',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[#FAF7F2]">
        <AboutHero />
        <CoreValues />
        <AboutGallery />
      </main>
    </>
  );
}