import type { LogFormat } from "@/types/content";

export interface SniffOptions {
  sampleSize?: number;
  maxSampleLines?: number;
}

export interface SniffResult {
  format: LogFormat | null;
  confidence: number;
  tested: number;
  error?: string;
}

const DEFAULT_SAMPLE_SIZE = 64 * 1024; // 64 KB window keeps sniffing instant
const DEFAULT_SAMPLE_LINES = 20;

export async function sniffLogFormat(
  file: File,
  formats: LogFormat[],
  options: SniffOptions = {}
): Promise<SniffResult> {
  const sampleSize = options.sampleSize ?? DEFAULT_SAMPLE_SIZE;
  const maxSampleLines = options.maxSampleLines ?? DEFAULT_SAMPLE_LINES;

  try {
    const chunk = file.slice(0, sampleSize);
    const text = await chunk.text();
    const rawLines = text.split(/\r?\n/).map((line) => line.trim());
    const lines = rawLines.filter(Boolean).slice(0, maxSampleLines);

    if (!lines.length) {
      return { format: null, confidence: 0, tested: 0, error: "日志内容为空" };
    }

    let best: { format: LogFormat | null; score: number } = {
      format: null,
      score: 0,
    };

    for (const format of formats) {
      const score = calculateScore(lines, format);
      if (score === 1) {
        return { format, confidence: 1, tested: lines.length };
      }

      if (score > best.score) {
        best = { format, score };
      }
    }

    if (best.score > 0.5 && best.format) {
      return { format: best.format, confidence: best.score, tested: lines.length };
    }

    return { format: null, confidence: best.score, tested: lines.length, error: "未识别格式" };
  } catch (error) {
    return { format: null, confidence: 0, tested: 0, error: error instanceof Error ? error.message : "读取失败" };
  }
}

function calculateScore(lines: string[], format: LogFormat): number {
  const regexScore = format.regex ? regexMatchScore(lines, format.regex) : 0;
  const heuristicScore = heuristicSignals(lines, format);
  return clamp((regexScore * 0.8) + (heuristicScore * 0.2));
}

function regexMatchScore(lines: string[], pattern: string): number {
  try {
    const regex = new RegExp(pattern);
    let matches = 0;
    for (const line of lines) {
      if (regex.test(line)) {
        matches += 1;
      }
    }
    return matches / lines.length;
  } catch (error) {
    console.warn("Invalid regex in formats.json", error);
    return 0;
  }
}

function heuristicSignals(lines: string[], format: LogFormat): number {
  // CSV detection: average comma count > 2 or quotes presence
  if (format.fileExtension.toLowerCase() === ".csv") {
    const commaDensity = averageDensity(lines, /,/g);
    if (commaDensity > 2) {
      return clamp(0.6 + Math.min(commaDensity / 20, 0.4));
    }
  }

  if (format.slug.includes("json")) {
    const jsonDensity = averageDensity(lines, /\{.*\}/g);
    if (jsonDensity > 0.3) {
      return 0.8;
    }
  }

  if (format.category.toLowerCase().includes("web") && lines.some((line) => line.includes("HTTP"))) {
    return 0.4;
  }

  return 0;
}

function averageDensity(lines: string[], regex: RegExp): number {
  if (!lines.length) return 0;
  const total = lines.reduce((sum, line) => sum + ((line.match(regex) ?? []).length), 0);
  return total / lines.length;
}

function clamp(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}
