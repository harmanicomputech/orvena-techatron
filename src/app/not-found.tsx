import { Button } from '@/components/ui';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="relative">
      <div className="guides" aria-hidden="true" />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="t-mega mt-8 !text-[min(220px,40vw)]" aria-hidden="true">
          404
        </p>
        <h1 className="t-h3 mt-4">This page took a different route.</h1>
        <p className="t-lead mt-4 max-w-[460px] text-slate">The page you were looking for doesn’t exist or has moved. Let’s get you back on track.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to home</Button>
          <Button href="/work/" variant="lilac">
            See our work
          </Button>
        </div>
      </div>
    </section>
  );
}
