// app/contact/page.tsx
import React from 'react';
import { ContactInfo } from '../../components/contact/ContactInfo';
import { InquiryForm } from '../../components/contact/InquiryForm';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-4xl font-bold text-[#2D4030] mb-3">
          Επικοινωνήστε Μαζί μας
        </h1>
        <p className="text-[#2D4030]/80">
          Έχετε απορίες για τα προϊόντα ή θέλετε να επισκεφθείτε τη φάρμα μας; Θα χαρούμε να σας εξυπηρετήσουμε.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <ContactInfo />
        <InquiryForm />
      </div>
    </div>
  );
}