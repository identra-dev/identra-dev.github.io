"use client";

import { motion } from "motion/react";
import { Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
    Navbar as ResizableNavbar,
    NavBody,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { GITHUB_URL } from "@/lib/site";

const ITEMS = [
    { name: "How it works", link: "#how-it-works" },
    { name: "The canvas", link: "#canvas" },
    { name: "Local-first", link: "#local-first" },
    { name: "Status", link: "#status" },
    { name: "FAQ", link: "#faq" },
];

/*
  Built on Aceternity's resizable navbar: full-width bar that contracts into a
  glass pill once you're past 100px.

  The primitives hard-code light/dark colours (bg-white/80, dark:bg-neutral-950/80,
  dark:bg-transparent). <html> carries `dark`, so any override here has to be a
  `dark:` variant too or theirs wins on specificity. Hence dark:bg-* below.
  Nav items are ours rather than <NavItems> so the hover pill picks up Yaru.
*/

function Wordmark() {
    return (
        <a href="#main" className="relative z-20 flex shrink-0 items-center gap-2.5 group">
            <Image
                src="/identra.svg"
                alt=""
                width={30}
                height={30}
                className="rounded-[8px] transition-transform duration-500 group-hover:scale-105"
                priority
            />
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
                Identra
            </span>
        </a>
    );
}

function GithubCta() {
    return (
        <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="relative z-20 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_6px_20px_-6px_rgba(233,84,32,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
        >
            <Github className="h-3.5 w-3.5" aria-hidden />
            GitHub
        </a>
    );
}

function DesktopItems() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div
            onMouseLeave={() => setHovered(null)}
            className="absolute inset-0 hidden flex-1 flex-row items-center justify-center gap-1 lg:flex"
        >
            {ITEMS.map((item, i) => (
                <a
                    key={item.link}
                    href={item.link}
                    onMouseEnter={() => setHovered(i)}
                    className="relative px-3.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                    {hovered === i && (
                        <motion.div
                            layoutId="nav-pill"
                            className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                    <span className="relative z-20">{item.name}</span>
                </a>
            ))}
        </div>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        // Ships as `sticky top-20`; twMerge lets these win.
        <ResizableNavbar className="fixed inset-x-0 top-0 z-[100] pt-4">
            <NavBody className="rounded-full border border-white/[0.08] px-3 py-2 backdrop-blur-md dark:bg-surface/70">
                <Wordmark />
                <DesktopItems />
                <GithubCta />
            </NavBody>

            <MobileNav className="dark:bg-transparent">
                <MobileNavHeader className="rounded-full border border-white/[0.08] bg-surface/70 px-3 py-2 backdrop-blur-md">
                    <Wordmark />
                    <div className="flex items-center gap-3">
                        <GithubCta />
                        <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
                    </div>
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    className="gap-1 rounded-2xl border border-white/[0.08] px-2 py-3 dark:bg-surface"
                >
                    {ITEMS.map((item) => (
                        <a
                            key={item.link}
                            href={item.link}
                            onClick={() => setOpen(false)}
                            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                        >
                            {item.name}
                        </a>
                    ))}
                </MobileNavMenu>
            </MobileNav>
        </ResizableNavbar>
    );
}
