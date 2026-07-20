"use client";
import { useRef, useCallback, useEffect } from "react";
import gsap from "gsap";

const planeImg = "/img.jpeg";
const COLS = 6;
const ROWS = 12;
const TOTAL = COLS * ROWS;

export default function GridDistortion() {
  const stageRef = useRef(null);
  const tilesRef = useRef([]);
  const settersRef = useRef([]);

  const tileRef = useCallback((el, i) => {
    if (!el) return;
    tilesRef.current[i] = el;
    settersRef.current[i] = {
      x: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }),
    };
  }, []);

  // Entrance: tiles reveal from top-left, staggered diagonally
  useEffect(() => {
    const tiles = tilesRef.current.filter(Boolean);

    gsap.set(tiles, { opacity: 0, scale: 0.85 });

    gsap.to(tiles, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      // stagger by diagonal index (col + row) so wave goes top-left → bottom-right
      stagger: {
        each: 0.04,
        from: "start",
        grid: [ROWS, COLS],
        axis: null, // diagonal wave
      },
      delay: 0.1,
    });
  }, []);

  const handleMouseMove = (e) => {
    const rect = stageRef.current.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const tileW = W / COLS;
    const tileH = H / ROWS;

    for (let i = 0; i < TOTAL; i++) {
      if (!settersRef.current[i]) continue;
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const tileCX = (col + 0.5) * tileW;
      const tileCY = (row + 0.5) * tileH;
      const dx = tileCX - mx;
      const dy = tileCY - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(W, H) * 0.2;
      const influence = Math.max(0, 1 - dist / maxDist);
      const strength = influence * influence * 20;
      const angle = Math.atan2(dy, dx);
      settersRef.current[i].x(Math.cos(angle) * strength);
      settersRef.current[i].y(Math.sin(angle) * strength);
    }
  };

  const handleMouseLeave = () => {
    for (let i = 0; i < TOTAL; i++) {
      if (!settersRef.current[i]) continue;
      settersRef.current[i].x(0);
      settersRef.current[i].y(0);
    }
  };

  return (
    <div
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gap: "0px",
        overflow: "hidden",
        cursor: "default",
        borderRadius: "0",
        backgroundColor: "#0a0a0a",
      }}
    >
      {Array.from({ length: TOTAL }, (_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const bgX = COLS === 1 ? "0%" : `${(col / (COLS - 1)) * 100}%`;
        const bgY = ROWS === 1 ? "0%" : `${(row / (ROWS - 1)) * 100}%`;
        return (
          <div
            key={i}
            ref={(el) => tileRef(el, i)}
            style={{
              backgroundImage: `url(${planeImg})`,
              backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
              backgroundPosition: `${bgX} ${bgY}`,
              backgroundRepeat: "no-repeat",
              willChange: "transform, opacity",
            }}
          />
        );
      })}
    </div>
  );
}
