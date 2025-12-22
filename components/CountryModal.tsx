'use client';

import { useState, useEffect } from 'react';
import { countryData } from '@/lib/data/countryData';
interface CountryModalProps {
  countryId: string;
  onClose: () => void;
}

type TabType = 'kurumsal' | 'bilimsel' | 'kulturel';

export default function CountryModal({ countryId, onClose }: CountryModalProps) {
  const country = countryData[countryId];
  const [activeTab, setActiveTab] = useState<TabType>('kurumsal');

  // İlk görünür sekmeyi seç
  useEffect(() => {
    const tabs: TabType[] = ['kurumsal', 'bilimsel', 'kulturel'];
    const firstAvailable = tabs.find((tab) => country.definitions[tab]);
    if (firstAvailable) {
      setActiveTab(firstAvailable);
    }
  }, [countryId, country.definitions]);

  if (!country) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'kurumsal', label: 'Kurumsal' },
    { id: 'bilimsel', label: 'Bilimsel' },
    { id: 'kulturel', label: 'Kültürel' },
  ];

  // Sadece veri olan sekmeleri göster
  const availableTabs = tabs.filter((tab) => country.definitions[tab.id]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">{country.name}</h2>
            <p className="text-sm text-gray-600 italic mt-1">
              Yerel Terim: {country.localTerm}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl leading-none"
            aria-label="Kapat"
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex px-6">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {country.definitions[activeTab] ? (
            <div className="text-gray-700 leading-relaxed">
              {country.definitions[activeTab]}
            </div>
          ) : (
            <div className="text-gray-400 italic">
              Bu çerçeve için veri bulunamadı.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
