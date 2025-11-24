"use client";

import type { ButtonHTMLAttributes } from "react";

const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<string, string> = {
  primary:
    "bg-black text-white hover:bg-zinc-800 focus-visible:outline-black dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200",
  ghost:
    "bg-transparent text-black hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-900",
  subtle:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export default function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    />
  );
}
