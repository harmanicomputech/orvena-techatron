import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Disciplines } from '@/components/home/Disciplines';
import { SelectedWork, WhatWeDo, Approach, Snapshot, InsightsTeaser } from '@/components/home/Sections';
import { CtaPanel } from '@/components/CtaPanel';
import { ClientLogos } from '@/components/ClientLogos';
import { MarqueeBand } from '@/components/ui';
import { disciplinesMarquee } from '@/content/site';

export const metadata: Metadata = { alternates: { canonical: '/' } };

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeBand items={disciplinesMarquee} />
      <Disciplines />
      <SelectedWork />
      <ClientLogos tone="white" />
      <WhatWeDo />
      <Approach />
      <Snapshot />
      <InsightsTeaser />
      <CtaPanel />
    </>
  );
}
