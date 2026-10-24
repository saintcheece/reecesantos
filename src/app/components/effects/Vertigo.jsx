import { useEffect, useRef, useState } from "react";

const MS_PER_PERCENT = 30; // a square grows 1% every 30ms (same pace as the old setInterval)
const SPAWN_AT = 25; // start a new square once the newest reaches this size (%)
const MAX_SQUARES = 10; // oldest squares are removed past this, for performance

// Calculate opacity based on screen aspect ratio
// 16:9 (1.78) = 100%, 4:3 (1.33) = 50%, 9:16 (0.56) = 25%
const getOpacityFromRatio = (ratio) => {
  if (ratio >= 1.78) return 1.0; // 16:9 or wider
  if (ratio <= 0.56) return 0.25; // 9:16 or narrower

  // Linear interpolation between 9:16 (0.56) and 16:9 (1.78)
  const minRatio = 0.56;
  const maxRatio = 1.78;
  const minOpacity = 0.25;
  const maxOpacity = 1.0;

  return minOpacity + ((ratio - minRatio) / (maxRatio - minRatio)) * (maxOpacity - minOpacity);
};

/**
 * Endless "tunnel" of nested squares. Squares are created imperatively inside
 * the container (React never manages them) and driven by one requestAnimationFrame loop.
 */
export default function Vertigo() {
  const containerRef = useRef(null);
  const [opacity, setOpacity] = useState(1.0);

  // Update opacity based on screen aspect ratio
  useEffect(() => {
    const updateOpacity = () => {
      const ratio = window.innerWidth / window.innerHeight;
      setOpacity(getOpacityFromRatio(ratio));
    };

    updateOpacity();
    window.addEventListener("resize", updateOpacity);
    return () => window.removeEventListener("resize", updateOpacity);
  }, []);

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
      style={{ opacity }}
    />
  );
}
