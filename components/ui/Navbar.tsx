"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Github, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GITHUB_URL } from "@/lib/site";

const ITEMS = [
    { name: "How it works", link: "#how-it-works" },
    { name: "Local-first", link: "#local-first" },
    { name: "FAQ", link: "#faq" },
];

/*
  Floating neumorphic pill (cluely/aceternity FloatingNav pattern): one raised
  capsule dead-centre, revealing on scroll up and hiding on scroll down. Logo
  mark only — no wordmark — and GitHub as an icon, no label.
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
                    className="relative px-3.5 py-1.5 text-[13px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
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

    // Reveal on scroll up, hide on scroll down; always shown near the top and
    // never hidden while the mobile menu is open.
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (y) => {
        const prev = scrollY.getPrevious() ?? 0;
        setHidden(y > prev && y > 140);
    });

    return (
        <motion.header
            animate={hidden && !open ? "hidden" : "visible"}
            variants={{ visible: { y: 0 }, hidden: { y: "-160%" } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-x-0 top-5 z-[100] flex flex-col items-center px-4"
        >
            <nav className="neu-inset pointer-events-auto flex items-center gap-1.5 rounded-full bg-background py-2 pl-2 pr-2">
                {/* Logo mark only */}
                <a
                    href="#main"
                    aria-label="Identra home"
                    className="group grid h-11 w-11 shrink-0 place-items-center rounded-2xl neu-sm"
                >
                    <Image
                        src="/identra.svg"
                        alt="Identra"
                        width={32}
                        height={32}
                        className="rounded-lg transition-transform duration-500 group-hover:scale-110"
                        priority
                    />
                </a>

                <span className="mx-1 hidden h-5 w-px bg-foreground/10 lg:block" aria-hidden />

                <DesktopLinks />

                <span className="mx-1 hidden h-5 w-px bg-foreground/10 lg:block" aria-hidden />

                {/* GitHub — icon only */}
                <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Identra on GitHub"
                    className="neu-primary grid h-9 w-9 shrink-0 place-items-center rounded-full"
                >
                    <Github className="h-4 w-4" aria-hidden />
                </a>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="neu-btn grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground lg:hidden"
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
                        className="neu pointer-events-auto mt-3 flex w-[min(18rem,calc(100vw-2rem))] flex-col gap-1 rounded-3xl bg-background p-3 lg:hidden"
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
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
