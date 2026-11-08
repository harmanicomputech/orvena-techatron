'use client';

import { FilterGrid } from '@/components/FilterGrid';
import { ArticleCard } from '@/components/ArticleCard';
import { articles, articleFilters } from '@/content/articles';

const filters = articleFilters.map((f) => ({ id: f, label: f === 'All' ? 'All articles' : f }));

export function InsightsGrid() {
  return (
    <FilterGrid
      label="Filter articles by topic"
      items={articles}
      filters={filters}
      match={(a, f) => f === 'All' || a.category === f}
      getKey={(a) => a.slug}
      render={(a) => <ArticleCard article={a} />}
      gridClass="mt-10 grid gap-4 min-[810px]:grid-cols-2 xl:grid-cols-3"
    />
  );
}
