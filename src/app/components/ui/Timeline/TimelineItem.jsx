import AnimatedLink from "../AnimatedLink";

const titleClass = "text-2xl font-bold";

export default function TimelineItem({ date, title, titleHref, subtitle, subtitleHref }) {
  return (
    <li className="timeline-item">
      <p className="timeline-date">{date}</p>
      <span className="timeline-dot" aria-hidden="true" />
      <div>
        {titleHref ? (
          <div>
            <AnimatedLink href={titleHref} tone="light" thickness={3} duration={500} iconSize="1.25rem" external className={titleClass}>
              {title}
            </AnimatedLink>
          </div>
        ) : (
          <p className={`${titleClass} text-light`}>{title}</p>
        )}

        {subtitleHref ? (
          <div>
            <AnimatedLink href={subtitleHref} tone="light" duration={500} iconSize="0.75rem" external className="text-base">
              {subtitle}
            </AnimatedLink>
          </div>
        ) : (
          subtitle && <p className="text-base">{subtitle}</p>
        )}
      </div>
    </li>
  );
}
