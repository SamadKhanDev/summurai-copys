"use client";

import React, { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { Building2, Landmark, Hospital, Zap, GraduationCap, Building, LucideIcon } from "lucide-react";
import "./work.css";

gsap.registerPlugin(ScrollTrigger);

// Seeded random helper to ensure identical values on server and client (prevents hydration mismatch)
function getSeededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

interface SectorItem {
    key: string;
    icon: LucideIcon;
}

interface WorkCardProps {
    sector: SectorItem;
    index: number;
    cardsRef: React.MutableRefObject<HTMLDivElement[]>;
    size: string;
    y: string;
    rotate: string;
    id: string;
    t: any;
}

function WorkCard({ sector, index, cardsRef, size, y, rotate, id, t }: WorkCardProps) {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const Icon = sector.icon;

    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;

        const obs = new MutationObserver(() => {
            const prog = parseFloat(el.getAttribute("data-progress") ?? "1");
            el.style.setProperty("--progress", String(prog));
            const inView = prog !== 1 && prog !== -1;
            if (inView) {
                el.classList.add("is-inview");
            } else {
                el.classList.remove("is-inview");
            }
        });

        obs.observe(el, { attributes: true, attributeFilter: ["data-progress"] });
        return () => obs.disconnect();
    }, []);

    const title = t(`sectors.${sector.key}.title`);
    const description = t(`sectors.${sector.key}.description`);
    const rawTags = t.raw(`sectors.${sector.key}.tags`);
    const tags = Array.isArray(rawTags) ? (rawTags as string[]) : [];

    return (
        <div
            ref={(el) => {
                wrapRef.current = el;
                if (el) cardsRef.current[index] = el;
            }}
            className="s__scene__work s__scene__work--video js-work"
            style={{
                "--size": size,
                "--y": y,
                "--rotate": rotate,
            } as React.CSSProperties}
            {...{ "data-progress": "1" }}
        >
            <div className="a__inner relative flex flex-col justify-between h-full w-full p-4 sm:p-6 text-left border border-white/10 hover:border-red-600/40 rounded-2xl bg-black/60 backdrop-blur-md transition-all duration-300 group">
                <div className="flex flex-col gap-2.5 sm:gap-4">
                    {/* Icon Container */}
                    <div className="p-2 sm:p-3 bg-red-600/10 rounded-xl text-red-500 w-fit border border-red-500/20 group-hover:bg-red-600/20 group-hover:text-red-400 transition-all duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    {/* Sector Title */}
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide group-hover:text-red-500 transition-colors duration-300">
                        {title}
                    </h3>

                    {/* Sector Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 sm:line-clamp-4">
                        {description}
                    </p>
                </div>

                {/* Sector Tags */}
                <div className="flex flex-wrap gap-1 mt-3 sm:mt-6 pt-3 sm:pt-4 border-t border-white/5">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] sm:text-[10px] text-gray-400 font-medium whitespace-nowrap hover:bg-white/10 hover:text-white transition-all duration-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

interface WorkSectionProps {
    title?: string;
}

