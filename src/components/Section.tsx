import type { ReactNode } from "react";
import { Reveal } from "./motion";

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 md:py-32">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">{label}</p>
          <h2
            id={`${id}-title`}
            className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
