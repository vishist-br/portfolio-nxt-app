import Link from "next/link";
import { nav, site } from "@/content/site";
import { asset } from "@/lib";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          {site.name}
          <span className="text-accent-ink">.</span>
        </Link>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={`/${item.href}`} className="transition-colors hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={asset(site.cv.href)}
            download
            className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-accent-ink hover:text-accent-ink"
          >
            CV
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
