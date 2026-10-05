import { credentials, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="wrap flex flex-col gap-6 text-sm text-muted md:flex-row md:items-start md:justify-between">
        <ul className="space-y-1.5">
          {credentials.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p>
          {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
