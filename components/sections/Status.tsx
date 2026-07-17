"use client";

import { motion } from "framer-motion";
import { Check, CircleDashed } from "lucide-react";

/*
  Honest status, mirroring the README "Status" section and PLATFORMS.md.
  If something moves on or off the working list in the repo, move it here too.
  Shipping a claim before the code is the one thing this page must never do.
*/
const WORKING = [
    "Agent nodes, each running a real CLI in its own live PTY",
    "A canvas that persists and restores from .identra/canvas.json",
    "A dock reflecting which agents you have installed and signed into",
    "Edges: two wired agents share context over the MCP bus",
];

const IN_PROGRESS = [
    "Memory: the crate is built and extraction plus local embeddings work, but it is not yet on the recall path in the UI",
    "The browser node ships as a live preview; the agent-drive half needs Chromium",
    "macOS builds in CI — Windows is deferred",
];

export function Status() {
    return (
        <section id="status" className="relative w-full bg-background py-28 md:py-36">
            <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-[9px] font-mono text-primary uppercase tracking-[0.4em] mb-3">
                        Status
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight text-foreground">
                        Where this is today
                    </h2>
                    <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                        Identra is early, and honest about it. Rather than ship a wide surface half
                        working, the core works and the rest says so.
                    </p>
                </motion.div>

                <div className="mt-14 grid gap-12 md:grid-cols-2">
                    <StatusList
                        heading="Working now"
                        items={WORKING}
                        icon={<Check className="h-3.5 w-3.5 text-primary" aria-hidden />}
                        delay={0.05}
                    />
                    <StatusList
                        heading="In progress"
                        items={IN_PROGRESS}
                        icon={<CircleDashed className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />}
                        delay={0.15}
                        muted
                    />
                </div>
            </div>
        </section>
    );
}

function StatusList({
    heading,
    items,
    icon,
    delay,
    muted = false,
}: {
    heading: string;
    items: string[];
    icon: React.ReactNode;
    delay: number;
    muted?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70 mb-5">
                {heading}
            </h3>
            <ul className="space-y-4">
                {items.map((item) => (
                    <li key={item} className="flex gap-3">
                        <span className="mt-1 flex-shrink-0">{icon}</span>
                        <span
                            className={`text-sm leading-relaxed ${muted ? "text-muted-foreground/70" : "text-foreground/90"
                                }`}
                        >
                            {item}
                        </span>
                    </li>
                ))}
            </ul>
        </motion.div>
    );
}
