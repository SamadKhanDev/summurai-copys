"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// GLSL shaders for the particle system
const vertexShader = `
  uniform float uTime;
  
  attribute float aIsShackle;
  attribute vec3 aRandomOffset;
  attribute vec3 aOrigin;

  varying float vIsShackle;
  varying vec3 vPosition;

  // Simple 3D noise function
  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }

  vec3 noise3D(vec3 p) {
    float h = hash(p);
    return vec3(
      sin(p.x * 10.0 + uTime * 2.0 + h * 6.28),
      cos(p.y * 10.0 + uTime * 1.8 + h * 6.28),
      sin(p.z * 10.0 + uTime * 2.2 + h * 6.28)
    ) * 0.05;
  }

  // 2D Rotation matrix
  mat2 rotate2D(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat2(c, -s, s, c);
  }

  void main() {
    vIsShackle = aIsShackle;
    vec3 pos = aOrigin;

    // --- Shackle Inertial Swing ---
    if (aIsShackle > 0.5) {
      // Pivot point of the shackle (where it connects to the lock body)
      vec3 pivot = vec3(-0.6, 0.6, 0.0);
      
      // Swing angle using a slow out-of-phase sine wave
      float swingAngle = sin(uTime * 1.5) * 0.08;
      
      // Translate to pivot, rotate, and translate back
      pos -= pivot;
      pos.xy = rotate2D(swingAngle) * pos.xy;
      pos += pivot;
    }

    // --- Overall Levitation & Drift (Sine Wave) ---
    float floatOffset = sin(uTime * 0.8) * 0.12; // 12cm amplitude
    pos.y += floatOffset;

    // Rotate the entire object quickly in 3D space
    float rotY = uTime * 0.45;
    float rotX = sin(uTime * 1.0) * 0.1;
    float rotZ = cos(uTime * 1.2) * 0.1;

    pos.yz = rotate2D(rotX) * pos.yz;
    pos.xz = rotate2D(rotY) * pos.xz;
    pos.xy = rotate2D(rotZ) * pos.xy;

    // Keep particles from drifting into the keyhole space by reducing noise near the keyhole (x=0.0, y=-0.25)
    float distToKeyhole = length(aOrigin.xy - vec2(0.0, -0.25));
    float keyholeNoiseScale = smoothstep(0.0, 0.4, distToKeyhole);
    
    float distFromCenter = length(aOrigin);
    // Slightly tighter packing - reduced brownian drift
    vec3 brownian = noise3D(aOrigin + aRandomOffset) * (0.5 + distFromCenter * 0.35) * keyholeNoiseScale;
    
    // Magnetic pull back to original position
    pos += brownian;

    vPosition = pos;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation (slightly larger to fill gaps)
    gl_PointSize = (6.0 / -mvPosition.z) * (0.8 + 0.4 * hash(aOrigin));
  }
`;

const fragmentShader = `
  varying float vIsShackle;
  varying vec3 vPosition;
  uniform float uIsLight;

  void main() {
    // Make particles circular
    vec2 circCoord = gl_PointCoord - vec2(0.5);
    if (dot(circCoord, circCoord) > 0.25) {
      discard;
    }

    // Light mode: red shackle, black body
    vec3 lightShackleColor = vec3(0.88, 0.11, 0.28);
    vec3 lightBodyColor = vec3(0.08, 0.08, 0.12);

    // Dark mode: uniform matte white/gray plaster
    vec3 darkShackleColor = vec3(0.7, 0.7, 0.75);
    vec3 darkBodyColor = vec3(0.7, 0.7, 0.75);

    vec3 shackleColor = mix(darkShackleColor, lightShackleColor, uIsLight);
    vec3 bodyColor = mix(darkBodyColor, lightBodyColor, uIsLight);
    
    vec3 color = mix(bodyColor, shackleColor, vIsShackle);
    
    gl_FragColor = vec4(color, 0.9);
  }
`;

