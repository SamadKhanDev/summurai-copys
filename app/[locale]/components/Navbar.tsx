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

    // Calculate centers on mount, scroll, and resize
    setTimeout(updateCenters, 100);
    window.addEventListener("resize", updateCenters);
    window.addEventListener("scroll", updateCenters, { passive: true });

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
      window.removeEventListener("scroll", updateCenters);
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
                <Link href="/services/business-continuity" className={dropdownLink}>{t("dropdowns.services.bcm")}</Link>
                <Link href="/services/ai" className={dropdownLink}>{t("dropdowns.services.ai")}</Link>
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
            <button
              onClick={() => setIsModalOpen(true)}
              ref={(el) => {
                magneticRefs.current[9] = el;
              }}
              className="inline-flex items-center px-5 py-2.5 bg-transparent border-2 border-red-500/60 hover:border-red-500 !text-white text-[11px] font-bold tracking-wider uppercase rounded-lg hover:bg-red-500/10 transition-all cursor-pointer"
            >
              {t("cta.contact")}
            </button>
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
      <ChatWizardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="contact"
      />
    </>
  );
}
