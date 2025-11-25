"use client";

import type { ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 px-6 py-3",
  ghost: "bg-transparent text-slate-900 hover:bg-blue-50 px-4 py-2",
  subtle: "bg-white text-slate-900 border border-blue-100 hover:border-blue-300 px-4 py-2",
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
