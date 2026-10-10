import { asset } from "../../lib/asset";
import Section from "../layout/Section";
import SectionTitle from "../layout/SectionTitle";
import AnimatedLink from "../ui/AnimatedLink";

export default function About() {
  return (
    <Section id="me">
      <SectionTitle href="#me">aboutMe</SectionTitle>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="aspect-square w-full max-w-[300px] shrink-0 bg-primary">
          <img
            src={asset("assets/images/asdadsadasdasd (4).png")}
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
  );
}
