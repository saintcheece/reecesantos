import { cva } from "class-variance-authority";
import { cn } from "../../lib/cn";

const button = cva(
  "inline-flex cursor-pointer items-center gap-1.5 rounded-none px-4 py-2 transition-transform duration-100 ease-out",
  {
    variants: {
      variant: {
        // outlined, sits on dark backgrounds / orange cards
        dark: "border border-primary bg-dark text-base text-primary hover:scale-110",
        // solid orange call-to-action
        light: "bg-primary text-[1.2rem] font-bold text-dark hover:translate-x-[5px]",
      },
    },
    defaultVariants: { variant: "light" },
  },
);

const iconHeight = { dark: "h-[0.7rem]", light: "h-4" };

/** Renders an <a> when `href` is given, otherwise a <button>. `icon` is a component from Icons.jsx. */
export default function Button({ variant = "light", href, icon: Icon, external, className, children, ...props }) {
  const classes = cn(button({ variant }), className);
  const content = (
    <>
      {children}
      {Icon && <Icon className={cn("w-auto", iconHeight[variant])} />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
