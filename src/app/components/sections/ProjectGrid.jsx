import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
