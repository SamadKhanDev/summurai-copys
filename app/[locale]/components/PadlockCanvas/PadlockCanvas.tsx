"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, useCursor, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../ThemeProvider";

// ── Screen texture — black dot-matrix panel with text ──
function useScreenTexture(hovered: boolean) {
  const tex = useMemo(() => {
    const W = 1024, H = 512;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    return { canvas, ctx, texture };
  }, []);

  useEffect(() => {
    const { canvas, ctx, texture } = tex;
    const W = canvas.width;
    const H = canvas.height;

    // Deep black background
    ctx.fillStyle = "#020203";
    ctx.fillRect(0, 0, W, H);

    const text = hovered ? "Access Allowed" : "Access Denied";
    // Pure bright solid colors (no glow/blur)
    const textColor = hovered ? "#00ff66" : "#ff1133";

    ctx.fillStyle = textColor;
    ctx.font = "bold 110px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.fillText(text, W / 2, H / 2 + 35);

    texture.needsUpdate = true;
  }, [hovered, tex]);

  return tex.texture;
}

// ── Carbon fiber weave texture generator ──
function useCarbonFiberTexture() {
  return useMemo(() => {
    const size = 32;
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Base background
    ctx.fillStyle = "#121215";
    ctx.fillRect(0, 0, size, size);

    // Carbon weave details
    ctx.fillStyle = "#1c1c22";
    for (let i = 0; i < size; i += 8) {
      for (let j = 0; j < size; j += 8) {
        if ((i + j) % 16 === 0) {
          ctx.fillRect(i, j, 4, 8);
        } else {
          ctx.fillRect(i, j + 4, 8, 4);
        }
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(12, 12);
    return tex;
  }, []);
}

// ── Biometric fingerprint scanner pattern ──
function useFingerprintTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = "#1e1e24";
    ctx.fillRect(0, 0, size, size);

    // Draw concentric fingerprint ridges
    ctx.strokeStyle = "rgba(255, 24, 60, 0.65)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    const centerX = size / 2;
    const centerY = size / 2;

    for (let r = 15; r < 55; r += 8) {
      ctx.beginPath();
      ctx.arc(centerX, centerY + 5, r, Math.PI * 1.25, Math.PI * 1.75);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY - 5, r + 2, Math.PI * 0.25, Math.PI * 0.75);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);
}

