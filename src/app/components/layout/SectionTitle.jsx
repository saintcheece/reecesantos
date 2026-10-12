import AnimatedLink from "../ui/AnimatedLink";

export default function SectionTitle({ href, children }) {
  return (
    <div>
      <AnimatedLink
        href={href}
        thickness={7}
        duration={500}
        className="text-5xl font-black md:text-[4rem]"
      >
        {children}
      </AnimatedLink>
    </div>
  );
}
