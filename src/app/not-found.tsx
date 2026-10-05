import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight">This page does not exist.</h1>
      <Link href="/" className="mt-8 inline-block text-accent-ink underline underline-offset-4">
        Back to the home page
      </Link>
    </div>
  );
}
