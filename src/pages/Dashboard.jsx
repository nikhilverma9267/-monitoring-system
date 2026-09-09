import { useState,useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import PlantSelector from "../components/PlantSelector.jsx";
import WaterQualityDashboard from "../components/WaterQualityDashboard.jsx";
import AlertPanel from "../components/AlertPanel.jsx";
import LiveMonitoring from "../components/LiveMonitoring.jsx";
import JharkhandMap from "../components/JharkhandMap.jsx";
import ImageCarousel from "../components/ImageCarousel.jsx";
import Footer from "../components/Footer.jsx";
import {STATES,PLANTS_BY_STATE} from "../data/plants.js";

function scrollTo(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Dashboard() {
  const [selectedState, setSelectedState] = useState(STATES[0]);

const statePlants = PLANTS_BY_STATE[selectedState] || [];

const [selectedPlantId, setSelectedPlantId] = useState(
  statePlants[0]?.id || null
);
useEffect(() => {
  setSelectedPlantId(statePlants[0]?.id || null);
}, [selectedState]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero onViewDashboard={() => scrollTo("#dashboard")} onViewLive={() => scrollTo("#live")} />
        <PlantSelector
  selectedState={selectedState}
  onSelectState={setSelectedState}
  plants={statePlants}
  selectedPlantId={selectedPlantId}
  onSelectPlant={setSelectedPlantId}
/>
        <WaterQualityDashboard selectedPlantId={selectedPlantId} />

        <section className="pb-16 sm:pb-24">
          <div className="section-shell">
            <AlertPanel selectedPlantId={selectedPlantId} />
          </div>
        </section>

        <LiveMonitoring selectedPlantId={selectedPlantId} />
        <JharkhandMap selectedPlantId={selectedPlantId} onSelectPlant={setSelectedPlantId} />
        <ImageCarousel />
      </main>
      <Footer />
    </div>
  );
}
