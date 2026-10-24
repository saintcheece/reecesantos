import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { scrollToY } from "../../lib/smoothScroll";
import { UpArrowIcon } from "../icons/Icons";

const SHOW_AFTER = 0.2; // fraction of the viewport height scrolled before the button appears

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const suppressed = useRef(false); // true while the scroll-to-top animation is running
  const timer = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 0) suppressed.current = false;
      setVisible(!suppressed.current && y > window.innerHeight * SHOW_AFTER);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer.current);
    };
  }, []);

  const handleClick = () => {
    // keep the button hidden during the smooth scroll so it doesn't flash back in
    suppressed.current = true;
    setVisible(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => (suppressed.current = false), 1500); // safety net
    scrollToY(0);
  };

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed right-2 bottom-12 z-50 transition duration-300",
        visible ? "translate-y-0 opacity-100 ease-out" : "pointer-events-none translate-y-5 opacity-0 ease-in",
      )}
    >
      <button
        type="button"
        aria-label="Back to top"
        onClick={handleClick}
        className="grid size-14 cursor-pointer place-items-center bg-primary text-dark transition-transform duration-100 ease-out hover:-translate-y-[5px]"
      >
        <UpArrowIcon className="h-auto w-8" />
      </button>
    </div>
  );
}