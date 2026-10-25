// src/app/components/ui/TypeText.jsx
import { useEffect, useState } from "react";
import "./TypeText.css";
import { cn } from "../../lib/cn";
import { useTypewriter } from "../../lib/Typewriter";

/**
 * Text that types itself out. Works inside any element (h1, p, a, ...), inherits its styles,
 * and never changes the layout: the full text is laid out invisibly, the typing happens on top.
 *
 *   <TypeText text="hello world" />
 *   <TypeText text="second line" delay={1200} speed={40} cursor={false} />
 *
 * text      the string to type
 * speed     average ms per character (default 55)
 * delay     ms before typing starts
 * start     false holds the animation until it becomes true
 * cursor    show the caret while typing (default true)
 * lingerMs  how long the caret keeps blinking after the last character (default 900)
 */
export default function TypeText({
  text,
  speed,
  delay,
  start,
  cursor = true,
  lingerMs = 900,
  className,
}) {
  const { typed, started, done } = useTypewriter(text, { speed, delay, start });
  const [caretGone, setCaretGone] = useState(false);

  useEffect(() => {
    if (!done) {
      setCaretGone(false);
      return undefined;
    }
    const timer = setTimeout(() => setCaretGone(true), lingerMs);
    return () => clearTimeout(timer);
  }, [done, lingerMs]);

  const showCaret = cursor && started && !caretGone;

  return (
    <span className={cn("relative inline-block whitespace-pre-wrap", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {typed}
        {showCaret && <span className={cn("type-caret", done && "type-caret--blink")} />}
      </span>
    </span>
  );
}