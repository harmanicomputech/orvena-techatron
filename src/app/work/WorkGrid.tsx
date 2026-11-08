'use client';

import { FilterGrid } from '@/components/FilterGrid';
import { ProjectCard } from '@/components/ProjectCard';
import { projects, workFilters } from '@/content/projects';

export function WorkGrid() {
  return (
    <FilterGrid
      label="Filter projects by category"
      items={projects}
      filters={workFilters}
      match={(p, f) => f === 'all' || p.filters.includes(f as never)}
      getKey={(p) => p.slug}
      render={(p, i) => <ProjectCard project={p} priority={i < 2} />}
      gridClass="mt-16 grid gap-x-7 gap-y-12 min-[810px]:grid-cols-2 max-[809px]:mt-10 max-[809px]:gap-y-6"
    />
  );
}
