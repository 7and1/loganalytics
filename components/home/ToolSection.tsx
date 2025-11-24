"use client";

import dynamic from "next/dynamic";
import { ToolSkeleton } from "@/components/tool/ToolSkeleton";

const LogTool = dynamic(() => import("@/components/tool/LogTool"), {
  ssr: false,
  loading: () => <ToolSkeleton />,
});

export function ToolSection() {
  return <LogTool />;
}
