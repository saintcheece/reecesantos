import { useEffect, useState, useRef } from "react";

/**
 * Hook to detect when an element enters the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - Percentage of element visible before triggering (default 0.1)
 * @param {string} options.rootMargin - Margin around the root (default "0px")
 * @param {boolean} options.triggerOnce - Whether to trigger only once (default true)
 * @param {boolean} options.skipInitialCheck - Skip checking if element is visible on mount (default false)
 *
 * @returns {Object} { ref, isVisible }
 */
export function useScrollObserver({
  threshold = 0.1,
  rootMargin = "0px",
  triggerOnce = true,
  skipInitialCheck = false,
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Check if element is already visible on initial mount
    if (!skipInitialCheck) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        setIsVisible(true);
        if (triggerOnce) {
          observer.unobserve(element);
        }
      }
    }

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, skipInitialCheck]);

  return { ref, isVisible };
}
