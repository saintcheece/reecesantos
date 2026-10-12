import { asset } from "../../lib/asset";
import Button from "../ui/Button";
import { ArrowIcon } from "../icons/Icons";

export default function ProjectCard({ title, categories, description, thumbnail, href }) {
  return (
    <article className="flex w-full flex-col self-start bg-primary transition-transform duration-100 ease-out hover:-translate-y-[5px]">
      <img src={asset(thumbnail)} alt="" loading="lazy" className="h-[170px] w-full shrink-0 bg-semidark object-cover" />
      <div className="flex flex-col gap-[0.7rem] p-2.5">
        <div>
          <h3 className="text-[1.7rem] leading-[1.8rem] font-bold text-dark">{title}</h3>
          <p className="text-base text-dark">{categories.map((c) => `[${c}]`).join(" ")}</p>
        </div>
        <p className="line-clamp-3 text-base leading-5 break-words text-dark">{description}</p>
        <div className="flex justify-end">
          <Button variant="dark" href={href} icon={ArrowIcon}>
            view
          </Button>
        </div>
      </div>
    </article>
  );
}
