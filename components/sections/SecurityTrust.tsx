"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CometCard } from "@/components/ui/comet-card";

export function SecurityTrust() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Header fades out quickly
    const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.12], [0, -30]);

    // Horizontal separation physics
    const card1X = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "-120%"]);
    const card1Rotate = useTransform(scrollYProgress, [0.15, 0.6], [0, -6]);
    const card1Scale = useTransform(scrollYProgress, [0, 0.15], [0.92, 1]);

    const card2Scale = useTransform(scrollYProgress, [0, 0.15], [0.96, 1]);

    const card3X = useTransform(scrollYProgress, [0.15, 0.6], ["0%", "120%"]);
    const card3Rotate = useTransform(scrollYProgress, [0.15, 0.6], [0, 6]);
    const card3Scale = useTransform(scrollYProgress, [0, 0.15], [0.88, 1]);

    return (
        <section id="security-section" ref={containerRef} className="relative h-[250vh] bg-black w-full">

            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-0 bg-black">

                {/* Header - Compact */}
                <motion.div
                    className="absolute top-24 md:top-28 text-center z-50"
                    style={{ opacity: headerOpacity, y: headerY }}
                >
                    <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.4em] mb-3">
                        Defense Architecture
                    </p>
                    <h2 className="text-3xl md:text-4xl font-display font-light tracking-tighter text-white">
                        The Trust Stack
                    </h2>
                </motion.div>


                {/* Card Stack Container */}
                <div className="relative flex items-center justify-center w-full h-[500px] mt-8">

                    {/* --- CARD 1: TRANSPORT --- */}
                    <CometCard
                        className="absolute w-[260px] md:w-[300px] h-[400px] md:h-[440px] z-10 group"
                        glowColor="rgba(59, 130, 246, 0.7)"
                        style={{ x: card1X, rotateZ: card1Rotate, scale: card1Scale }}
                    >
                        <div className="w-full h-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0a0b] to-black flex flex-col overflow-hidden">
                            {/* Top highlight */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div className="p-6 flex flex-col h-full">
                                {/* Tag */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50">
                                        SYS_LYR_01
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        <span className="text-[8px] font-mono text-blue-400 tracking-wider">ACTIVE</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-display font-light tracking-tighter text-white leading-[0.95] mb-5">
                                    Transport<br />Layer
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-white/60 font-light leading-relaxed mb-auto">
                                    <span className="text-white">AES-256</span> encryption across global edge network. Zero plaintext exposure.
                                </p>

                                {/* Static Visualization - No Animation */}
                                <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 mt-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">TLS 1.3 Handshake</span>
                                        <span className="text-[9px] font-mono text-blue-400 tracking-wider">● Verified</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 flex-1 bg-blue-500/30 rounded-full" />
                                        <div className="h-1 flex-1 bg-blue-500/50 rounded-full" />
                                        <div className="h-1 flex-1 bg-blue-500/70 rounded-full" />
                                        <div className="h-1 flex-1 bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CometCard>


                    {/* --- CARD 2: MEMORY --- */}
                    <CometCard
                        className="absolute w-[260px] md:w-[300px] h-[400px] md:h-[440px] z-20 group"
                        glowColor="rgba(16, 185, 129, 0.7)"
                        style={{ scale: card2Scale }}
                    >
                        <div className="w-full h-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#0a0a0b] to-black flex flex-col overflow-hidden">
                            {/* Top highlight */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <div className="p-6 flex flex-col h-full">
                                {/* Tag */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50">
                                        SYS_LYR_02
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span className="text-[8px] font-mono text-emerald-400 tracking-wider">VOLATILE</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-display font-light tracking-tighter text-white leading-[0.95] mb-5">
                                    Ephemeral<br />Memory
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-white/60 font-light leading-relaxed mb-auto">
                                    Data exists only in <span className="text-white">RAM</span>. Instantly wiped after execution completes.
                                </p>

                                {/* Static Visualization - No Animation */}
                                <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 mt-4 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
                                        <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
                                    </div>
                                    <span className="text-[9px] font-mono text-emerald-400/70 tracking-[0.2em] uppercase">
                                        No Disk Writes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CometCard>


                    {/* --- CARD 3: ENCLAVE --- */}
                    <CometCard
                        className="absolute w-[260px] md:w-[300px] h-[400px] md:h-[440px] z-10 group"
                        glowColor="rgba(255, 255, 255, 0.8)"
                        style={{ x: card3X, rotateZ: card3Rotate, scale: card3Scale }}
                    >
                        <div className="w-full h-full rounded-2xl border border-white/15 bg-gradient-to-b from-[#0c0c0d] to-black flex flex-col overflow-hidden">
                            {/* Top highlight */}
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                            <div className="p-6 flex flex-col h-full">
                                {/* Tag */}
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50">
                                        SYS_LYR_03
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        <span className="text-[8px] font-mono text-white/70 tracking-wider">ISOLATED</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-display font-light tracking-tighter text-white leading-[0.95] mb-5">
                                    Secure<br />Enclave
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-white/60 font-light leading-relaxed mb-auto">
                                    <span className="text-white">TEE</span> isolated from OS and hypervisor. Even we cannot see inside.
                                </p>

                                {/* Static Visualization - No Animation */}
                                <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 mt-4 flex items-center justify-between">
                                    <div className="flex flex-col gap-1.5">
                                        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Integrity</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                            <span className="text-sm font-medium text-white">Verified</span>
                                        </div>
                                    </div>

                                    <div className="h-8 w-px bg-white/10" />

                                    <div className="flex flex-col gap-1.5 items-end">
                                        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Root</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500/60" />
                                            <span className="text-sm font-medium text-white/40 line-through">Denied</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CometCard>

                </div>
            </div>
        </section>
    );
}
