import "./Timeline.css";
import Section from "../../layout/Section";
import TimelineItem from "./TimelineItem";
import TypeText from "../TypeText";

/** A titled list of dated entries (education, certifications, experiences...). */
export default function Timeline({ id, title, items, ref, isVisible }) {
  return (
    <Section id={id} ref={ref}>
      <h2 className="text-5xl font-black text-primary md:text-[4rem]">
        <TypeText text={`${title}^`} start={isVisible} delay={200} />
      </h2>
      <ol>
        {items.map((item, index) => (
          <TimelineItem key={`${item.date}-${item.title}`} {...item} index={index} isVisible={isVisible} />
        ))}
      </ol>
    </Section>
  );
}
