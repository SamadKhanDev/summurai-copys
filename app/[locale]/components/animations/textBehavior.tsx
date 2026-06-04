"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedHeadingProps {
    titleText: string;
    accentText: string;
    className?: string;
    Component?: React.ComponentType<any>;
}

const typingContainerVariants = (typingSpeed: number): Variants => ({
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: typingSpeed },
    },
});

const letterVariants: Variants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" },
};

const dropInVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: delay,
            duration: 0.5,
            ease: "easeOut",
        },
    },
});

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
    titleText,
    accentText,
    className = "",
    Component = "h1",
}) => {
    const letters = Array.from(titleText);
    const typingSpeed = 0.05;
    const totalTypingTime = letters.length * typingSpeed;

    return (
        <Component className={className}>
            {/* Typing Effect for Parent Text - Triggered when in view */}
            <motion.span
                variants={typingContainerVariants(typingSpeed)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }} // amount 0.5 ka matlab jab 50% heading dikhe tab chalay
            >
                {letters.map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.span>

            {/* Drop-in Effect for Accent Text - Triggered when in view */}
            <motion.span
                className="text-text-main inline-block ml-2"
                variants={dropInVariants(totalTypingTime)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
            >
                {accentText}
            </motion.span>
        </Component>
    );
};