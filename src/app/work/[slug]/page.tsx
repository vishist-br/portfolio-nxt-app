import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Diagram } from "@/components/Diagram";
import { Reveal } from "@/components/motion";
import { caseStudies, site } from "@/content/site";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  const url = `${site.url}/work/${study.slug}/`;
  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${study.title} · ${site.name}`, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = caseStudies.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const study = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="pb-24 md:pb-36">
      <header className="border-b border-line">
        <div className="wrap py-14 md:py-24">
          <Link href="/#work" className="text-sm text-muted transition-colors hover:text-accent-ink">
            ← All work
          </Link>
          <p className="eyebrow mt-10">{study.kicker}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{study.summary}</p>
          <ul aria-label="Stack" className="mt-8 flex flex-wrap gap-2">
            {study.stack.map((item) => (
              <li key={item} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs">
                {item}
              </li>
            ))}
          </ul>
          {study.links && (
            <div className="mt-8 flex flex-wrap gap-3">
              {study.links.map((link) => (
                <Button key={link.href} href={link.href} variant="primary" external>
                  {link.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="wrap">
        <div className="grid gap-12 py-16 md:grid-cols-[1fr_1.4fr] md:gap-20 md:py-24">
          <Reveal>
            <h2 className="eyebrow !text-accent-ink">The problem</h2>
            <p className="mt-5 font-display text-2xl font-medium leading-snug tracking-tight md:text-[1.75rem]">
              {study.problem}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="eyebrow !text-accent-ink">What I built</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {study.built.map((item) => (
                <li key={item} className="py-4 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="eyebrow !text-accent-ink">Architecture</h2>
          <p className="mb-6 mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">{study.diagram.title}</p>
          <Diagram spec={study.diagram} />
        </Reveal>

        {study.evaluation && (
          <Reveal className="mt-20 md:mt-28">
            <h2 className="eyebrow !text-accent-ink">Evaluation</h2>
            <p className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {study.evaluation.heading}
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">{study.evaluation.conditions}</p>
            <div
              tabIndex={0}
              role="group"
              aria-label="Evaluation results table. Scroll sideways if it is cut off."
              className="mt-8 overflow-x-auto rounded-2xl border border-line"
            >
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-surface text-muted">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-medium">Configuration</th>
                    <th scope="col" className="px-5 py-3.5 text-right font-medium">Hit rate@5</th>
                    <th scope="col" className="px-5 py-3.5 text-right font-medium">MRR@5</th>
                    <th scope="col" className="px-5 py-3.5 text-right font-medium">Faithfulness (1–5)</th>
                    <th scope="col" className="px-5 py-3.5 text-right font-medium">Mean latency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line font-mono tabular-nums">
                  {study.evaluation.rows.map((row) => (
                    <tr key={row.configuration}>
                      <th scope="row" className="px-5 py-3.5 font-sans font-medium">{row.configuration}</th>
                      <td className="px-5 py-3.5 text-right">{row.hitRate}</td>
                      <td className="px-5 py-3.5 text-right">{row.mrr}</td>
                      <td className="px-5 py-3.5 text-right">{row.faithfulness}</td>
                      <td className="px-5 py-3.5 text-right">{row.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
              {study.evaluation.findings.map((finding) => (
                <li key={finding} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent-ink" />
                  {finding}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Source:{" "}
              <a
                href={study.evaluation.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline underline-offset-4"
              >
                {study.evaluation.source.label}
              </a>
            </p>
          </Reveal>
        )}

        <Reveal className="mt-20 md:mt-28">
          <Link
            href={`/work/${next.slug}/`}
            className="group flex items-end justify-between gap-6 rounded-3xl border border-line bg-surface p-8 transition-colors duration-200 hover:border-accent-ink md:p-12"
          >
            <span>
              <span className="eyebrow">Next case study</span>
              <span className="mt-3 block font-display text-3xl font-semibold tracking-tight md:text-5xl">
                {next.title}
              </span>
            </span>
            <span aria-hidden className="text-3xl text-accent-ink transition-transform duration-200 group-hover:translate-x-2 md:text-5xl">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
