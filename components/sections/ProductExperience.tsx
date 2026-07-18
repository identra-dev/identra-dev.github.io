"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { CanvasMock, type Beat } from "@/components/ui/CanvasMock";

const COPY: Record<Beat, { tag: string; title: string; body: string }> = {
    empty: {
        tag: "The canvas",
        title: "An empty board and a dock.",
        body: "Right-click the canvas or use the dock to add an agent. The empty state is a feature, not a blank screen.",
    },
    node: {
        tag: "Agent nodes",
        title: "A real CLI in a real terminal.",
        body: "The node spawns the actual codex process on your machine and streams its output. You type into it. If the binary is missing it says so, instead of pretending to work.",
    },
    wired: {
        tag: "The context bus",
        title: "Wire two agents together.",
        body: "Draw an edge and the wired agents share context through an MCP server. Draw the wire before you launch — a CLI reads its MCP servers at startup.",
    },
    recall: {
        tag: "The memory moment",
        title: "The next agent already knows.",
        body: "Open a fresh agent in a project Identra has seen and it shows what it remembers before the first prompt: the decisions, the rejected paths, the constraints.",
    },
};

const ORDER: Beat[] = ["empty", "node", "wired", "recall"];

export function ProductExperience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [beat, setBeat] = useState<Beat>("empty");

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v < 0.18) setBeat("empty");
        else if (v < 0.42) setBeat("node");
        else if (v < 0.68) setBeat("wired");
        else setBeat("recall");
    });

    const copy = COPY[beat];

    return (
        <section id="canvas" ref={containerRef} className="relative h-[420vh] bg-background">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-center pt-20">
                    {/* Explanation side */}
                    <div className="order-2 lg:order-1 max-w-md">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={beat}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="font-mono text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
                                    {copy.tag}
                                </span>
                                <h2 className="mt-4 font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-foreground leading-tight">
                                    {copy.title}
                                </h2>
                                <p className="mt-5 text-base font-medium text-muted-foreground leading-relaxed">
                                    {copy.body}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Beat progress */}
                        <div className="mt-10 flex gap-2" aria-hidden>
                            {ORDER.map((b) => (
                                <div
                                    key={b}
                                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${b === beat ? "bg-primary" : "bg-border"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Canvas side */}
                    <div className="order-1 lg:order-2">
                        <CanvasMock beat={beat} />
                    </div>
                </div>
            </div>
        </section>
    );
}
