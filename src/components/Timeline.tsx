"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import type { Role } from "@/content/site";
import { Reveal } from "./motion";

/** The vertical line fills in as the section scrolls past. */
export function Timeline({ roles }: { roles: Role[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 160, damping: 30 });

  return (
    <ol ref={ref} className="relative space-y-16 pl-8 md:pl-12">
      <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-0 left-[4px] top-2 w-[3px] origin-top rounded-full bg-accent-ink"
      />
      {roles.map((role) => (
        <li key={`${role.company}-${role.period}`} className="relative">
          <span
            aria-hidden
            className="absolute -left-8 top-2 size-[11px] rounded-full border-2 border-accent-ink bg-bg md:-left-12"
          />
          <Reveal>
            <p className="eyebrow">{role.period}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {role.company} <span className="text-muted">· {role.title}</span>
            </h3>
            {role.note && <p className="mt-2 text-sm text-accent-ink">{role.note}</p>}
          </Reveal>
          <ul className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {role.items.map((item, i) => (
              <li key={item.text}>
                <Reveal delay={i * 0.05}>
                  {item.name && <p className="font-medium">{item.name}</p>}
                  <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
