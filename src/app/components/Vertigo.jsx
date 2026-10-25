import { useEffect, useRef, useState } from "react";

const SPAWN_AT = 25; // start a new square once the newest reaches this size (%)
const MS_PER_PERCENT = 30; // normal speed: a square grows 1% every 30ms
const MS_PER_PERCENT_CALM = 120; // slower drift when the visitor asked for reduced motion
const MAX_FRAME_MS = 250; // cap per-frame time so a throttled/hidden tab never makes squares jump

// Calculate opacity based on screen aspect ratio
// 16:9 (1.78) = 100%, 4:3 (1.33) = 60%, 9:16 (0.56) = 60%
const getOpacityFromRatio = (ratio) => {
  if (ratio >= 1.78) return 1.0; // 16:9 or wider
  if (ratio <= 0.56) return 0.6; // 9:16 or narrower

  // Linear interpolation between 9:16 (0.56) and 16:9 (1.78)
  const minRatio = 0.56;
  const maxRatio = 1.78;
  const minOpacity = 0.6;
  const maxOpacity = 1.0;

  return minOpacity + ((ratio - minRatio) / (maxRatio - minRatio)) * (maxOpacity - minOpacity);
};

/**
 * Endless "tunnel" of nested squares.
 *
 * - Every square is a full-size layer scaled with `transform: scale()`, so no layout work per frame.
 * - Growth is accumulated from the gap between frames (dt), never compared against performance.now(),
 *   so it doesn't depend on two clocks agreeing (which can differ in some browsers / privacy modes).
 * - A finished (100%) square hides everything older, so those layers are removed. That keeps the DOM
 *   to a handful of nodes and avoids hairline seams from identical stacked edges.
 * - Reduced-motion visitors get the same animation, just slower, instead of a frozen picture.
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
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const msPerPercent = calm ? MS_PER_PERCENT_CALM : MS_PER_PERCENT;

    const squares = [];
    let count = 0;
    let last = null;
    let frame = 0;

    const spawn = () => {
      count += 1;
      const el = document.createElement("div");
      el.style.cssText = [
        "position:absolute",
        "inset:0",
        "transform:scale(0)",
        "will-change:transform",
        `background-color:${count % 2 === 0 ? "var(--color-primary)" : "var(--color-dark)"}`,
        `z-index:${count}`,
      ].join(";");
      container.appendChild(el);
      squares.push({ el, size: 0 });
    };

    const tick = (now) => {
      const dt = last === null ? 0 : Math.min(now - last, MAX_FRAME_MS);
      last = now;
      const growth = dt / msPerPercent;

      for (const sq of squares) {
        if (sq.size >= 100) continue; // finished squares just stay put
        sq.size = Math.min(100, sq.size + growth);
        sq.el.style.transform = `scale(${sq.size / 100})`;
      }

      // everything older than the newest finished square is fully covered: drop it
      const topFinished = squares.findLastIndex((sq) => sq.size >= 100);
      if (topFinished > 0) squares.splice(0, topFinished).forEach((sq) => sq.el.remove());

      if (squares[squares.length - 1].size >= SPAWN_AT) spawn();

      frame = requestAnimationFrame(tick);
    };

    spawn();
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      container.replaceChildren();
    };
  }, []);

  // data-vertigo lets you confirm in the Elements panel that THIS version is the one running
  return (
    <div
      ref={containerRef}
      data-vertigo="v2"
      aria-hidden="true"
      className="absolute top-[10vh] -right-[15vw] size-[110vw] rotate-30 md:-top-[18vh] md:size-[min(100vh,100vw)]"
      style={{ opacity }}
    />
  );
}
