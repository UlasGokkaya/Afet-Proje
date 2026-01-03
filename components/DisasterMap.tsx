"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { countryData, FilterType } from "@/lib/data/countryData";
import PopupContent from "./PopupContent";

// Leaflet marker ikonlarını düzelt
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface DisasterMapProps {
  filter: FilterType;
}

export default function DisasterMap({ filter }: DisasterMapProps) {
  const [mounted, setMounted] = useState(false);
  const [openPopup, setOpenPopup] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-200 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Harita yükleniyor...</p>
      </div>
    );
  }

  // Filtreye göre marker renklerini ayarla
  const getMarkerIcon = (countryId: string) => {
    const country = countryData[countryId];
    let color = "#000000"; // simsiyah

    if (filter !== "all") {
      if (country.definitions[filter]) {
        // Filtre tipine göre renk
        switch (filter) {
          case "kurumsal":
            color = "#EF4444";
            break;
          case "bilimsel":
            color = "#2a1c6f";
            break;
          case "kulturel":
            color = "#10B981";
            break;
        }
      } else {
        color = "#9CA3AF"; // gri (veri yok)
      }
    }

    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="position: relative; width: 40px; height: 40px;">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });
  };

  // Filtreye göre ülkeleri göster
  const visibleCountries = Object.entries(countryData).filter(
    ([_, country]) => {
      if (filter === "all") return true;
      return country.definitions[filter] !== undefined;
    }
  );

  return (
    <>
      <MapContainer
        center={[30, 20]}
        zoom={2}
        className="w-full h-[700px] md:h-[800px] rounded-lg shadow-lg z-0"
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={true}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={false}
        />

        {visibleCountries.map(([id, country]) => (
          <Marker
            key={id}
            position={country.coordinates}
            icon={getMarkerIcon(id)}
            eventHandlers={
              filter != "all"
                ? {
                    mouseover: (e: L.LeafletMouseEvent) => {
                      e.target.openPopup();
                    },
                    mouseout: (e: L.LeafletMouseEvent) => {
                      e.target.closePopup();
                    },
                  }
                : undefined
            }
          >
            <Popup maxWidth={450} minWidth={320}>
              <PopupContent countryId={id} activeFilter={filter} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
