import { notFound } from 'next/navigation';
import { articles, getArticle } from '@/content/articles';
import { ArticleCard, ArticleCover } from '@/components/ArticleCard';
import { Button, Eyebrow, Star } from '@/components/ui';
import { JsonLd, articleLd, breadcrumbLd, pageMeta } from '@/lib/seo';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params) {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return { ...pageMeta({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}/` }), openGraph: { type: 'article', title: a.title, description: a.excerpt, url: `/insights/${a.slug}/`, publishedTime: a.published, images: [{ url: '/og.png', width: 1200, height: 630 }] } };
}

const fmt = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function ArticlePage({ params }: Params) {
  const a = getArticle((await params).slug);
  if (!a) notFound();
  const more = articles.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleLd(a)} />
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Insights', path: '/insights/' }, { name: a.title, path: `/insights/${a.slug}/` }])} />
      <article>
        <header className="relative">
          <div className="guides" aria-hidden="true" />
          <div className="container-x relative flex flex-col items-center pt-[100px] text-center max-[809px]:pt-14">
            <div className="flex flex-wrap justify-center gap-2" data-reveal>
              <Button href="/insights/" variant="sand" className="!h-[40px] !text-[15px]">
                Back to insights
              </Button>
              <span className="pill pill--lilac rotate-[2deg] !text-[15px]">{a.category}</span>
            </div>
            <h1 className="t-h1 mt-6 max-w-[860px] !text-[min(var(--fs-h1),max(40px,5vw))]" data-split>
              {a.title}
            </h1>
            <p className="t-meta mt-6 flex items-center gap-2 text-grey" data-reveal>
              <span className="text-ink">Techatron</span>
              <i className="h-[5px] w-[5px] rounded-full bg-orange" aria-hidden="true" />
              <time dateTime={a.published}>{fmt(a.published)}</time>
              <i className="h-[5px] w-[5px] rounded-full bg-orange" aria-hidden="true" />
              {a.readMinutes} min read
            </p>
          </div>
          <div className="container-x relative mt-14">
            <div className="relative mx-auto max-w-[1100px]">
              <div className="absolute inset-[3%_-1%_-3%_1%] -rotate-[2deg] rounded-[30px] bg-yellow" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[30px] rotate-[1deg] [&>svg]:aspect-[16/8] [&>svg]:h-auto [&>svg]:w-full" data-clip>
                <ArticleCover article={a} />
              </div>
            </div>
          </div>
        </header>

        <div className="container-x py-[100px] max-[809px]:py-16">
          <div className="prose-t mx-auto max-w-[620px]" data-reveal>
            {a.body.map((b, i) =>
              b.t === 'h2' ? (
                <h2 key={i}>{b.text}</h2>
              ) : (
                <p key={i} className={b.t === 'lead' ? 'lead' : b.t === 'strong' ? 'strong' : undefined}>
                  {b.text}
                </p>
              ),
            )}
            <aside className="mt-14 rounded-[26px] bg-lilac p-8 text-indigo max-[809px]:p-6">
              <Star size={26} color="var(--color-indigo)" />
              <p className="t-card mt-5">Working on a product that needs a clearer direction? We would love to help.</p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button href="/work/">Explore our work</Button>
                <Button href="/contact/" variant="cream">
                  Start a project
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section className="container-x pb-[120px]" aria-labelledby="more">
        <Eyebrow>Keep reading</Eyebrow>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <h2 id="more" className="t-h4" data-split>
            More notes from the studio.
          </h2>
          <span data-reveal>
            <Button href="/insights/" variant="sand">
              All articles
            </Button>
          </span>
        </div>
        <div className="mt-10 grid gap-4 min-[810px]:grid-cols-2 xl:grid-cols-3" data-reveal-group>
          {more.map((m) => (
            <ArticleCard key={m.slug} article={m} />
          ))}
        </div>
      </section>
    </>
  );
}
