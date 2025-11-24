import { create } from "zustand";

export interface SqlLogEntry {
  id: string;
  timestamp: string;
  query: string;
  durationMs: number;
  error?: string;
}

export interface IngestStats {
  filename: string | null;
  totalRows: number;
  validRows: number;
  rejectRows: number;
  parseTimeMs: number;
}

interface DebugState {
  logs: SqlLogEntry[];
  stats: IngestStats;
  isHudOpen: boolean;

  addLog: (entry: Omit<SqlLogEntry, "id" | "timestamp">) => void;
  updateStats: (stats: Partial<IngestStats>) => void;
  toggleHud: () => void;
}

export const useDebugStore = create<DebugState>((set) => ({
  logs: [],
  stats: { filename: null, totalRows: 0, validRows: 0, rejectRows: 0, parseTimeMs: 0 },
  isHudOpen: false,

  addLog: (entry) =>
    set((state) => ({
      logs: [
        {
          id: Math.random().toString(36),
          timestamp: new Date().toLocaleTimeString(),
          ...entry,
        },
        ...state.logs,
      ].slice(0, 50),
    })),

  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),

  toggleHud: () => set((state) => ({ isHudOpen: !state.isHudOpen })),
}));
