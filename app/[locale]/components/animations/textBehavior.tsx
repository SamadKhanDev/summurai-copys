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
    const isArabic = /[\u0600-\u06FF]/.test(titleText);
    const items = isArabic ? titleText.split(" ") : Array.from(titleText);
    const typingSpeed = isArabic ? 0.15 : 0.05;
    const totalTypingTime = items.length * typingSpeed;

    return (
        <Component className={className}>
            {/* Typing Effect for Parent Text - Triggered when in view */}
            <motion.span
                variants={typingContainerVariants(typingSpeed)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} // amount 0.1 ka matlab jab 10% heading dikhe tab chalay
            >
                {items.map((item, index) => (
                    <motion.span 
                        key={index} 
                        variants={letterVariants}
                        className={isArabic ? "inline-block" : ""}
                    >
                        {isArabic 
                            ? `${item}${index < items.length - 1 ? "\u00A0" : ""}` 
                            : (item === " " ? "\u00A0" : item)
                        }
                    </motion.span>
                ))}
            </motion.span>

            {/* Drop-in Effect for Accent Text - Triggered when in view */}
            <motion.span
                className="text-text-main inline-block ms-2"
                variants={dropInVariants(totalTypingTime)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {accentText}
            </motion.span>
        </Component>
    );
};