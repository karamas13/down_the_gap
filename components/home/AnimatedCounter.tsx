'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useInView } from 'framer-motion';

interface CounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export const AnimatedCounter = ({
  from = 0,
  to,
  suffix = '',
  prefix = '',
  duration = 2,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Αλλαγή margin σε θετικό/μηδενικό ώστε να πυροδοτείται αμέσως στα mobile
  const isInView = useInView(ref, { once: true, margin: '0px 0px -20px 0px' });
  const count = useMotionValue(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: 'easeOut',
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, count, to, duration, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
};