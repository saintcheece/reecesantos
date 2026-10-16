// src/app/lib/smoothScroll.js
//
// Animated page scrolling that does not depend on the browser's or the OS's smooth-scroll settings
// (`scroll-behavior: smooth` is switched off by "reduce motion", and some browsers ignore it).
// The page is scrolled by our own requestAnimationFrame loop instead.

const STOP_EVENTS = ["wheel", "touchstart", "keydown"];
let frame = 0;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function cancelScroll() {
  cancelAnimationFrame(frame);
  frame = 0;
  STOP_EVENTS.forEach((type) => window.removeEventListener(type, cancelScroll));
}

/** Scroll the window to `targetY` (px from the top). The visitor grabbing the page cancels it. */
export function scrollToY(targetY, { duration } = {}) {
  cancelScroll();

  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const endY = Math.max(0, Math.min(targetY, maxY));
  const distance = endY - startY;
  if (Math.abs(distance) < 2) return;

  // longer trips take longer, within sensible limits
  const ms = duration ?? Math.min(1100, Math.max(450, Math.abs(distance) * 0.4));
  const t0 = performance.now();

  STOP_EVENTS.forEach((type) => window.addEventListener(type, cancelScroll, { passive: true }));

  const step = (now) => {
    const t = Math.min(1, (now - t0) / ms);
    // "instant" so a CSS `scroll-behavior: smooth` on <html> can't smooth each individual step
    window.scrollTo({ top: startY + distance * easeInOutCubic(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else cancelScroll();
  };
  frame = requestAnimationFrame(step);
}

/** Scroll so the element's top edge sits `offset` px below the top of the window. */
export function scrollToElement(element, { offset = 0, duration } = {}) {
  scrollToY(element.getBoundingClientRect().top + window.scrollY - offset, { duration });
}

/**
 * Makes every in-page link (<a href="#section">) scroll with the animation above.
 * Call once, e.g. in a useEffect:   useEffect(() => smoothAnchors(), []);
 * Returns a cleanup function. Modified clicks (ctrl/cmd/shift, middle button) are left alone.
 */
export function smoothAnchors({ offset = 0, duration } = {}) {
  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest?.('a[href^="#"]');
    if (!link || (link.target && link.target !== "_self")) return;

    const hash = link.getAttribute("href");
    const id = decodeURIComponent(hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (id && !target) return; // unknown id: let the browser deal with it

    event.preventDefault();
    if (target) scrollToElement(target, { offset, duration });
    else scrollToY(0, { duration }); // href="#" means "top of the page"
    history.replaceState(null, "", id ? hash : window.location.pathname + window.location.search);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}