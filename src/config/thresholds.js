/**
 * Threshold configuration for water-quality parameters.
 *
 * All status logic in the app reads from this file — nothing about
 * NORMAL / WARNING / CRITICAL is hard-coded inside components.
 *
 * Replace these with values from the applicable regulatory standard
 * (e.g. BIS 10500 for drinking water) for a production deployment.
 */

export const THRESHOLDS = {
  ph: {
    unit: "",
    label: "pH",
    safe: { min: 6.5, max: 8.5 },
    warning: { min: 6.0, max: 9.0 },
    // Outside the warning band is CRITICAL.
  },
  turbidity: {
    unit: "NTU",
    label: "Turbidity",
    warning: 5,
    critical: 10,
  },
  tds: {
    unit: "mg/L",
    label: "TDS",
    warning: 500,
    critical: 1000,
  },
};

export const STATUS = {
  NORMAL: "NORMAL",
  WARNING: "WARNING",
  CRITICAL: "CRITICAL",
};
