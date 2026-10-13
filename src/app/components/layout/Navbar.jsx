import { useEffect, useRef, useState } from "react";
import { asset } from "../../lib/asset";
import { cn } from "../../lib/cn";
import AnimatedLink from "../ui/AnimatedLink";

const DEFAULT_LINKS = [
  { label: "projects", href: "#projects" },
  { label: "aboutMe", href: "#me" },
  { label: "contacts", href: "#contact" },
];

/**
 * Fixed top bar. It is transparent with dark text over the orange hero, and flips to a dark bar
 * with orange text once the dark content area scrolls up under it.
 *
 * links       optional [{ label, href }] (defaults to projects / aboutMe / contacts)
 * contentRef  optional ref to the dark <main> that scrolls over the hero
 *             (falls back to the page's <main> element)
 */
export default function Navbar({ links = DEFAULT_LINKS, contentRef }) {
  const barRef = useRef(null);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const update = () => {
      const content = contentRef?.current ?? document.querySelector("main");
      const bar = barRef.current;
      if (!content || !bar) return;
      // flip when the dark area reaches the middle of the bar
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

  const logo = asset("assets/images/logo-dark.png");

  return (
    <nav
      ref={barRef}
      aria-label="Primary"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        onDark ? "bg-dark text-primary" : "bg-transparent text-dark",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[calc(914px+2.5rem)] items-center px-5">
        <div className="flex w-full max-w-[440px] items-center justify-between gap-3">
          {/* The PNG is used as a mask, so the logo takes on the bar's text colour
              (needs a transparent background). The hidden <img> only reserves the size. */}
          <span role="img" aria-label="reece santos" className="relative inline-block h-[30px]">
            <img src={logo} alt="" aria-hidden="true" className="h-full w-auto opacity-0" />
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

          {links.map((link) => (
            <AnimatedLink
              key={link.href}
              href={link.href}
              tone={onDark ? "primary" : "dark"}
              duration={500}
              iconSize="1rem"
              className="text-base font-medium whitespace-nowrap transition-colors duration-300 sm:text-[1.3rem]"
            >
              {link.label}
            </AnimatedLink>
          ))}
        </div>
      </div>
    </nav>
  );
}