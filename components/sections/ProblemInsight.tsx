"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// The real problem, from PRD §1: context amnesia. Not cloud-security FUD.
const STATEMENTS = [
    "Every agent you run forgets the moment you close it.",
    "New session, new agent, and you explain the layout again.",
    "The approach you already tried and threw away? Gone.",
    "The agent is sharp in the moment, and blank the next morning.",
    "Agents don't need more context. They need memory.",
];

export function ProblemInsight() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const blur = useTransform(scrollYProgress, [0.9, 1], ["blur(0px)", "blur(20px)"]);
    const contentOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.9, 1], [1, 0.9]);
    const y = useTransform(scrollYProgress, [0.9, 1], [0, -50]);

    return (
        <section
            id="problem-section"
            ref={containerRef}
            className="relative h-[350vh] bg-transparent z-10 w-full"
        >
            <div
                className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                }}
            />

            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <motion.div
                    style={{ filter: blur, opacity: contentOpacity, scale, y }}
                    className="relative w-full text-center h-full flex items-center justify-center"
                >
                    {STATEMENTS.map((text, i) => (
                        <Statement
                            key={i}
                            text={text}
                            index={i}
                            total={STATEMENTS.length}
                            progress={scrollYProgress}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function Statement({
    text,
    index,
    total,
    progress,
}: {
    text: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const start = index / total;
    const end = (index + 1) / total;
    const isLast = index === total - 1;

    const opacity = useTransform(
        progress,
        [start, start + 0.15 / total, end - 0.15 / total, end],
        [0, 1, 1, 0]
    );

    return (
        <motion.div
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center p-6 w-full h-full pointer-events-none"
        >
            <h2
                className={`font-display tracking-tight leading-tight text-center max-w-4xl ${isLast
                    ? "text-4xl md:text-5xl lg:text-6xl font-medium text-foreground"
                    : "text-3xl md:text-4xl lg:text-5xl font-normal text-muted-foreground"
                    }`}
            >
                {isLast ? (
                    <>
                        Agents don&apos;t need more context.
                        <br />
                        They need <span className="text-primary">memory</span>.
                    </>
                ) : (
                    text
                )}
            </h2>
        </motion.div>
    );
}
