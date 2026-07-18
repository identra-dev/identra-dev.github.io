"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LiveTerminal } from "@/components/ui/LiveTerminal";
import { GITHUB_URL } from "@/lib/site";

export function Hero() {
    return (
        <section
            id="hero-section"
            className="relative w-full overflow-hidden bg-background pt-36 pb-24 md:pt-44 md:pb-28"
        >
            {/* One soft orange bloom, low and centered — the only colour in the field */}
            <div
                className="pointer-events-none absolute left-1/2 top-[-10%] -z-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[120px]"
                style={{ background: "radial-gradient(closest-side, rgba(233,84,32,0.18), transparent)" }}
                aria-hidden
            />

            <div className="relative z-10 container mx-auto px-6">
                <div className="mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="neu-inset mb-9 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-status-pulse" aria-hidden />
                        <span className="font-mono text-[11px] font-medium tracking-wide text-muted-foreground">
                            Early · Linux today · macOS in progress
                        </span>
                    </motion.div>

                    <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.75rem] pb-[0.08em]">
                        <TextReveal text="Your agents" />
                        <span className="text-primary">
                            <TextReveal text="stop forgetting." delay={0.18} />
                        </span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto mt-8 max-w-2xl font-sans text-lg font-medium leading-relaxed text-muted-foreground md:text-xl"
                    >
                        Every coding agent you already have — the real CLI, your config, your
                        login — on one local canvas, with a memory that compounds across agents
                        and sessions.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
                    >
                        <MagneticButton strength={0.4}>
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noreferrer"
                                className="neu-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-base font-bold"
                            >
                                <Github className="mr-2 h-4 w-4" aria-hidden />
                                View on GitHub
                            </a>
                        </MagneticButton>

                        <MagneticButton strength={0.3}>
                            <Link
                                href="#how-it-works"
                                className="neu-btn group inline-flex h-12 items-center justify-center rounded-full px-7 text-base font-bold text-foreground"
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
                        className="mt-8 font-mono text-xs font-medium text-muted-foreground/80"
                    >
                        Apache-2.0 · Runs on your machine · No accounts, no telemetry
                    </motion.p>
                </div>

                {/* Signature: a live agent session that lands on the memory beat */}
                <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mx-auto mt-16 w-full max-w-2xl md:mt-20"
                >
                    <LiveTerminal />
                </motion.div>
            </div>
        </section>
    );
}
