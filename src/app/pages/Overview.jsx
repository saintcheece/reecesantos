import { useEffect, useId, useRef, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { PROJECTS } from "../../data/projects";
import { EDUCATION, CERTIFICATIONS, EXPERIENCES, CONTACTS, SOCIALS } from "../../data/profile";
import { asset } from "../lib/asset";
import { cn } from "../lib/cn";
import { smoothAnchors } from "../lib/smoothScroll";
import { typingDuration } from "../lib/Typewriter";
import Vertigo from "../components/Vertigo";
import { ArrowIcon } from "../components/icons/Icons";
import Navbar from "../components/layout/Navbar";
import Section from "../components/layout/Section";
import SectionTitle from "../components/layout/SectionTitle";
import AnimatedLink from "../components/ui/AnimatedLink";
import Button from "../components/ui/Button";
import TypeText from "../components/ui/TypeText";
import SocialButton from "../components/ui/SocialButton";
import Timeline from "../components/ui/Timeline/Timeline";

const ALWAYS_VISIBLE = 3;

const NAV_LINKS = [
  { label: "projects", href: "#projects" },
  { label: "aboutMe", href: "#me" },
  { label: "contacts", href: "#contact" },
];

// hero typing sequence: title, then subtitle, then the navbar labels
const TITLE = "reece santos";
const SUBTITLE = "development / graphic design";
const TITLE_SPEED = 70;
const SUBTITLE_SPEED = 35;
const TITLE_DELAY = 400;
const SUBTITLE_DELAY = TITLE_DELAY + typingDuration(TITLE, TITLE_SPEED) + 150;
const NAV_DELAY = SUBTITLE_DELAY + typingDuration(SUBTITLE, SUBTITLE_SPEED) + 150;

const GRID_CLASS = "grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:grid-cols-3";

function shake(el) {
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 500, easing: "ease-in-out" },
  );
}

