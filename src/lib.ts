const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a file in /public with the GitHub Pages base path. */
export function asset(path: string): string {
  return `${basePath}${path}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
