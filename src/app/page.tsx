import Link from "next/link";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { Counter, Reveal, Stagger, StaggerItem, Tilt } from "@/components/motion";
import { caseStudies, contact, experience, hero, pillars, site, skills } from "@/content/site";
import { asset } from "@/lib";

export default function Home() {
  return (
    <>
      <Hero />
      <Section id="build" label="What I build" title="Three kinds of work, one engineer.">
        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <StaggerItem key={pillar.title} className="bg-bg p-7 md:p-9">
              <p className="font-mono text-sm text-accent-ink">0{i + 1}</p>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{pillar.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{pillar.body}</p>
              <p className="mt-6 border-t border-line pt-4 text-sm">{pillar.proof}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="work" label="Featured work" title="Case studies, with the architecture.">
        <Stagger className="grid gap-5 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <StaggerItem key={study.slug} className="h-full">
              <Tilt className="h-full">
                <Link
                  href={`/work/${study.slug}/`}
                  className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors duration-200 hover:border-accent-ink"
                >
                  <p className="eyebrow">{study.kicker}</p>
                  <h3 className="mt-5 font-display text-[1.75rem] font-semibold leading-tight tracking-tight">
                    {study.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{study.summary}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {study.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent-ink" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-accent-ink">
                    Read the case study
                    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="experience" label="Experience" title="Seven years, two companies.">
        <Timeline roles={experience} />
      </Section>

      <Section id="skills" label="Skills" title="What I work with.">
        <Stagger className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <StaggerItem key={group.area}>
              <h3 className="eyebrow !text-accent-ink">{group.area}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-line px-3 py-1.5 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <section id="contact" aria-labelledby="contact-title" className="pb-24 pt-10 md:pb-36">
        <div className="wrap">
          <Reveal className="rounded-3xl border border-line bg-surface px-6 py-14 text-center md:px-16 md:py-20">
            <p className="eyebrow">Contact</p>
            <h2
              id="contact-title"
              className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
            >
              {contact.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted">{contact.body}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:${site.email}`} variant="primary">
                {site.email}
              </Button>
              <Button href={site.links.linkedin} external>
                LinkedIn
              </Button>
              <Button href={site.links.github} external>
                GitHub
              </Button>
              <Button href={asset(site.cv.href)} download>
                {site.cv.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-glow hero-glow-a -left-24 -top-24 size-[26rem]" />
        <div className="hero-glow hero-glow-b -right-32 top-1/3 size-[22rem]" />
      </div>
      <div className="wrap pb-16 pt-20 md:pb-24 md:pt-32">
        <p className="eyebrow rise" style={{ ["--i" as string]: 0 }}>
          {hero.eyebrow}
        </p>
        <h1
          id="hero-title"
          className="mt-6 font-display text-[clamp(2.7rem,8.4vw,6.75rem)] font-semibold leading-[0.95] tracking-[-0.035em]"
        >
          {hero.title.map((line, i) => (
            <span key={line} className="rise block" style={{ ["--i" as string]: i + 1 }}>
              {line === hero.accent ? <span className="text-accent-ink">{line}</span> : line}
            </span>
          ))}
        </h1>
        <p className="rise mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={{ ["--i" as string]: 4 }}>
          {hero.lede}
        </p>
        <div className="rise mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 5 }}>
          <Button href="#work" variant="primary">
            See the work
          </Button>
          <Button href={asset(site.cv.href)} download>
            {site.cv.label}
          </Button>
          <Button href={site.links.github} external>
            GitHub
          </Button>
        </div>
        <dl className="rise mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-line pt-8" style={{ ["--i" as string]: 6 }}>
          {hero.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-2">
              <dt className="text-sm leading-snug text-muted">{stat.label}</dt>
              <dd className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
