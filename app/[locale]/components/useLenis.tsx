'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/gsap';
import gsap from 'gsap';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis
    const instance = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    setLenis(instance);

    // Connect to ScrollTrigger
    instance.on('scroll', ScrollTrigger.update);

    // Integrator function for ticker
    const tick = (time: number) => {
      instance.raf(time * 1000);
    };

    // Integrate with GSAP ticker
    gsap.ticker.add(tick);

    // Disable lag smoothing for GSAP ScrollTrigger sync
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      instance.destroy();
      gsap.ticker.remove(tick);
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
