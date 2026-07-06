"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur";

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  once?: boolean;
  animation?: AnimationType;
  distance?: number;
  className?: string;
};

const animations: Record<AnimationType, (distance: number) => Variants> = {
  fadeUp: (d) => ({
    hidden: { opacity: 0, y: d },
    visible: { opacity: 1, y: 0 },
  }),
  fadeDown: (d) => ({
    hidden: { opacity: 0, y: -d },
    visible: { opacity: 1, y: 0 },
  }),
  fadeLeft: (d) => ({
    hidden: { opacity: 0, x: -d },
    visible: { opacity: 1, x: 0 },
  }),
  fadeRight: (d) => ({
    hidden: { opacity: 0, x: d },
    visible: { opacity: 1, x: 0 },
  }),
  scale: () => ({
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  }),
  blur: (d) => ({
    hidden: { opacity: 0, y: d * 0.5, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  }),
};

export default function ScrollReveal({
  children,
  delay = 0,
  duration = 0.6,
  once = true,
  animation = "fadeUp",
  distance = 40,
  className = "",
}: Props) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once,
    margin: "-20px",
  });

  const variants = animations[animation](distance);

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}