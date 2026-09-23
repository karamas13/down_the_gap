'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { PageLoader } from './PageLoader';

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathname = useRef<string | null>(null);

  useEffect(() => {
    // 1. Αρχικό Mount
    if (prevPathname.current === null) {
      prevPathname.current = pathname;
      
      // Αν το αρχικό φόρτωμα είναι στην Αρχική ('/'), μην κάνεις τίποτα!
      if (pathname === '/') {
        setIsLoading(false);
        return;
      }
      
      // Αν το αρχικό φόρτωμα είναι σε άλλη σελίδα, εμφάνισε το loader
      setIsLoading(true);
      return;
    }

    // 2. Επόμενες πλοηγήσεις (όταν αλλάζει το URL)
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsLoading(true);
    }
  }, [pathname]);

  return (
    <>
      <PageLoader
        isLoading={isLoading}
        duration={1700}
        onComplete={() => setIsLoading(false)}
      />
      {children}
    </>
  );
};