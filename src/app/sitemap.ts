import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { projects } from '@/content/projects';
import { articles } from '@/content/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number) => ({ url: `${site.url}${path}`, lastModified: now, priority });
  return [
    page('/', 1),
    page('/work/', 0.9),
    page('/services/', 0.9),
    page('/about/', 0.8),
    page('/contact/', 0.8),
    page('/insights/', 0.6),
    ...projects.map((p) => page(`/work/${p.slug}/`, 0.7)),
    ...articles.map((a) => ({ url: `${site.url}/insights/${a.slug}/`, lastModified: new Date(a.published), priority: 0.5 })),
    page('/privacy/', 0.2),
  ];
}
