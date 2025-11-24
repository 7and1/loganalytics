"use client";

import { Shield, ShieldAlert, Wifi, WifiOff } from "lucide-react";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { cn } from "@/lib/utils";

export function TrustBadge() {
  const { isOfflineMode, isForceOffline, toggleForceOffline } = useOfflineMode();

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
          isOfflineMode
            ? "cursor-help bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-400"
            : "cursor-help bg-gray-50 text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        )}
        title={
          isOfflineMode
            ? "Data is strictly local. Network access is blocked."
            : "Local-First: processing remains local, but network is available."
        }
      >
        {isOfflineMode ? <Shield className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
        <span>{isOfflineMode ? "Local & Secure" : "Local-First"}</span>
      </div>

      <button
        type="button"
        onClick={toggleForceOffline}
        className={cn(
          "rounded-full border p-1.5 text-sm shadow-sm transition hover:scale-105 active:scale-95",
          isForceOffline
            ? "bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-300"
            : "bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
        )}
        title="Toggle Force Offline Mode (Offline Shield)"
      >
        {isForceOffline ? <WifiOff className="h-4 w-4" /> : <Wifi className="h-4 w-4" />}
      </button>
    </div>
  );
}
