"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import Button from "@/components/ui/Button";

export interface DropzoneProps {
  onFileAccepted: (file: File) => void;
  isLoading?: boolean;
  helperText?: string;
  accept?: string;
  ctaLabel?: string;
}

export default function Dropzone({
  onFileAccepted,
  isLoading = false,
  helperText,
  accept = ".log,.txt,.csv,.json",
  ctaLabel = "Upload or drop a log"
}: DropzoneProps) {
  const [isDragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || !files.length) return;
      onFileAccepted(files[0]);
    },
    [onFileAccepted]
  );

  return (
    <label
      className={`flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
        isDragging ? "border-blue-500 bg-blue-50/40" : "border-zinc-300 hover:border-zinc-400"
      } ${isLoading ? "opacity-60" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
        disabled={isLoading}
      />
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-200">
        <Upload className="h-7 w-7" />
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{ctaLabel}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {!isLoading
            ? helperText ?? "Supports CSV, Nginx, Apache, S3, Docker and other common log formats"
            : "DuckDB is parsing..."}
        </p>
      </div>
      <Button type="button" variant="subtle" disabled={isLoading}>
        Choose file
      </Button>
    </label>
  );
}
