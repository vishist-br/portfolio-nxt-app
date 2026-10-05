import type { ReactNode } from "react";

// A template remounts on every navigation, which replays the CSS page transition.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
