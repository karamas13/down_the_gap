// components/contact/InquiryForm.tsx
'use client';

import React, { useState } from 'react';
import { InquiryFormData } from '../../types';

export const InquiryForm = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    inquiryType: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#2D4030]/10">
      {submitted ? (
        <div className="text-center py-12">
          <h3 className="font-serif text-2xl font-bold text-[#2D4030] mb-2">
            Ευχαριστούμε για το μήνυμά σας!
          </h3>
          <p className="text-[#2D4030]/80 mb-6">
            Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατόν.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({ fullName: '', email: '', inquiryType: 'general', message: '' });
            }}
            className="px-6 py-2.5 bg-[#2D4030] text-[#F9F6F0] rounded-xl text-sm font-bold"
          >
            Νέο Μήνυμα
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#2D4030] mb-2">
              Ονοματεπώνυμο
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#2D4030]/20 bg-[#F9F6F0]/50 focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2D4030] mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#2D4030]/20 bg-[#F9F6F0]/50 focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2D4030] mb-2">
              Τύπος Ερώτησης
            </label>
            <select
              value={formData.inquiryType}
              onChange={(e) =>
                setFormData({ ...formData, inquiryType: e.target.value as InquiryFormData['inquiryType'] })
              }
              className="w-full px-4 py-3 rounded-xl border border-[#2D4030]/20 bg-[#F9F6F0]/50 focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
            >
              <option value="general">Γενική Ερώτηση</option>
              <option value="order">Παραγγελία</option>
              <option value="visit">Επίσκεψη</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#2D4030] mb-2">
              Μήνυμα
            </label>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[#2D4030]/20 bg-[#F9F6F0]/50 focus:outline-none focus:ring-2 focus:ring-[#C86D51]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#C86D51] hover:bg-[#b55c42] text-[#F9F6F0] font-bold text-lg rounded-xl transition-colors shadow-md"
          >
            Αποστολή Μηνύματος
          </button>
        </form>
      )}
    </div>
  );
};