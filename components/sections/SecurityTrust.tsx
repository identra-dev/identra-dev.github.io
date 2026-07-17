"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionStyle } from "framer-motion";
import { CometCard } from "@/components/ui/comet-card";

/*
  Every claim here must be true and checkable in the identra repo.
  Identra has no server, no accounts and no telemetry — so there is no transport
  layer, no edge network and no enclave to talk about. Do not invent one.
  Sources: README "Where your data lives", PRD §5 (non-functional requirements).
*/
const CARDS = [
    {
        tag: "No phone-home",
        title: "It never calls out.",
        body: "Identra has no server and no accounts. There is no backend to breach because your work never leaves the machine it runs on.",
        detail: { label: "Telemetry", value: "None" },
        glow: "rgba(233, 84, 32, 0.7)",
    },
    {
        tag: "Credentials",
        title: "Your keys stay yours.",
        body: "Agent API keys live in your agent's own CLI config, where they already are. Identra never reads them, never stores them, and never proxies your requests.",
        detail: { label: "Keys stored by Identra", value: "Zero" },
        glow: "rgba(119, 33, 111, 0.7)",
    },
    {
        tag: "Local memory",
        title: "Embedded on your disk.",
        body: "Memory extracts facts and embeds them locally with fastembed, into one SQLite file. With no model configured it stores the text verbatim rather than guessing.",
        detail: { label: "Store", value: "Local SQLite" },
        glow: "rgba(233, 84, 32, 0.7)",
    },
];

export function SecurityTrust() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.12], [0, -30]);

    // The stack fans apart as you scroll.
    const card1X = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "-120%"]);
    const card1Rotate = useTransform(scrollYProgress, [0.15, 0.6], [0, -6]);
    const card1Scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);
    const card2Scale = useTransform(scrollYProgress, [0, 0.15], [0.96, 1]);
    const card3X = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "120%"]);
    const card3Rotate = useTransform(scrollYProgress, [0.15, 0.6], [0, 6]);
    const card3Scale = useTransform(scrollYProgress, [0, 0.15], [0.88, 1]);

    const transforms: MotionStyle[] = [
        { x: card1X, rotateZ: card1Rotate, scale: card1Scale },
        { scale: card2Scale },
        { x: card3X, rotateZ: card3Rotate, scale: card3Scale },
    ];

    return (
        <section
            id="local-first"
            ref={containerRef}
            className="relative h-[250vh] bg-background w-full"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
                <motion.div
                    className="absolute top-24 md:top-28 text-center z-50"
                    style={{ opacity: headerOpacity, y: headerY }}
                >
                    <p className="text-[9px] font-mono text-primary uppercase tracking-[0.4em] mb-3">
                        Local-first
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-normal tracking-tight text-foreground">
                        Where your data lives
                    </h2>
                </motion.div>

                <div className="relative flex items-center justify-center w-full h-[500px] mt-8">
                    {CARDS.map((card, i) => (
                        <CometCard
                            key={card.tag}
                            className={`absolute w-[260px] md:w-[300px] h-[400px] md:h-[440px] ${i === 1 ? "z-20" : "z-10"
                                }`}
                            glowColor={card.glow}
                            style={transforms[i]}
                        >
                            <div className="w-full h-full rounded-2xl border border-border bg-surface flex flex-col overflow-hidden">
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                                <div className="p-6 flex flex-col h-full">
                                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                                        {card.tag}
                                    </span>

                                    <h3 className="mt-6 text-2xl md:text-3xl font-display font-normal tracking-tight text-foreground leading-tight mb-5">
                                        {card.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed mb-auto">
                                        {card.body}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-background/40 px-4 py-3">
                                        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">
                                            {card.detail.label}
                                        </span>
                                        <span className="font-mono text-xs text-primary">
                                            {card.detail.value}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CometCard>
                    ))}
                </div>

                <p className="absolute bottom-16 px-6 text-center font-mono text-xs text-muted-foreground/70">
                    Canvas state lives in .identra/canvas.json in your project · Apache-2.0, so
                    you can check all of this yourself
                </p>
            </div>
        </section>
    );
}
