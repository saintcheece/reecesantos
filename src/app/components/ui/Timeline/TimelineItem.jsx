import AnimatedLink from "../AnimatedLink";
import TypeText from "../TypeText";

const titleClass = "text-2xl font-bold";

export default function TimelineItem({ date, title, titleHref, subtitle, subtitleHref, index, isVisible }) {
  const baseDelay = 600 + index * 500;

  return (
    <li className={`timeline-item ${isVisible ? 'timeline-item--visible' : ''}`}>
      <p className="timeline-date">
        <TypeText text={date} start={isVisible} delay={baseDelay} />
      </p>
      <span
        className="timeline-dot"
        aria-hidden="true"
        style={{
          animation: isVisible ? `timeline-dot-inflate 400ms ease-out ${baseDelay}ms forwards` : 'none',
        }}
      />
      <div>
        {titleHref ? (
          <AnimatedLink href={titleHref} tone="light" thickness={3} duration={500} icon={false} external className={titleClass}>
            <TypeText text={`${title}^`} start={isVisible} delay={baseDelay + 400} />
          </AnimatedLink>
        ) : (
          <p className={`${titleClass} text-light`}>
            <TypeText text={title} start={isVisible} delay={baseDelay + 400} />
          </p>
        )}

        {subtitleHref ? (
          <AnimatedLink href={subtitleHref} tone="light" duration={500} icon={false} external className="text-base">
            <TypeText text={`${subtitle}^`} start={isVisible} delay={baseDelay + 600} />
          </AnimatedLink>
        ) : (
          subtitle && (
            <p className="text-base">
              <TypeText text={subtitle} start={isVisible} delay={baseDelay + 600} />
            </p>
          )
        )}
      </div>
    </li>
  );
}
