/**
 * Time format utilities for Feishu Calendar
 */

export interface TimeInput {
  timestamp?: number;
  iso8601?: string;
}

/**
 * Convert ISO 8601 string to timestamp
 * Format: "2024-02-21T14:00:00+08:00"
 */
export function isoToTimestamp(isoString: string): number {
  return Math.floor(new Date(isoString).getTime() / 1000);
}

/**
 * Convert timestamp to ISO 8601 string
 */
export function timestampToIso(timestamp: number): string {
  return new Date(timestamp * 1000).toISOString();
}

/**
 * Normalize time input to Feishu SDK format
 * Accepts either ISO string or timestamp
 */
export function normalizeTime(time: string | number): { timestamp: number } {
  if (typeof time === 'number') {
    return { timestamp: time };
  }
  return { timestamp: isoToTimestamp(time) };
}

/**
 * Validate ISO 8601 format
 */
export function isValidIso8601(dateString: string): boolean {
  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
}
