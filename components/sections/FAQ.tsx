"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

/*
  Answers are the honest ones, sourced from the identra README, PLATFORMS.md and
  DISTRIBUTION.md. The audience will clone the repo and check — an FAQ that
  oversells is worse than no FAQ.
*/
const FAQS = [
    {
        q: "Which agents does it run?",
        a: "Whatever you already have on your PATH. A node spawns the real CLI — codex today, with the dock reflecting which agents are installed and signed in. Identra doesn't wrap or re-implement the agent, so the Claude Code inside Identra is the Claude Code you already use, with your skills and config intact.",
    },
    {
        q: "Do you get my API keys?",
        a: "No. Your keys stay in your agent's own CLI config, where they already live. Identra never reads them, never stores them, and never proxies your requests. It has no server to send them to.",
    },
    {
        q: "Does anything leave my machine?",
        a: "No. There is no backend, no accounts and no telemetry. Memory extracts and embeds locally with fastembed into a SQLite file on your disk. Canvas state is a .identra/canvas.json inside your project, gitignored by default.",
    },
    {
        q: "Is the memory actually working?",
        a: "Partly, and the Status section says exactly where. The crate is built — extraction, dedupe by content hash and local embeddings all work — but it is not yet wired into the recall path in the UI. That's the next thing, not a shipped feature.",
    },
    {
        q: "What do I need to run it?",
        a: "Rust and Cargo, the Tauri CLI, bun, just, and webkitgtk with its build deps. Run just doctor and it tells you what's missing. You also want codex on your PATH — without it a node still opens, it just says the binary is missing rather than pretending to work.",
    },
    {
        q: "Is there a download?",
        a: "Not yet. There's no packaged release, so you build from source, and the first build takes a minute while the Rust side compiles. Linux works today, macOS builds are in progress, and Windows is deferred.",
    },
    {
        q: "Why does it look like Ubuntu?",
        a: "Because it's meant to feel like part of your desktop rather than a browser tab pretending to be an app. The Yaru look is deliberate.",
    },
];

export function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="relative w-full bg-background py-28 md:py-36">
            <div className="container mx-auto px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <p className="text-[9px] font-mono font-semibold text-primary uppercase tracking-[0.4em] mb-3">
                        FAQ
                    </p>
                    <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-[-0.03em] text-foreground">
                        The questions you&apos;d ask.
                    </h2>
                </motion.div>

                <div className="space-y-4">
                    {FAQS.map((faq, i) => {
                        const isOpen = open === i;
                        return (
                            <div
                                key={faq.q}
                                className={`rounded-2xl bg-background px-6 transition-shadow duration-300 ${isOpen ? "neu-inset" : "neu-sm"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                                >
                                    <span
                                        className={`font-display text-base md:text-lg font-bold transition-colors ${isOpen ? "text-primary" : "text-foreground"
                                            }`}
                                    >
                                        {faq.q}
                                    </span>
                                    <span className="neu-sm grid h-7 w-7 shrink-0 place-items-center rounded-full">
                                        <Plus
                                            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45 text-primary" : "text-muted-foreground"
                                                }`}
                                            aria-hidden
                                        />
                                    </span>
                                </button>

                                {/* Grid-rows trick animates to auto height without measuring. */}
                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="pb-6 pr-10 text-sm md:text-base font-medium text-muted-foreground leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
