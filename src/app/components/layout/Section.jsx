import { cn } from "../../lib/cn";

/** Page section: centred 914px column, full-height on desktop. */
export default function Section({ id, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        "mt-[10vh] flex w-full max-w-[calc(914px+2.5rem)] flex-col justify-center gap-4 px-5 md:min-h-screen",
        className,
      )}
    >
      {children}
    </section>
  );
}
