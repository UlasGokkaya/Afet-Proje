'use client';

import { useState, useEffect } from 'react';
import { countryData, FilterType } from '@/lib/data/countryData';

interface PopupContentProps {
  countryId: string;
  activeFilter?: FilterType;
}

type TabType = 'kurumsal' | 'bilimsel' | 'kulturel';

export default function PopupContent({ countryId, activeFilter }: PopupContentProps) {
  const country = countryData[countryId];
  const [activeTab, setActiveTab] = useState<TabType>('kurumsal');

  // Aktif filtreye veya ilk görünür sekmeyi seç
  useEffect(() => {
    // Eğer bir filtre seçiliyse ve o sekme mevcutsa, onu aç
    if (activeFilter && activeFilter !== 'all' && country.definitions[activeFilter]) {
      setActiveTab(activeFilter);
    } else {
      // Yoksa ilk mevcut sekmeyi aç
      const tabs: TabType[] = ['kurumsal', 'bilimsel', 'kulturel'];
      const firstAvailable = tabs.find((tab) => country.definitions[tab]);
      if (firstAvailable) {
        setActiveTab(firstAvailable);
      }
    }
  }, [countryId, country.definitions, activeFilter]);

  if (!country) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'kurumsal', label: 'Kurumsal' },
    { id: 'bilimsel', label: 'Bilimsel' },
    { id: 'kulturel', label: 'Kültürel' },
  ];

  // Sadece veri olan sekmeleri göster
  const availableTabs = tabs.filter((tab) => country.definitions[tab.id]);

  return (
    <div className="min-w-75 max-w-100">
      {/* Header */}
      <div className="mb-3 relative">
        {/* Saydam Bayrak Arkaplan */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none">
          <img
            src={`https://flagcdn.com/w160/${country.countryCode}.png`}
            alt={`${country.name} bayrağı`}
            className="w-full h-full object-contain border border-gray-300 rounded"
          />
        </div>
        <h3 className="text-xl font-bold text-blue-900 relative z-10">{country.name}</h3>
        <p className="text-xs text-gray-600 italic mt-1 relative z-10">
          Yerel Terim: {country.localTerm}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3 border-b border-gray-200">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-h-62.5 overflow-y-auto">
        {country.definitions[activeTab] ? (
          <div className="text-sm text-gray-700 leading-relaxed">
            {country.definitions[activeTab]}
          </div>
        ) : (
          <div className="text-sm text-gray-400 italic">
            Bu çerçeve için veri bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}
