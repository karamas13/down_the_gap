import type { Metadata } from 'next';
import { FlashCards } from '@/components/contact/FlashCards';
import { ContactInfo } from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Επικοινωνία | Κάτω απο το Αυλάκι - Βιολογικές Καλλιέργειες',
  description:
    'Επικοινωνήστε μαζί μας για πληροφορίες ή απορίες σχετικά με τις καλλιέργειές μας.',
  keywords: [
    'επικοινωνία',
    'κάτω απο το αυλάκι',
    'βιολογικά προϊόντα',
    'κόρινθος',
    'αθήνα',    
    'βιολογικές καλλιέργειες',
  ],
  alternates: {
    canonical: 'https://katoapotoaylaki.gr/contact',
  },
  openGraph: {
    title: 'Επικοινωνία | Κάτω απο το Αυλάκι',
    description:
      'Στείλτε μας το μήνυμά σας ή βρείτε τα στοιχεία επικοινωνίας μας.',
    url: 'https://katoapotoaylaki.gr/contact',
    siteName: 'Κάτω απο το Αυλάκι',
    images: [
      {
        url: 'https://katoapotoaylaki.gr/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Κάτω απο το Αυλάκι - Επικοινωνία',
      },
    ],
    locale: 'el_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Επικοινωνία | Κάτω απο το Αυλάκι',
    description:
      'Στείλτε μας το μήνυμά σας ή βρείτε τα στοιχεία επικοινωνίας μας.',
    images: ['https://katoapotoaylaki.gr/og-image.png'],
  },
};

export default function ContactPage() {
  // Structured Data (JSON-LD) for Contact Page & Local SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Επικοινωνία - Κάτω απο το Αυλάκι',
    url: 'https://katoapotoaylaki.gr/contact',
    description:
      'Επικοινωνήστε με το Κάτω απο το Αυλάκι για πληροφορίες.',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'Κάτω απο το Αυλάκι',
      url: 'https://katoapotoaylaki.gr',
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
      <main className="min-h-screen bg-[#FAF7F2]">
        {/* Header Banner */}
        <section className="py-16 bg-[#2D4030] text-[#FAF7F2] text-center border-b border-white/10 mt-20">
          <h1 className="font-serif text-4xl sm:text-6xl font-black">
            Επικοινωνία
          </h1>
          <p className="text-sm text-[#FAF7F2]/80 mt-3 font-light max-w-md mx-auto">
            Θέλετε να μάθετε περισσότερα για τους καρπούς μας ή την καλλιέργειά
            μας; Στείλτε μας το μήνυμά σας.
          </p>
        </section>

        {/* Component 1: Interactive Flashcard Form */}
        <FlashCards />

        {/* Component 2: Direct Contact Information */}
        <ContactInfo />
      </main>
    </>
  );
}