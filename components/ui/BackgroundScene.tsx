"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/*
  The scene is three.js, ~1MB of JS, and it is decorative. Two groups should
  never pay for it:
    - narrow viewports, where the node graph sits off-screen right and renders
      nothing visible at all
    - anyone asking for reduced motion, since a rAF render loop ignores the
      CSS media query that quiets the rest of the page

  Loading it through next/dynamic keeps it out of the initial bundle, so those
  visitors don't download it at all rather than downloading it to skip it.
*/
const SecureCoreScene = dynamic(
    () => import("@/components/ui/SecureCoreScene").then((m) => m.SecureCoreScene),
    { ssr: false }
);

export function BackgroundScene() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const wide = window.matchMedia("(min-width: 768px)");
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setEnabled(wide.matches && !calm.matches);

        update();
        wide.addEventListener("change", update);
        calm.addEventListener("change", update);
        return () => {
            wide.removeEventListener("change", update);
            calm.removeEventListener("change", update);
        };
    }, []);

    // The page reads fine on the flat background; this is enhancement only.
    if (!enabled) return null;

    return <SecureCoreScene />;
}
