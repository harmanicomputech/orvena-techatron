'use client';

import Link from 'next/link';
import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from 'react';
import { usePageTransition } from './motion/PageTransition';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//');

/** Internal links go through the page-transition veil; everything else is a plain anchor. */
export const TransitionLink = forwardRef<HTMLAnchorElement, Props>(function TransitionLink(
  { href, onClick, children, ...rest },
  ref,
) {
  const { navigate } = usePageTransition();

  if (!isInternal(href)) {
    const external = /^https?:/.test(href);
    return (
      <a ref={ref} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link ref={ref} href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
});
