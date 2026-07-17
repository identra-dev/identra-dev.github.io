"use client";

import { useRef, useLayoutEffect, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Line, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  A node graph, because that is what Identra is and what the logo draws:
  agent nodes wired by edges, in Yaru orange and aubergine.

  Deliberately simple materials and no Environment HDRI — the drei preset pulls a
  map off a CDN at load, which is a silly dependency for a page whose whole
  argument is that nothing phones home.
*/

/*
  Two clusters, held clear of the centered hero column. The content is max-w-4xl,
  which at this camera reaches roughly x ±4 — anything inside that lands on top of
  the headline. Keep |x| >= 4.6 or the cubes eat the descenders.
*/
const NODES: { pos: [number, number, number]; scale: number; accent: boolean }[] = [
    // Right cluster
    { pos: [5.2, 1.4, -1], scale: 0.7, accent: true },
    { pos: [7.6, 3.2, -3], scale: 0.45, accent: false },
    { pos: [6.4, -2.2, -2], scale: 0.55, accent: false },
    { pos: [9.0, 0.2, -4], scale: 0.4, accent: true },
    // Left cluster
    { pos: [-5.4, 2.4, -2], scale: 0.5, accent: false },
    { pos: [-7.4, -1.0, -3.5], scale: 0.42, accent: true },
    { pos: [-5.0, -3.0, -1.5], scale: 0.58, accent: false },
];

// Which nodes are wired to which. Indices into NODES. Edges stay within a
// cluster so no wire is dragged across the headline.
const EDGES: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [4, 5],
    [4, 6],
    [5, 6],
];

const ORANGE = "#e95420";
const AUBERGINE = "#77216f";

function NodeGraph() {
    const groupRef = useRef<THREE.Group>(null);

    const nodeGeo = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);

    const orangeMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: ORANGE,
                emissive: new THREE.Color(ORANGE),
                emissiveIntensity: 0.35,
                roughness: 0.4,
                metalness: 0.1,
            }),
        []
    );

    const surfaceMat = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color: "#3a2d33",
                roughness: 0.6,
                metalness: 0.05,
            }),
        []
    );

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const group = groupRef.current;
            if (!group) return;

            // Slow rotation across the whole page.
            gsap.to(group.rotation, {
                y: 0.9,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
            });

            // The problem section is about scattering — pull the graph apart.
            const scatter = gsap.timeline({
                scrollTrigger: {
                    trigger: "#problem-section",
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.5,
                },
            });

            group.children.forEach((node, i) => {
                // Deterministic, not Math.random, so the scatter is identical on every
                // load and resize. Each cluster pushes further out from centre rather
                // than fanning in every direction — an inward fan would drag cubes
                // across the headline, which is the one place they must never go.
                const outward = Math.sign(node.position.x) || 1;
                const angle = (i / NODES.length) * Math.PI * 2;
                scatter.to(
                    node.position,
                    {
                        x: node.position.x + outward * 2.6,
                        y: node.position.y + Math.sin(angle) * 2.4,
                        ease: "power2.inOut",
                    },
                    0
                );
            });

            // Recede as the explanation takes over.
            gsap.to(group.position, {
                z: -30,
                ease: "power2.in",
                scrollTrigger: {
                    trigger: "#how-it-works",
                    start: "top bottom",
                    end: "top center",
                    scrub: 1,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <group ref={groupRef}>
            {EDGES.map(([a, b]) => (
                <Line
                    key={`${a}-${b}`}
                    points={[NODES[a].pos, NODES[b].pos]}
                    color={ORANGE}
                    lineWidth={1}
                    transparent
                    opacity={0.18}
                />
            ))}

            {NODES.map((node, i) => (
                <Float key={i} speed={0.6} rotationIntensity={0.25} floatIntensity={0.5}>
                    <mesh
                        geometry={nodeGeo}
                        material={node.accent ? orangeMat : surfaceMat}
                        position={node.pos}
                        scale={node.scale}
                        rotation={[0.4, 0.8, 0]}
                    />
                </Float>
            ))}
        </group>
    );
}

export function SecureCoreScene() {
    return (
        <div
            id="global-scene-container"
            className="fixed inset-0 z-[-1] pointer-events-none bg-background"
        >
            <Canvas
                camera={{ position: [0, 0, 12], fov: 35 }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: "high-performance",
                    stencil: false,
                }}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={["#1e1a1d"]} />
                <fog attach="fog" args={["#1e1a1d", 8, 34]} />

                <AdaptiveDpr pixelated />

                <Suspense fallback={null}>
                    <NodeGraph />
                </Suspense>

                <ambientLight intensity={1.4} />
                <pointLight position={[-6, 6, 6]} intensity={40} color={ORANGE} distance={40} decay={2} />
                <pointLight position={[10, -4, 2]} intensity={30} color={AUBERGINE} distance={40} decay={2} />
            </Canvas>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1e1a1d_100%)] opacity-70" />
        </div>
    );
}
