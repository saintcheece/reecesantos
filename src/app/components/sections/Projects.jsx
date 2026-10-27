import { useId, useState } from "react";
import { cn } from "../../lib/cn";
import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import Button from "../ui/Button";
import { MinusIcon, PlusIcon } from "../icons/Icons";
import ProjectGrid from "./ProjectGrid";

const ALWAYS_VISIBLE = 3;

export default function Projects({ items }) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const featured = items.slice(0, ALWAYS_VISIBLE);
  const more = items.slice(ALWAYS_VISIBLE);

  return (
    <Section id="projects">
      <SectionTitle href="#projects">projects</SectionTitle>
      <ProjectGrid projects={featured} />

      {more.length > 0 && (
        <>
          {/* grid-template-rows 0fr -> 1fr animates the drawer to its natural height */}
          <div
            id={drawerId}
            inert={!open}
            className={cn(
              "grid motion-reduce:transition-none",
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
            style={{
              transition: 'grid-template-rows 500ms ease',
            }}
          >
            <div
              className={cn(
                "overflow-hidden motion-reduce:transition-none",
                open ? "pt-2.5" : "pt-0",
              )}
              style={{
                transition: 'padding-top 500ms ease',
              }}
            >
              <ProjectGrid projects={more} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              aria-expanded={open}
              aria-controls={drawerId}
              icon={open ? MinusIcon : PlusIcon}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "view less" : "view more"}
            </Button>
          </div>
        </>
      )}
    </Section>
  );
}
