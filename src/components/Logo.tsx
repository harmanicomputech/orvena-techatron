import { WORDMARK_PATH } from '@/content/logo-path';

// Techatron's mark: two overlapping discs (charcoal + brand blue), from the official artwork.
export function LogoMark({ size = 22, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={(size * 50) / 56} viewBox="0 0 56 50" aria-hidden="true" focusable="false">
      <circle cx="26.5" cy="25" r="23.5" fill={light ? '#f4f1ea' : '#282828'} />
      <circle cx="32.5" cy="25" r="22.5" fill="#0b34b7" />
    </svg>
  );
}

/** The official Techatron logo: mark + wordmark in the brand's own letterforms (vector). */
export function Logo({ light = false, height = 28, className = '' }: { light?: boolean; height?: number; className?: string }) {
  const ink = light ? '#f4f1ea' : '#282828';
  return (
    <svg
      className={className}
      height={height}
      width={(height * 322) / 52}
      viewBox="0 0 322 52"
      role="img"
      aria-label="Techatron"
    >
      <circle cx="26.5" cy="26" r="23.5" fill={ink} />
      <circle cx="32.5" cy="26" r="22.5" fill="#0b34b7" />
      <path transform="translate(58 0) scale(0.0833333)" fill={ink} d={WORDMARK_PATH} />
    </svg>
  );
}
