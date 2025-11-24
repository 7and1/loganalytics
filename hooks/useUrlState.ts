"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export interface UrlTemplateState {
  logType: string | null;
  query: string | null;
  sampleUrl: string | null;
  isTemplateActive: boolean;
}

export function useUrlState() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const readState = useCallback((): UrlTemplateState => {
    const logType = searchParams.get("logType");
    const query = searchParams.get("query");
    const sampleUrl = searchParams.get("sample");
    const isTemplateActive = Boolean(logType || query || sampleUrl);
    return {
      logType,
      query,
      sampleUrl,
      isTemplateActive,
    };
  }, [searchParams]);

  const [templateState, setTemplateState] = useState<UrlTemplateState>(() => readState());

  useEffect(() => {
    setTemplateState(readState());
  }, [readState]);

  const consumeTemplate = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("logType");
    params.delete("query");
    params.delete("sample");
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(nextUrl, { scroll: false });
    setTemplateState((prev) => ({ ...prev, isTemplateActive: false }));
  }, [pathname, router, searchParams]);

  return {
    ...templateState,
    consumeTemplate,
  };
}
