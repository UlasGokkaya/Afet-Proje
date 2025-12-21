'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { countryData, FilterType } from '@/lib/data/countryData';
import PopupContent from './PopupContent';

// Leaflet marker ikonlarını düzelt
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface DisasterMapProps {
  filter: FilterType;
}

export default function DisasterMap({ filter }: DisasterMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-150 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Harita yükleniyor...</p>
      </div>
    );
  }

  // Filtreye göre marker renklerini ayarla
  const getMarkerIcon = (countryId: string) => {
    const country = countryData[countryId];
    let color = '#3B82F6'; // varsayılan mavi

    if (filter !== 'all') {
      if (country.definitions[filter]) {
        // Filtre tipine göre renk
        switch (filter) {
          case 'kurumsal':
            color = '#EF4444'; 
            break;
          case 'bilimsel':
            color = '#3B82F6'; 
            break;
          case 'kulturel':
            color = '#10B981'; 
            break;
        }
      } else {
        color = '#9CA3AF'; // gri (veri yok)
      }
    }

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 25px; height: 25px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      iconSize: [25, 25],
      iconAnchor: [12, 12],
    });
  };

  // Filtreye göre ülkeleri göster
  const visibleCountries = Object.entries(countryData).filter(([_, country]) => {
    if (filter === 'all') return true;
    return country.definitions[filter] !== undefined;
  });

  return (
    <>
      <MapContainer
        center={[30, 20]}
        zoom={2}
        className="w-full h-[700px] md:h-[800px] rounded-lg shadow-lg z-0"
        scrollWheelZoom={true}
        attributionControl={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {visibleCountries.map(([id, country]) => (
          <Marker
            key={id}
            position={country.coordinates}
            icon={getMarkerIcon(id)}
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
