import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}

export default function Card({ title, description, className = "", children }: CardProps) {
  return (
    <section className={`rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>}
          {description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