export default function WorkSection({ title = "WORK" }: WorkSectionProps) {
    const t = useTranslations("industries");
    const sectionRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLSpanElement | null>(null);
    const sceneRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const maskRef = useRef<HTMLDivElement | null>(null);
    const pathOuterRef = useRef<SVGPathElement | null>(null);
    const pathInnerRef = useRef<SVGPathElement | null>(null);
    const pathLinesRef = useRef<SVGPathElement | null>(null);
    const rulerRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    const [ghostLetters, setGhostLetters] = useState<any[]>([]);

    const sectors: SectorItem[] = [
        { key: "financial", icon: Building2 },
        { key: "government", icon: Landmark },
        { key: "healthcare", icon: Hospital },
        { key: "energy", icon: Zap },
        { key: "education", icon: GraduationCap },
        { key: "enterprise", icon: Building },
    ];

    const titleText = title.toUpperCase();
    const titleLength = titleText.length;
    // Dynamically scale font size so longer words (like INDUSTRIES) fit vertically within the viewport height
    const dynamicFontSize = titleLength > 4 ? `min(15.75rem, ${Math.floor(100 / titleLength)}lvh)` : "min(15.75rem, 25lvh)";

    useEffect(() => {
        // 1. Initialize Lenis for smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            lerp: 0.08,
            smoothWheel: true,
        });

        let animationFrameId: number;
        function raf(time: number) {
            lenis.raf(time);
            animationFrameId = requestAnimationFrame(raf);
        }
        animationFrameId = requestAnimationFrame(raf);

        // 2. Setup Dimensions and Layout Calculations
        let points: any[] = [];
        let letters: any[] = [];
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let speed = 0;
        let bounding = { width: 0, height: 0 };

        const setCtxStyle = () => {
            if (!sectionRef.current) return;
            const color = getComputedStyle(sectionRef.current).getPropertyValue("--color-primary") || "#f40c3f";
            ctx.strokeStyle = color;
        };

        const setSize = () => {
            if (!containerRef.current || !sectionRef.current) return;
            sectionRef.current.style.setProperty("--height", `${sectors.length * 75}lvh`);

            bounding = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            canvas.width = bounding.width;
            canvas.height = bounding.height;
            speed = Math.hypot(bounding.width, bounding.height) * 4;
        };

        const setPoints = () => {
            points = [];
            const gap = 48;
            const cols = Math.ceil((bounding.width * 1.2) / gap);
            const rows = Math.ceil((bounding.height * 1.2) / gap);

            const offsetX = (bounding.width - cols * gap) * 0.5;
            const offsetY = (bounding.height - rows * gap) * 0.5;

            const hWidth = bounding.width * 0.5;
            const hHeight = bounding.height * 0.5;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * gap + offsetX;
                    const y = j * gap + offsetY;
                    points.push({
                        x,
                        y,
                        dx: hWidth - x,
                        dy: hHeight - y,
                        flowX: 0,
                    });
                }
            }
        };

        const setMask = () => {
            if (!maskRef.current || !rulerRef.current || !sectionRef.current || !pathOuterRef.current || !pathInnerRef.current || !pathLinesRef.current) return;
            const width = maskRef.current.clientWidth;
            const height = maskRef.current.clientHeight;

            const maskSvg = maskRef.current.querySelector("svg");
            if (maskSvg) {
                maskSvg.style.width = `${width}px`;
                maskSvg.style.height = `${height}px`;
            }

            const elBounding = sectionRef.current.getBoundingClientRect();
            const rulerBounding = rulerRef.current.getBoundingClientRect();
            const rulerWidth = rulerBounding.width;
            const rulerHeight = rulerBounding.height;
            const offsetX = rulerBounding.left - elBounding.left;
            const offsetY = rulerBounding.top - elBounding.top;

            const dOuter = `M -1 0 L ${width + 2} 0 L ${width + 2} ${height} L -1 ${height} Z`;

            const corners = {
                tl: { x: offsetX, y: offsetY },
                tr: { x: offsetX + rulerWidth, y: offsetY },
                br: { x: offsetX + rulerWidth, y: offsetY + rulerHeight },
                bl: { x: offsetX, y: offsetY + rulerHeight },
            };

            let size = (corners.tr.x - corners.tl.x) / 2;
            const maxScale = window.innerWidth / size;
            sectionRef.current.style.setProperty("--max-scale", String(maxScale));

            let dInner = `M ${corners.tl.x} ${corners.tl.y + size} A ${size} ${size} 0 0 1 ${corners.tr.x} ${corners.tr.y + size} L ${corners.br.x} ${corners.br.y - size} A ${size} ${size} 0 0 1 ${corners.bl.x} ${corners.bl.y - size} Z`;
            const linesClip = `${dOuter} ${dInner}`;

            pathOuterRef.current.setAttribute("d", `${dOuter} ${dInner}`);

            const thickness = window.innerWidth > 767 ? 16 : 8;
            corners.tl.x += thickness;
            corners.tl.y += thickness;
            corners.tr.x -= thickness;
            corners.tr.y += thickness;
            corners.br.x -= thickness;
            corners.br.y -= thickness;
            corners.bl.x += thickness;
            corners.bl.y -= thickness;

            size = (corners.tr.x - corners.tl.x) / 2;
            dInner = `M ${corners.tl.x} ${corners.tl.y + size} A ${size} ${size} 0 0 1 ${corners.tr.x} ${corners.tr.y + size} L ${corners.br.x} ${corners.br.y - size} A ${size} ${size} 0 0 1 ${corners.bl.x} ${corners.bl.y - size} Z`;
            pathInnerRef.current.setAttribute("d", `${dOuter} ${dInner}`);

            const vLines = window.innerWidth > 767 ? 12 : 8;
            const gapX = width / vLines;
            const gapY = height * 0.1;
            const hLines = Math.ceil(height / gapY);

            let dLines = "";
            for (let i = 1; i < vLines; i++) {
                const x = gapX * i;
                dLines += `M ${x} 0 L ${x} ${height} `;
            }
            for (let i = 0; i < hLines; i++) {
                const y = gapY * i;
                dLines += `M 0 ${y} L ${width} ${y} `;
            }

            pathLinesRef.current.setAttribute("d", dLines);
            pathLinesRef.current.style.clipPath = `path(evenodd, '${linesClip}')`;
        };

        const calculateLetters = () => {
            if (!titleRef.current || !sceneRef.current) return;
            const letterEls = titleRef.current.querySelectorAll(".js-letter");
            const sceneBox = sceneRef.current.getBoundingClientRect();
            const list: any[] = [];

            letterEls.forEach((elNode, index) => {
                const el = elNode as HTMLElement;
                const rect = el.getBoundingClientRect();
                const letterWidth = rect.width;
                const letterTop = rect.top - sceneBox.top;
                const letterLeft = rect.left - sceneBox.left;
                const freq = 1 + getSeededRandom(index + 1);

                const multiplier = window.innerWidth > 767 ? 0.75 : 0.5;
                const total = Math.round((window.innerWidth / letterWidth) * multiplier) + 2;

                const ghosts = [];
                for (let i = 0; i < total; i++) {
                    ghosts.push({
                        char: el.innerText,
                        x: letterLeft,
                        y: letterTop,
                        i: i - total * 0.5,
                        p: (i / total - 0.5) * 2,
                        ap: Math.abs(i / total - 0.5) * 2,
                        iy: ((index + 1) / (letterEls.length + 1) - 0.5) * 2,
                        zIndex: index !== 1 && index !== 2 && (index + letterEls.length + i) % 5 === 0 ? 3 : 1,
                        total,
                        freq,
                    });
                }
                list.push({ char: el.innerText, ghosts });
            });

            setGhostLetters(list);
            letters = list;
        };

        let tl: gsap.core.Timeline | null = null;
        const stateObj = { animationProgress: 0, pointsProgress: 0, state: 0 };

        const buildTimeline = () => {
            if (tl) {
                tl.kill();
            }

            // Calculate dynamic timings based on the number of cards
            const cardsStart = 0.75;
            const cardGap = 0.25;
            const cardDuration = 1.0;
            const cardsEnd = cardsStart + (sectors.length - 1) * cardGap + cardDuration;
            const closingStart = cardsEnd + 0.5;
            const totalDuration = closingStart + 1.0;

            tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 25%",
                    end: "bottom 75%",
                    scrub: 1,
                },
                onUpdate: () => {
                    if (sceneRef.current) {
                        sceneRef.current.style.setProperty("--state", String(stateObj.state));
                    }
                },
            });

            tl.fromTo(
                maskRef.current,
                { scale: 1 },
                {
                    scale: () => parseFloat(sectionRef.current?.style.getPropertyValue("--max-scale") || "4"),
                    duration: 0.75,
                    ease: "power4.in",
                },
                0
            );

            tl.fromTo(
                sceneRef.current,
                { scale: 0.75 },
                { scale: 1, duration: 0.75, ease: "power3.in" },
                0
            );

            tl.fromTo(
                containerRef.current,
                { clipPath: "inset(0 1rem)" },
                { clipPath: "inset(0 0rem)", duration: 0.75, ease: "power3.in" },
                0
            );

            tl.fromTo(
                stateObj,
                { pointsProgress: 0 },
                { pointsProgress: 1, duration: 1, ease: "power4.inOut" },
                0
            );

            tl.fromTo(
                stateObj,
                { state: 0 },
                { state: 1, duration: 0.75, ease: "power4.in" },
                0
            );

            // Cards animation progress
            cardsRef.current.forEach((cardEl, i) => {
                if (!cardEl) return;
                tl!.fromTo(
                    cardEl,
                    { attr: { "data-progress": 1 } },
                    { attr: { "data-progress": -1 }, duration: cardDuration, ease: "slow(0.15, 0.6, false)" },
                    cardsStart + i * cardGap
                );
            });

            tl.fromTo(
                stateObj,
                { animationProgress: 0 },
                { animationProgress: 3500, duration: totalDuration - 0.75, ease: "power1.out" },
                0.75
            );

            tl.fromTo(
                stateObj,
                { state: 1 },
                { state: 0, duration: 0.75, ease: "power4.inOut", immediateRender: false },
                closingStart
            );

            tl.fromTo(
                maskRef.current,
                { scale: () => parseFloat(sectionRef.current?.style.getPropertyValue("--max-scale") || "4") },
                { scale: 1, duration: 0.75, ease: "power4.inOut", immediateRender: false },
                closingStart
            );

            tl.fromTo(
                sceneRef.current,
                { scale: 1 },
                { scale: 0.75, duration: 0.75, ease: "power3.inOut", immediateRender: false },
                closingStart
            );

            tl.fromTo(
                containerRef.current,
                { clipPath: "inset(0 0rem)" },
                { clipPath: "inset(0 1rem)", duration: 0.75, ease: "power3.inOut", immediateRender: false },
                closingStart
            );

            tl.fromTo(
                stateObj,
                { pointsProgress: 1 },
                { pointsProgress: 0, duration: 1, ease: "power4.inOut" },
                closingStart
            );
        };

        // 3. Initialize everything
        const init = () => {
            setCtxStyle();
            setSize();
            setMask();
            setPoints();
            calculateLetters();

            // Defers timeline building to next frame to ensure elements are mounted and cardsRef is populated
            requestAnimationFrame(() => {
                buildTimeline();
                ScrollTrigger.refresh();
            });
        };

        if (typeof document !== "undefined" && "fonts" in document) {
            document.fonts.ready.then(() => {
                init();
                ScrollTrigger.refresh();
            });
        } else {
            init();
        }

        // 5. Animation Loops (Ticker)
        let lastPointsProgress = -1;
        let lastAnimationProgress = -1;

        const tick = () => {
            if (!sectionRef.current || !canvas || !ctx) return;
            const scrollProgress =
                Math.max(Math.min(1, ScrollTrigger.positionInViewport(sectionRef.current, "top")), 0) * -1 +
                (1 - Math.max(Math.min(1, ScrollTrigger.positionInViewport(sectionRef.current, "bottom")), 0));

            sectionRef.current.style.setProperty("--scroll-progress", String(scrollProgress));

            // Move points flow
            points.forEach((p) => {
                p.flowX = (stateObj.animationProgress * -0.05) % 24;
            });

            // Draw points on canvas
            const rPointsProgress = Math.round(stateObj.pointsProgress * 100) / 100;
            const rAnimationProgress = Math.round(stateObj.animationProgress * 100) / 100;

            if (rPointsProgress !== lastPointsProgress || rAnimationProgress !== lastAnimationProgress) {
                ctx.clearRect(0, 0, bounding.width, bounding.height);
                ctx.beginPath();
                points.forEach((p) => {
                    const x = p.x + p.dx * (1 - stateObj.pointsProgress) * 0.2 + p.flowX;
                    const y = p.y + p.dy * (1 - stateObj.pointsProgress) * 0.2;
                    ctx.rect(x, y, 0.5, 0.5);
                });
                ctx.stroke();

                lastPointsProgress = rPointsProgress;
                lastAnimationProgress = rAnimationProgress;
            }

            // Move ghost letters
            const ghostEls = sceneRef.current?.querySelectorAll(".js-ghost-letter");
            if (ghostEls) {
                let index = 0;
                letters.forEach((letter) => {
                    const letterSpeed = speed * letter.ghosts[0]?.freq;
                    letter.ghosts.forEach((ghost: any, idx: number) => {
                        const el = ghostEls[index++] as HTMLElement;
                        if (el) {
                            const progress =
                                (((stateObj.animationProgress % letterSpeed) / letterSpeed + idx / ghost.total) % 1) / 0.7 - 0.15;
                            el.style.setProperty("--progress", String(progress));
                        }
                    });
                });
            }
        };

        gsap.ticker.add(tick);

        let resizeTimer: any;

        const handleResize = () => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                if (tl) {
                    if (tl.scrollTrigger) {
                        tl.scrollTrigger.kill();
                    }
                    tl.kill();
                }

                setGhostLetters([]);
                cardsRef.current = [];

                requestAnimationFrame(() => {
                    setSize();
                    setMask();
                    setPoints();

                    requestAnimationFrame(() => {
                        calculateLetters();
                        buildTimeline();
                        ScrollTrigger.refresh(true);
                    });
                });
            }, 150);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(animationFrameId);
            gsap.ticker.remove(tick);
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
            if (tl) tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [sectors.length]);

    return (
        <section id="work" className="s-work" ref={sectionRef} style={{ "--font-size": dynamicFontSize } as React.CSSProperties}>
            <div className="s__outer">
                <div className="s__inner js-container" ref={containerRef}>
                    {/* Main vertical title for measuring position */}
                    <h2 className="s__title">
                        <span className="s__title__inner js-title" ref={titleRef}>
                            {titleText.split("").map((letter, idx) => (
                                <span key={idx} className="s__title__letter js-letter">
                                    {letter}
                                </span>
                            ))}
                        </span>
                    </h2>

                    <div className="s__scene js-scene" ref={sceneRef}>
                        {/* Dynamically created ghost letters for the scrolling wave effect */}
                        {ghostLetters.flatMap((letterGroup, groupIdx) =>
                            letterGroup.ghosts.map((ghost: any, i: number) => (
                                <span
                                    key={`${letterGroup.char}-${groupIdx}-${i}`}
                                    className="s__scene__letter js-ghost-letter"
                                    data-letter={ghost.char}
                                    style={{
                                        top: `${ghost.y}px`,
                                        left: `${ghost.x}px`,
                                        zIndex: ghost.zIndex,
                                        "--ix": ghost.i,
                                        "--iy": ghost.iy,
                                        "--ap": ghost.ap,
                                        "--p": ghost.p,
                                    } as React.CSSProperties}
                                >
                                    {ghost.char}
                                </span>
                            ))
                        )}

                        {sectors.map((sector, index) => {
                            const r1 = getSeededRandom(index + 1);
                            const r2 = getSeededRandom(index + 100);
                            const r3 = getSeededRandom(index + 500);
                            const r4 = getSeededRandom(index + 900);

                            const size = (0.5 + r1 * 0.5).toFixed(4);
                            const y = ((0.5 + r2 * 0.5) * (index % 2 ? -1 : 1)).toFixed(4);
                            const rotate = ((r4 - 0.5) * 8).toFixed(4); // seeded rotation between -4 and +4 degrees
                            const randStr = Math.floor(r3 * 1679616).toString(36).padStart(4, "0");
                            const key = randStr + "-" + String(index).padStart(2, "0") + "/" + String(sectors.length).padStart(2, "0");

                            return (
                                <WorkCard
                                    key={sector.key}
                                    sector={sector}
                                    index={index}
                                    cardsRef={cardsRef}
                                    size={size}
                                    y={y}
                                    rotate={rotate}
                                    id={key}
                                    t={t}
                                />
                            );
                        })}
                    </div>

                    <canvas className="s__canvas" ref={canvasRef}></canvas>
                </div>

                <div className="s__mask-outer">
                    <div className="s__mask js-mask" ref={maskRef}>
                        <svg className="s__mask__svg js-mask-svg">
                            <path className="s__mask__path-outer js-mask-path-outer" ref={pathOuterRef}></path>
                            <path className="s__mask__path-inner js-mask-path-inner" ref={pathInnerRef}></path>
                            <path className="s__mask__path-lines js-mask-path-lines" ref={pathLinesRef}></path>
                        </svg>
                    </div>
                </div>

                <div className="s__ruler js-ruler" ref={rulerRef}></div>
            </div>
        </section>
    );
}