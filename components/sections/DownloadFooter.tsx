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
        <section className="w-full pt-24 pb-8 md:pt-32 md:pb-12 bg-background relative overflow-hidden flex flex-col items-center">
            <div className="container px-6 relative z-10 w-full max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-[-0.03em] text-foreground">
                        Run it on your machine.
                    </h2>
                    <p className="mt-5 text-base font-medium text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        No packaged build yet, so you build it from source, and the first build
                        takes a minute while the Rust side compiles. Linux today, macOS in progress.
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
                            className="neu-primary inline-flex h-12 items-center justify-center rounded-full px-8 text-base font-bold"
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
                    <li className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground mb-4">
                        You&apos;ll need
                    </li>
                    {REQUIREMENTS.map((req) => (
                        <li key={req} className="text-sm font-medium text-muted-foreground">
                            {req}
                        </li>
                    ))}
                </motion.ul>
            </div>

            {/* Footer — quiet exit */}
            <footer className="relative z-10 mt-24 w-full max-w-5xl px-6">
                <div className="neu flex flex-col items-center gap-6 rounded-full bg-background px-8 py-5 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-2.5">
                        <Image src="/identra.svg" alt="" width={30} height={30} className="rounded-lg" />
                        <span className="font-display text-sm font-bold text-foreground">Identra</span>
                        <span className="font-mono text-[10px] text-muted-foreground">Apache-2.0</span>
                    </div>

                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {FOOTER_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
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
            className="mt-12 overflow-hidden rounded-2xl bg-[#1a1618] p-1.5 text-left shadow-[8px_8px_18px_var(--neu-dark),-8px_-8px_18px_var(--neu-light)]"
        >
            <div className="flex items-center justify-between rounded-t-xl border-b border-white/[0.06] px-4 py-2.5">
                <span className="font-mono text-[10px] text-white/50">quick start</span>
                <button
                    onClick={copy}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] text-white/60 transition-colors hover:bg-white/10 hover:text-white/90"
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
            <pre className="overflow-x-auto px-4 py-4 font-mono text-xs leading-relaxed text-white/90">
                <code>
                    <span className="text-white/40">$ </span>git clone {GITHUB_URL}.git
                    {"\n"}
                    <span className="text-white/40">$ </span>cd identra{"\n"}
                    <span className="text-white/40">$ </span>just doctor{"  "}
                    <span className="text-white/40"># check your machine is ready</span>
                    {"\n"}
                    <span className="text-white/40">$ </span>just dev{"     "}
                    <span className="text-white/40"># build and launch with hot reload</span>
                </code>
            </pre>
        </motion.div>
    );
}
