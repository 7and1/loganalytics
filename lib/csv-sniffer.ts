export interface HeaderDetectionResult {
  headerOffset: number;
  hasHeader: boolean;
}

const SAMPLE_BYTES = 64 * 1024;
const SAMPLE_LINES = 40;

export async function sniffCsvHeader(file: File, delimiter = ","): Promise<HeaderDetectionResult> {
  if (typeof file.slice !== "function" || typeof file.text !== "function") {
    return { headerOffset: 0, hasHeader: true };
  }

  const chunk = await file.slice(0, SAMPLE_BYTES).text();
  const lines = chunk.split(/\r?\n/).slice(0, SAMPLE_LINES);
  return inferHeaderOffset(lines, delimiter);
}

export function inferHeaderOffset(lines: string[], delimiter = ","): HeaderDetectionResult {
  if (!lines.length) {
    return { headerOffset: 0, hasHeader: true };
  }

  const columnCounts = lines.map((line) => line.split(delimiter).length);
  const countMap: Record<number, number> = {};
  columnCounts.forEach((count) => {
    if (Number.isNaN(count)) return;
    countMap[count] = (countMap[count] ?? 0) + 1;
  });

  const modes = Object.entries(countMap).sort((a, b) => b[1] - a[1]);
  if (!modes.length) {
    return { headerOffset: 0, hasHeader: true };
  }
  const dataColCount = Number(modes[0][0]);

  let candidateIndex = -1;
  for (let i = 0; i < lines.length - 1; i += 1) {
    if (columnCounts[i] !== dataColCount) {
      continue;
    }
    candidateIndex = i;
    const currentTypes = getRowTypes(lines[i], delimiter);
    const nextTypes = getRowTypes(lines[i + 1], delimiter);
    if (isLikelyHeader(currentTypes, nextTypes)) {
      return { headerOffset: i, hasHeader: true };
    }
  }

  if (candidateIndex >= 0) {
    return { headerOffset: candidateIndex, hasHeader: false };
  }
  return { headerOffset: 0, hasHeader: true };
}

function getRowTypes(line: string, delimiter: string): string[] {
  return line.split(delimiter).map((cell) => {
    const value = cell.trim().replace(/^"|"$/g, "");
    if (!value) return "EMPTY";
    if (!Number.isNaN(Number(value))) return "NUMBER";
    if (/^\d{4}-\d{2}-\d{2}/.test(value)) return "DATE";
    if (/^(true|false)$/i.test(value)) return "BOOL";
    return "STRING";
  });
}

function isLikelyHeader(headerTypes: string[], bodyTypes: string[]): boolean {
  if (!bodyTypes.length) {
    return false;
  }
  let score = 0;
  const length = Math.min(headerTypes.length, bodyTypes.length);
  for (let i = 0; i < length; i += 1) {
    if (headerTypes[i] === "STRING" && bodyTypes[i] === "NUMBER") {
      score += 2;
    }
    if (headerTypes[i] === "STRING" && bodyTypes[i] === "DATE") {
      score += 2;
    }
    if (headerTypes[i] === "STRING" && bodyTypes[i] === "BOOL") {
      score += 1;
    }
  }
  return score > 0;
}
