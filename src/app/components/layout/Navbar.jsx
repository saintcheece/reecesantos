import { navLinks } from "../../data/site";
import { asset } from "../../lib/asset";
import AnimatedLink from "../ui/AnimatedLink";

export default function Navbar() {
  return (
    <nav aria-label="Primary" className="flex h-[20vh] items-center">
      <div className="flex w-full max-w-[440px] items-center justify-between gap-3">
        <img src={asset("assets/images/logo-dark.png")} alt="reece santos" className="h-[30px] w-auto" />
        {navLinks.map((link) => (
          <AnimatedLink
            key={link.href}
            href={link.href}
            tone="dark"
            duration={500}
            iconSize="1rem"
            className="text-base font-medium whitespace-nowrap sm:text-[1.3rem]"
          >
            {link.label}
          </AnimatedLink>
        ))}
      </div>
    </nav>
  );
}