function ParticlePadlock() {
  const pointsRef = useRef<THREE.Points>(null);

  // Custom shader material uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIsLight: { value: 0 },
  }), []);

  // Generate padlock particle coordinates
  const particleData = useMemo(() => {
    const count = 120000; // 120k particles
    const positions = new Float32Array(count * 3);
    const origins = new Float32Array(count * 3);
    const randomOffsets = new Float32Array(count * 3);
    const isShackle = new Float32Array(count);

    // Helpers to sample point on rounded box
    const sampleRoundedBox = (w: number, h: number, d: number, radius: number) => {
      // Pick random face or volume point
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      const z = (Math.random() - 0.5) * d;

      // Soften corners
      const rx = Math.sign(x) * Math.max(0, Math.abs(x) - (w / 2 - radius));
      const ry = Math.sign(y) * Math.max(0, Math.abs(y) - (h / 2 - radius));
      const rz = Math.sign(z) * Math.max(0, Math.abs(z) - (d / 2 - radius));

      const len = Math.sqrt(rx * rx + ry * ry + rz * rz);
      if (len > radius) {
        const factor = radius / len;
        return {
          x: x - rx + rx * factor,
          y: y - ry + ry * factor,
          z: z - rz + rz * factor,
        };
      }
      return { x, y, z };
    };

    // Helper to sample point on torus
    const sampleTorus = (R: number, r: number) => {
      const theta = Math.random() * Math.PI; // Half torus (shackle)
      const phi = Math.random() * Math.PI * 2;

      const tx = (R + r * Math.cos(phi)) * Math.cos(theta);
      const ty = (R + r * Math.cos(phi)) * Math.sin(theta);
      const tz = r * Math.sin(phi);

      return { x: tx, y: ty, z: tz };
    };

    for (let i = 0; i < count; i++) {
      let pt;
      let isSh = 0;

      // 60% lock body, 40% shackle
      if (Math.random() < 0.6) {
        // Lock body (rounded box) with keyhole cutout
        let attempts = 0;
        do {
          pt = sampleRoundedBox(1.3, 1.1, 0.5, 0.2);
          pt.y -= 0.2;

          // Keyhole shape definition (clean cutout - wider for high visibility)
          const kx = pt.x;
          const ky = pt.y - (-0.25); // Center of keyhole
          const inCircle = (kx * kx + ky * ky) < 0.0289; // circle radius = 0.17
          const inNotch = ky < 0.0 && ky > -0.28 && Math.abs(kx) < (0.05 + Math.abs(ky) * 0.32);

          if (!(inCircle || inNotch)) {
            break;
          }
          attempts++;
        } while (attempts < 20);
      } else {
        // Shackle (torus at the top)
        pt = sampleTorus(0.5, 0.08);
        pt.y += 0.35; // Position on top of the lock body
        isSh = 1;
      }

      origins[i * 3] = pt.x;
      origins[i * 3 + 1] = pt.y;
      origins[i * 3 + 2] = pt.z;

      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;

      randomOffsets[i * 3] = (Math.random() - 0.5) * 2;
      randomOffsets[i * 3 + 1] = (Math.random() - 0.5) * 2;
      randomOffsets[i * 3 + 2] = (Math.random() - 0.5) * 2;

      isShackle[i] = isSh;
    }

    return { positions, origins, randomOffsets, isShackle };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = time;

      const isLightTheme = document.documentElement.classList.contains("light") ? 1.0 : 0.0;
      material.uniforms.uIsLight.value = isLightTheme;
    }
  });

  return (
    <points ref={pointsRef} scale={[1.1, 1.1, 1.1]} position={[0, -0.05, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aOrigin"
          args={[particleData.origins, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandomOffset"
          args={[particleData.randomOffsets, 3]}
        />
        <bufferAttribute
          attach="attributes-aIsShackle"
          args={[particleData.isShackle, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

export default function PadlockCanvas() {
  return (
    <div className="w-full h-full relative min-h-[350px] md:min-h-[450px] lg:min-h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <ParticlePadlock />
      </Canvas>

      {/* Soft circular platform/shadow beneath the lock */}
      <div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-2.5 rounded-full bg-black/40 filter blur-md pointer-events-none"
        style={{
          animation: "shadowPulse 6s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes shadowPulse {
          0%, 100% {
            transform: translate-x-1/2 scale(1);
            opacity: 0.35;
          }
          50% {
            transform: translate-x-1/2 scale(0.8);
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
