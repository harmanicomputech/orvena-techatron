import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { site } from '@/content/site';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { PageTransition } from '@/components/motion/PageTransition';
import { Reveals } from '@/components/motion/Reveals';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cursor } from '@/components/Cursor';
import { JsonLd, organizationLd } from '@/lib/seo';


export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Techatron — Digital engineering & technology consulting', template: '%s — Techatron' },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName, url: site.url }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.legalName,
    locale: 'en_GB',
    url: site.url,
    title: 'Techatron — Digital engineering & technology consulting',
    description: site.description,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Techatron — We engineer dependable software and digital products.' }],
  },
  twitter: { card: 'summary_large_image', site: '@techatronagency', creator: '@techatronagency' },
  icons: { icon: '/favicon.svg' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#f4f1ea',
  width: 'device-width',
  initialScale: 1,
};

// Optional analytics: set NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_PLAUSIBLE_DOMAIN at build time.
// Self-hosted (Fontsource files), preloaded, with metric-matched fallbacks to avoid layout shift.
const host = localFont({
  src: [
    { path: '../../node_modules/@fontsource/host-grotesk/files/host-grotesk-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: '../../node_modules/@fontsource/host-grotesk/files/host-grotesk-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: '../../node_modules/@fontsource/host-grotesk/files/host-grotesk-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-host',
  display: 'swap',
  fallback: ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
});
const archivo = localFont({
  src: '../../node_modules/@fontsource/archivo/files/archivo-latin-900-normal.woff2',
  weight: '900',
  variable: '--font-archivo',
  display: 'swap',
  preload: false,
});

const GA = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${host.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide reveal targets before first paint only when motion will run; fail open after 3.5s if JS never boots. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.documentElement.classList.add('js-motion');setTimeout(function(){if(!window.__reveals)d.documentElement.classList.remove('js-motion')},3500)}}catch(e){}})(document)",
          }}
        />
        <JsonLd data={organizationLd()} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <PageTransition>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <Reveals />
            <Cursor />
          </PageTransition>
        </SmoothScroll>
        {GA && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');`}</Script>
          </>
        )}
        {PLAUSIBLE && <Script src="https://plausible.io/js/script.js" data-domain={PLAUSIBLE} strategy="afterInteractive" />}
      </body>
    </html>
  );
}
