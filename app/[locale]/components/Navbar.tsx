"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { withBasePath } from "@/lib/basePath";
import { Globe, ChevronDown, Sun, Moon } from "lucide-react";
import ChatWizardModal from "./ChatWizardModal";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Collect refs for magnetic hover effects
  const magneticRefs = useRef<(HTMLElement | null)[]>([]);

  // Red pill cursor refs
  const redPillRef = useRef<HTMLDivElement>(null);
  const navCenterRef = useRef<HTMLDivElement>(null);

  // Sniper scope cursor ref
  const scopeRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  // Red pill rAF animation
  useEffect(() => {
    const pill = redPillRef.current;
    const container = navCenterRef.current;
    if (!pill || !container) return;

    let pillX = 0, pillY = 0, pillW = 16, pillH = 16;
    let targetX = 0, targetY = 0, targetW = 16, targetH = 16;
    let rafId: number;
    const LERP = 0.2;

    const tick = () => {
      pillX += (targetX - pillX) * LERP;
      pillY += (targetY - pillY) * LERP;
      pillW += (targetW - pillW) * LERP;
      pillH += (targetH - pillH) * LERP;
      pill.style.transform = `translate(calc(${pillX}px - 50%), calc(${pillY}px - 50%))`;
      pill.style.width = `${pillW}px`;
      pill.style.height = `${pillH}px`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    let lastActive: HTMLElement | null = null;

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (lastActive) lastActive.removeAttribute('data-active');
      lastActive = el;
      el.setAttribute('data-active', 'true');
      const rect = el.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
      targetW = rect.width + 32;
      targetH = rect.height + 14;
      // Teleport pill center to link on first enter to prevent sliding from far away
      pillX = targetX; pillY = targetY;
      pill.style.opacity = '1';
    };

    const onLeave = () => {
      if (lastActive) lastActive.removeAttribute('data-active');
      lastActive = null;
      pill.style.opacity = '0';
      targetW = 16; targetH = 16;
    };

    const links = container.querySelectorAll<HTMLElement>('[data-navlink]');
    links.forEach(l => {
      l.addEventListener('mouseenter', onEnter);
      l.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      links.forEach(l => {
        l.removeEventListener('mouseenter', onEnter);
        l.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    const handleOpenModal = () => setIsModalOpen(true);
    window.addEventListener("open-contact-modal", handleOpenModal);

    // Cache static coordinate centers of elements to prevent layout-thrashing feedback loops
    let elementCenters: { el: HTMLElement; centerX: number; centerY: number }[] = [];

    const updateCenters = () => {
      elementCenters = magneticRefs.current
        .filter((el): el is HTMLElement => !!el)
        .map((el) => {
          const prevTransform = el.style.transform;
          el.style.transform = "none";
          const rect = el.getBoundingClientRect();
          el.style.transform = prevTransform;

          return {
            el,
            centerX: rect.left + rect.width / 2 + window.scrollX,
            centerY: rect.top + rect.height / 2 + window.scrollY,
          };
        });
    };

    // Calculate centers on mount and resize
    setTimeout(updateCenters, 100);
    window.addEventListener("resize", updateCenters);

    // Magnetic proximity logic using stable cached coordinates
    let activeMagneticEl: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      const threshold = 70; // Attraction range in pixels

      let closestEl: HTMLElement | null = null;
      let minDistance = Infinity;
      let closestDeltaX = 0;
      let closestDeltaY = 0;

      elementCenters.forEach((item) => {
        const distance = Math.hypot(pageX - item.centerX, pageY - item.centerY);

        if (distance < threshold && distance < minDistance) {
          minDistance = distance;
          closestEl = item.el;
          closestDeltaX = pageX - item.centerX;
          closestDeltaY = pageY - item.centerY;
        }
      });

      // Apply magnetic translation only to the closest element, reset previously active
      if (closestEl) {
        const el = closestEl as HTMLElement;
        if (activeMagneticEl && activeMagneticEl !== el) {
          activeMagneticEl.style.transform = "translate3d(0px, 0px, 0)";
          activeMagneticEl.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
        }
        el.style.transform = `translate3d(${closestDeltaX * 0.35}px, ${closestDeltaY * 0.35}px, 0)`;
        el.style.transition = "transform 0.1s ease-out";
        activeMagneticEl = el;
      } else if (activeMagneticEl) {
        activeMagneticEl.style.transform = "translate3d(0px, 0px, 0)";
        activeMagneticEl.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
        activeMagneticEl = null;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-contact-modal", handleOpenModal);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateCenters);
    };
  }, []);

  // Sniper scope effect
  useEffect(() => {
    const scope = scopeRef.current;
    const nav = navbarRef.current;
    if (!scope || !nav) return;

    let rafId: number;
    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        scope.style.left = `${mouseX}px`;
        scope.style.top = `${mouseY}px`;
      });
    };

    const onEnter = () => scope.classList.add('visible');
    const onLeave = () => scope.classList.remove('visible');

    const primaryLinks = nav.querySelectorAll('[data-navlink]');
    primaryLinks.forEach(link => {
      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
    });
    window.addEventListener('mousemove', onMove);

    return () => {
      primaryLinks.forEach(link => {
        link.removeEventListener('mouseenter', onEnter);
        link.removeEventListener('mouseleave', onLeave);
      });
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [mounted]);

  // Sync the curtain state when the modal state changes from outside triggers
  useEffect(() => {
    const ribbon = document.querySelector('.forkit') as HTMLElement;
    if (!ribbon) return;

    if (isModalOpen) {
      ribbon.dispatchEvent(new CustomEvent('open-curtain'));
    } else {
      ribbon.dispatchEvent(new CustomEvent('close-curtain'));
    }
  }, [isModalOpen]);

  // Forkit.js ribbon physics loop
  useEffect(() => {
    if (!mounted) return;

    const ribbon = document.querySelector('.forkit') as HTMLElement;
    const curtain = document.querySelector('.forkit-curtain') as HTMLElement;
    if (!ribbon || !curtain) return;

    const closeButton = curtain.querySelector('.close-button') as HTMLElement;

    const STATE_CLOSED = 0;
    const STATE_DETACHED = 1;
    const STATE_OPENED = 2;

    const TAG_HEIGHT = 40;
    const TAG_WIDTH = 120;
    const MAX_STRAIN = 40;
    const DRAG_THRESHOLD = 0.36;

    let state = STATE_CLOSED;
    const closedText = ribbon.getAttribute('data-text') || '';
    const detachedText = ribbon.getAttribute('data-text-detached') || closedText;

    // Build the sub-elements required
    ribbon.innerHTML = '<span class="string"></span><span class="tag">' + closedText + '</span>';
    const ribbonString = ribbon.querySelector('.string') as HTMLElement;
    const ribbonTag = ribbon.querySelector('.tag') as HTMLElement;

    const friction = 1.04;
    const gravity = 1.5;

    const closedX = 0;
    const closedY = 0;
    const openedX = 0;
    const openedY = 50;

    let velocity = 0;
    let rotation = 0;

    let curtainTargetY = 0;
    let curtainCurrentY = 0;

    let dragging = false;
    let dragTime = 0;
    let dragY = 0;

    class Point {
      x: number;
      y: number;
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
    }

    const anchorA = new Point(closedX, closedY);
    const anchorB = new Point(closedX, closedY);
    const mouse = new Point();

    function distanceBetween(x1: number, y1: number, x2: number, y2: number) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    }

    function onMouseDown(event: MouseEvent) {
      if (state === STATE_DETACHED) {
        event.preventDefault();
        dragY = event.clientY;
        dragTime = Date.now();
        dragging = true;
      }
    }

    function onMouseMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }

    function onMouseUp() {
      if (state !== STATE_OPENED) {
        state = STATE_CLOSED;
        dragging = false;
      }
    }

    function onTouchStart(event: TouchEvent) {
      if (state === STATE_DETACHED) {
        event.preventDefault();
        const touch = event.touches[0];
        dragY = touch.clientY;
        dragTime = Date.now();
        dragging = true;
      }
    }

    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
    }

    function onTouchEnd() {
      if (state !== STATE_OPENED) {
        state = STATE_CLOSED;
        dragging = false;
      }
    }

    function onRibbonClick(event: MouseEvent) {
      event.preventDefault();
      if (state === STATE_OPENED) {
        close();
      } else if (Date.now() - dragTime < 300) {
        open();
      }
    }

    function onCloseClick(event: MouseEvent) {
      event.preventDefault();
      close();
    }

    function open() {
      dragging = false;
      state = STATE_OPENED;
      curtain.classList.add('opened');
      setIsCurtainOpen(true);
      setIsModalOpen(true);
    }

    function close() {
      dragging = false;
      state = STATE_CLOSED;
      ribbonTag.innerHTML = closedText;
      curtain.classList.remove('opened');
      ribbon.classList.remove('detached');
      setIsCurtainOpen(false);
      setIsModalOpen(false);
    }

    if (closeButton) {
      closeButton.addEventListener('click', onCloseClick);
    }

    const handleOpenCurtain = () => open();
    const handleCloseCurtain = () => close();
    ribbon.addEventListener('open-curtain', handleOpenCurtain);
    ribbon.addEventListener('close-curtain', handleCloseCurtain);

    ribbon.addEventListener('click', onRibbonClick);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchstart', onTouchStart, { passive: false });
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    let animationFrameId: number;

    function animate() {
      update();
      render();
      animationFrameId = requestAnimationFrame(animate);
    }

    function update() {
      const rect = ribbon.getBoundingClientRect();
      const ribbonCenterX = rect.left + rect.width / 2;
      const ribbonCenterY = rect.top;

      const distance = distanceBetween(mouse.x, mouse.y, ribbonCenterX, ribbonCenterY);

      if (state === STATE_OPENED) {
        curtainTargetY = Math.min(curtainTargetY + (window.innerHeight - curtainTargetY) * 0.2, window.innerHeight);
      } else {
        if (distance < 120) {
          state = STATE_DETACHED;
          ribbonTag.innerHTML = detachedText;
          ribbon.classList.add('detached');
        } else if (!dragging && state === STATE_DETACHED && distance > 200) {
          state = STATE_CLOSED;
          ribbonTag.innerHTML = closedText;
          ribbon.classList.remove('detached');
        }

        if (dragging) {
          curtainTargetY = Math.max(mouse.y - dragY, 0);
          if (curtainTargetY > window.innerHeight * DRAG_THRESHOLD) {
            open();
          }
        } else {
          curtainTargetY *= 0.8;
        }
      }

      curtainCurrentY += (curtainTargetY - curtainCurrentY) * 0.3;

      if (dragging || state === STATE_DETACHED) {
        velocity /= friction;
        velocity += gravity;

        const offsetX = Math.max(((mouse.x - ribbonCenterX) - closedX) * 0.2, -MAX_STRAIN);

        anchorB.x += ((closedX + offsetX) - anchorB.x) * 0.1;
        anchorB.y += velocity;

        const strain = distanceBetween(anchorA.x, anchorA.y, anchorB.x, anchorB.y);
        if (strain > MAX_STRAIN) {
          velocity -= Math.abs(strain) / (MAX_STRAIN * 1.25);
        }

        const dy = Math.max(mouse.y - rect.top - anchorB.y, 0);
        const dx = mouse.x - (rect.left + anchorB.x);
        const angle = Math.min(130, Math.max(50, Math.atan2(dy, dx) * 180 / Math.PI));

        rotation += (angle - rotation) * 0.1;
      } else if (state === STATE_OPENED) {
        anchorB.x += (openedX - anchorB.x) * 0.2;
        anchorB.y += (openedY - anchorB.y) * 0.2;
        rotation += (90 - rotation) * 0.02;
      } else {
        anchorB.x += (anchorA.x - anchorB.x) * 0.2;
        anchorB.y += (anchorA.y - anchorB.y) * 0.2;
        rotation += (0 - rotation) * 0.2;
      }
    }

    function render() {
      curtain.style.top = -100 + Math.min((curtainCurrentY / window.innerHeight) * 100, 100) + '%';

      ribbon.style.transform = `translate(0px, ${curtainCurrentY}px) rotate(0deg)`;
      ribbonTag.style.transform = `translate(${anchorB.x}px, ${anchorB.y}px) rotate(${rotation}deg)`;

      const dy = anchorB.y - anchorA.y;
      const dx = anchorB.x - anchorA.x;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;

      ribbonString.style.height = anchorB.y + 'px';
      ribbonString.style.transform = `translate(${anchorA.x}px, 0px) rotate(${angle - 90}deg)`;
    }

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (closeButton) {
        closeButton.removeEventListener('click', onCloseClick);
      }
      ribbon.removeEventListener('open-curtain', handleOpenCurtain);
      ribbon.removeEventListener('close-curtain', handleCloseCurtain);
      ribbon.removeEventListener('click', onRibbonClick);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [mounted]);

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  const dropdownBase =
    "absolute top-full left-0 mt-2 w-56 bg-[#111113] border border-white/10 rounded-xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl z-50";

  const dropdownLink =
    "block px-4 py-2 text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors rounded-md mx-1";

  const dropdownAllLink =
    "block px-4 py-2 text-[11px] font-semibold tracking-wider uppercase text-red-500 hover:bg-white/5 transition-colors rounded-md mx-1";

  return (
    <>
      {/* Glowing Bottom Half Navbar Border */}
      <style>{`
        .samurai-navbar {
          position: fixed;
        }
        .samurai-navbar::after {
          content: '';
          position: absolute;
          inset: -1px;
          border-left: 2px solid #ef4444;
          border-bottom: 2px solid #ef4444;
          border-top: 2px solid #ef4444;
          border-right: transparent;
          border-radius: 9999px;
          pointer-events: none;
          clip-path: polygon(0% 0%, 5% 0%, 15% 100%, 0% 100%);
          filter: drop-shadow(0px 3px 8px rgba(239, 68, 68, 0.7));
        }
      `}</style>

      {/* Scope CSS */}
      <style>{`
        .nav-scope {
          position: fixed;
          top: 0; left: 0;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s ease;
          overflow: hidden;
          border: 1.5px solid rgba(239, 68, 68, 0.95);
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.5),
            0 0 8px rgba(239, 68, 68, 0.4),
            inset 0 0 8px rgba(0,0,0,0.4);
          backdrop-filter: invert(1) hue-rotate(180deg) brightness(1.1);
        }
        .nav-scope.visible { opacity: 1; }

        /* Forkit integration styles */
        .forkit {
          position: relative;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          z-index: 50;
        }
        .forkit .string {
          display: block;
          width: 1.5px;
          height: 0px;
          position: absolute;
          top: 0px;
          left: 50%;
          background: rgba(239, 68, 68, 0.85);
          box-shadow: 0 0 4px rgba(239, 68, 68, 0.6);
          transform-origin: 50% 0%;
          pointer-events: none;
        }
        .forkit .tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.25rem;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(12px);
          border: 2px solid rgba(239, 68, 68, 0.6);
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          pointer-events: auto;
          transform-origin: 50% 0%;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .forkit:hover .tag,
        .forkit.detached .tag {
          border-color: rgb(239, 68, 68);
          background: rgba(0, 0, 0, 0.9) !important;
        }

        .forkit-curtain {
          position: fixed;
          width: 100%;
          height: 100%;
          top: -100%;
          left: 0;
          z-index: 998;
          background: transparent;
          backdrop-filter: none;
          transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }
        .forkit-curtain.opened {
          pointer-events: auto;
        }
      `}</style>
      {/* Sniper scope element */}
      <div ref={scopeRef} className="nav-scope" aria-hidden="true" />

      <nav
        ref={navbarRef}
        className="samurai-navbar fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-7xl z-50 transition-all duration-300 bg-black/90 backdrop-blur-md border border-white/10 rounded-full"
      >
        <div className="w-full px-6 md:px-8 h-[60px] flex items-center justify-between">

          {/* Left Column: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              ref={(el) => {
                magneticRefs.current[0] = el as any;
              }}
              className="shrink-0 flex items-center transition-transform"
            >
              <img
                src={withBasePath("/assets/logoUP.webp")}
                alt="Samurai Logo"
                className="h-10 w-auto object-contain dark:invert-0 light:invert"
              />
            </Link>
          </div>

          {/* Center Column: Navigation Links */}
          <div className="hidden lg:flex items-center justify-center flex-initial gap-2">
            <Link
              href="/"
              data-navlink
              ref={(el) => {
                magneticRefs.current[1] = el as any;
              }}
              className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase !text-white/60 hover:!text-white rounded-md transition-all inline-block"
            >
              {t("links.home")}
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                ref={(el) => {
                  magneticRefs.current[2] = el;
                }}
                data-navlink
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase !text-white/60 hover:!text-white rounded-md transition-all"
              >
                {t("links.services")}
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={dropdownBase}>
                <Link href="/services" className={dropdownAllLink}>{t("dropdowns.services.all")}</Link>
                <div className="h-px bg-border/10 mx-3 my-1" />
                <Link href="/services/cybersecurity" className={dropdownLink}>{t("dropdowns.services.cyber")}</Link>
                <Link href="/services/cloud" className={dropdownLink}>{t("dropdowns.services.cloud")}</Link>
                <Link href="/services/grc" className={dropdownLink}>{t("dropdowns.services.grc")}</Link>
                <Link href="/services/digital-transformation" className={dropdownLink}>{t("dropdowns.services.dt")}</Link>
                <Link href="/services/ai" className={dropdownLink}>{t("dropdowns.services.ai")}</Link>
                <Link href="/services/business-continuity" className={dropdownLink}>{t("dropdowns.services.bcm")}</Link>
                <Link href="/services/cloud-infrastructure" className={dropdownLink}>{t("dropdowns.services.infras")}</Link>
              </div>
            </div>

            {/* Industries Dropdown */}
            <div className="relative group">
              <button
                ref={(el) => {
                  magneticRefs.current[3] = el;
                }}
                data-navlink
                className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-wider uppercase !text-white/60 hover:!text-white rounded-md transition-all"
              >
                {t("links.industries")}
                <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className={dropdownBase}>
                <Link href="/industries" className={dropdownAllLink}>{t("dropdowns.industries.all")}</Link>
                <div className="h-px bg-border/10 mx-3 my-1" />
                <Link href={"/industries#financial" as any} className={dropdownLink}>{t("dropdowns.industries.financial")}</Link>
                <Link href={"/industries#government" as any} className={dropdownLink}>{t("dropdowns.industries.government")}</Link>
                <Link href={"/industries#healthcare" as any} className={dropdownLink}>{t("dropdowns.industries.healthcare")}</Link>
                <Link href={"/industries#energy" as any} className={dropdownLink}>{t("dropdowns.industries.energy")}</Link>
              </div>
            </div>

            <Link
              href="/about"
              data-navlink
              ref={(el) => {
                magneticRefs.current[4] = el as any;
              }}
              className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase !text-white/60 hover:!text-white rounded-md transition-all inline-block"
            >
              {t("links.about")}
            </Link>

            <Link
              href="/partners"
              data-navlink
              ref={(el) => {
                magneticRefs.current[5] = el as any;
              }}
              className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase !text-white/60 hover:!text-white rounded-md transition-all inline-block"
            >
              {t("links.partners")}
            </Link>

            <Link
              href="/insights"
              data-navlink
              ref={(el) => {
                magneticRefs.current[6] = el as any;
              }}
              className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase !text-white/60 hover:!text-white rounded-md transition-all inline-block"
            >
              {t("links.insights")}
            </Link>
          </div>

          {/* Right Column: CTAs + Language Toggle + Theme Toggle */}
          <div className="hidden lg:flex items-center justify-end flex-1 gap-6">
            <button
              onClick={toggleLanguage}
              ref={(el) => {
                magneticRefs.current[7] = el;
              }}
              className="flex items-center gap-1.5 px-3 py-2 text-[11px] font-semibold !text-white/60 hover:!text-white rounded-md transition-all"
              aria-label="Toggle language"
            >
              <Globe className="w-[15px] h-[15px]" />
              <span className="uppercase">{locale === "en" ? "EN" : "AR"}</span>
            </button>

            {mounted && (
              <button
                onClick={toggleTheme}
                ref={(el) => {
                  magneticRefs.current[8] = el;
                }}
                className="flex items-center justify-center p-2 !text-white/60 hover:!text-white rounded-md transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-[15px] h-[15px]" />
                ) : (
                  <Moon className="w-[15px] h-[15px]" />
                )}
              </button>
            )}

            <div className="w-px h-5 bg-border/20 mx-1" />
            <a
              href="#"
              data-text={t("cta.contact")}
              data-text-detached={t("cta.contact")}
              ref={(el) => {
                magneticRefs.current[9] = el as any;
              }}
              className="forkit cursor-pointer"
            >
              {t("cta.contact")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-foreground p-2 rounded-md hover:bg-foreground/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black backdrop-blur-xl border-t border-white/10 px-6 py-5">
            <div className="flex flex-col gap-1">
              {[
                { href: "/", label: t("links.home") },
                { href: "/services", label: t("links.services") },
                { href: "/solutions", label: t("links.solutions") },
                { href: "/industries", label: t("links.industries") },
                { href: "/about", label: t("links.about") },
                { href: "/partners", label: t("links.partners") },
                { href: "/insights", label: t("links.insights") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm !text-white/60 hover:!text-white hover:bg-white/5 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-border/10 my-2" />

              {/* Language + Theme mobile toggle row */}
              <div className="flex items-center justify-between px-3 py-1">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-sm !text-white/60 hover:!text-white hover:bg-white/5 rounded-md transition-colors py-1.5 px-3"
                >
                  <Globe className="w-4 h-4" />
                  {locale === "en" ? "العربية" : "English"}
                </button>
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-sm !text-white/60 hover:!text-white hover:bg-white/5 rounded-md transition-colors py-1.5 px-3 cursor-pointer"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-4 h-4" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <Link href="/assessment" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2.5 bg-gradient-accent text-white text-xs font-bold tracking-wider uppercase rounded-lg">
                  {t("cta.assessment")}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 text-center px-4 py-2.5 border-2 border-red-500/60 !text-white text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer bg-transparent"
                >
                  {t("cta.contact")}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="forkit-curtain flex items-center justify-center">
        <ChatWizardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="contact"
          noBackdrop={false}
        />
      </div>
    </>
  );
}
