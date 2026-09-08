import { THRESHOLDS, STATUS } from "../config/thresholds.js";

/**
 * Central status logic. Every component that needs to know whether a
 * reading is NORMAL / WARNING / CRITICAL calls into this file rather
 * than comparing numbers itself.
 */

export function getPhStatus(value) {
  const { safe, warning } = THRESHOLDS.ph;
  if (value >= safe.min && value <= safe.max) return STATUS.NORMAL;
  if (value >= warning.min && value <= warning.max) return STATUS.WARNING;
  return STATUS.CRITICAL;
}

export function getTurbidityStatus(value) {
  const { warning, critical } = THRESHOLDS.turbidity;
  if (value >= critical) return STATUS.CRITICAL;
  if (value >= warning) return STATUS.WARNING;
  return STATUS.NORMAL;
}

export function getTdsStatus(value) {
  const { warning, critical } = THRESHOLDS.tds;
  if (value >= critical) return STATUS.CRITICAL;
  if (value >= warning) return STATUS.WARNING;
  return STATUS.NORMAL;
}

export function getParameterStatus(parameter, value) {
  switch (parameter) {
    case "ph":
      return getPhStatus(value);
    case "turbidity":
      return getTurbidityStatus(value);
    case "tds":
      return getTdsStatus(value);
    default:
      return STATUS.NORMAL;
  }
}

const STATUS_RANK = { [STATUS.NORMAL]: 0, [STATUS.WARNING]: 1, [STATUS.CRITICAL]: 2 };

/**
 * The overall status of a reading set is the worst of its parts.
 */
export function getOverallStatus(reading) {
  const statuses = [
    getPhStatus(reading.ph),
    getTurbidityStatus(reading.turbidity),
    getTdsStatus(reading.tds),
  ];
  return statuses.reduce((worst, current) =>
    STATUS_RANK[current] > STATUS_RANK[worst] ? current : worst
  );
}

export const STATUS_STYLES = {
  [STATUS.NORMAL]: {
    text: "text-signal-normal",
    bg: "bg-signal-normal/10",
    border: "border-signal-normal/30",
    dot: "bg-signal-normal",
  },
  [STATUS.WARNING]: {
    text: "text-signal-watch",
    bg: "bg-signal-watch/10",
    border: "border-signal-watch/30",
    dot: "bg-signal-watch",
  },
  [STATUS.CRITICAL]: {
    text: "text-signal-alert",
    bg: "bg-signal-alert/10",
    border: "border-signal-alert/30",
    dot: "bg-signal-alert",
  },
};
