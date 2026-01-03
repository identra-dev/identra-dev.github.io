"use client";

import React, { useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
    MotionStyle,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface CometCardProps {
    rotateDepth?: number;
    translateDepth?: number;
    className?: string;
    glowColor?: string;
    style?: MotionStyle;
    children: React.ReactNode;
}

export const CometCard = ({
    rotateDepth = 10,
    translateDepth = 12,
    className,
    glowColor = "rgba(255,255,255,0.8)",
    style,
    children,
}: CometCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        [`${rotateDepth}deg`, `-${rotateDepth}deg`]
    );
    const rotateY = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        [`-${rotateDepth}deg`, `${rotateDepth}deg`]
    );

    const translateX = useTransform(
        mouseXSpring,
        [-0.5, 0.5],
        [`-${translateDepth}px`, `${translateDepth}px`]
    );
    const translateY = useTransform(
        mouseYSpring,
        [-0.5, 0.5],
        [`${translateDepth}px`, `-${translateDepth}px`]
    );

    // Spotlight effect that follows cursor - MORE VISIBLE
    const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
    const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);
    const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.15), transparent 50%)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div className={cn("perspective-[1200px] transform-gpu", className)}>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    translateX,
                    translateY,
                    transformStyle: "preserve-3d",
                    ...style,
                }}
                whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="relative w-full h-full rounded-2xl"
            >
                {/* Outer Glow on Hover - STRONGER */}
                <motion.div
                    className="absolute -inset-8 rounded-3xl pointer-events-none"
                    style={{
                        background: `radial-gradient(ellipse at center, ${glowColor}, transparent 60%)`,
                        filter: "blur(20px)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 0.5 : 0 }}
                    transition={{ duration: 0.4 }}
                />

                {/* Animated Border Glow */}
                <motion.div
                    className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none"
                    animate={{ opacity: isHovered ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                >
                    <div
                        className="absolute inset-[-50%] animate-border-spin"
                        style={{
                            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, ${glowColor} 360deg)`,
                        }}
                    />
                </motion.div>

                {/* Card Background */}
                <div className="absolute inset-[1px] rounded-2xl bg-[#0a0a0a] z-10" />

                {/* Spotlight Lighting Effect - STRONGER */}
                <motion.div
                    className="absolute inset-[1px] rounded-2xl z-15 pointer-events-none"
                    style={{ background: spotlightBackground }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                />

                {/* Content */}
                <div className="relative z-20 w-full h-full">
                    {children}
                </div>

                {/* Border Highlight on Hover */}
                <motion.div
                    className="absolute inset-[1px] rounded-2xl pointer-events-none z-25 border"
                    style={{ borderColor: glowColor.replace(/[\d.]+\)$/, '0.3)') }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </div>
    );
};
