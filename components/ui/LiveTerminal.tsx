"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/*
  The hero signature: a live agent node that types a real-looking codex session
  and lands on the memory beat — the product thesis, alive, in ~6 seconds.
  On-subject (agents in real terminals + compounding memory), not a templated
  hero graphic. Dark terminal on the light neumorphic page, framed in neu.

  Respects reduced-motion: renders the finished session immediately.
*/

type Line = {
    text: string;
    kind: "prompt" | "out" | "memory";
    // pause before this line starts (ms)
    lead?: number;
};

const SESSION: Line[] = [
    { text: `$ codex "add rate limiting to the checkout API"`, kind: "prompt" },
    { text: "→ opened src/api/checkout.ts", kind: "out", lead: 260 },
    { text: "→ added a token-bucket limiter, wrote a test", kind: "out", lead: 200 },
    { text: "◆ Identra remembered — you use Redis here, not in-memory", kind: "memory", lead: 420 },
];

const CHAR_MS = 22;

export function LiveTerminal() {
    // How many lines are done + chars typed on the active line.
    const [done, setDone] = useState(0);
    const [chars, setChars] = useState(0);
    const [finished, setFinished] = useState(false);
    const reduce = useRef(false);

    useEffect(() => {
        reduce.current =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let cancelled = false;
        const timers: ReturnType<typeof setTimeout>[] = [];
        const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));

        const typeLine = (i: number) => {
            if (cancelled) return;
            if (i >= SESSION.length) {
                setFinished(true);
                return;
            }
            const line = SESSION[i];
            const finishLine = () => {
                setDone(i + 1);
                setChars(0);
                at(() => typeLine(i + 1), reduce.current ? 0 : 320);
            };
            // Reduced motion: no per-character typing, just reveal each line.
            if (reduce.current) {
                setChars(line.text.length);
                finishLine();
                return;
            }
            const start = () => {
                let c = 0;
                const tick = () => {
                    if (cancelled) return;
                    c += 1;
                    setChars(c);
                    if (c < line.text.length) at(tick, CHAR_MS);
                    else finishLine();
                };
                tick();
            };
            at(start, line.lead ?? 500);
        };

        typeLine(0);
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="neu rounded-3xl bg-background p-2.5">
            <div className="overflow-hidden rounded-[18px] bg-[#1a1618]">
                {/* Title bar */}
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-primary animate-status-pulse" aria-hidden />
                    <span className="font-mono text-[11px] text-white/70">codex</span>
                    <span className="ml-1 font-mono text-[11px] text-white/35">~/checkout-service</span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-white/30">
                        live
                    </span>
                </div>

                {/* Pane */}
                <div className="min-h-[168px] px-5 py-4 font-mono text-[12.5px] leading-[1.7] md:text-[13.5px]">
                    {SESSION.map((line, i) => {
                        const isActive = i === done && !finished;
                        const isVisible = i < done || isActive;
                        if (!isVisible) return null;
                        const shown = isActive ? line.text.slice(0, chars) : line.text;

                        if (line.kind === "memory") {
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: -3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 inline-flex max-w-full items-center gap-2 rounded-lg border border-aubergine/50 bg-aubergine/20 px-2.5 py-1.5 text-[#e7c9e4]"
                                >
                                    <span className="whitespace-pre-wrap break-words">{shown}</span>
                                </motion.div>
                            );
                        }
                        return (
                            <div
                                key={i}
                                className={line.kind === "prompt" ? "text-white/90" : "text-white/50"}
                            >
                                <span className="whitespace-pre-wrap break-words">{shown}</span>
                                {isActive && (
                                    <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] bg-primary" />
                                )}
                            </div>
                        );
                    })}
                    {finished && (
                        <div className="text-white/90">
                            <span className="text-white/40">$ </span>
                            <span className="inline-block h-3.5 w-[7px] translate-y-[2px] bg-primary animate-caret" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
