import { useEffect, useId, useRef, useState } from "react";
import { asset } from "../../lib/asset";
import { cn } from "../../lib/cn";
import AnimatedLink from "../ui/AnimatedLink";
import SocialButton from "../ui/SocialButton";
import TypeText from "../ui/TypeText";
import { SOCIALS } from "../../../data/profile";

const DEFAULT_LINKS = [
  { label: "projects", href: "#projects" },
  { label: "aboutMe", href: "#me" },
  { label: "contacts", href: "#contact" },
];

function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true" focusable="false" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" aria-hidden="true" focusable="false" {...props}>
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

/**
 * Fixed top bar.
 *
 * - Transparent with dark text over the orange hero; flips to a dark bar with orange text once the
 *   dark content area scrolls up under it.
 * - Below the `sm` breakpoint the links move into a slide-in side drawer (hamburger button).
 *   Tapping a link closes the drawer while the page scrolls to the section.
 *
 * links        optional [{ label, href }] (defaults to projects / aboutMe / contacts)
 * contentRef   optional ref to the dark <main> that scrolls over the hero
 *              (falls back to the page's <main> element)
 */
export default function Navbar({ links = DEFAULT_LINKS, contentRef }) {
  const barRef = useRef(null);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const panelId = useId();
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ---- bar colour: flip when the dark area reaches the middle of the bar ----
  useEffect(() => {
    const update = () => {
      const content = contentRef?.current ?? document.querySelector("main");
      const bar = barRef.current;
      if (!content || !bar) return;
      setOnDark(content.getBoundingClientRect().top <= bar.offsetHeight / 2);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [contentRef]);

  // ---- drawer ----
  const closeMenu = (returnFocus = true) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  };

  // Escape closes the drawer
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // if the window grows past the phone layout, reset the drawer
  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const onChange = (event) => event.matches && setMenuOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // move focus into the drawer when it opens
  useEffect(() => {
    if (menuOpen) closeRef.current?.focus({ preventScroll: true });
  }, [menuOpen]);

  const logo = asset("assets/images/logo-dark.png");

  return (
    <>
      <nav
        ref={barRef}
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          onDark ? "bg-dark text-primary" : "bg-transparent text-dark",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[calc(914px+2.5rem)] items-center justify-between px-5">
          <div className="flex shrink-0 items-center gap-3 sm:w-full sm:max-w-[440px] sm:justify-between">
            {/* The PNG is used as a mask, so the logo takes on the bar's text colour
                (needs a transparent background). The hidden <img> only reserves the size. */}
            <span role="img" aria-label="reece santos" className="relative inline-block h-[30px]">
              <img src={logo} alt="logo here" className="h-full w-auto" />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-current"
                style={{
                  WebkitMaskImage: `url("${logo}")`,
                  maskImage: `url("${logo}")`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </span>

            {/* inline links from `sm` up; `contents` lets them sit directly in the row above */}
            <div className="hidden items-center gap-3 sm:contents">
              {links.map((link, index) => (
                <AnimatedLink
                  key={link.href}
                  href={link.href}
                  tone={onDark ? "primary" : "dark"}
                  duration={500}
                  icon={false}
                  className="text-base font-medium whitespace-nowrap transition-colors duration-300 sm:text-[1.3rem]"
                >
                  <TypeText text={`${link.label}^`} delay={index * 200} />
                </AnimatedLink>
              ))}
            </div>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls={panelId}
            onClick={() => setMenuOpen(true)}
            className="-mr-2 ml-auto grid size-11 shrink-0 cursor-pointer place-items-center sm:hidden"
          >
            <MenuIcon className="size-7" />
          </button>
        </div>
      </nav>

      {/* ---- phone drawer. Always mounted so it can animate both ways; `invisible` (after the
              slide finishes) keeps it out of reach of keyboards and screen readers when closed ---- */}
      <div
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[60] touch-none transition-[visibility] duration-0 sm:hidden",
          menuOpen ? "visible delay-0" : "invisible delay-300",
        )}
      >
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => closeMenu()}
          className={cn(
            "absolute inset-0 bg-dark/70 transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          id={panelId}
          className={cn(
            "absolute inset-y-0 right-0 flex w-full flex-col bg-dark px-8 pt-6 pb-10 transition-transform duration-300 ease-in-out",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex justify-between items-start">
            {/* Logo in top left, inverted (primary color) */}
            <span role="img" aria-label="reece santos" className="relative inline-block h-[30px]">
              <img src={logo} alt="logo here" className="h-full w-auto" />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-primary"
                style={{
                  WebkitMaskImage: `url("${logo}")`,
                  maskImage: `url("${logo}")`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </span>

            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => closeMenu()}
              className="grid size-11 cursor-pointer place-items-center text-primary"
            >
              <CloseIcon className="size-7" />
            </button>
          </div>

          {/* Nav buttons stacked in column, aligned left, with high margin from logo */}
          <nav aria-label="Mobile" className="mt-24">
            <ul className="flex flex-col gap-6">
              {links.map((link, index) => (
                <li key={link.href}>
                  {/* no preventDefault: the browser scrolls to the section while the drawer slides shut */}
                  <AnimatedLink
                    href={link.href}
                    tone="primary"
                    thickness={3}
                    duration={500}
                    iconSize="1.5rem"
                    onClick={() => closeMenu(false)}
                    className="text-[2rem] font-black"
                  >
                    {link.label}
                  </AnimatedLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social buttons at bottom in a row */}
          <ul className="flex flex-wrap gap-4 mt-auto">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <SocialButton {...social} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}