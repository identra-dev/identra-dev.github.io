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
  Light neumorphic navbar on Aceternity's resizable primitive: a full-width
  raised pill that contracts past 100px. The primitives ship light/dark colour
  classes; <html> has no `dark`, so their light defaults apply and we override
  bg/shadow with neu utilities. Nav items are ours so the hover pill is inset.
*/

function Wordmark() {
    return (
        <a href="#main" className="relative z-20 flex shrink-0 items-center gap-2.5 group">
            <span className="neu-sm grid h-9 w-9 place-items-center rounded-xl">
                <Image
                    src="/identra.svg"
                    alt=""
                    width={22}
                    height={22}
                    className="rounded-md transition-transform duration-500 group-hover:scale-105"
                    priority
                />
            </span>
            <span className="font-display text-[15px] font-extrabold tracking-tight text-foreground">
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
            className="neu-primary relative z-20 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-[13px] font-bold"
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
                    className="relative px-3.5 py-2 text-[13px] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                    {hovered === i && (
                        <motion.div
                            layoutId="nav-pill"
                            className="neu-inset absolute inset-0 rounded-full"
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
            <NavBody className="neu rounded-full bg-background px-3 py-2">
                <Wordmark />
                <DesktopItems />
                <GithubCta />
            </NavBody>

            <MobileNav>
                <MobileNavHeader className="neu rounded-full bg-background px-3 py-2">
                    <Wordmark />
                    <div className="flex items-center gap-3">
                        <GithubCta />
                        <MobileNavToggle isOpen={open} onClick={() => setOpen(!open)} />
                    </div>
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    className="neu gap-1 rounded-2xl bg-background px-2 py-3"
                >
                    {ITEMS.map((item) => (
                        <a
                            key={item.link}
                            href={item.link}
                            onClick={() => setOpen(false)}
                            className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.name}
                        </a>
                    ))}
                </MobileNavMenu>
            </MobileNav>
        </ResizableNavbar>
    );
}
