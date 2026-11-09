import { PageHero } from '@/components/PageHero';
import { ArticlePhoto } from '@/components/ArticleCard';
import { TransitionLink } from '@/components/TransitionLink';
import { CtaPanel } from '@/components/CtaPanel';
import { InsightsGrid } from './InsightsGrid';
import { articles } from '@/content/articles';
import { JsonLd, breadcrumbLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Insights',
  description: 'Notes from Techatron on software engineering, product building and making technology decisions that last.',
  path: '/insights/',
});

export default function InsightsPage() {
  const [featured] = articles;
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights/' }])} />
      <PageHero
        eyebrow="Insights"
        title="Ideas, observations and useful notes from the studio."
        text="Thoughts on software engineering, product building and the technology decisions that shape a business."
        tag="Notes from Techatron"
      />

      <section className="container-x pb-20" aria-label="Featured article">
        <TransitionLink href={`/insights/${featured.slug}/`} className="article-card grid items-center gap-8 min-[1200px]:grid-cols-[1.1fr_1fr] !p-2.5" data-cursor-label="Read" data-reveal>
          <span className="article-card__media block !aspect-[16/10]">
            <ArticlePhoto article={featured} sizes="(max-width: 1199px) 100vw, 55vw" priority />
            <span className="pill pill--cream absolute left-3.5 top-3.5 !text-[15px]">{featured.category}</span>
          </span>
          <span className="block p-6 max-[809px]:p-3">
            <span className="t-meta flex items-center gap-2 text-grey">
              Techatron <i className="inline-block h-[5px] w-[5px] rounded-full bg-orange" aria-hidden="true" /> {featured.readMinutes} min read
            </span>
            <span className="t-h3 mt-4 block">{featured.title}</span>
            <span className="t-lead mt-4 block text-grey">{featured.excerpt}</span>
          </span>
        </TransitionLink>
      </section>

      <section className="container-x pb-24" aria-label="All articles">
        <InsightsGrid />
      </section>

      <CtaPanel
        title="Have a question or an idea worth exploring?"
        text="Write to us about a project, a challenge, or something you read here."
        primary={{ label: 'Get in touch', href: '/contact/' }}
      />
    </>
  );
}
