"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Github, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GITHUB_URL } from "@/lib/site";

const ITEMS = [
    { name: "How it works", link: "#how-it-works" },
    { name: "The canvas", link: "#canvas" },
    { name: "Local-first", link: "#local-first" },
    { name: "Status", link: "#status" },
    { name: "FAQ", link: "#faq" },
];

/*
  Compact, auto-width neumorphic capsule floating dead-center — no full-width bar.
  Everything (mark, links, CTA) sits in one raised pill; links get an inset
  hover pill. Mobile collapses to mark + CTA + toggle, menu drops below.
*/

function DesktopLinks() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div onMouseLeave={() => setHovered(null)} className="hidden items-center gap-0.5 lg:flex">
            {ITEMS.map((item, i) => (
                <a
                    key={item.link}
                    href={item.link}
                    onMouseEnter={() => setHovered(i)}
                    className="relative px-3 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                    {hovered === i && (
                        <motion.span
                            layoutId="nav-pill"
                            className="neu-inset absolute inset-0 rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{item.name}</span>
                </a>
            ))}
        </div>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Hide on scroll down, reveal on scroll up. Always show near the top, and
    // never hide while the mobile menu is open.
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(y > prev && y > 140);
    });

    return (
        <motion.header
            animate={hidden && !open ? "hidden" : "visible"}
            variants={{ visible: { y: 0 }, hidden: { y: "-135%" } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center px-4"
        >
            {/* Compact capsule — flat (no drop shadow); depth lives on the pieces */}
            <nav className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-background/75 py-2 pl-2.5 pr-2 backdrop-blur-md">
                <a href="#main" className="group flex shrink-0 items-center gap-2.5 pr-1">
                    <span className="neu-sm grid h-8 w-8 place-items-center rounded-xl">
                        <Image
                            src="/identra.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="rounded-md transition-transform duration-500 group-hover:scale-105"
                            priority
                        />
                    </span>
                    <span className="font-display text-[15px] font-extrabold tracking-tight text-foreground">
                        Identra
                    </span>
                </a>

                {/* Divider */}
                <span className="mx-1 hidden h-5 w-px bg-foreground/10 lg:block" aria-hidden />

                <DesktopLinks />

                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="neu-primary ml-0.5 hidden h-9 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold lg:inline-flex"
                >
                    <Github className="h-3.5 w-3.5" aria-hidden />
                    GitHub
                </a>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="neu-btn ml-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground lg:hidden"
                >
                    {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </button>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="neu pointer-events-auto mt-3 flex w-[min(20rem,calc(100vw-2rem))] flex-col gap-1 rounded-3xl bg-background p-3 lg:hidden"
                    >
                        {ITEMS.map((item) => (
                            <a
                                key={item.link}
                                href={item.link}
                                onClick={() => setOpen(false)}
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setOpen(false)}
                            className="neu-primary mt-1 inline-flex h-10 items-center justify-center gap-2 rounded-full text-sm font-bold"
                        >
                            <Github className="h-4 w-4" aria-hidden />
                            GitHub
                        </a>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
