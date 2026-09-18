'use client';


import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

import React from 'react';

interface CounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export const AnimatedCounter = ({ from = 0, to, suffix = '', prefix = '', duration = 2 }: CounterProps) => {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.floor(latest)}${suffix}`);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};