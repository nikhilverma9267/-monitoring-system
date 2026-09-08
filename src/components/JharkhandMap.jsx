import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { AlertTriangle } from "lucide-react";
import { PLANTS } from "../data/plants.js";
import { getCurrentReading } from "../data/demoWaterQuality.js";
import { getOverallStatus } from "../utils/waterQualityStatus.js";
import { PLANT_LOCATIONS, JHARKHAND_CENTER, COORDINATES_NOTE } from "../data/plantLocations.js";
import StatusBadge from "./StatusBadge.jsx";

const DOT_COLOR = {
  NORMAL: "#39b37d",
  WARNING: "#d6a936",
  CRITICAL: "#d1553f",
};

function markerIcon(status, isSelected) {
  const color = DOT_COLOR[status];
  const size = isSelected ? 22 : 16;
  return L.divIcon({
    className: "",
    html: `
      <span style="
        display:block;
        width:${size}px;
        height:${size}px;
        border-radius:9999px;
        background:${color};
        box-shadow:0 0 0 4px ${color}33, 0 0 0 1px rgba(255,255,255,0.5);
      "></span>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function RecenterOnSelect({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 11, { duration: 0.8 });
  }, [position, map]);
  return null;
}

export default function JharkhandMap({ selectedPlantId, onSelectPlant }) {
  const selectedPosition = PLANT_LOCATIONS[selectedPlantId]
    ? [PLANT_LOCATIONS[selectedPlantId].lat, PLANT_LOCATIONS[selectedPlantId].lng]
    : null;

  return (
    <section id="map" className="py-16 sm:py-24 scroll-mt-20">
      <div className="section-shell">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-xs tracking-[0.14em] text-depth-400">Jharkhand map</span>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-50">Monitored plant locations</h2>
          <p className="text-stone-400 max-w-2xl mt-1">
            Click a marker to view that site's latest readings. Marker color follows the same
            NORMAL / WARNING / CRITICAL status used across the dashboard.
          </p>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="h-[420px] sm:h-[520px] relative z-0">
            <MapContainer
              center={[JHARKHAND_CENTER.lat, JHARKHAND_CENTER.lng]}
              zoom={9}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RecenterOnSelect position={selectedPosition} />

              {PLANTS.map((plant) => {
                const position = PLANT_LOCATIONS[plant.id];
                if (!position) return null;
                const reading = getCurrentReading(plant.id);
                const status = getOverallStatus(reading);
                const isSelected = plant.id === selectedPlantId;

                return (
                  <Marker
                    key={plant.id}
                    position={[position.lat, position.lng]}
                    icon={markerIcon(status, isSelected)}
                    eventHandlers={{ click: () => onSelectPlant(plant.id) }}
                  >
                    <Popup>
                      <div className="p-3 min-w-[200px] font-body">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-sm font-medium text-stone-100">{plant.name}</span>
                          <StatusBadge status={status} size="sm" />
                        </div>
                        <dl className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <dt className="text-stone-500">pH</dt>
                            <dd className="data-figure text-stone-100">{reading.ph.toFixed(2)}</dd>
                          </div>
                          <div>
                            <dt className="text-stone-500">Turbidity</dt>
                            <dd className="data-figure text-stone-100">{reading.turbidity.toFixed(1)}</dd>
                          </div>
                          <div>
                            <dt className="text-stone-500">TDS</dt>
                            <dd className="data-figure text-stone-100">{reading.tds}</dd>
                          </div>
                        </dl>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>

          <div className="flex items-start gap-2.5 px-5 sm:px-6 py-4 border-t border-white/[0.06] bg-white/[0.015]">
            <AlertTriangle className="h-4 w-4 text-signal-watch shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-stone-500 leading-relaxed">{COORDINATES_NOTE}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
