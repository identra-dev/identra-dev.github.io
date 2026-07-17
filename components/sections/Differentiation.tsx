"use client";

import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { useRef } from "react";

// The three defensible points, in the order set by YC-APPLICATION.md §2.
const SPECS = [
    {
        identra: "The real CLI, your config, your login",
        others: "Wrapped and sandboxed, skills stripped",
    },
    {
        identra: "Memory compounds across agents",
        others: "Amnesia at every session boundary",
    },
    {
        identra: "Every agent you already have, one board",
        others: "One vendor's agent, one per terminal",
    },
];

export function Differentiation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.5]);
    const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

    return (
        <section
            id="differentiation-section"
            ref={containerRef}
            className="bg-[#1a1618] relative h-[300vh] w-full"
        >
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="container px-6 max-w-5xl mx-auto w-full">
                    <motion.div style={{ opacity: headerOpacity }} className="text-center mb-20">
                        <p className="text-[9px] font-mono text-primary uppercase tracking-[0.4em] mb-3">
                            Positioning
                        </p>
                        <h2 className="text-3xl md:text-4xl text-foreground font-display font-normal tracking-tight">
                            Not another wrapper.
                        </h2>
                    </motion.div>

                    <div className="relative">
                        {/* Divider with a scanner that tracks progress */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block">
                            <div className="absolute inset-y-0 w-full bg-border" />
                            <motion.div
                                style={{ height: lineHeight }}
                                className="absolute top-0 w-full bg-gradient-to-b from-primary/20 via-primary to-primary/20"
                            >
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-primary shadow-[0_0_10px_2px_rgba(233,84,32,0.6)]" />
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-y-20">
                            <div className="hidden md:block col-span-2">
                                <div className="grid grid-cols-2 gap-12">
                                    <div className="pl-12 text-xs font-mono text-primary uppercase tracking-widest">
                                        Identra
                                    </div>
                                    <div className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
                                        Others
                                    </div>
                                </div>
                            </div>

                            {SPECS.map((spec, index) => (
                                <SpecRow
                                    key={spec.identra}
                                    spec={spec}
                                    index={index}
                                    progress={scrollYProgress}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SpecRow({
    spec,
    index,
    progress,
}: {
    spec: { identra: string; others: string };
    index: number;
    progress: MotionValue<number>;
}) {
    const start = 0.15 + index * 0.25;
    const end = start + 0.15;

    const opacity = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(progress, [start, end], [20, 0]);
    const blurValue = useTransform(progress, [start, end], [8, 0]);
    const filter = useMotionTemplate`blur(${blurValue}px)`;

    return (
        <motion.div
            style={{ opacity, y, filter }}
            className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12"
        >
            <div className="flex items-center gap-6 md:pl-12 relative">
                <span className="absolute -left-4 md:left-2 text-[10px] font-mono text-foreground/15 tabular-nums">
                    0{index + 1}
                </span>
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                <span className="text-lg md:text-xl text-foreground font-medium tracking-tight">
                    {spec.identra}
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="w-1.5 h-1.5 rounded-full border border-border bg-transparent flex-shrink-0" />
                <span className="text-lg md:text-xl text-muted-foreground/50">{spec.others}</span>
            </div>
        </motion.div>
    );
}
