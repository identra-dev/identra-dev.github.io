"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Spotlight } from "@/components/ui/spotlight-new";
import { GITHUB_URL } from "@/lib/site";

// Ubuntu orange (#E95420) is ~hsl(15, 82%, 52%). The component ships blue.
const SPOT_1 =
    "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(15, 82%, 70%, .10) 0, hsla(15, 82%, 52%, .03) 50%, hsla(15, 82%, 45%, 0) 80%)";
const SPOT_2 =
    "radial-gradient(50% 50% at 50% 50%, hsla(15, 82%, 70%, .07) 0, hsla(15, 82%, 52%, .02) 80%, transparent 100%)";
const SPOT_3 =
    "radial-gradient(50% 50% at 50% 50%, hsla(310, 56%, 40%, .05) 0, hsla(310, 56%, 30%, .02) 80%, transparent 100%)";

export function Hero() {
    return (
        <section
            id="hero-section"
            className="relative w-full overflow-hidden bg-transparent pt-36 pb-24 md:pt-44 md:pb-32"
        >
            <Spotlight
                gradientFirst={SPOT_1}
                gradientSecond={SPOT_2}
                gradientThird={SPOT_3}
                translateY={-320}
                duration={9}
            />

            <div className="relative z-10 container mx-auto px-6">
                {/* Centered statement */}
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 backdrop-blur-sm"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-status-pulse" aria-hidden />
                        <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                            Early · Linux today · macOS in progress
                        </span>
                    </motion.div>

                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.75rem] font-bold tracking-[-0.035em] text-foreground leading-[1.06] pb-[0.08em]">
                        <TextReveal text="Your agents" />
                        <span className="text-primary">
                            <TextReveal text="stop forgetting." delay={0.18} />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto mt-8 max-w-2xl font-sans text-lg md:text-xl text-muted-foreground leading-relaxed"
                    >
                        Every coding agent you already have — the real CLI, your config, your
                        login — on one local canvas, with a memory that compounds across agents
                        and sessions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <MagneticButton strength={0.4}>
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                            >
                                <Github className="mr-2 h-4 w-4" aria-hidden />
                                View on GitHub
                            </a>
                        </MagneticButton>

                        <MagneticButton strength={0.3}>
                            <Link
                                href="#how-it-works"
                                className="group inline-flex h-12 items-center justify-center rounded-full border border-border bg-foreground/[0.02] px-7 text-base font-medium text-foreground backdrop-blur-sm transition-all hover:bg-foreground/[0.06]"
                            >
                                How it works
                                <ArrowRight className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" aria-hidden />
                            </Link>
                        </MagneticButton>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="mt-7 font-mono text-xs text-muted-foreground/70"
                    >
                        Apache-2.0 · Runs on your machine · No accounts, no telemetry
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
