// src/app/lib/typewriter.js
import { useEffect, useState } from "react";

/** Rough time in ms that `text` takes to type at `speed` ms/char. Handy for chaining animations. */
export function typingDuration(text, speed = 55) {
  return Math.round(text.length * speed);
}

/**
 * Types `text` out like a streamed reply: mostly one character at a time, sometimes two,
 * with uneven timing and a small beat after each word.
 *
 *   const { typed, started, done } = useTypewriter("hello", { speed: 60, delay: 300 });
 *
 * speed  average ms per character
 * delay  ms to wait before the first character
 * start  set false to hold the animation (e.g. until another one finishes)
 */
export function useTypewriter(text, { speed = 55, delay = 0, start = true } = {}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setCount(0);
    setStarted(false);
    if (!start) return undefined;

    let timer;
    let shown = 0;

    const tick = () => {
      shown = Math.min(text.length, shown + (Math.random() < 0.25 ? 2 : 1));
      setCount(shown);
      if (shown < text.length) {
        const beat = text[shown - 1] === " " ? 1.8 : 1;
        timer = setTimeout(tick, speed * beat * (0.6 + Math.random() * 0.8));
      }
    };

    timer = setTimeout(() => {
      setStarted(true);
      tick();
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, start]);

  return { typed: text.slice(0, count), started, done: started && count >= text.length };
}