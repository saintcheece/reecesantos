import "./AnimatedLink.css";
import { cn } from "../../lib/cn";
import { ArrowIcon } from "../icons/Icons";

/**
 * Link with a left-to-right underline on hover and a trailing arrow.
 *
 * tone       "primary" | "dark" | "light"  - text + underline colour
 * thickness  underline height in px
 * duration   underline animation in ms
 * iconSize   any CSS length (defaults to the text size)
 * icon       set false to hide the arrow
 * external   opens in a new tab safely
 */
export default function AnimatedLink({
  href,
  tone = "primary",
  thickness = 2,
  duration = 300,
  iconSize = "1em",
  icon = true,
  external = false,
  className,
  style,
  children,
  ...props
}) {
  return (
    <a
      href={href}
      data-tone={tone}
      className={cn("animated-link", className)}
      style={{
        "--underline-height": `${thickness}px`,
        "--underline-duration": `${duration}ms`,
        "--icon-size": iconSize,
        ...style,
      }}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
      {icon && <ArrowIcon className="animated-link__icon" />}
    </a>
  );
}
