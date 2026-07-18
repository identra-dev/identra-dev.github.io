"use client";

import { motion } from "framer-motion";
import { CodeBlock } from "@/components/ui/code-block";

/*
  Local-first, shown by lifting the hood: the actual network surface, where the
  keys live, and the on-disk store. Every claim here is true and checkable in the
  identra repo. Sources: README "Where your data lives", PRD §5.
*/
const CLAIMS = [
    {
        tag: "No phone-home",
        title: "It never calls out.",
        body: "Identra has no server and no accounts. There is no backend to breach because your work never leaves the machine it runs on.",
        stat: "None",
    },
    {
        tag: "Credentials",
        title: "Your keys stay yours.",
        body: "Agent API keys live in your agent's own CLI config, where they already are. Identra never reads, stores, or proxies them.",
        stat: "Zero",
    },
    {
        tag: "Local memory",
        title: "Embedded on your disk.",
        body: "Memory extracts facts and embeds them locally with fastembed into one SQLite file. With no model configured it stores text verbatim rather than guessing.",
        stat: "SQLite",
    },
];

const TABS = [
    {
        name: "No phone-home",
        language: "bash",
        code: `# Identra has no backend, no accounts, no telemetry.
# There is no server to breach.

$ lsof -nP -iTCP -sTCP:ESTABLISHED -p $(pgrep -f identra)
#  -> nothing. Identra opens no remote sockets.

# Your agents still reach their own APIs,
# exactly as they did before Identra.`,
    },
    {
        name: "Credentials",
        language: "ini",
        code: `# Keys live in each agent's own CLI config,
# exactly where they already are:
#   ~/.codex/     ~/.gemini/     ~/.claude/

# Identra's access to them:
reads   = never
stores  = never
proxies = never`,
    },
    {
        name: "Local memory",
        language: "sql",
        code: `-- Facts extracted after a session, embedded locally
-- with fastembed, into ONE SQLite file on your disk:
--   ~/.identra/memory.db

CREATE TABLE facts (
  id         INTEGER PRIMARY KEY,
  text       TEXT NOT NULL,   -- verbatim if no model set
  embedding  BLOB,            -- fastembed, on-device
  hash       TEXT UNIQUE,     -- dedupe by content
  created_at INTEGER
);`,
    },
];

export function SecurityTrust() {
    return (
        <section id="local-first" className="relative w-full bg-background py-24 md:py-32">
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                >
                    <p className="mb-3 font-mono text-[9px] font-semibold uppercase tracking-[0.4em] text-primary">
                        Local-first
                    </p>
                    <h2 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-5xl">
                        Where your data lives
                    </h2>
                    <p className="mt-5 text-base font-medium leading-relaxed text-muted-foreground">
                        No server, no accounts, no telemetry. The whole surface sits on your
                        machine, and it&apos;s Apache-2.0, so none of this is a claim you have to
                        take on faith.
                    </p>
                </motion.div>

                <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    {/* The claims, in plain language */}
                    <div className="flex flex-col gap-8">
                        {CLAIMS.map((c, i) => (
                            <motion.div
                                key={c.tag}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.3em] text-primary">
                                        {c.tag}
                                    </span>
                                    <span className="neu-inset rounded-full px-2.5 py-1 font-mono text-[10px] font-bold text-foreground">
                                        {c.stat}
                                    </span>
                                </div>
                                <h3 className="mt-2.5 font-display text-xl font-extrabold tracking-[-0.02em] text-foreground">
                                    {c.title}
                                </h3>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-muted-foreground">
                                    {c.body}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* The hood: the actual internals, framed in neu */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="neu-inset rounded-[22px] bg-background p-2"
                    >
                        <CodeBlock language="bash" filename="identra" tabs={TABS} />
                    </motion.div>
                </div>

                <p className="mt-14 text-center font-mono text-xs font-medium text-muted-foreground">
                    Canvas state lives in{" "}
                    <span className="text-foreground/70">.identra/canvas.json</span> inside your
                    project · check all of it yourself
                </p>
            </div>
        </section>
    );
}
