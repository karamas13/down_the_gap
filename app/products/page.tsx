import type { Metadata } from 'next';
import { ProductHero } from '@/components/products/ProductHero';
import { ProductsCatalog } from '@/components/products/ProductsCatalog';

export const metadata: Metadata = {
  title: 'Βιολογικά Προϊόντα Εποχής | Κάτω απο το Αυλάκι',
  description:
    'Ανακαλύψτε τη συλλογή μας από φρέσκα βιολογικά λαχανικά εποχής και αγνά προϊόντα απευθείας από το κτήμα μας.',
  keywords: [
    'βιολογικά προϊόντα',
    'βιολογικά λαχανικά',
    'προϊόντα εποχής',
    'βιολογική καλλιέργεια',
    'κάτω απο το αυλάκι',
    'αγροτικά προϊόντα',
  ],
  alternates: {
    canonical: 'https://katoapotoaylaki.gr/products',
  },
  openGraph: {
    title: 'Βιολογικά Προϊόντα Εποχής | Κάτω απο το Αυλάκι',
    description:
      'Αγνά βιολογικά λαχανικά εποχής απευθείας από τη γη μας.',
    url: 'https://katoapotoaylaki.gr/products',
    siteName: 'Κάτω απο το Αυλάκι',
    images: [
      {
        url: 'https://katoapotoaylaki.gr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Κάτω απο το Αυλάκι - Βιολογικά Προϊόντα',
      },
    ],
    locale: 'el_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Βιολογικά Προϊόντα & Φρούτα Εποχής | Κάτω απο το Αυλάκι',
    description:
      'Αγνά βιολογικά λαχανικά εποχής απευθείας από τη γη μας.',
    images: ['https://katoapotoaylaki.gr/og-image.png'],
  },
};

export default function ProductsPage() {
  // CollectionPage Schema for Google Catalog Indexing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Βιολογικά Προϊόντα - Κάτω απο το Αυλάκι',
    url: 'https://katoapotoaylaki.gr/products',
    description:
      'Κατάλογος φρέσκων βιολογικών λαχανικών εποχής.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Κάτω απο το Αυλάκι',
      url: 'https://katoapotoaylaki.gr',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#FAF7F2]">
        <ProductHero />
        <ProductsCatalog />
      </main>
    </>
  );
}