"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useOfflineMode() {
  const initialOffline = typeof navigator !== "undefined" ? !navigator.onLine : false;
  const [isRealOffline, setIsRealOffline] = useState(initialOffline);
  const [isForceOffline, setIsForceOffline] = useState(false);
  const originalFetchRef = useRef<typeof window.fetch | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const handleOnline = () => setIsRealOffline(false);
    const handleOffline = () => setIsRealOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isForceOffline) {
      return undefined;
    }

    const originalFetch = window.fetch;
    originalFetchRef.current = originalFetch;

    window.fetch = async (...args) => {
      const [resource] = args;
      let url = "";

      if (typeof resource === "string") {
        url = resource;
      } else if (resource instanceof Request) {
        url = resource.url;
      } else if (resource && typeof resource === "object" && "url" in resource) {
        url = String((resource as { url?: string }).url ?? "");
      }

      const isRelative = url.startsWith("/") || url.startsWith("./") || url.startsWith("../");
      const isSameOrigin = url.startsWith(window.location.origin);
      const isDataOrBlob = url.startsWith("data:") || url.startsWith("blob:");

      if (!url || isRelative || isSameOrigin || isDataOrBlob) {
        return originalFetch(...args);
      }

      console.warn(`[Offline Shield] Blocked request to: ${url}`);
      throw new Error("Network blocked by Offline Shield.");
    };

    return () => {
      window.fetch = originalFetchRef.current ?? window.fetch;
    };
  }, [isForceOffline]);

  const toggleForceOffline = useCallback(() => {
    setIsForceOffline((prev) => !prev);
  }, []);

  const isOfflineMode = useMemo(() => isRealOffline || isForceOffline, [isRealOffline, isForceOffline]);

  return {
    isRealOffline,
    isForceOffline,
    isOfflineMode,
    toggleForceOffline,
  };
}
