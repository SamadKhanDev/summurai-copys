'use client';

import React, { useEffect, useRef } from 'react';
import CarouselCanvas from '../components/CarouselCanvas';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useTheme } from '../components/ThemeProvider';
import AWaves from '../components/AWaves/AWaves';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ServicesPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const designInRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);
  const summuraiRef = useRef<HTMLDivElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const backgroundTypographyRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. DESIGN IN MOTION Line Slide (Scroll Down: Design In goes Left, Motion goes Right)
      gsap.to(designInRef.current, {
        x: '-12vw',
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      gsap.to(motionRef.current, {
        x: '12vw',
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '50% top',
          scrub: true,
        },
      });

      // 2. DESIGN IN MOTION Character Glass Shatter/Fade Out
      const designChars = document.querySelectorAll('.design-char');
      designChars.forEach((char) => {
        const randomX = (Math.random() - 0.5) * 800;
        const randomY = (Math.random() - 0.5) * 500;
        const randomZ = -1000 + Math.random() * 1200;
        const randomRotX = (Math.random() - 0.5) * 720;
        const randomRotY = (Math.random() - 0.5) * 720;
        const randomRotZ = (Math.random() - 0.5) * 360;
        const randomScale = 0.5 + Math.random() * 1.0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '45% top',
            scrub: true,
          }
        });

        tl.to(char, {
          x: randomX,
          y: randomY,
          z: randomZ,
          rotationX: randomRotX,
          rotationY: randomRotY,
          rotationZ: randomRotZ,
          scale: randomScale,
          opacity: 0,
          ease: 'power1.in',
        });
      });

      // Background Typography Right-to-Center & Scale Up Animation
      gsap.fromTo(backgroundTypographyRef.current,
        {
          x: '16vw',
          scale: 0.75,
        },
        {
          x: '0vw',
          scale: 1.1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: '70% top',
            scrub: true,
          }
        }
      );

      // 3. SUMMURAI SYSTEM Line Slide (Scroll Down: Summurai goes Left, System goes Right)
      gsap.fromTo(summuraiRef.current,
        { x: '12vw' },
        {
          x: '-12vw',
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: '25% top',
            end: '100% top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(systemRef.current,
        { x: '-12vw' },
        {
          x: '12vw',
          ease: 'none',
          scrollTrigger: {
            trigger: 'body',
            start: '25% top',
            end: '100% top',
            scrub: true,
          },
        }
      );

      // 4. SUMMURAI SYSTEM Character Assemble, Stay, and Shatter/Fade Out
      const summuraiChars = document.querySelectorAll('.summurai-char');
      summuraiChars.forEach((char) => {
        const randomX = (Math.random() - 0.5) * 800;
        const randomY = (Math.random() - 0.5) * 500;
        const randomZ = -1000 + Math.random() * 1200;
        const randomRotX = (Math.random() - 0.5) * 720;
        const randomRotY = (Math.random() - 0.5) * 720;
        const randomRotZ = (Math.random() - 0.5) * 360;
        const randomScale = 0.5 + Math.random() * 1.0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: 'body',
            start: '20% top',
            end: '100% top',
            scrub: true,
          }
        });

        // Start scattered and assemble to solid text
        tl.fromTo(char, {
          x: randomX,
          y: randomY,
          z: randomZ,
          rotationX: randomRotX,
          rotationY: randomRotY,
          rotationZ: randomRotZ,
          scale: randomScale,
          opacity: 0,
        }, {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scale: 1,
          opacity: 0.1,
          duration: 0.4,
          ease: 'power1.out',
        });

        // Stay assembled for a while
        tl.to(char, {
          duration: 0.2,
        });

        // Shatter at the end
        tl.to(char, {
          x: randomX * 0.6,
          y: randomY * 0.6,
          z: randomZ * 0.6,
          rotationX: randomRotX * 0.6,
          rotationY: randomRotY * 0.6,
          rotationZ: randomRotZ * 0.6,
          scale: randomScale,
          opacity: 0,
          duration: 0.4,
          ease: 'power1.in',
        });
      });

      // Subtle scale for subtitle
      gsap.to(subtitleRef.current, {
        scale: 0.95,
        opacity: 0.6,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // 5. Fade out intro block on scroll
      gsap.to(introRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.92,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '12% top',
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Navbar wrapper with z-50 to stay on top of the 3D Canvas */}
      <div className="relative z-50">
        <Navbar />
      </div>

      <div className={`relative w-full min-h-[300vh] ${isLight ? 'bg-[#F8FAFC] text-black' : 'bg-black text-white'} overflow-x-hidden select-none`}>

        {/* Background Video */}
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-100">
          {/* <video
            src="https://framerusercontent.com/assets/9PJB6pimDu8LsjZi85rDKOpOc.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          /> */}
          {/* Always-on blackish-gray/whitish cinematic overlay */}
          <div className={`absolute inset-0 ${isLight ? 'bg-transparent' : 'bg-gradient-to-b from-black/60 via-neutral-900/40 to-black/70'} pointer-events-none`} />
          {/* Royal dark red tint and gradient overlays (Only active in Dark mode) */}
          {!isLight && (
            <>
              <div className="absolute inset-0 bg-[#2d0006]/75 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1c0004]/90 via-[#2d0006]/40 to-[#120002]/95 pointer-events-none" />
            </>
          )}
        </div>

        {/* Fixed Fullscreen 3D Canvas */}
        <div ref={carouselContainerRef} className="fixed top-0 left-0 w-screen h-screen z-20 pointer-events-none">
          <CarouselCanvas />
        </div>

        {/* Fixed Left Sidebar Panel for Intro Text */}
        <div
          ref={introRef}
          className="fixed left-0 top-0 h-screen w-full md:w-[450px] lg:w-[500px] z-30 px-8 md:px-16 flex flex-col justify-center backdrop-blur-[2px] pointer-events-none"
        >
          {/* Subtle Waves background inside sidebar */}
          <div className="absolute inset-0 pointer-events-none opacity-40 z-0 overflow-hidden">
            <AWaves />
          </div>

          <div className="relative z-10 flex flex-col gap-5 max-w-sm">
            <div className="flex items-center gap-3">
              <span className="text-[10.5px] font-mono font-bold tracking-[0.25em] text-red-500 uppercase">
                Our Services
              </span>
              <div className="w-10 h-[1px] bg-red-500/30" />
              <span className={`text-[9.5px] font-mono tracking-widest ${isLight ? 'text-neutral-600' : 'text-neutral-400'} uppercase`}>
                Summurai
              </span>
            </div>

            <h1 className={`text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase ${isLight ? 'text-black' : 'text-white'} tracking-tight leading-[1.08]`}>
              Seven Pillars.<br />One Operating System.
            </h1>

            <p className={`text-xs md:text-sm ${isLight ? 'text-neutral-700' : 'text-neutral-300'} leading-relaxed mt-2 font-medium`}>
              A holistic ecosystem engineered to protect, modernize, and scale your most critical digital assets — fully aligned with Saudi regulatory frameworks.
            </p>
          </div>
        </div>

        {/* Massive Semi-transparent Background Typography (With 3D Perspective) */}
        <div
          ref={backgroundTypographyRef}
          className={`fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-10 overflow-hidden font-sans font-black uppercase ${isLight ? 'text-black' : 'text-white'} tracking-tighter leading-[0.82] text-center`}
          style={{ perspective: '1200px' }}
        >
          {/* SUMMURAI SERVICES block */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              ref={designInRef}
              className="text-[14vw] flex justify-center gap-[0.02em]"
              style={{ willChange: 'transform' }}
            >
              {"SAMURAI".split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block design-char opacity-10 ${isLight ? '!text-black' : '!text-white'}`}
                  style={{ willChange: 'transform' }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div
              ref={motionRef}
              className="text-[14vw] flex justify-center gap-[0.02em]"
              style={{ willChange: 'transform' }}
            >
              {"SYSTEMS".split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block design-char opacity-10 ${isLight ? '!text-black' : '!text-white'}`}
                  style={{ willChange: 'transform' }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

          {/* SUMMURAI SERVICES block (Assembled) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              ref={summuraiRef}
              className="text-[14vw] flex justify-center gap-[0.02em]"
              style={{ willChange: 'transform' }}
            >
              {"SAMURAI".split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block summurai-char opacity-0 ${isLight ? '!text-black' : '!text-white'}`}
                  style={{ willChange: 'transform' }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            <div
              ref={systemRef}
              className="text-[14vw] flex justify-center gap-[0.02em]"
              style={{ willChange: 'transform' }}
            >
              {"SYSTEMS".split("").map((char, index) => (
                <span
                  key={index}
                  className={`inline-block summurai-char opacity-0 ${isLight ? '!text-black' : '!text-white'}`}
                  style={{ willChange: 'transform' }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={subtitleRef}
            className={`mt-6 text-xs font-bold tracking-[0.3em] ${isLight ? 'text-neutral-500' : 'text-neutral-400'} opacity-80`}
          >
          </div>
        </div>

        {/* Left Scroll helper text */}
        <div className="fixed left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-4 pointer-events-none">
          <span className={`text-[10px] tracking-[0.2em] font-semibold ${isLight ? 'text-neutral-600' : 'text-neutral-400'} vertical-text uppercase`}>Scroll</span>
          <div className={`w-[2px] h-16 ${isLight ? 'bg-neutral-200' : 'bg-neutral-800'} relative rounded-full overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-full h-1/3 ${isLight ? 'bg-black' : 'bg-white'} rounded-full animate-bounce`} />
          </div>
        </div>

        {/* Scrollable Spacer Area */}
        <div className="h-[300vh] w-full" />

        {/* Footer wrapper with relative z-30 to scroll up on top of canvas */}
        <div className={`relative z-30 ${isLight ? 'bg-white border-t border-neutral-200' : 'bg-black border-t border-card-border'}`}>
          <Footer />
        </div>
      </div>

      <style jsx global>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </>
  );
}
