import { TransitionLink } from './TransitionLink';
import type { Article } from '@/content/articles';

const palette = {
  Engineering: { bg: '#2b1a73', fg: '#c8b6ff', accent: '#ffdd4a' },
  Product: { bg: '#ffdd4a', fg: '#111218', accent: '#ff5b1f' },
  Consulting: { bg: '#151729', fg: '#f4f1ea', accent: '#c8b6ff' },
} as const;

/** Generative cover art in the site palette, one motif per article. */
export function ArticleCover({ article }: { article: Article }) {
  const c = palette[article.category];
  const W = 400;
  const H = 270;
  const shapes: React.ReactNode[] = [];
  switch (article.cover) {
    case 'dots':
      for (let r = 0; r < 3; r++)
        for (let i = 0; i < 6; i++)
          shapes.push(<circle key={`${r}-${i}`} cx={52 + i * 59} cy={70 + r * 66} r={22} fill={r === 0 && i < 3 ? c.fg : c.fg} opacity={r === 0 && i < 3 ? 1 : 0.22} />);
      break;
    case 'bars':
      for (let i = 0; i < 16; i++)
        shapes.push(<rect key={i} x={36 + i * 21.5} y={70} width={6} height={130} rx={3} fill={i === 7 || i === 8 ? c.accent : c.fg} opacity={i === 7 || i === 8 ? 1 : 0.35} />);
      break;
    case 'rings':
      for (let i = 0; i < 6; i++) shapes.push(<circle key={i} cx={W / 2} cy={H / 2} r={18 + i * 22} fill="none" stroke={i === 2 ? c.accent : c.fg} strokeWidth={i === 2 ? 4 : 1.5} opacity={i === 2 ? 1 : 0.5} />);
      break;
    case 'grid':
      for (let r = 0; r < 4; r++)
        for (let i = 0; i < 4; i++)
          shapes.push(<rect key={`${r}-${i}`} x={98 + i * 52} y={38 + r * 52} width={42} height={42} rx={10} fill={r === 1 && i === 2 ? c.accent : c.fg} opacity={r === 1 && i === 2 ? 1 : (r + i) % 2 ? 0.5 : 0.2} />);
      break;
    case 'stack':
      for (let i = 0; i < 4; i++)
        shapes.push(<rect key={i} x={90 + i * 14} y={60 + i * 26} width={220} height={110} rx={18} fill={i === 3 ? c.accent : c.fg} opacity={i === 3 ? 1 : 0.18 + i * 0.12} />);
      break;
    case 'wave':
      for (let i = 0; i < 5; i++)
        shapes.push(
          <path key={i} d={`M0 ${120 + i * 22} C 100 ${60 + i * 22}, 200 ${200 + i * 22}, 400 ${110 + i * 22}`} fill="none" stroke={i === 2 ? c.accent : c.fg} strokeWidth={i === 2 ? 4 : 1.5} opacity={i === 2 ? 1 : 0.5} />,
        );
      break;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${article.category} illustration`}>
      <rect width={W} height={H} fill={c.bg} />
      {shapes}
    </svg>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <TransitionLink href={`/insights/${article.slug}/`} className="article-card" data-cursor-label="Read">
      <span className="article-card__media block">
        <ArticleCover article={article} />
        <span className="pill pill--cream absolute left-3.5 top-3.5 !text-[15px]">{article.category}</span>
      </span>
      <span className="block px-3.5 pt-5">
        <span className="t-meta flex items-center gap-2 text-grey">
          Techatron <i className="inline-block h-[5px] w-[5px] rounded-full bg-orange" aria-hidden="true" /> {article.readMinutes} min read
        </span>
        <span className="t-card mt-3 block max-w-[330px]">{article.title}</span>
        <span className="mt-3 block max-w-[330px] text-grey">{article.excerpt}</span>
      </span>
    </TransitionLink>
  );
}
