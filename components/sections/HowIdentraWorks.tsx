"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  The real pipeline, from the identra README ("How it works") and PRD.
  There is no cloud step. Identra never phones home — do not reintroduce one here.
*/
const STEPS = [
    {
        step: "01",
        tag: "Fidelity",
        title: "Full fidelity",
        description:
            "Drop an agent node and it spawns the real CLI in a real PTY, with your environment, config, and login. There is no shell wrapper and no sandbox pretending to be your machine.",
    },
    {
        step: "02",
        tag: "Continuity",
        title: "It persists",
        description:
            "Nodes, edges and layout save to .identra/canvas.json inside your project with a debounced atomic write. Close the app, open it next week, everything is where you left it.",
    },
    {
        step: "03",
        tag: "Memory",
        title: "It remembers",
        description:
            "After a session, one extraction pass pulls the durable facts, dedupes by content hash, embeds locally with fastembed, and stores them in a local SQLite database with a vector index.",
    },
];

export function HowIdentraWorks() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sectionRef.current, {
                x: () => -(sectionRef.current!.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const index = Math.round(self.progress * (STEPS.length - 1));
                        setActiveIndex(index);
                    },
                },
            });

            gsap.to(headerRef.current, {
                x: -800,
                opacity: 0,
                ease: "power1.in",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "+=800",
                    scrub: 1,
                },
            });
        }, triggerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={triggerRef}
            className="relative h-screen bg-background overflow-hidden"
            id="how-it-works"
        >
            <div ref={headerRef} className="absolute top-28 left-6 md:left-24 z-20 pointer-events-none">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-display font-extrabold tracking-[-0.03em] text-foreground"
                >
                    How Identra works
                </motion.h2>
            </div>

            <div
                ref={sectionRef}
                className="flex items-center h-full pl-[6vw] pr-[20vw] md:pl-[26vw] md:pr-[16vw] gap-[6vw] md:gap-[6vw] w-fit"
            >
                {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={step.tag}
                            className={`relative flex-shrink-0 w-[82vw] md:w-[44vw] lg:w-[30rem] transition-all duration-700 ease-out ${isActive ? "scale-100 opacity-100 blur-0" : "scale-95 opacity-45 blur-[1px]"
                                }`}
                        >
                            <div
                                className={`flex flex-col gap-8 rounded-[28px] bg-background p-9 md:p-11 transition-all duration-700 ease-out ${isActive ? "neu" : "neu-sm"
                                    }`}
                            >
                                {/* Top row: tag + oversized step numeral (no icons) */}
                                <div className="flex items-start justify-between">
                                    <span className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-primary">
                                        {step.tag}
                                    </span>
                                    <span
                                        className={`font-display text-[4.5rem] font-extrabold leading-none tracking-[-0.04em] transition-colors duration-500 ${isActive ? "text-primary/25" : "text-foreground/[0.07]"
                                            }`}
                                    >
                                        {step.step}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h3 className="font-display text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-foreground leading-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-[15px] md:text-base font-medium text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
