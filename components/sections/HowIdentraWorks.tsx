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
        tag: "01 / Fidelity",
        title: "Full fidelity",
        description:
            "Drop an agent node and it spawns the real CLI in a real PTY — your environment, your config, your login. No shell wrapper, no sandbox pretending to be your machine.",
    },
    {
        tag: "02 / Continuity",
        title: "It persists",
        description:
            "Nodes, edges and layout save to .identra/canvas.json inside your project with a debounced atomic write. Close the app, open it next week, everything is where you left it.",
    },
    {
        tag: "03 / Memory",
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
                className="flex items-end h-full pb-24 md:pb-32 pl-[5vw] pr-[20vw] md:pl-[30vw] md:pr-[20vw] gap-[5vw] md:gap-[15vw] w-fit"
            >
                {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={step.tag}
                            className={`relative flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[32vw] h-auto min-h-[50vh] max-h-[75vh] flex flex-col justify-end transition-all duration-700 ease-out ${isActive ? "scale-100 opacity-100 blur-0" : "scale-90 opacity-30 blur-[2px]"
                                }`}
                        >
                            <div className="relative group h-full flex flex-col">
                                <div
                                    className={`absolute inset-0 rounded-[26px] bg-background transition-all duration-700 ease-out ${isActive ? "neu" : "neu-sm opacity-70"
                                        }`}
                                />

                                <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
                                    <div
                                        className={`flex flex-col gap-2 transition-all duration-500 ${isActive ? "opacity-100 translate-y-0" : "opacity-40 translate-y-2"
                                            }`}
                                    >
                                        <span className="font-mono text-[10px] font-semibold tracking-[0.3em] uppercase text-primary">
                                            {step.tag}
                                        </span>
                                        <div
                                            className={`h-px bg-gradient-to-r from-primary to-transparent transition-all duration-700 ${isActive ? "w-full opacity-100" : "w-0 opacity-0"
                                                }`}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-6 md:gap-8">
                                        <h3
                                            className={`text-5xl md:text-6xl font-display font-extrabold tracking-[-0.03em] text-foreground leading-[0.95] transition-all duration-700 ${isActive ? "translate-x-0" : "-translate-x-4"
                                                }`}
                                        >
                                            {step.title}
                                        </h3>

                                        <div
                                            className={`overflow-hidden transition-all duration-700 delay-100 ${isActive ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                                                }`}
                                        >
                                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
