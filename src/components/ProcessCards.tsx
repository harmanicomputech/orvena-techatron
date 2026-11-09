import { Img } from './ui';
import { process } from '@/content/site';

/** Four-up process cards: two graphic fills and two project images, as in the reference. */
export function ProcessCards() {
  return (
    <div className="grid gap-4 min-[810px]:grid-cols-2 xl:grid-cols-4" data-reveal-group>
      {process.map((p, i) => {
        const tone =
          i === 0
            ? { bg: 'var(--color-indigo)', pill: 'pill--lilac', text: '#ece6ff' }
            : i === 2
              ? { bg: 'var(--color-night-card)', pill: 'pill--yellow', text: 'var(--color-cream)' }
              : { bg: 'var(--color-sand)', pill: 'pill--glass', text: 'var(--color-cream)' };
        return (
          <article key={p.step} className="proc-card" style={{ background: tone.bg }}>
            {i === 0 && (
              <div className="absolute left-6 right-6 top-6 grid grid-cols-5 gap-2.5" aria-hidden="true">
                {Array.from({ length: 10 }).map((_, k) => (
                  <span key={k} className="aspect-square rounded-full" style={{ background: k < 3 ? '#ece6ff' : 'rgba(200,182,255,.16)' }} />
                ))}
              </div>
            )}
            {i === 2 && (
              <div className="absolute left-6 right-6 top-7 flex justify-between" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, k) => (
                  <span key={k} className="h-[46px] w-[5px] rounded" style={{ background: k === 6 || k === 7 ? 'var(--color-yellow)' : 'rgba(244,241,234,.22)' }} />
                ))}
              </div>
            )}
            {(i === 1 || i === 3) && (
              <>
                <Img
                  src={i === 1 ? 'photo-graphic' : 'photo-manager'}
                  alt=""
                  sizes="(max-width: 809px) 100vw, 25vw"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#111218] via-[#111218]/70 to-[#111218]/10" aria-hidden="true" />
              </>
            )}
            <div className="relative">
              <span className={`pill ${tone.pill} !text-[15px]`}>
                0{i + 1} / {p.step}
              </span>
              <p className="mt-3 text-[19px] font-medium leading-[1.25] tracking-[-0.02em] max-[809px]:text-[17px]" style={{ color: tone.text }}>
                {p.text}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
