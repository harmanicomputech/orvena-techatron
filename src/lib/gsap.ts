'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

let registered = false;
if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  // One easing vocabulary for the whole site.
  CustomEase.create('expo', '0.16, 1, 0.3, 1');
  CustomEase.create('soft', '0.65, 0, 0.35, 1');
  gsap.defaults({ ease: 'expo', duration: 1 });
  registered = true;
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export { gsap, ScrollTrigger, SplitText };
