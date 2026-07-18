'use client';

import React, { useRef, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Float } from '@react-three/drei';
import * as THREE from 'three';

interface RingsCanvasProps {
  progressRef: React.RefObject<number>;
}

function Rings({ progressRef }: { progressRef: React.RefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate points for 8 concentric rings split into 2 groups of 4 rings
  // Features a custom "ribbon fold / piece" shape (dip inward, then sharp straight outward spike)
  // The spike amplitude is scaled proportionally to each ring's radius for perfect visual alignment
  const ringsData = useMemo(() => {
    const generateRing = (radius: number) => {
      const points: [number, number, number][] = [];
      const segments = 360; // High resolution for sharp turns

      // We define 2 angular windows for the spikes (spaced out across the circle)
      const spikes = [
        { start: 1.1, end: 2.1 }, // First fold
        { start: 4.2, end: 5.2 }  // Second fold
      ];

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        let r = radius;

        // Apply custom ribbon-fold/piece geometry if theta falls inside a window
        for (const spike of spikes) {
          if (theta >= spike.start && theta <= spike.end) {
            const x = (theta - spike.start) / (spike.end - spike.start); // 0 -> 1

            let offset = 0;
            if (x < 0.4) {
              // Smooth inward dip
              const t = x / 0.4;
              offset = -0.3 * Math.sin(t * Math.PI);
            } else if (x >= 0.4 && x < 0.78) {
              // Straight outward line to peak
              const t = (x - 0.4) / 0.38;
              offset = t * 0.8;
            } else {
              // Straight return line back to circle
              const t = (x - 0.78) / 0.22;
              offset = 0.8 * (1 - t);
            }

            // Taper only the very edges (0 to 0.25 and 0.75 to 1.0) so the peak at 0.78 remains perfectly sharp
            const edgeTaper = x < 0.25 ? 0.5 * (1 - Math.cos(Math.PI * (x / 0.25))) :
              x > 0.75 ? 0.5 * (1 - Math.cos(Math.PI * ((1 - x) / 0.25))) : 1.0;

            // Scale the offset proportionally to the radius to maintain perfect shape symmetry
            r += offset * edgeTaper * (radius * 0.38);
            break;
          }
        }

        points.push([Math.cos(theta) * r, Math.sin(theta) * r, 0]);
      }
      return points;
    };

    // 2 groups: Inner track (4 tight rings) and Outer track (4 tight rings)
    // First line of each band is solid white (opacity: 1.0 / 0.9), others act as fading echoes
    return [
      // Inner group of 4 rings
      { points: generateRing(0.75), opacity: 1.0, width: 1.3 },
      { points: generateRing(0.81), opacity: 0.45, width: 1.1 },
      { points: generateRing(0.87), opacity: 0.25, width: 1.0 },
      { points: generateRing(0.93), opacity: 0.10, width: 0.9 },

      // Outer group of 4 rings
      { points: generateRing(1.45), opacity: 0.90, width: 1.2 },
      { points: generateRing(1.52), opacity: 0.40, width: 1.0 },
      { points: generateRing(1.59), opacity: 0.20, width: 0.8 },
      { points: generateRing(1.66), opacity: 0.08, width: 0.7 },
    ];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = progressRef.current ?? 0;

    // Base slow idle rotation
    const idleRotationZ = t * 0.025;

    // Synchronize rotation driven by scroll progress with subtle wave oscillation
    const targetZ = progress * Math.PI * 2.0 + idleRotationZ;
    const targetX = Math.sin(t * 0.08) * 0.03 + progress * 0.15;
    const targetY = Math.cos(t * 0.08) * 0.03 + progress * 0.1;

    const lerpSpeed = 0.08;

    if (groupRef.current) {
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, lerpSpeed);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, lerpSpeed);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, lerpSpeed);
    }
  });

  return (
    <group ref={groupRef}>
      {ringsData.map((ring, idx) => (
        <group key={idx}>
          <Line
            points={ring.points}
            color="#E11D48"
            lineWidth={ring.width}
            transparent
            opacity={ring.opacity}
          />
        </group>
      ))}
    </group>
  );
}

const RingsCanvas = memo(function RingsCanvas({ progressRef }: RingsCanvasProps) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-transparent">

      <Canvas
        camera={{ position: [0, 0, 8], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />

        <Float
          speed={1.0}
          floatIntensity={0.08}
          rotationIntensity={0.04}
        >
          {/* Position the center of the semi-circles at Y=3.0 */}
          <group position={[0, 3.0, 0]}>
            <Rings progressRef={progressRef} />
          </group>
        </Float>
      </Canvas>
    </div>
  );
});

export default RingsCanvas;
