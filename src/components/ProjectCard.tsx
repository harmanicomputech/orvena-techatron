import { TransitionLink } from './TransitionLink';
import { Img } from './ui';
import type { Project } from '@/content/projects';

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <TransitionLink
      href={`/work/${project.slug}/`}
      className="project-card group"
      data-cursor-label="View"
      aria-label={`${project.name} — ${project.summary} View case study`}
    >
      <span className="project-card__plate" aria-hidden="true" />
      <span className="project-card__frame block">
        <span className="project-card__media media block">
          <svg className="project-card__mark" width="30" height="27" viewBox="0 0 56 50" fill="none" stroke="#f4f1ea" strokeWidth="3.5" aria-hidden="true">
            <circle cx="24" cy="25" r="21" />
            <circle cx="33" cy="25" r="21" />
          </svg>
          <span className="pill pill--cream project-card__tag max-[809px]:!text-[13px]">{project.category}</span>
          <Img
            src={project.images.cover}
            alt={`${project.name} — ${project.tagline}`}
            sizes="(max-width: 809px) 100vw, 50vw"
            priority={priority}
          />
        </span>
        <span className="project-card__body">
          <span className="block min-w-0">
            <span className="t-card block">{project.name}</span>
            <span className="t-meta text-cream-56 mt-2 block max-w-[460px]">{project.summary}</span>
          </span>
          <span className="pill pill--lilac project-card__cta max-[809px]:hidden" aria-hidden="true">
            View project
          </span>
        </span>
        <span className="pill pill--lilac project-card__cta m-[0_0_8px_14px] min-[810px]:hidden" aria-hidden="true">
          View project
        </span>
      </span>
    </TransitionLink>
  );
}
