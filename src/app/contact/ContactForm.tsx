'use client';

import { useRef, useState, type FormEvent } from 'react';
import { Button, Star } from '@/components/ui';
import { services } from '@/content/services';
import { site } from '@/content/site';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

// Optional: any endpoint that accepts a JSON POST (Formspree, Basin, a Laravel route…).
// Without it the form opens a pre-filled email to hello@techatronagency.com.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Errors = Partial<Record<'name' | 'email' | 'service' | 'message', string>>;
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (d: FormData): Errors => {
    const e: Errors = {};
    if (!String(d.get('name') || '').trim()) e.name = 'Please tell us your name.';
    const email = String(d.get('email') || '').trim();
    if (!email) e.email = 'Please add an email address so we can reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email address doesn’t look quite right.';
    if (!String(d.get('service') || '')) e.service = 'Please choose the closest option.';
    if (String(d.get('message') || '').trim().length < 10) e.message = 'A sentence or two about the project helps us reply properly.';
    return e;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    if (data.get('company_website')) return; // honeypot
    const e = validate(data);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = ev.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`);
      first?.focus();
      if (!prefersReducedMotion() && form.current) gsap.fromTo(form.current, { x: -6 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    const payload = Object.fromEntries(Array.from(data.entries()).filter(([k]) => k !== 'company_website'));

    if (!ENDPOINT) {
      const body = [
        `Name: ${payload.name}`,
        `Email: ${payload.email}`,
        payload.company ? `Company: ${payload.company}` : '',
        payload.phone ? `Phone: ${payload.phone}` : '',
        `Help with: ${payload.service}`,
        `Budget: ${payload.budget}`,
        `Timeline: ${payload.timeline}`,
        '',
        String(payload.message),
      ]
        .filter((l) => l !== '')
        .join('\n');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Project inquiry — ${payload.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      form.current?.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent')
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center" role="status">
        <Star size={36} color="var(--color-orange)" className="spin-slow" />
        <p className="t-h4 mt-6">Thank you — your inquiry is with us.</p>
        <p className="mt-3 max-w-[420px] text-slate">We read every message personally and will reply by email with honest questions and a clear next step.</p>
      </div>
    );

  const field = (name: keyof Errors) => ({ 'aria-invalid': errors[name] ? true : undefined, 'aria-describedby': errors[name] ? `${name}-err` : undefined });
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <span id={`${name}-err`} className="field__error">
        {errors[name]}
      </span>
    ) : null;

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 min-[810px]:grid-cols-2">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" autoComplete="name" placeholder="Your name" {...field('name')} />
          {err('name')}
        </div>
        <div className="field">
          <label htmlFor="email">Work email *</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" {...field('email')} />
          {err('email')}
        </div>
      </div>
      <div className="grid gap-5 min-[810px]:grid-cols-2">
        <div className="field">
          <label htmlFor="company">Company / organisation</label>
          <input id="company" name="company" autoComplete="organization" placeholder="Company name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+234…" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="service">What do you need help with? *</label>
        <select id="service" name="service" defaultValue="" {...field('service')}>
          <option value="" disabled>
            Choose one
          </option>
          {services.map((s) => (
            <option key={s.slug}>{s.title}</option>
          ))}
          <option>Not sure yet — I’d like advice</option>
        </select>
        {err('service')}
      </div>
      <div className="grid gap-5 min-[810px]:grid-cols-2">
        <div className="field">
          <label htmlFor="budget">Estimated budget (optional)</label>
          <select id="budget" name="budget" defaultValue="Prefer to discuss">
            <option>Prefer to discuss</option>
            <option>Under ₦5m</option>
            <option>₦5m – ₦20m</option>
            <option>₦20m – ₦50m</option>
            <option>Over ₦50m</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="timeline">Ideal timeline (optional)</label>
          <select id="timeline" name="timeline" defaultValue="Flexible">
            <option>Flexible</option>
            <option>As soon as possible</option>
            <option>Within 3 months</option>
            <option>3–6 months</option>
            <option>6 months or more</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="message">Tell us a little about your project *</label>
        <textarea id="message" name="message" rows={5} placeholder="What are you building, what is changing, and what would a good outcome look like?" {...field('message')} />
        {err('message')}
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send project inquiry'}
        </Button>
        <p className="t-meta text-grey">No obligation, just an honest conversation.</p>
      </div>
      <p className="t-meta text-grey" role="status" aria-live="polite">
        {status === 'mailto' && (
          <>
            Your email app should open with the details filled in. If it didn’t, email us at{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </>
        )}
        {status === 'error' && (
          <>
            Something went wrong sending the form. Please try again or email{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
