import { useEffect, useRef } from "react";

const MS_PER_PERCENT = 30; // a square grows 1% every 30ms (same pace as the old setInterval)
const SPAWN_AT = 25; // start a new square once the newest reaches this size (%)
const MAX_SQUARES = 10; // oldest squares are removed past this, for performance

/**
 * Endless "tunnel" of nested squares. Squares are created imperatively inside
 * the container (React never manages them) and driven by one requestAnimationFrame loop.
 */
export default function Vertigo() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const squares = [];
    let count = 0;
    let frame = 0;

    const place = (el, size) => {
      el.style.width = `${size}%`;
      el.style.height = `${size}%`;
      el.style.top = `${50 - size / 2}%`;
      el.style.left = `${50 - size / 2}%`;
    };

    const spawn = (born, size = 0) => {
      count += 1;
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.backgroundColor = count % 2 === 0 ? "var(--color-primary)" : "var(--color-dark)";
      el.style.zIndex = count;
      place(el, size);
      container.appendChild(el);
      squares.push({ el, born, size, done: false });
    };

    // Reduced motion: show a frozen tunnel instead of animating it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      [100, 75, 50, 25].forEach((size) => spawn(0, size));
      return () => container.replaceChildren();
    }

    spawn(performance.now());

    const tick = (now) => {
      for (const sq of squares) {
        if (sq.done) continue;
        sq.size = Math.min(100, (now - sq.born) / MS_PER_PERCENT);
        place(sq.el, sq.size);
        sq.done = sq.size >= 100;
      }

      if (squares[squares.length - 1].size >= SPAWN_AT) {
        spawn(now);
        if (squares.length > MAX_SQUARES) squares.shift().el.remove();
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      container.replaceChildren();
    };
  }, []);

  // phones: sit between the nav and the title; md+: bleed off the top-right corner
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute top-[20vh] -right-[5vw] size-[75vw] rotate-30 md:-top-[18vh] md:size-[min(90vh,90vw)]"
    />
  );
}
