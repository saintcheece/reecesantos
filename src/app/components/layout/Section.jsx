import { cn } from "../../lib/cn";

/**
 * Page section: centred 914px column that is at least one screen tall.
 *
 * The breathing room is PADDING, not margin, and padding sits inside `min-height` (border-box).
 * So when the content fits, the section is exactly one screen (100svh) with the content centred;
 * when the content is taller than a screen, the section simply grows with it instead of becoming
 * "100% + a margin". The top padding is always larger than the 4rem fixed navbar.
 * (svh = the smallest visible height, so mobile browser toolbars never cut a section short.)
 */
export default function Section({ id, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        "flex min-h-svh w-full max-w-[calc(914px+2.5rem)] flex-col justify-center gap-4 px-5 pt-[max(5rem,9svh)] pb-[max(3rem,8svh)]",
        className,
      )}
    >
      {children}
    </section>
  );
}