"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { GITHUB_URL } from "@/lib/site";

// "Star on GitHub" pill. Fetches the live count client-side (unauthenticated,
// so it may rate-limit or fail — in which case we just show the label).
const REPO_API = "https://api.github.com/repos/identra-dev/identra";

function format(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}

export function GitHubStars({ className = "" }: { className?: string }) {
    const [stars, setStars] = useState<number | null>(null);

    useEffect(() => {
        let alive = true;
        fetch(REPO_API, { headers: { Accept: "application/vnd.github+json" } })
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (alive && data && typeof data.stargazers_count === "number") {
                    setStars(data.stargazers_count);
                }
            })
            .catch(() => {
                /* offline or rate-limited: the label stands on its own */
            });
        return () => {
            alive = false;
        };
    }, []);

    return (
        <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={`neu-inset group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-foreground transition-transform duration-200 hover:scale-[1.03] ${className}`}
        >
            <Star
                className="h-3.5 w-3.5 text-primary transition-transform duration-300 group-hover:rotate-[72deg]"
                fill="currentColor"
                aria-hidden
            />
            Star on GitHub
            {stars !== null && stars > 0 && (
                <span className="ml-0.5 font-mono text-xs font-bold text-muted-foreground">
                    {format(stars)}
                </span>
            )}
        </a>
    );
}
