'use client';

import React, { useRef, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Link } from '@/i18n/navigation';

import { useTheme } from './ThemeProvider';
import { withBasePath } from '@/lib/basePath';

interface ServiceItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  title: string;
  description: string;
  tags: string[];
  linkText: string;
}

interface CardProps {
  service: ServiceItem;
  locale: string;
  index: number;
  targetGlobalProgress: React.MutableRefObject<number>;
  radius: number;
  pitch: number;
  cardDepthsRef: React.MutableRefObject<number[]>;
  onCardClick: (index: number) => void;
}

function Card({
  service,
  locale,
  index,
  targetGlobalProgress,
  radius,
  pitch,
  cardDepthsRef,
  onCardClick
}: CardProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const meshRef = useRef<THREE.Mesh>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Individual progress tracker (starts at 0)
  const myProgress = useRef(0);

  // Spacing index * ANGLE_SPACING places cards evenly around the orbit
  const baseAngle = index * ((Math.PI * 2) / 7);

  useFrame((state, delta) => {
    // 1. Dynamic Snake Tail Lag
    const lagSpeed = 8.5 - index * 0.8;
    const lerpFactor = 1 - Math.exp(-lagSpeed * delta);

    myProgress.current = THREE.MathUtils.lerp(
      myProgress.current,
      targetGlobalProgress.current,
      lerpFactor
    );

    const progressVal = myProgress.current;

    // 2. 3D Spiral Staircase Ladder
    const angle = baseAngle - progressVal * Math.PI * 2.5;

    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    // y climbs along the spiral staircase axis based on the angle
    const y = angle * pitch + (1.0 - progressVal) * 1.5 - (radius === 3.2 ? 1.0 : 0.5);

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      meshRef.current.rotation.set(0, angle, 0);

      // Depth scaling
      const depthVal = (z + radius) / (2 * radius);
      const scale = 0.72 + depthVal * 0.28;
      meshRef.current.scale.set(scale, scale, 1);

      // Depth opacity on HTML overlay
      if (cardRef.current) {
        cardRef.current.style.opacity = (0.45 + depthVal * 0.55).toString();
      }
    }

    // Write this card's depth coordinate to the shared depths reference
    cardDepthsRef.current[index] = z;

    // Determine if this card is currently front-most (has the highest Z coordinate)
    const maxZ = Math.max(...cardDepthsRef.current);
    const isActive = z === maxZ;

    if (cardRef.current) {
      if (isActive) {
        cardRef.current.classList.add("is-active");
      } else {
        cardRef.current.classList.remove("is-active");
      }
    }
  });

  const numStr = (index + 1).toString().padStart(2, '0');
  const Icon = service.icon;
  const localizedUrl = withBasePath(`/${locale}${service.href}`);

  return (
    <mesh ref={meshRef}>
      {/* HTML text & interactive content aligned in the 3D space */}
      <Html
        transform
        distanceFactor={2.8} // scaled up HTML relative to 3D space
        position={[0, 0, 0]}
        className="pointer-events-auto select-none"
      >
        <div
          ref={cardRef}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('span.cursor-pointer') || (e.target as HTMLElement).closest('a *')) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            onCardClick(index);
          }}
          className={`w-[380px] h-[280px] p-6 flex flex-col justify-between rounded-2xl cursor-pointer transition-all duration-300 group backdrop-blur-md border ${
            isLight
              ? 'text-black bg-white/[0.25] border-black/10 hover:border-red-500/60 hover:bg-white/[0.55] hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] [&.is-active]:border-red-500/60 [&.is-active]:bg-white/[0.55] [&.is-active]:shadow-[0_0_40px_rgba(239,68,68,0.15)]'
              : 'text-white bg-white/[0.06] border-white/20 hover:border-red-500/60 hover:bg-white/[0.09] hover:shadow-[0_0_40px_rgba(239,68,68,0.25)] [&.is-active]:border-red-500/60 [&.is-active]:bg-white/[0.09] [&.is-active]:shadow-[0_0_40px_rgba(239,68,68,0.25)]'
          }`}
          style={{ willChange: 'opacity' }}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-mono font-bold tracking-[0.2em] px-2.5 py-1 rounded-full uppercase transition-colors duration-300 border group-hover:border-red-500/40 group-hover:!text-red-500 group-[.is-active]:border-red-500/40 group-[.is-active]:!text-red-500 ${isLight ? '!text-neutral-800 bg-neutral-100 border-black/10' : '!text-white bg-white/5 border-white/10'}`}>
                Pillar {numStr}
              </span>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:bg-red-600 group-hover:!text-white group-hover:border-red-600 group-hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] group-[.is-active]:bg-red-600 group-[.is-active]:!text-white group-[.is-active]:border-red-600 group-[.is-active]:shadow-[0_0_15px_rgba(239,68,68,0.4)] ${isLight ? 'bg-neutral-100 border-black/10 !text-black' : 'bg-white/[0.08] border-white/15 !text-white'}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <h3 className={`text-base font-extrabold tracking-wide group-hover:!text-red-500 group-[.is-active]:!text-red-500 transition-colors duration-300 ${isLight ? '!text-black' : '!text-white'}`}>
              {service.title}
            </h3>
            <p className={`text-xs leading-relaxed mt-2.5 line-clamp-3 ${isLight ? '!text-neutral-700' : '!text-gray-300'}`}>
              {service.description}
            </p>
          </div>

          <div className="mt-2">
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {service.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 rounded-md text-[9.5px] font-semibold tracking-wide uppercase transition-colors border ${
                    isLight
                      ? 'bg-neutral-100 border-black/10 !text-neutral-600 group-hover:bg-red-500 group-hover:border-red-500 group-hover:!text-white group-[.is-active]:bg-red-500 group-[.is-active]:border-red-500 group-[.is-active]:!text-white'
                      : 'bg-white/[0.04] border-white/10 !text-gray-300 group-hover:border-red-500/40 group-hover:!text-white group-[.is-active]:border-red-500/40 group-[.is-active]:!text-white'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={localizedUrl}
              className="text-xs font-bold !text-red-500 hover:!text-red-400 transition-colors duration-300 inline-flex items-center gap-1.5"
            >
              {service.linkText}
            </a>
          </div>
        </div>
      </Html>
    </mesh>
  );
}

interface CarouselProps {
  services: ServiceItem[];
  locale: string;
}

export default function Carousel({ services, locale }: CarouselProps) {
  const targetGlobalProgress = useRef(0);
  const { camera, size } = useThree();

  // Track depth (z-coordinate) for all 7 orbit items to determine the active front-most card
  const cardDepthsRef = useRef<number[]>(new Array(7).fill(0));

  // Compute responsive dimensions dynamically based on viewport width
  const isMobile = size.width < 768;
  const radius = isMobile ? 1.8 : 3.2; // Packed closer (was 2.2 / 3.8)
  const pitch = isMobile ? 0.28 : 0.30;

  // Adjust camera distance for mobile so the entire orbit fits perfectly
  useEffect(() => {
    if (isMobile) {
      camera.position.z = 11.5;
    } else {
      camera.position.z = 8.5;
    }
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      targetGlobalProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCardClick = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const targetProgress = (index * 4) / 35;
    window.scrollTo({
      top: targetProgress * maxScroll,
      behavior: 'smooth',
    });
  };

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const progress = targetGlobalProgress.current;
      // Interpolate X coordinate from 1.8 (progress = 0) to 0 (progress >= 0.12)
      const targetX = isMobile ? 0 : THREE.MathUtils.lerp(1.8, 0, Math.min(progress / 0.12, 1));

      // Smoothly slide/lerp the group center to avoid abrupt jumps
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        1 - Math.exp(-6 * delta)
      );
    }
  });

  return (
    <group>
      {/* Main cards scene, tilted slightly for premium perspective */}
      <group
        ref={groupRef}
        position={[isMobile ? 0 : 1.8, isMobile ? -0.3 : -0.5, 0]}
        rotation={[0.22, 0, -0.08]}
      >
        {services.map((service, i) => {
          return (
            <Card
              key={service.key}
              service={service}
              locale={locale}
              index={i}
              targetGlobalProgress={targetGlobalProgress}
              radius={radius}
              pitch={pitch}
              cardDepthsRef={cardDepthsRef}
              onCardClick={handleCardClick}
            />
          );
        })}
      </group>
    </group>
  );
}
