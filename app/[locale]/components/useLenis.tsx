'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '@/lib/gsap';
import gsap from 'gsap';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Integrator function for ticker
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Integrate with GSAP ticker
    gsap.ticker.add(tick);

    // Disable lag smoothing for GSAP ScrollTrigger sync
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
