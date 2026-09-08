import { STATUS_STYLES } from "../utils/waterQualityStatus.js";

/**
 * Reusable status pill used across metric cards, alerts, the plant
 * selector and the map popups. Reads its colors from
 * utils/waterQualityStatus.js so the palette stays in one place.
 */
export default function StatusBadge({ status, size = "md" }) {
  const style = STATUS_STYLES[status];
  const sizeClasses =
    size === "sm" ? "text-[11px] px-2 py-0.5 gap-1.5" : "text-xs px-2.5 py-1 gap-2";

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium tracking-wide ${style.bg} ${style.border} ${style.text} ${sizeClasses}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}
