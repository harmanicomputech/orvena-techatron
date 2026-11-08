// Techatron's mark: two overlapping discs (charcoal + brand blue), from the official favicon.
export function LogoMark({ size = 22, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={(size * 50) / 56} viewBox="0 0 56 50" aria-hidden="true" focusable="false">
      <circle cx="26.5" cy="25" r="23.5" fill={light ? '#f4f1ea' : '#282828'} />
      <circle cx="32.5" cy="25" r="22.5" fill="#0b34b7" />
    </svg>
  );
}

/** Wordmark set like the reference (Archivo 900, tight tracking) with the brand mark leading. */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[9px] ${className}`}>
      <LogoMark size={26} light={light} />
      <span
        className="font-display font-black uppercase"
        style={{ fontSize: 24, lineHeight: 1, letterSpacing: '-0.045em', color: light ? 'var(--color-cream)' : 'var(--color-ink)' }}
      >
        Techatron
      </span>
    </span>
  );
}
