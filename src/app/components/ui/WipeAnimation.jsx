import { useEffect, useState } from "react";
import { cn } from "../../lib/cn";

/**
 * Wipe animation component that reveals content with a directional wipe effect.
 *
 * direction  "right" | "left" | "up" | "down" - direction of the wipe
 * duration   animation duration in ms (default 500)
 * delay      ms before animation starts
 * start      false holds the animation until it becomes true
 * easing     CSS easing function (default "ease-out")
 */
export default function WipeAnimation({
  direction = "right",
  duration = 500,
  delay = 0,
  start = true,
  easing = "ease-out",
  className,
  children,
}) {
  const [visible, setVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!start) {
      setVisible(false);
      setAnimationComplete(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [start, delay]);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const getDirectionClasses = () => {
    switch (direction) {
      case "right":
        return {
          hidden: "-translate-x-full",
          visible: "translate-x-0",
        };
      case "left":
        return {
          hidden: "translate-x-full",
          visible: "translate-x-0",
        };
      case "up":
        return {
          hidden: "translate-y-full",
          visible: "translate-y-0",
        };
      case "down":
        return {
          hidden: "-translate-y-full",
          visible: "translate-y-0",
        };
      default:
        return {
          hidden: "-translate-x-full",
          visible: "translate-x-0",
        };
    }
  };

  const { hidden, visible: visibleClass } = getDirectionClasses();

  return (
    <div className={cn(animationComplete ? "" : "overflow-hidden", className)}>
      <div
        className={cn(
          "transition-transform",
          visible ? visibleClass : hidden,
        )}
        style={{
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: easing,
        }}
      >
        {children}
      </div>
    </div>
  );
}
