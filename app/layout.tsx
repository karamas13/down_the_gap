// app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'DownTheGap | Οικογενειακή Φάρμα',
  description: 'Φρέσκα βιολογικά προϊόντα απευθείας από τη φάρμα μας στο τραπέζι σας.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="el">
      <body className="bg-[#F9F6F0] text-[#2D4030] min-h-screen flex flex-col font-sans antialiased">
        <Navbar />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}