function SamuraiLock() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const groupRef = useRef<THREE.Group>(null);
  const shackleGroupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered, 'pointer', 'auto');

  const screenTexture = useScreenTexture(hovered);
  const carbonTexture = useCarbonFiberTexture();
  const fingerprintTexture = useFingerprintTexture();

  // Metrics
  const BW = 1.72, BH = 1.35, BD = 0.52;
  const BR = 0.16;
  const SLX = 0.44;
  const SLR = 0.105;
  const SLH = 0.72;
  const BY = -0.15;

  // Materials
  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#b80f22",
    metalness: 0.85,
    roughness: 0.25,
  }), []);

  const carbonPanelMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: carbonTexture,
    roughness: 0.6,
    metalness: 0.3,
  }), [carbonTexture]);

  const shackleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#b80f22",
    metalness: 0.85,
    roughness: 0.25,
  }), []);

  const redAnodizedMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#800810",
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  const screenMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: screenTexture,
    emissiveMap: screenTexture,
    emissive: new THREE.Color(1.0, 0.05, 0.1),
    emissiveIntensity: 1.2,
    roughness: 0.75,
    metalness: 0.1,
  }), [screenTexture]);

  const scannerMat = useMemo(() => new THREE.MeshStandardMaterial({
    map: fingerprintTexture,
    roughness: 0.5,
    metalness: 0.2,
  }), [fingerprintTexture]);

  useEffect(() => {
    if (hovered) {
      screenMat.emissive.setRGB(0.05, 1.0, 0.2); // Glowing Green when hovered
    } else {
      screenMat.emissive.setRGB(1.0, 0.05, 0.1); // Glowing Red default
    }
  }, [hovered, screenMat]);

  const screwMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#3e4046",
    metalness: 0.9,
    roughness: 0.25,
  }), []);

  const redGlowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: "#ff183c",
  }), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Smooth idle hovering
    groupRef.current.position.y = -0.45 + Math.sin(t * 0.68) * 0.07;
    groupRef.current.rotation.y = Math.sin(t * 0.36) * 0.22;
    groupRef.current.rotation.x = Math.sin(t * 0.52) * 0.04;
    groupRef.current.rotation.z = Math.cos(t * 0.44) * 0.015;

    // Shackle open/close
    if (shackleGroupRef.current) {
      const targetY = hovered ? 0.32 : 0;
      shackleGroupRef.current.position.y = THREE.MathUtils.lerp(
        shackleGroupRef.current.position.y,
        targetY,
        0.12
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Hitbox */}
      <mesh position={[0, BY + 0.3, 0]}>
        <boxGeometry args={[2.0, 2.9, 1.0]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* ── MAIN GUNMETAL GRAY BODY ── */}
      <RoundedBox args={[BW, BH, BD]} radius={BR} smoothness={8} position={[0, BY, 0]}>
        <primitive object={bodyMat} attach="material" />
      </RoundedBox>

      {/* ── CARBON FIBER PANEL (front) ── */}
      <RoundedBox
        args={[BW - 0.09, BH - 0.09, BD * 0.46]}
        radius={BR - 0.02}
        smoothness={6}
        position={[0, BY, BD * 0.28]}
      >
        <primitive object={carbonPanelMat} attach="material" />
      </RoundedBox>

      {/* ── SHACKLE ── */}
      <group ref={shackleGroupRef}>
        {/* Camo-pattern look via dark matte legs */}
        {/* Left leg */}
        <mesh position={[-SLX, BY + BH / 2 + SLH / 2 - 0.25, 0]}>
          <cylinderGeometry args={[SLR, SLR, SLH + 0.5, 24]} />
          <primitive object={shackleMat} attach="material" />
        </mesh>
        {/* Right leg */}
        <mesh position={[SLX, BY + BH / 2 + SLH / 2, 0]}>
          <cylinderGeometry args={[SLR, SLR, SLH, 24]} />
          <primitive object={shackleMat} attach="material" />
        </mesh>
        {/* Top curved shackle torus */}
        <mesh position={[0, BY + BH / 2 + SLH, 0]}>
          <torusGeometry args={[SLX, SLR, 20, 48, Math.PI]} />
          <primitive object={shackleMat} attach="material" />
        </mesh>
      </group>

      {/* ── RED ANODIZED JUNCTION COLLAR RINGS ── */}
      <mesh position={[-SLX, BY + BH / 2 + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[SLR + 0.025, SLR + 0.025, 0.1, 24]} />
        <primitive object={redAnodizedMat} attach="material" />
      </mesh>
      <mesh position={[SLX, BY + BH / 2 + 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[SLR + 0.025, SLR + 0.025, 0.1, 24]} />
        <primitive object={redAnodizedMat} attach="material" />
      </mesh>

      {/* ── RECESSED SCREEN BEZEL ── */}
      <RoundedBox
        args={[1.15, 0.42, 0.06]}
        radius={0.03}
        smoothness={4}
        position={[0, BY + 0.22, BD / 2 + 0.015]}
      >
        <meshStandardMaterial color="#1a1b1e" metalness={0.7} roughness={0.4} />
      </RoundedBox>

      {/* Hex screws in Bezel corners */}
      {[-0.5, 0.5].map((x, xi) =>
        [-0.15, 0.15].map((y, yi) => (
          <mesh key={`${xi}-${yi}`} position={[x, BY + 0.22 + y, BD / 2 + 0.05]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.01, 6]} />
            <primitive object={screwMat} attach="material" />
          </mesh>
        ))
      )}

      {/* ── LED DOT-MATRIX SCREEN ── */}
      <mesh position={[0, BY + 0.22, BD / 2 + 0.048]}>
        <planeGeometry args={[0.94, 0.28]} />
        <primitive object={screenMat} attach="material" />
      </mesh>

      {/* ── BIOMETRIC FINGERPRINT SCANNER ── */}
      <group position={[0, BY - 0.24, BD / 2 + 0.025]}>
        {/* Flat circular scanner pad */}
        <mesh position={[0, 0, 0.01]}>
          <circleGeometry args={[0.18, 32]} />
          <primitive object={scannerMat} attach="material" />
        </mesh>
      </group>

      {/* ── METALLIC CREST EMBLEM (Bottom-Right) ── */}
      <mesh position={[0.48, BY - 0.32, BD / 2 + 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 32]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

// ── Scene lighting ──
function Scene() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={isLight ? 0.8 : 0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <SamuraiLock />
    </>
  );
}

// ── Canvas wrapper ──
export default function PadlockCanvas() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="w-full h-full relative min-h-[350px] md:min-h-[450px] lg:min-h-[500px]">
      <Canvas
        camera={{ position: [0.3, 0.05, 3.6], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>

      {/* Red ambient glow shadow */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 w-44 h-3 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(225,29,72,0.45) 0%, transparent 70%)",
          filter: "blur(12px)",
          animation: "shadowPulse 4s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes shadowPulse {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scaleX(1); }
          50%       { opacity: 0.2; transform: translateX(-50%) scaleX(0.7); }
        }
      `}</style>
    </div>
  );
}