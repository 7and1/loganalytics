import { ArrowRight, Database, Regex } from "lucide-react";
import Link from "next/link";
import type { LogFormat } from "@/types/content";
import Card from "@/components/ui/Card";

interface Props {
  format: LogFormat;
}

export default function LogFormatCard({ format }: Props) {
  return (
    <Card
      title={format.name}
      description={format.description}
      className="h-full bg-gradient-to-br from-white to-blue-50/40 dark:from-zinc-900 dark:to-blue-950/20"
    >
      <dl className="mb-4 grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Regex className="h-4 w-4" />
          <span>{format.fileExtension}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
          <Database className="h-4 w-4" />
          <span>{format.category}</span>
        </div>
      </dl>
      <Link
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-300"
        href={`/format/${format.slug}`}
      >
        View format details <ArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