// Used for both the always-visible cards and the "view more" drawer, so it lives here once.
function ProjectCard({ project }) {
  return (
    <article className="flex w-full flex-col self-start bg-primary transition-transform duration-100 ease-out hover:-translate-y-[5px]">
      <img
        src={asset(project.thumbnail)}
        alt=""
        loading="lazy"
        className="h-[170px] w-full shrink-0 bg-semidark object-cover"
      />
      <div className="flex flex-col gap-[0.7rem] p-2.5">
        <div>
          <h3 className="text-[1.7rem] leading-[1.8rem] font-bold text-dark">{project.title}</h3>
          <p className="text-base text-dark">{project.categories.map((c) => `[${c}]`).join(" ")}</p>
        </div>
        <p className="line-clamp-3 text-base leading-5 break-words text-dark">{project.description}</p>
        <div className="flex justify-end">
          <Button variant="dark" href={project.href} icon={ArrowIcon}>
            view
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function Overview() {
  const mainRef = useRef(null); // the dark content area; the navbar watches it to switch colours
  const textareaRef = useRef(null);
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  // every <a href="#..."> on the page (navbar, drawer, section titles) scrolls with our own animation
  useEffect(() => smoothAnchors(), []);

  const featured = PROJECTS.slice(0, ALWAYS_VISIBLE);
  const more = PROJECTS.slice(ALWAYS_VISIBLE);

  const handleSubmit = (event) => {
    event.preventDefault();
    const textarea = textareaRef.current;
    const message = textarea.value;

    if (message.trim().length === 0) {
      shake(textarea);
      textarea.focus();
      return;
    }

    const url =
      "https://mail.google.com/mail/?view=cm&fs=1" +
      `&to=${encodeURIComponent(CONTACTS.email)}` +
      `&su=${encodeURIComponent(CONTACTS.subject)}` +
      `&body=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener");
  };

  // grow with the content
  const autoGrow = (event) => {
    const el = event.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <>
      <Navbar links={NAV_LINKS} contentRef={mainRef} typingDelay={NAV_DELAY} />

      {/* HERO */}
      <header id="top" className="fixed inset-0 -z-10 flex justify-center overflow-hidden">
        <Vertigo />
        <div className="relative flex w-full max-w-[calc(914px+2.5rem)] flex-col px-5 z-10">
          {/* the bar is out of the flow now, so this offset keeps the title where it was */}
          <div className="mt-[20svh] flex h-[59.5svh] flex-col justify-end">
            <div className="relative w-fit max-w-full">
              <h1 className="relative text-5xl leading-[1.2] font-black text-dark sm:text-7xl md:text-[5rem]">
                <TypeText text={TITLE} delay={TITLE_DELAY} speed={TITLE_SPEED} lingerMs={0} />
              </h1>
              <p className="relative text-xl text-dark sm:text-[2rem]">
                <TypeText text={SUBTITLE} delay={SUBTITLE_DELAY} speed={SUBTITLE_SPEED} />
              </p>
            </div>
          </div>
        </div>
      </header>
      <main
        ref={mainRef}
        style={{ "--peek": "clamp(3.5rem, 10svh, 6rem)" }}
        className="relative z-10 mt-[calc(100svh-var(--peek))] flex flex-col items-center bg-dark"
      >
        {/* PROJECTS */}
        <Section id="projects">
          <SectionTitle href="#projects">projects</SectionTitle>

          <div className={GRID_CLASS}>
            {featured.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {more.length > 0 && (
            <>
              {/* grid-template-rows 0fr -> 1fr animates the drawer to its natural height */}
              <div
                id={drawerId}
                inert={!open}
                className={cn(
                  "grid transition-[grid-template-rows] duration-400 motion-reduce:transition-none",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div
                  className={cn(
                    "overflow-hidden transition-[padding-top] duration-400 motion-reduce:transition-none",
                    open ? "pt-2.5" : "pt-0",
                  )}
                >
                  <div className={GRID_CLASS}>
                    {more.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
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

        {/* ABOUT */}
        <Section id="me">
          <SectionTitle href="#me">aboutMe</SectionTitle>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="aspect-square w-full max-w-[300px] shrink-0 bg-primary">
              <img
                src={asset("assets/images/me.png")}
                alt="Portrait of Reece Santos"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-evenly gap-4">
              <p className="-mt-2.5 text-[2.5rem] font-bold text-light md:text-5xl">'ello!</p>
              <p className="text-xl md:text-2xl">
                I'm Reece Santos, a graduating mobile and web developer from{" "}
                <AnimatedLink href="https://www.national-u.edu.ph/nu-baliwag/" external>
                  NU Baliwag
                </AnimatedLink>{" "}
                with a handful of experience in making graphics and systems work.
              </p>
              <p className="text-xl md:text-2xl">
                Also makes use of my hobby; working on creative digital content as freelance and for organizations.
              </p>
            </div>
          </div>
        </Section>

        {/* TIMELINES */}
        <Timeline id="education-timeline" title="education" items={EDUCATION} />
        <Timeline id="certifications-timeline" title="certifications" items={CERTIFICATIONS} />
        <Timeline id="experiences-timeline" title="experiences" items={EXPERIENCES} />

        {/* CONTACT */}
        <Section id="contact">
          <SectionTitle href="#contact">contacts</SectionTitle>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              ref={textareaRef}
              aria-label="Your message"
              placeholder="Say 'Hi' here!"
              rows={2}
              onInput={autoGrow}
              className="w-full resize-none rounded-none border-b-4 border-l-4 border-primary bg-dark p-2 text-2xl text-light placeholder:text-light/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
            />
            <div className="flex justify-end">
              <Button type="submit" icon={ArrowIcon}>
                send as email
              </Button>
            </div>
          </form>

          <ul className="flex flex-wrap gap-4">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <SocialButton {...social} />
              </li>
            ))}
          </ul>
        </Section>
      </main>
    </>
  );
}