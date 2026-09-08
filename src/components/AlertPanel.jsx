import { useMemo } from "react";
import { AlertTriangle, AlertOctagon, ShieldCheck } from "lucide-react";
import { PLANTS } from "../data/plants.js";
import { getCurrentReading } from "../data/demoWaterQuality.js";
import { THRESHOLDS, STATUS } from "../config/thresholds.js";
import { getParameterStatus } from "../utils/waterQualityStatus.js";
import StatusBadge from "./StatusBadge.jsx";

function buildAlerts(plant, reading, timestampLabel) {
  const alerts = [];

  const phStatus = getParameterStatus("ph", reading.ph);
  if (phStatus !== STATUS.NORMAL) {
    alerts.push({
      id: `${plant.id}-ph`,
      plant: plant.name,
      parameter: "pH",
      value: reading.ph.toFixed(2),
      threshold: `${THRESHOLDS.ph.safe.min}–${THRESHOLDS.ph.safe.max}`,
      severity: phStatus,
      message: reading.ph < THRESHOLDS.ph.safe.min ? "pH below safe range" : "pH above safe range",
      timestamp: timestampLabel,
    });
  }

  const turbidityStatus = getParameterStatus("turbidity", reading.turbidity);
  if (turbidityStatus !== STATUS.NORMAL) {
    alerts.push({
      id: `${plant.id}-turbidity`,
      plant: plant.name,
      parameter: "Turbidity",
      value: `${reading.turbidity.toFixed(1)} NTU`,
      threshold: `> ${THRESHOLDS.turbidity.warning} NTU`,
      severity: turbidityStatus,
      message: "Elevated turbidity",
      timestamp: timestampLabel,
    });
  }

  const tdsStatus = getParameterStatus("tds", reading.tds);
  if (tdsStatus !== STATUS.NORMAL) {
    alerts.push({
      id: `${plant.id}-tds`,
      plant: plant.name,
      parameter: "TDS",
      value: `${reading.tds} mg/L`,
      threshold: `> ${THRESHOLDS.tds.warning} mg/L`,
      severity: tdsStatus,
      message: "Elevated total dissolved solids",
      timestamp: timestampLabel,
    });
  }

  return alerts;
}

export default function AlertPanel({ selectedPlantId }) {
  const plant = PLANTS.find((p) => p.id === selectedPlantId) ?? PLANTS[0];

  const alerts = useMemo(() => {
    const reading = getCurrentReading(plant.id);
    const timestampLabel = `${reading.month} · demo cycle`;
    return buildAlerts(plant, reading, timestampLabel).sort((a, b) =>
      a.severity === b.severity ? 0 : a.severity === STATUS.CRITICAL ? -1 : 1
    );
  }, [plant]);

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-stone-100 font-medium">Alerts — {plant.name}</h3>
        <span className="text-xs text-stone-500">{alerts.length} active</span>
      </div>

      {alerts.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl border border-signal-normal/25 bg-signal-normal/[0.06] px-4 py-4">
          <ShieldCheck className="h-5 w-5 text-signal-normal shrink-0" aria-hidden="true" />
          <p className="text-sm text-stone-300">
            All parameters at {plant.name} are within their configured safe range.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {alerts.map((alert) => {
            const Icon = alert.severity === STATUS.CRITICAL ? AlertOctagon : AlertTriangle;
            return (
              <li
                key={alert.id}
                className={`rounded-xl border px-4 py-3.5 flex items-start gap-3 ${
                  alert.severity === STATUS.CRITICAL
                    ? "border-signal-alert/30 bg-signal-alert/[0.06]"
                    : "border-signal-watch/30 bg-signal-watch/[0.06]"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${
                    alert.severity === STATUS.CRITICAL ? "text-signal-alert" : "text-signal-watch"
                  }`}
                  aria-hidden="true"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-stone-100">{alert.message}</span>
                    <StatusBadge status={alert.severity} size="sm" />
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-stone-500">
                    <span>
                      {alert.parameter}: <span className="data-figure text-stone-300">{alert.value}</span>
                    </span>
                    <span>Threshold: {alert.threshold}</span>
                    <span>{alert.plant}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
