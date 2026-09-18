// components/contact/ContactInfo.tsx
'use client';

import React from 'react';

export const ContactInfo = () => {
  return (
    <div className="bg-[#2D4030] text-[#F9F6F0] p-8 md:p-10 rounded-3xl h-full flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="font-serif text-3xl font-bold mb-6 text-[#F9F6F0]">
          Στοιχεία Φάρμας
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-[#E8A838] uppercase tracking-wider mb-1">
              Διεύθυνση
            </h3>
            <p className="text-[#F9F6F0]/90 text-base leading-relaxed">
              Οδός Πεννοούσι 1220,<br />
              Φανίννορο, 00 21500
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#E8A838] uppercase tracking-wider mb-1">
              Ώρες Επισκέψεων
            </h3>
            <p className="text-[#F9F6F0]/90 text-base leading-relaxed">
              Δευτ - Κυρ: 8:00 πμ - 5:00 μμ
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-[#E8A838] uppercase tracking-wider mb-1">
              Τηλέφωνο
            </h3>
            <p className="text-[#F9F6F0]/90 text-base leading-relaxed">
              (223) 500-8057
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-[#F9F6F0]/10 text-sm text-[#F9F6F0]/70">
        Είμαστε πάντα χαρούμενοι να σας υποδεχτούμε στη φάρμα μας!
      </div>
    </div>
  );
};