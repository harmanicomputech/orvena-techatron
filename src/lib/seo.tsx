import type { Metadata } from 'next';
import { site } from '@/content/site';
import type { Project } from '@/content/projects';
import type { Article } from '@/content/articles';

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — Techatron`,
      description,
      url: path,
      images: [{ url: image ?? '/og.png', ...(image ? {} : { width: 1200, height: 630 }) }],
    },
    twitter: { card: 'summary_large_image', title: `${title} — Techatron`, description, images: [image ?? '/og.png'] },
  };
}

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organization`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  image: `${site.url}/og.png`,
  description: site.description,
  email: site.email,
  telephone: '+2349022016978',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
  },
  areaServed: 'Worldwide',
  sameAs: site.social.map((s) => s.href),
  knowsAbout: ['Custom software development', 'Web application development', 'Mobile application development', 'AI integration', 'API development', 'Technology consulting'],
});

export const breadcrumbLd = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});

export const projectLd = (p: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.name,
  headline: `${p.name} — ${p.tagline}`,
  description: p.summary,
  url: `${site.url}/work/${p.slug}/`,
  creator: { '@id': `${site.url}/#organization` },
  ...(p.url ? { sameAs: p.url } : {}),
  keywords: p.contribution.join(', '),
});

export const articleLd = (a: Article) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.title,
  description: a.excerpt,
  datePublished: a.published,
  dateModified: a.published,
  author: { '@type': 'Organization', name: site.legalName, url: site.url },
  publisher: { '@id': `${site.url}/#organization` },
  mainEntityOfPage: `${site.url}/insights/${a.slug}/`,
  articleSection: a.category,
});
