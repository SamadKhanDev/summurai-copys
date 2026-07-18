'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap';
import RingsCanvas from './RingsCanvas';
import AvatarStack from './AvatarStack';
import { ArrowRight } from 'lucide-react';

export default function RotatingRingsHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const progressRef = useRef(0);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // GSAP ScrollTrigger setup
  useGSAP(() => {
    if (prefersReducedMotion) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=150%', // scrub distance
      pin: true, // pin the section
      scrub: 1, // smooth catch-up
      onUpdate: (self: any) => {
        progressRef.current = self.progress;
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  // Geometry calculations for attaching text content to the circular arcs
  // Center of rotation is aligned with the 3D center at X = 50vw, Y = 0px
  // Radius R set to 39.5vh to place the text directly below and wrapping the bottom edge of the outer circle (1.66 units) by default
  const radius = 39.5; // in vh units

  // Block 1 (Intro) angle sweeps from 90 (bottom center) to 0 (far right)
  const angle1 = prefersReducedMotion ? 90 : 90 - progress * 90;
  const rad1 = (angle1 * Math.PI) / 180;
  const x1 = Math.cos(rad1) * radius;
  const y1 = Math.sin(rad1) * radius;
  const opacity1 = prefersReducedMotion ? 1 : Math.max(0, 1 - Math.abs(angle1 - 90) / 38);

  // Block 2 (Reveal details) angle sweeps from 180 (far left) to 90 (bottom center)
  const angle2 = 180 - progress * 90;
  const rad2 = (angle2 * Math.PI) / 180;
  const x2 = Math.cos(rad2) * radius;
  const y2 = Math.sin(rad2) * radius;
  const opacity2 = prefersReducedMotion ? 0 : Math.max(0, 1 - Math.abs(angle2 - 90) / 38);

  // Entrance variants on mount
  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#050505] text-white font-sans"
    >
      {/* 3D background rings */}
      <RingsCanvas progressRef={progressRef} />

      {/* Subtle Grid overlay for background texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10" />

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full h-full"
      >
        {/* Intro Block (Primary Hero) - Attached to the bottom edge of the circle */}
        <motion.div
          style={{
            position: 'absolute',
            left: '50%',
            top: '-4.5vh',
            transform: `translate(calc(-50% + ${x1}vh), calc(-50% + ${y1}vh))`,
            opacity: opacity1,
            pointerEvents: opacity1 < 0.15 ? 'none' : 'auto',
          }}
          className="w-full max-w-xl px-6 text-center flex flex-col items-center justify-center transition-all duration-75"
        >
          {/* Avatar stack */}
          <AvatarStack />

          <motion.h1
            className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight max-w-xl leading-[1.2] mb-4 text-white"
          >
            Direct access to expert talent
          </motion.h1>

          <motion.p
            className="text-white/50 text-xs md:text-sm max-w-md mb-6 font-light leading-relaxed px-2"
          >
            You don't deal with account managers; you speak directly to the creatives solving your problem. With every project guided by senior leadership, you get the firepower of a full agency team without the administrative bloat.
          </motion.p>

          <div>
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              className="group flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.08] bg-[#0d0d0d]/80 hover:bg-zinc-900/90 text-zinc-200 hover:text-white text-xs font-medium transition-all duration-300 shadow-xl"
            >
              Meet the makers
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>

        {/* Reveal Block (Secondary Content) - Attached to the bottom edge of the circle */}
        {!prefersReducedMotion && (
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '-4.5vh',
              transform: `translate(calc(-50% + ${x2}vh), calc(-50% + ${y2}vh))`,
              opacity: opacity2,
              pointerEvents: opacity2 < 0.15 ? 'none' : 'auto',
            }}
            className="w-full max-w-xl px-6 text-center flex flex-col items-center justify-center transition-all duration-75"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-3 block">
              Infinite Dimensions
            </span>
            <h2 className="text-2xl md:text-3xl font-normal tracking-tight max-w-xl leading-[1.2] mb-4 text-white">
              Responsive 3D Space, Optimized for Performance
            </h2>
            <p className="text-white/50 text-xs md:text-sm max-w-md mb-6 leading-relaxed font-light px-2">
              Powered by React Three Fiber and GSAP ScrollTrigger for hardware-accelerated, butter-smooth visual interactions.
            </p>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.06] bg-[#0d0d0d]/80 hover:bg-zinc-900/90 text-zinc-300 hover:text-white text-xs font-medium transition-all duration-300 shadow-lg">
              Read Docs
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Subtle indicator for scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0], y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-medium">
          Scroll to explore
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-zinc-500 to-transparent" />
      </motion.div>
    </div>
  );
}
