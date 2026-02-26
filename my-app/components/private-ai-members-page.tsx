"use client";

import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { useMembers } from "@/hooks/use-members";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import ProfileCard from "@/components/profile-card";
import "@/components/ProfileCard.css";
import type { Member } from "@/lib/types";

const GRAVITY_LOGO_SRC = "/gravity-logo.png";
const WING_FILTER = "Private AI";
const PARTICLE_IMG_SIZE = 400;

// ─── Image preprocessor ─────────────────────────────────────────────────────
// The react-particle-image library iterates EVERY pixel of the source image.
// Large images (e.g. 4320×4320) will freeze the tab. This hook:
//   1. Loads the image (with crossOrigin for Cloudinary URLs)
//   2. Scales it down to ~250×250 on a hidden canvas
//   3. Returns a data-URL that the library can process quickly
function useProcessedImage(src: string): string | null {
    const [dataUrl, setDataUrl] = useState<string | null>(null);
    const cacheRef = useRef<Map<string, string>>(new Map());

    useEffect(() => {
        if (!src) return;

        // Cache hit
        if (cacheRef.current.has(src)) {
            setDataUrl(cacheRef.current.get(src)!);
            return;
        }

        let cancelled = false;
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            if (cancelled) return;
            try {
                const size = PARTICLE_IMG_SIZE;
                const canvas = document.createElement("canvas");
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                // --- AUTO CROP ALGORITHM TO MAXIMIZE FACE SCALE ---
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = img.naturalWidth;
                tempCanvas.height = img.naturalHeight;
                const tCtx = tempCanvas.getContext("2d");
                if (!tCtx) return;
                tCtx.drawImage(img, 0, 0);
                const idata = tCtx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
                const data = idata.data;

                let minX = img.naturalWidth, minY = img.naturalHeight, maxX = 0, maxY = 0;
                for (let y = 0; y < img.naturalHeight; y++) {
                    for (let x = 0; x < img.naturalWidth; x++) {
                        const alpha = data[(y * img.naturalWidth + x) * 4 + 3];
                        // Detect non-fully-transparent pixels
                        if (alpha > 10) {
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                        }
                    }
                }

                // Fallback if empty image
                if (minX > maxX || minY > maxY) {
                    minX = 0; minY = 0; maxX = img.naturalWidth; maxY = img.naturalHeight;
                }

                const croppedW = maxX - minX;
                const croppedH = maxY - minY;

                // Clear background as transparent
                ctx.clearRect(0, 0, size, size);

                // Use 95% of the canvas size to add a tiny safety border
                const fitSize = size * 0.95;

                // Calculate scale to fit inside the canvas
                const scale = Math.min(fitSize / croppedW, fitSize / croppedH);
                const drawW = croppedW * scale;
                const drawH = croppedH * scale;
                const drawX = (size - drawW) / 2;
                const drawY = (size - drawH) / 2;

                ctx.drawImage(tempCanvas, minX, minY, croppedW, croppedH, drawX, drawY, drawW, drawH);

                const finalDataUrl = canvas.toDataURL("image/png");
                cacheRef.current.set(src, finalDataUrl);
                setDataUrl(finalDataUrl);
            } catch (err) {
                console.error("Failed to process image:", err);
            }
        };

        img.onerror = () => {
            // Fallback: maybe local image, pass raw src
            if (!cancelled) setDataUrl(src);
        };

        img.src = src;
        return () => { cancelled = true; };
    }, [src]);

    return dataUrl;
}

