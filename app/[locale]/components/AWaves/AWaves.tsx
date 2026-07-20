"use client";

import {
  TouchEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import Noise from "@/utils/Noise";
import styles from "./AWaves.module.css";

type AWavesProps = {
  className?: string;
  isStatic?: boolean;
  straight?: boolean;
  interactive?: boolean;
};

type Bounding = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type MouseState = {
  x: number;
  y: number;
  lx: number;
  ly: number;
  sx: number;
  sy: number;
  v: number;
  vs: number;
  a: number;
  set: boolean;
};

type Point = {
  x: number;
  y: number;
  wave: {
    x: number;
    y: number;
  };
  cursor: {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };
};

export default function AWaves({
  className = "",
  isStatic = false,
  straight = false,
  interactive = true,
}: AWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const boundingRef = useRef<Bounding>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const mouseRef = useRef<MouseState>({
    x: -10,
    y: 0,
    lx: 0,
    ly: 0,
    sx: 0,
    sy: 0,
    v: 0,
    vs: 0,
    a: 0,
    set: false,
  });

  const linesRef = useRef<Point[][]>([]);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const noiseRef = useRef(new Noise(Math.random()));

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastDrawTimeRef = useRef<number>(0);

  const isInteractiveRef = useRef(false);
  const isPausedRef = useRef(true);

  const moved = useCallback(
    (point: Point, withCursorForce = true) => {
      const coordinates = {
        x:
          point.x +
          point.wave.x +
          (withCursorForce ? point.cursor.x : 0),

        y:
          point.y +
          point.wave.y +
          (withCursorForce ? point.cursor.y : 0),
      };

      return {
        x: Math.round(coordinates.x * 10) / 10,
        y: Math.round(coordinates.y * 10) / 10,
      };
    },
    []
  );

  const drawLines = useCallback(() => {
    linesRef.current.forEach((points, lineIndex) => {
      if (!points.length) return;

      const firstPoint = moved(points[0], false);

      let pathData = `M ${firstPoint.x} ${firstPoint.y}`;

      points.forEach((point, pointIndex) => {
        const isLastPoint = pointIndex === points.length - 1;
        const movedPoint = moved(point, !isLastPoint);

        pathData += ` L ${movedPoint.x} ${movedPoint.y}`;
      });

      pathsRef.current[lineIndex]?.setAttribute("d", pathData);
    });
  }, [moved]);

  const setSize = useCallback(() => {
    const container = containerRef.current;
    const svg = svgRef.current;

    if (!container || !svg) return;

    const bounding = container.getBoundingClientRect();

    svg.style.width = "";
    svg.style.height = "";

    boundingRef.current = {
      left: bounding.left,
      top: bounding.top + window.scrollY,
      width: container.clientWidth,
      height: container.clientHeight,
    };

    svg.style.width = `${boundingRef.current.width}px`;
    svg.style.height = `${boundingRef.current.height}px`;
  }, []);

  const setLines = useCallback(() => {
    const svg = svgRef.current;

    if (!svg) return;

    const { width, height } = boundingRef.current;

    pathsRef.current.forEach((path) => {
      path.remove();
    });

    pathsRef.current = [];
    linesRef.current = [];

    const xGap = 15;
    const yGap = 45;

    const overflowWidth = width + 200;
    const overflowHeight = height + 30;

    const totalLines = Math.ceil(overflowWidth / xGap);
    const totalPoints = Math.ceil(overflowHeight / yGap);

    const xStart = (width - xGap * totalLines) / 2;
    const yStart = (height - yGap * totalPoints) / 2;

    for (let lineIndex = 0; lineIndex <= totalLines; lineIndex++) {
      const points: Point[] = [];

      for (
        let pointIndex = 0;
        pointIndex <= totalPoints;
        pointIndex++
      ) {
        points.push({
          x: xStart + xGap * lineIndex,
          y: yStart + yGap * pointIndex,

          wave: {
            x: 0,
            y: 0,
          },

          cursor: {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
          },
        });
      }

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      path.classList.add(styles.line);

      svg.appendChild(path);

      pathsRef.current.push(path);
      linesRef.current.push(points);
    }

    drawLines();
  }, [drawLines]);

  const updateMousePosition = useCallback((x: number, y: number) => {
    const mouse = mouseRef.current;
    const bounding = boundingRef.current;

    mouse.x = x - bounding.left;
    mouse.y = y - bounding.top + window.scrollY;

    if (!mouse.set) {
      mouse.sx = mouse.x;
      mouse.sy = mouse.y;
      mouse.lx = mouse.x;
      mouse.ly = mouse.y;
      mouse.set = true;
    }
  }, []);

  const movePoints = useCallback((time: number) => {
    const mouse = mouseRef.current;
    const noise = noiseRef.current;

    linesRef.current.forEach((points) => {
      points.forEach((point) => {
        if (straight) {
          point.wave.x = 0;
          point.wave.y = 0;
        } else {
          const movement =
            noise.perlin2(
              (point.x + time * 0.0125) * 0.002,
              (point.y + time * 0.005) * 0.0015
            ) * 12;

          point.wave.x = Math.cos(movement) * 32;
          point.wave.y = Math.sin(movement) * 16;
        }

        if (!isInteractiveRef.current) return;

        const differenceX = point.x - mouse.sx;
        const differenceY = point.y - mouse.sy;
        const distance = Math.hypot(differenceX, differenceY);

        const radius = Math.max(175, mouse.vs);

        if (distance < radius) {
          const strength = 1 - distance / radius;
          const force = Math.cos(distance * 0.001) * strength;

          point.cursor.vx +=
            Math.cos(mouse.a) *
            force *
            radius *
            mouse.vs *
            0.00065;

          point.cursor.vy +=
            Math.sin(mouse.a) *
            force *
            radius *
            mouse.vs *
            0.00065;
        }

        // Return points towards their original position.
        point.cursor.vx += (0 - point.cursor.x) * 0.005;
        point.cursor.vy += (0 - point.cursor.y) * 0.005;

        // Friction.
        point.cursor.vx *= 0.925;
        point.cursor.vy *= 0.925;

        // Cursor-effect strength.
        point.cursor.x += point.cursor.vx * 2;
        point.cursor.y += point.cursor.vy * 2;

        // Prevent excessive movement.
        point.cursor.x = Math.min(
          100,
          Math.max(-100, point.cursor.x)
        );

        point.cursor.y = Math.min(
          100,
          Math.max(-100, point.cursor.y)
        );
      });
    });
  }, []);

  const tick = useCallback(
    (timestamp: number) => {
      if (isPausedRef.current) {
        animationFrameRef.current = null;
        return;
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const time = timestamp - startTimeRef.current;
      const mouse = mouseRef.current;
      const container = containerRef.current;

      // Smooth cursor movement.
      mouse.sx += (mouse.x - mouse.sx) * 0.1;
      mouse.sy += (mouse.y - mouse.sy) * 0.1;

      // Cursor velocity.
      const differenceX = mouse.x - mouse.lx;
      const differenceY = mouse.y - mouse.ly;
      const distance = Math.hypot(differenceX, differenceY);

      mouse.v = distance;
      mouse.vs += (distance - mouse.vs) * 0.1;
      mouse.vs = Math.min(100, mouse.vs);

      mouse.lx = mouse.x;
      mouse.ly = mouse.y;

      mouse.a = Math.atan2(differenceY, differenceX);

      container?.style.setProperty("--x", `${mouse.sx}px`);
      container?.style.setProperty("--y", `${mouse.sy}px`);

      movePoints(time);
      drawLines();

      animationFrameRef.current = requestAnimationFrame(tick);
    },
    [drawLines, movePoints]
  );

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current !== null) return;

    isPausedRef.current = false;
    startTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const stopAnimation = useCallback(() => {
    isPausedRef.current = true;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    event.preventDefault();

    const touch = event.touches[0];

    if (touch) {
      updateMousePosition(touch.clientX, touch.clientY);
    }
  };

  useLayoutEffect(() => {
    setSize();
    setLines();
  }, [setLines, setSize]);

  useEffect(() => {
    if (isStatic) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      updateMousePosition(event.clientX, event.clientY);
    };

    const handleResize = () => {
      setSize();
      setLines();
    };

    const handleIntroEnd = () => {
      isInteractiveRef.current = true;
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      {
        threshold: 0,
      }
    );

    intersectionObserver.observe(container);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    container.addEventListener("introend", handleIntroEnd);

    // Remove this line when interaction should start only after introend.
    isInteractiveRef.current = interactive && !isStatic;

    return () => {
      stopAnimation();
      intersectionObserver.disconnect();

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      container.removeEventListener("introend", handleIntroEnd);

      pathsRef.current.forEach((path) => path.remove());

      pathsRef.current = [];
      linesRef.current = [];
    };
  }, [
    setLines,
    setSize,
    startAnimation,
    stopAnimation,
    updateMousePosition,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${styles.waves} ${!interactive ? styles.noDot : ""} ${className}`}
      onTouchMove={handleTouchMove}
    >
      <svg
        ref={svgRef}
        className={styles.svg}
        aria-hidden="true"
      />
    </div>
  );
}
