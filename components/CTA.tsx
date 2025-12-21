import { Button } from "./Button";
import { Container } from "./Container";

export function CTA() {
  return (
    <section className="py-14">
      <Container>
        <div className="rounded-3xl border border-slate-200 bg-slate-900 px-6 py-12 text-white shadow-soft md:px-10">
          <div className="grid gap-8 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold tracking-tight">
                Ready to reduce risk and ship faster?
              </h3>
              <p className="mt-3 text-white/80">
                Get a clear plan for security and cloud operations — from assessment to deployment to
                ongoing management.
              </p>
            </div>
            <div className="flex gap-3 md:justify-end">
              <Button href="/contact" variant="secondary" className="bg-white text-slate-900 border-white hover:bg-slate-50">
                Request a quote
              </Button>
              <Button href="/contact" className="bg-white/10 hover:bg-white/15">
                Book a consult
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
