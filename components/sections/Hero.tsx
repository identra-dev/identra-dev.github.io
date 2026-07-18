"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Play } from "lucide-react";
import Link from "next/link";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AGENTS } from "@/components/ui/agent-icons";
import { GitHubStars } from "@/components/ui/GitHubStars";
import { GITHUB_URL } from "@/lib/site";

// Split hero (cluely/pluely layout), neumorphic: copy on the left, the product
// demo on the right. Orange is the only accent.

export function Hero() {
    return (
        <section
            id="hero-section"
            className="relative w-full overflow-hidden bg-background pt-32 pb-12 md:pt-40 md:pb-16"
        >
            {/* Soft wallpaper glow behind the window — the only colour in the field */}
            <div
                className="pointer-events-none absolute right-[6%] top-[10%] -z-0 h-[560px] w-[720px] rounded-full opacity-60 blur-[130px]"
                style={{ background: "radial-gradient(closest-side, rgba(233,84,32,0.16), transparent)" }}
                aria-hidden
            />

            <div className="relative z-10 container mx-auto px-6">
                <div className="mx-auto grid max-w-7xl items-center gap-x-10 gap-y-14 lg:grid-cols-[0.9fr_1.1fr]">
                    {/* ---------- LEFT: copy ---------- */}
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="mb-7"
                        >
                            <GitHubStars />
                        </motion.div>

                        <h1 className="font-display text-[2.75rem] font-extrabold tracking-[-0.04em] text-foreground sm:text-[3.4rem] lg:text-[3.1rem] xl:text-[3.9rem]">
                            <TextReveal text="Your agents" />
                            <TextReveal text="keep forgetting." delay={0.12} />
                            <span className="relative inline-block text-primary">
                                <TextReveal text="Identra doesn't." delay={0.24} />
                                <motion.svg
                                    aria-hidden
                                    viewBox="0 0 300 12"
                                    preserveAspectRatio="none"
                                    className="absolute -bottom-1 left-0 h-2.5 w-full text-primary"
                                >
                                    <motion.path
                                        d="M4 7 Q 76 1.5 150 5.5 T 296 5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        strokeLinecap="round"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 0.8, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                </motion.svg>
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-7 max-w-xl font-sans text-lg font-medium leading-relaxed text-muted-foreground md:text-xl"
                        >
                            Claude Code, Codex, Gemini, every CLI you already run, all on one
                            local canvas. Real terminals, one shared memory, and you stop
                            explaining the same thing twice.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                            className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
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
                                    See it in action
                                    <ArrowRight className="ml-2 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-1" aria-hidden />
                                </Link>
                            </MagneticButton>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="mt-7 font-mono text-xs font-medium text-muted-foreground/80"
                        >
                            Apache-2.0 · No accounts, no telemetry · Linux today, macOS in progress
                        </motion.p>
                    </div>

                    {/* ---------- RIGHT: product demo window ---------- */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                    >
                        <div className="neu rounded-[32px] bg-background p-3.5">
                            <div className="overflow-hidden rounded-[24px] neu-inset">
                                {/* Title bar (bezel — keep or drop) */}
                                <div className="flex items-center gap-3 px-6 py-4">
                                    <div className="flex items-center gap-1.5" aria-hidden>
                                        <span className="h-2.5 w-2.5 rounded-full neu-sm" />
                                        <span className="h-2.5 w-2.5 rounded-full neu-sm" />
                                        <span className="h-2.5 w-2.5 rounded-full neu-sm" />
                                    </div>
                                    <span className="ml-1 font-display text-[13px] font-bold text-foreground">Identra</span>
                                    <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-status-pulse" />
                                        3 agents · 1 memory
                                    </span>
                                </div>

                                {/*
                                  DEMO SLOT — your product clip lives here. Drop the file in /public,
                                  then replace the placeholder <div> below with ONE of:

                                    <video src="/demo.mp4" autoPlay muted loop playsInline
                                           className="block aspect-[16/10] w-full object-cover" />

                                    <img src="/demo.webp" alt="Identra demo"
                                         className="block aspect-[16/10] w-full object-cover" />
                                */}
                                <div className="relative aspect-[16/10] w-full">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                        <span className="neu grid h-16 w-16 place-items-center rounded-full text-primary">
                                            <Play className="h-6 w-6 translate-x-0.5" aria-hidden />
                                        </span>
                                        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                                            Product demo
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Agents band — the very bottom of the hero */}
                <div id="agents" className="mx-auto mt-6 max-w-4xl text-center">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground"
                    >
                        Bring the agents you already run
                    </motion.p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                        {AGENTS.map(({ name, Icon }, i) => (
                            <motion.div
                                key={name}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className="neu inline-flex items-center gap-2.5 rounded-2xl bg-background px-4 py-3"
                            >
                                <span className="neu-sm grid h-9 w-9 place-items-center rounded-xl">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span className="font-display text-sm font-bold tracking-tight text-foreground">
                                    {name}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
