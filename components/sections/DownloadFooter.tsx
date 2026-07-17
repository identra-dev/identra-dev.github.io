"use client";

import { motion } from "framer-motion";
import { Check, Copy, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GITHUB_URL, QUICK_START } from "@/lib/site";

/*
  There are no releases yet, so there is no download button. Build from source is
  the honest ask. When tauri-action starts publishing .AppImage/.deb/.dmg to a
  GitHub Release (see identra-ops/DISTRIBUTION.md), swap the primary CTA for it.
*/
const REQUIREMENTS = [
    "Rust + Cargo, the Tauri CLI, bun, and just",
    "webkitgtk and its build deps (just doctor lists what you're missing)",
    "codex on your PATH for an agent node to run something",
];

const FOOTER_LINKS = [
    { label: "GitHub", href: GITHUB_URL },
    { label: "Architecture", href: `${GITHUB_URL}/tree/main/docs` },
    { label: "License", href: `${GITHUB_URL}/blob/main/LICENSE` },
    { label: "Issues", href: `${GITHUB_URL}/issues` },
];

export function DownloadFooter() {
    return (
        <section className="w-full pt-24 pb-8 md:pt-32 md:pb-12 bg-background relative overflow-hidden flex flex-col items-center border-t border-border">
            <div className="absolute inset-0 canvas-grid opacity-30 pointer-events-none" />

            <div className="container px-6 relative z-10 w-full max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <h2 className="font-display text-3xl md:text-5xl font-normal tracking-tight text-foreground">
                        Run it on your machine.
                    </h2>
                    <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        No packaged build yet — you build it from source, and it takes a minute the
                        first time while the Rust side compiles. Linux today, macOS in progress.
                    </p>
                </motion.div>

                <QuickStart />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="mt-8 flex justify-center"
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
                </motion.div>

                <motion.ul
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-14 space-y-2 text-center"
                >
                    <li className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 mb-4">
                        You&apos;ll need
                    </li>
                    {REQUIREMENTS.map((req) => (
                        <li key={req} className="text-sm text-muted-foreground/80">
                            {req}
                        </li>
                    ))}
                </motion.ul>
            </div>

            {/* Footer — quiet exit */}
            <footer className="relative z-10 mt-24 w-full max-w-5xl px-6">
                <div className="flex flex-col items-center gap-6 border-t border-border pt-8 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <Image src="/identra.svg" alt="" width={22} height={22} className="rounded-md" />
                        <span className="font-display text-sm font-medium text-foreground">Identra</span>
                        <span className="font-mono text-[10px] text-muted-foreground/60">Apache-2.0</span>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {FOOTER_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </footer>
        </section>
    );
}

function QuickStart() {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(QUICK_START);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard can be blocked (insecure context, denied permission).
            // The commands are on screen either way, so just leave the label alone.
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-xl border border-border bg-surface overflow-hidden text-left"
        >
            <div className="flex items-center justify-between border-b border-border/70 px-4 py-2.5">
                <span className="font-mono text-[10px] text-muted-foreground">quick start</span>
                <button
                    onClick={copy}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3" aria-hidden /> copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3" aria-hidden /> copy
                        </>
                    )}
                </button>
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-foreground/90">
                <code>
                    <span className="text-muted-foreground/50">$ </span>git clone {GITHUB_URL}.git
                    {"\n"}
                    <span className="text-muted-foreground/50">$ </span>cd identra{"\n"}
                    <span className="text-muted-foreground/50">$ </span>just doctor{"  "}
                    <span className="text-muted-foreground/50"># check your machine is ready</span>
                    {"\n"}
                    <span className="text-muted-foreground/50">$ </span>just dev{"     "}
                    <span className="text-muted-foreground/50"># build and launch with hot reload</span>
                </code>
            </pre>
        </motion.div>
    );
}
