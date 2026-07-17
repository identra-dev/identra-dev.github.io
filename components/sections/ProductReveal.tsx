"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { CanvasMock } from "@/components/ui/CanvasMock";

/*
  The product, tilted and settling flat as you scroll — Aceternity's
  ContainerScroll. Deliberately a plain frame, not a MacBook: Identra is
  Ubuntu/Yaru and Linux-first, and the Mac build doesn't exist yet.

  TO DROP IN A REAL CAPTURE: replace <CanvasMock/> below with

      <img src="/demo.webp" alt="Identra canvas" className="h-full w-full rounded-2xl object-cover object-left-top" />

  Put the file in /public. The frame is roughly 16:10, so record near that or it
  gets cropped. The mock stands in until then.
*/
export function ProductReveal() {
    return (
        <section id="demo" className="relative w-full overflow-hidden bg-background">
            <ContainerScroll
                titleComponent={
                    <div className="mb-6">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.4em] text-primary">
                            The board
                        </p>
                        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                            Every agent on one canvas.
                            <br />
                            <span className="text-primary">And it remembers.</span>
                        </h2>
                    </div>
                }
            >
                {/* "wired", not "recall" — the recall banner is the payoff the
                    walkthrough earns further down; spending it here would flatten it. */}
                <CanvasMock beat="wired" className="mx-auto h-full w-auto rounded-2xl border-0 shadow-none" />
            </ContainerScroll>
        </section>
    );
}
