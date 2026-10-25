import AnimatedLink from "../AnimatedLink";
import TypeText from "../TypeText";

const titleClass = "text-2xl font-bold";

export default function TimelineItem({ date, title, titleHref, subtitle, subtitleHref, index, isVisible }) {
  return (
    <li className="timeline-item">
      <p className="timeline-date">
        <TypeText text={date} start={isVisible} delay={800 + index * 400} />
      </p>
      <span className="timeline-dot" aria-hidden="true" />
      <div>
        {titleHref ? (
          <AnimatedLink href={titleHref} tone="light" thickness={3} duration={500} icon={false} external className={titleClass}>
            <TypeText text={`${title}^`} start={isVisible} delay={1000 + index * 400} />
          </AnimatedLink>
        ) : (
          <p className={`${titleClass} text-light`}>
            <TypeText text={title} start={isVisible} delay={1000 + index * 400} />
          </p>
        )}

        {subtitleHref ? (
          <AnimatedLink href={subtitleHref} tone="light" duration={500} icon={false} external className="text-base">
            <TypeText text={`${subtitle}^`} start={isVisible} delay={1200 + index * 400} />
          </AnimatedLink>
        ) : (
          subtitle && (
            <p className="text-base">
              <TypeText text={subtitle} start={isVisible} delay={1200 + index * 400} />
            </p>
          )
        )}
      </div>
    </li>
  );
}
