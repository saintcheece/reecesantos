import "./Timeline.css";
import Section from "../layout/Section";
import TimelineItem from "./TimelineItem";

/** A titled list of dated entries (education, certifications, experiences...). */
export default function Timeline({ id, title, items }) {
  return (
    <Section id={id}>
      <h2 className="text-5xl font-black text-primary md:text-[4rem]">{title}</h2>
      <ol>
        {items.map((item) => (
          <TimelineItem key={`${item.date}-${item.title}`} {...item} />
        ))}
      </ol>
    </Section>
  );
}