// ─── Ambient floating particles (fills empty space) ─────────────────────────
function AmbientParticles({ width, height }: { width: number; height: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Array<{
        x: number; y: number; vx: number; vy: number;
        r: number; opacity: number; hue: number; pulse: number; pulseSpeed: number;
    }>>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = width;
        canvas.height = height;

        // Create ambient particles
        const count = Math.floor((width * height) / 2000); // ~density based on area
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.05,
            hue: 250 + Math.random() * 40, // purple-blue range
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.01 + Math.random() * 0.02,
        }));

        let animId: number;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (const p of particlesRef.current) {
                p.x += p.vx;
                p.y += p.vy;
                p.pulse += p.pulseSpeed;

                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                const currentOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 65%, ${currentOpacity})`;
                ctx.fill();
            }
            animId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(animId);
    }, [width, height]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 0,
            }}
        />
    );
}

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader, LinearFilter, RGBAFormat, Vector2, Object3D, MathUtils } from "three";
import { gsap } from "gsap";
import { vertex, fragment } from "./particle-system/shaders";
import { useInteractivity, interactivityTexture } from "./particle-system/interactivity";

// ─── ParticleSystem Inner Component ─────────────────────────────────────────
function ParticleSystem({ src, width, height }: { src: string; width: number; height: number }) {
    const instanceMeshRef = useRef<any>(null);
    const isFirstLoad = useRef(true);

    // Uniform states
    const uniformsData = useMemo(() => {
        return {
            uSize: { value: 0.0 },
            uDepth: { value: -30.0 },
            uScatter: { value: 0.0 },
            uTime: { value: 0.0 },
            uRayTexture: { value: interactivityTexture },
            uTexture: { value: null as any },
            uTextureSize: { value: new Vector2(PARTICLE_IMG_SIZE, PARTICLE_IMG_SIZE) },
        };
    }, []);

    const { addTouch } = useInteractivity();

    // GSAP animations for transitions
    // fast=true  → scatter out quickly (0.35 s)
    // fast=false → reform smoothly (1.4 s)
    const showParticles = useCallback((dValue: number, sValue: number, scValue: number, callback?: () => void, fast = false) => {
        gsap.killTweensOf(uniformsData.uDepth);
        gsap.killTweensOf(uniformsData.uScatter);
        gsap.killTweensOf(uniformsData.uSize);

        if (fast) {
            // Scatter out: smooth dissolve
            gsap.timeline({ onComplete: callback })
                .to(uniformsData.uDepth,   { duration: 0.65, value: dValue,  ease: "sine.inOut" })
                .to(uniformsData.uScatter, { duration: 0.65, value: scValue, ease: "sine.inOut" }, "<")
                .to(uniformsData.uSize,    { duration: 0.65, value: sValue,  ease: "sine.inOut" }, "<");
        } else {
            // Reform: all uniforms land together — smooth settle
            gsap.timeline({ onComplete: callback })
                .to(uniformsData.uDepth,   { duration: 1.8, value: dValue,  ease: "power2.out" })
                .to(uniformsData.uScatter, { duration: 1.8, value: scValue, ease: "power2.out" }, "<")
                .to(uniformsData.uSize,    { duration: 1.8, value: sValue,  ease: "power2.out" }, "<");
        }
    }, [uniformsData]);

    // Load new texture when src changes, apply transition
    useEffect(() => {
        if (!src) return;
        let cancelled = false;

        new TextureLoader().load(src, (tex) => {
            if (cancelled) return;
            tex.minFilter = LinearFilter;
            tex.magFilter = LinearFilter;

            if (!isFirstLoad.current) {
                // Kill any running tweens first
                gsap.killTweensOf(uniformsData.uDepth);
                gsap.killTweensOf(uniformsData.uScatter);
                gsap.killTweensOf(uniformsData.uSize);

                const SCATTER_DUR = 0.65;
                const SWAP_AT = SCATTER_DUR * 0.5; // swap when particles are ~70% dispersed

                // Scatter out
                gsap.timeline()
                    .to(uniformsData.uDepth,   { duration: SCATTER_DUR, value: 30.0, ease: "sine.inOut" })
                    .to(uniformsData.uScatter, { duration: SCATTER_DUR, value: 1.0,  ease: "sine.inOut" }, "<")
                    .to(uniformsData.uSize,    { duration: SCATTER_DUR, value: 0.3,  ease: "sine.inOut" }, "<")
                    // Swap texture mid-scatter — particles are already tiny/dispersed so swap is invisible
                    .call(() => {
                        if (!instanceMeshRef.current) return;
                        instanceMeshRef.current.material.uniforms.uTexture.value = tex;
                        uniformsData.uTexture.value = tex;
                        uniformsData.uTextureSize.value.set(PARTICLE_IMG_SIZE, PARTICLE_IMG_SIZE);
                        // Begin reform immediately — overlaps cleanly with scatter tail
                        showParticles(0.0, 0.92, 0.0, undefined, false);
                    }, [], SWAP_AT);
            } else {
                // First load → spawn from scatter
                isFirstLoad.current = false;
                uniformsData.uTexture.value = tex;
                uniformsData.uTextureSize.value.set(PARTICLE_IMG_SIZE, PARTICLE_IMG_SIZE);
                uniformsData.uDepth.value = 30.0;
                uniformsData.uScatter.value = 1.0;
                uniformsData.uSize.value = 0.3;

                showParticles(0.0, 0.92, 0.0);
            }
        });

        return () => { cancelled = true; };
    }, [src, showParticles, uniformsData]);

    // Create dot positions once
    const { dots, sIndices, sPositions } = useMemo(() => {
        const totalDots = PARTICLE_IMG_SIZE * PARTICLE_IMG_SIZE;

        const indices = new Float32Array(totalDots);
        const positions = new Float32Array(totalDots * 3);

        for (let i = 0; i < totalDots; i++) {
            indices[i] = i;
            positions[i * 3 + 0] = (i % PARTICLE_IMG_SIZE);
            positions[i * 3 + 1] = Math.floor(i / PARTICLE_IMG_SIZE);
            positions[i * 3 + 2] = 0;
        }

        return { dots: totalDots, sIndices: indices, sPositions: positions };
    }, []);

    useLayoutEffect(() => {
        if (!instanceMeshRef.current || dots === 0) return;

        const tempObject = new Object3D();
        for (let index = 0; index < dots; index++) {
            tempObject.position.set(
                sPositions[index * 3 + 0],
                sPositions[index * 3 + 1],
                sPositions[index * 3 + 2]
            );
            tempObject.updateMatrix();
            instanceMeshRef.current.setMatrixAt(index, tempObject.matrix);
        }
        instanceMeshRef.current.instanceMatrix.needsUpdate = true;
    }, [dots, sPositions]);

    useFrame(({ clock }) => {
        if (instanceMeshRef.current?.material?.uniforms) {
            instanceMeshRef.current.material.uniforms.uTime.value = clock.elapsedTime;
        }
    });

    return (
        <React.Fragment>
            <instancedMesh ref={instanceMeshRef} args={[null as any, null as any, dots]}>
                <planeGeometry args={[2.0, 2.0, 1, 1]}>
                    <instancedBufferAttribute attach="attributes-offset" args={[sPositions, 3]} />
                    <instancedBufferAttribute attach="attributes-index" args={[sIndices, 1]} />
                </planeGeometry>
                <shaderMaterial
                    attach="material"
                    uniforms={uniformsData}
                    fragmentShader={fragment}
                    vertexShader={vertex}
                    transparent={true}
                    depthTest={false}
                />
            </instancedMesh>
            {/* Invisible plane for catching mouse rays */}
            <mesh onPointerMove={({ uv }) => addTouch({ x: uv!.x, y: uv!.y })}>
                <planeGeometry args={[PARTICLE_IMG_SIZE * 2, PARTICLE_IMG_SIZE * 2]} />
                <meshBasicMaterial attach="material" transparent={true} opacity={0.0} />
            </mesh>
        </React.Fragment>
    );
}

// ─── ParticleCanvas (R3F Wrapper) ───────────────────────────────────────────
function ParticleCanvas({
    src,
    width,
    height,
}: {
    src: string;
    width: number;
    height: number;
}) {
    const processedSrc = useProcessedImage(src);

    if (!processedSrc) {
        return (
            <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div
                    style={{
                        width: 36, height: 36,
                        border: "3px solid rgba(139,92,246,0.12)",
                        borderTopColor: "rgba(139,92,246,0.5)",
                        borderRadius: "50%",
                        animation: "particleSpin .75s linear infinite",
                    }}
                />
                <style>{`@keyframes particleSpin{to{transform:rotate(360deg)}}`}</style>
            </div>
        );
    }

    // Compute camera Z so the 400×400 particle grid fills ~90% of canvas height.
    // Correct perspective formula: z = (gridHalf) / tan(fov/2)
    const FOV = 75;
    const fovRad = (FOV * Math.PI) / 180;
    const aspect = width / Math.max(height, 1);
    // height-fill distance; if canvas is portrait-shaped, also satisfy width
    const zForHeight = (PARTICLE_IMG_SIZE / 2) / Math.tan(fovRad / 2);
    const zForWidth  = (PARTICLE_IMG_SIZE / 2) / (Math.tan(fovRad / 2) * aspect);
    const cameraZ = Math.max(zForHeight, zForWidth) * 1.08; // 8% padding

    const cameraProps = {
        fov: FOV,
        near: 0.1,
        far: 3000,
        position: [0, 0, cameraZ] as const,
    };

    return (
        <div style={{ width, height, display: "flex", position: "relative", flexShrink: 0 }}>
            <Canvas dpr={[1, 2]} camera={cameraProps} style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
                <React.Suspense fallback={null}>
                    <ParticleSystem src={processedSrc} width={width} height={height} />
                </React.Suspense>
            </Canvas>
        </div>
    );
}

// ─── Social icons ───────────────────────────────────────────────────────────
const iconStyle = { width: 14, height: 14 };
function LinkedInIcon() {
    return (<svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>);
}
function TwitterIcon() {
    return (<svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>);
}
function InstagramIcon() {
    return (<svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>);
}
function GitHubIcon() {
    return (<svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle}><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>);
}

// ─── Compact desktop card ───────────────────────────────────────────────────
function CompactMemberCard({
    member,
    onHover,
    isActive,
}: {
    member: Member;
    onHover: (member: Member) => void;
    isActive: boolean;
}) {
    const roleLabel = member.role === "coordinator" ? "Coordinator" : "Member";

    return (
        <div
            onMouseEnter={() => onHover(member)}
            style={{
                background: isActive
                    ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.12))"
                    : "rgba(255,255,255,0.03)",
                border: isActive
                    ? "1px solid rgba(139,92,246,0.6)"
                    : "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "14px 16px",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                display: "flex",
                flexDirection: "column" as const,
                gap: "6px",
                backdropFilter: "blur(12px)",
                boxShadow: isActive
                    ? "0 0 24px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
                transform: isActive ? "scale(1.02)" : "scale(1)",
            }}
        >
            <span
                style={{
                    fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: isActive
                        ? member.role === "coordinator" ? "#fbbf24" : "#c084fc"
                        : "rgba(255,255,255,0.35)",
                    transition: "color 0.3s",
                }}
            >
                {roleLabel}
            </span>
            <span
                style={{
                    fontSize: "14px", fontWeight: 700,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                    transition: "color 0.3s", lineHeight: 1.3,
                }}
            >
                {member.name}
            </span>
            {member.socials && (
                <div style={{ display: "flex", gap: "10px", marginTop: "4px", alignItems: "center" }}>
                    {member.socials.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.25)", transition: "color 0.2s", display: "flex", alignItems: "center" }}>
                            <LinkedInIcon />
                        </a>
                    )}
                    {member.socials.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.25)", transition: "color 0.2s", display: "flex", alignItems: "center" }}>
                            <TwitterIcon />
                        </a>
                    )}
                    {member.socials.instagram && (
                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.25)", transition: "color 0.2s", display: "flex", alignItems: "center" }}>
                            <InstagramIcon />
                        </a>
                    )}
                    {member.socials.github && (
                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            style={{ color: isActive ? "#a78bfa" : "rgba(255,255,255,0.25)", transition: "color 0.2s", display: "flex", alignItems: "center" }}>
                            <GitHubIcon />
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Desktop split-screen layout ────────────────────────────────────────────
function DesktopSplitView({
    coordinators,
    members,
}: {
    coordinators: Member[];
    members: Member[];
}) {
    const [activeSrc, setActiveSrc] = useState<string>(GRAVITY_LOGO_SRC);
    const [activeMemberId, setActiveMemberId] = useState<string | null>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });

    useEffect(() => {
        const el = canvasContainerRef.current;
        if (!el) return;
        const update = () => {
            const r = el.getBoundingClientRect();
            setCanvasSize({
                width:  Math.max(460, Math.floor(r.width  - 16)),
                height: Math.max(460, Math.floor(r.height - 90)),
            });
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const handleHover = useCallback((member: Member) => {
        setActiveSrc(member.image || GRAVITY_LOGO_SRC);
        setActiveMemberId(member.id);
    }, []);

    const allMembers = useMemo(() => [...coordinators, ...members], [coordinators, members]);
    const activeMember = useMemo(() => allMembers.find((m) => m.id === activeMemberId), [allMembers, activeMemberId]);

    return (
        <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
            {/* Left panel */}
            <div
                style={{
                    width: "35%", minWidth: "280px", maxWidth: "420px",
                    overflowY: "auto", padding: "28px 16px 40px 24px",
                    display: "flex", flexDirection: "column",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                }}
            >
                <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                        </svg>
                        <h2 style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#a78bfa", margin: 0 }}>
                            Private AI Wing
                        </h2>
                    </div>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: "0 0 0 28px" }}>
                        Hover a card to see the particle preview →
                    </p>
                </div>

                {coordinators.length > 0 && (
                    <>
                        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(251,191,36,0.7)", marginBottom: "10px", paddingLeft: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "12px" }}>★</span> Coordinators
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
                            {coordinators.map((m) => (
                                <CompactMemberCard key={m.id} member={m} onHover={handleHover} isActive={activeMemberId === m.id} />
                            ))}
                        </div>
                    </>
                )}

                {members.length > 0 && (
                    <>
                        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "10px", paddingLeft: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "11px" }}>◆</span> Members
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                            {members.map((m) => (
                                <CompactMemberCard key={m.id} member={m} onHover={handleHover} isActive={activeMemberId === m.id} />
                            ))}
                        </div>
                    </>
                )}

                {allMembers.length === 0 && (
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "14px", textAlign: "center", marginTop: "80px" }}>
                        No members found for this wing yet.
                    </div>
                )}
            </div>

            {/* Right panel — particle canvas */}
            <div
                ref={canvasContainerRef}
                style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    padding: "30px", position: "relative", overflow: "hidden",
                }}
            >
                {/* Ambient floating particles background */}
                <AmbientParticles width={canvasSize.width + 60} height={canvasSize.height + 120} />

                {/* Ambient glow */}
                <div style={{ position: "absolute", width: "70%", height: "70%", borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none", top: "15%", left: "15%", zIndex: 0 }} />

                {/* Name label */}
                <div style={{ position: "absolute", top: "28px", left: 0, right: 0, textAlign: "center", pointerEvents: "none", zIndex: 3 }}>
                    <span style={{
                        fontSize: activeMember ? "16px" : "12px", fontWeight: activeMember ? 700 : 500,
                        letterSpacing: "0.1em", textTransform: "uppercase" as const,
                        color: activeMember ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
                        transition: "all 0.4s ease",
                    }}>
                        {activeMember ? activeMember.name : "← hover a card to preview"}
                    </span>
                </div>

                {/* Particle canvas */}
                <div style={{ position: "relative", zIndex: 1, width: canvasSize.width, height: canvasSize.height }}>
                    <ParticleCanvas
                        src={activeSrc}
                        width={canvasSize.width}
                        height={canvasSize.height}
                    />
                </div>

                {/* Role badge */}
                {activeMember && (
                    <div style={{
                        position: "absolute", bottom: "28px", left: 0, right: 0, textAlign: "center",
                        fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" as const,
                        color: activeMember.role === "coordinator" ? "rgba(251,191,36,0.6)" : "rgba(139,92,246,0.5)",
                        fontWeight: 600, pointerEvents: "none",
                    }}>
                        {activeMember.role === "coordinator" ? "★ Coordinator" : "◆ Member"}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Mobile standard grid ───────────────────────────────────────────────────
function MobileGridView({ coordinators, members }: { coordinators: Member[]; members: Member[] }) {
    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
                <div className="text-center mb-16 slide-in-up">
                    <h1 className="text-4xl font-bold gradient-text mb-4">Private AI Wing</h1>
                    <p className="text-md text-foreground/70">Coordinators and members from the Private AI wing</p>
                </div>
                {coordinators.length > 0 && (
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-8 text-center">Coordinators</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {coordinators.map((member) => (
                                <div key={member.id} className="fade-in-up">
                                    <ProfileCard
                                        name={member.name} title={member.bio || member.wing}
                                        handle={member.name?.toLowerCase().replace(/\s+/g, "") || "coordinator"}
                                        status={member.role} contactText="Contact"
                                        avatarUrl={member.image || "/gravity-logo.png"}
                                        socials={{ linkedin: member.socials?.linkedin, x: member.socials?.twitter }}
                                        showUserInfo enableTilt enableMobileTilt={false}
                                        onContactClick={() => console.log("Contact", member.name)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {members.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold mb-8 text-center">Members</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {members.map((member) => (
                                <div key={member.id} className="fade-in-up">
                                    <ProfileCard
                                        name={member.name} title={member.bio || member.wing}
                                        handle={member.name?.toLowerCase().replace(/\s+/g, "") || "member"}
                                        status={member.role} contactText="Contact"
                                        avatarUrl={member.image || "/placeholder-avatar.svg"}
                                        socials={{ linkedin: member.socials?.linkedin, instagram: member.socials?.instagram, x: member.socials?.twitter }}
                                        showUserInfo enableTilt enableMobileTilt={false}
                                        onContactClick={() => console.log("Contact", member.name)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

// ─── Main export ────────────────────────────────────────────────────────────
export function PrivateAIMembersPage() {
    const allMembers = useMembers();
    const [isDesktop, setIsDesktop] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const mq = window.matchMedia("(min-width: 1024px)");
        const handler = () => setIsDesktop(mq.matches);
        handler();
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const { coordinators, regularMembers } = useMemo(() => {
        const wing = allMembers.filter(
            (m) => m.wing === WING_FILTER && !m.isOverallCoordinator && !m.isFacultyCoordinator
        );
        return {
            coordinators: wing.filter((m) => m.role === "coordinator"),
            regularMembers: wing.filter((m) => m.role === "member"),
        };
    }, [allMembers]);

    return (
        <>
            <Navigation />
            <div style={{ height: "80px" }} />
            {mounted && isDesktop ? (
                <>
                    <DesktopSplitView coordinators={coordinators} members={regularMembers} />
                    <Footer />
                </>
            ) : (
                <>
                    <MobileGridView coordinators={coordinators} members={regularMembers} />
                    <Footer />
                </>
            )}
        </>
    );
}
