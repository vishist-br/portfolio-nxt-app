import type { ReactNode } from "react";
import { cx } from "@/lib";
import { Magnetic } from "./motion";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  download?: boolean;
  external?: boolean;
};

export function Button({ href, children, variant = "ghost", download, external }: Props) {
  return (
    <Magnetic>
      <a
        href={href}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cx(
          "inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]",
          variant === "primary"
            ? "bg-accent text-on-accent hover:brightness-95"
            : "border border-line-strong hover:border-accent-ink hover:text-accent-ink",
        )}
      >
        {children}
      </a>
    </Magnetic>
  );
}
