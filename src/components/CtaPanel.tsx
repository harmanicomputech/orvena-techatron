import { Button, StarDisc, ThumbCluster } from './ui';
import { site } from '@/content/site';

export function CtaPanel({
  title = 'Have a product in mind? Let’s engineer it properly.',
  text = 'Tell us what you want to launch, fix or grow. We will come back with honest questions and a clear next step.',
  primary = { label: 'Tell us about your project', href: '/contact/' },
  tag = 'Engineering-led',
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  tag?: string;
}) {
  return (
    <section className="container-x py-[50px] xl:px-[110px]" aria-label="Start a project">
      <div className="cta-panel">
        <div className="flex items-start justify-between gap-8">
          <h2 className="t-display max-w-[780px]" data-split>
            {title}
          </h2>
          <StarDisc size={104} bg="var(--color-cream)" className="max-[809px]:hidden" />
        </div>
        <div className="mt-12 grid items-end gap-10 min-[810px]:grid-cols-2 xl:mt-6">
          <div className="max-[809px]:order-2">
            <ThumbCluster label={tag} />
          </div>
          <div className="xl:pl-[110px]" data-reveal>
            <p className="t-lead max-w-[465px]">{text}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={primary.href}>{primary.label}</Button>
              <Button href={`mailto:${site.email}`} variant="cream">
                {site.email}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
