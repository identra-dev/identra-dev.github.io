"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, X, Terminal, StickyNote, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  A representation of the real Identra canvas: agent nodes, dock, edges, recall banner.
  Node anatomy and states follow identra-ops/DESIGN.md §3–§4.
  Every element here maps to something that exists — do not invent UI.

  Shared by the hero (static, shows the product immediately) and the scroll-driven
  walkthrough in ProductExperience.
*/

export type Beat = "empty" | "node" | "wired" | "recall";

const STATE_DOT: Record<string, string> = {
    running: "bg-primary animate-status-pulse",
    idle: "bg-muted-foreground/50",
};

// The mock is laid out once at a fixed design size and scaled to fit its container.
// Node heights are driven by their text, so they don't scale with a percentage
// layout — mixing the two made the edge endpoints drift apart at larger sizes.
// Designing at one size and scaling the whole board keeps every element locked
// together at any width.
const DESIGN_W = 600;
const DESIGN_H = 450; // 4:3

export function CanvasMock({ beat, className }: { beat: Beat; className?: string }) {
    return (
        <div
            className={cn(
                "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1618] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]",
                className
            )}
            style={{ containerType: "inline-size" }}
        >
            <div
                className="absolute left-0 top-0 origin-top-left"
                style={{
                    width: DESIGN_W,
                    height: DESIGN_H,
                    transform: `scale(calc(100cqi / ${DESIGN_W}))`,
                }}
            >
                <div className="absolute inset-0 canvas-grid" />

            {/* Empty-state hint */}
            <AnimatePresence>
                {beat === "empty" && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center text-center px-6 font-mono text-xs text-white/40"
                    >
                        Right-click or use the dock to add an agent
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Edge between the two nodes */}
            <AnimatePresence>
                {(beat === "wired" || beat === "recall") && (
                    <motion.svg
                        className="absolute inset-0 h-full w-full pointer-events-none"
                        viewBox="0 0 400 300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        aria-hidden
                    >
                        {/*
                            Percentages are invalid in a path `d`, so this draws in viewBox units
                            matching the 4:3 frame. The aspect ratio has to stay uniform: framer
                            animates pathLength as a stroke dash, and a stretched viewBox shears
                            the dashes into visible gaps. Endpoints run from the bottom of the
                            top-left node to the top of the bottom-right one, tucked slightly under
                            both so no gap shows at either beat (the nodes are later siblings, so
                            they paint over the ends). Keep them in step with the node positions
                            below.
                        */}
                        <motion.path
                            d="M 126 94 C 170 125, 222 152, 276 182"
                            fill="none"
                            stroke="#e95420"
                            strokeWidth="2"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                    </motion.svg>
                )}
            </AnimatePresence>

            {/* Primary agent node */}
            <AnimatePresence>
                {beat !== "empty" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-[5%] top-[8%] w-[55%]"
                    >
                        <AgentNode
                            agent="codex"
                            cwd="~/project"
                            state="running"
                            lines={["$ codex", "> building the auth module..."]}
                            caret
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Second node: plain terminal when wired, fresh agent with recall at the payoff */}
            <AnimatePresence mode="wait">
                {beat === "wired" && (
                    <motion.div
                        key="wired-node"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-[5%] bottom-[19%] w-[55%]"
                    >
                        <AgentNode
                            agent="claude"
                            cwd="~/project"
                            state="idle"
                            lines={["$ claude", "> reading shared context..."]}
                        />
                    </motion.div>
                )}

                {beat === "recall" && (
                    <motion.div
                        key="recall-node"
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-[5%] bottom-[19%] w-[55%]"
                    >
                        <AgentNode agent="codex" cwd="~/project" state="idle" recall />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dock */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-xl border border-white/10 bg-[#2c2226]/90 px-1.5 py-1.5 backdrop-blur-sm">
                {[
                    { icon: Plus, label: "Codex" },
                    { icon: Terminal, label: "Terminal" },
                    { icon: StickyNote, label: "Note" },
                ].map(({ icon: Icon, label }) => (
                    <div
                        key={label}
                        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-white/55"
                    >
                        <Icon className="h-3 w-3" aria-hidden />
                        {label}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

function AgentNode({
    agent,
    cwd,
    state,
    lines = [],
    caret = false,
    recall = false,
}: {
    agent: string;
    cwd: string;
    state: "running" | "idle";
    lines?: string[];
    caret?: boolean;
    recall?: boolean;
}) {
    return (
        <div className="rounded-[10px] border border-white/10 bg-[#2c2226] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)] overflow-hidden">
            {/* Title bar: status dot + agent + cwd + menu */}
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-2.5 py-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${STATE_DOT[state]}`} aria-hidden />
                <span className="font-mono text-[10px] text-white/90">{agent}</span>
                <span className="font-mono text-[10px] text-white/40 ml-1">{cwd}</span>
                <div className="ml-auto flex items-center gap-1.5 text-white/40" aria-hidden>
                    <MoreHorizontal className="h-3 w-3" />
                    <X className="h-3 w-3" />
                </div>
            </div>

            {/* Pane */}
            <div className="px-2.5 py-2.5 font-mono text-[10px] leading-relaxed min-h-[76px]">
                {recall && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="mb-2 rounded-md border border-aubergine/60 bg-aubergine/15 px-2 py-1.5"
                    >
                        <div className="text-[9px] uppercase tracking-wider text-white/80">
                            Identra remembers · 3 facts
                        </div>
                        <ul className="mt-1 space-y-0.5 text-white/55">
                            <li>• Auth uses JWT, not sessions</li>
                            <li>• The 3-step onboarding was rejected</li>
                            <li>• DB is Postgres + sqlx</li>
                        </ul>
                    </motion.div>
                )}
                {lines.map((line) => (
                    <div
                        key={line}
                        className={line.startsWith("$") ? "text-white/90" : "text-white/55"}
                    >
                        {line}
                    </div>
                ))}
                {recall && <div className="text-white/90">$ codex</div>}
                {(caret || recall) && (
                    <span className="inline-block h-3 w-1.5 bg-primary animate-caret align-middle" aria-hidden />
                )}
            </div>
        </div>
    );
}
