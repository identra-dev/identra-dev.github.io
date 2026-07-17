"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function TextReveal({ text, className = "", delay = 0, duration = 1 }: TextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".word",
                {
                    opacity: 0,
                    y: 20, // Slight slide up
                    filter: "blur(12px)", // Cinematic blur start
                    transform: "translateZ(0)", // GPU
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1.4, // Slower, luxurious timing
                    stagger: 0.04, // Tight ripple
                    ease: "power2.out", // Soft landing
                    delay: delay,
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [text, delay, duration]);

    // Masked Word Reveal
    const renderContent = () => {
        const words = text.split(" ");
        return words.map((word, wordIndex) => (
            // No overflow mask here: the reveal is opacity + blur + a short rise, so a
            // mask buys nothing and a fixed-pixel one (pb-2) clips descenders once the
            // headline gets large — "forgetting" lost its g's at 92px.
            <span key={wordIndex} className="inline-block mr-[0.28em] last:mr-0">
                <span
                    className="word inline-block will-change-transform"
                    style={{
                        opacity: 0, // Prevent FOUC before GSAP takes over
                        whiteSpace: "pre",
                        backfaceVisibility: "hidden", // Fix jagged edges
                        WebkitFontSmoothing: "antialiased",
                    }}
                >
                    {word}
                </span>
            </span>
        ));
    };

    return (
        <div ref={containerRef} className={className}>
            <div className="leading-[1.08]">{renderContent()}</div>
        </div>
    );
}
