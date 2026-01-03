"use client";

import { useState, useEffect } from "react";
import { countryData, FilterType } from "@/lib/data/countryData";
import Button from "./Button";

interface PopupContentProps {
  countryId: string;
  activeFilter?: FilterType;
}

type TabType = "kurumsal" | "bilimsel" | "kulturel";

export default function PopupContent({
  countryId,
  activeFilter,
}: PopupContentProps) {
  const country = countryData[countryId];
  const [activeTab, setActiveTab] = useState<TabType>("kurumsal");

  // Aktif filtreye veya ilk görünür sekmeyi seç
  useEffect(() => {
    // Eğer bir filtre seçiliyse ve o sekme mevcutsa, onu aç
    if (
      activeFilter &&
      activeFilter !== "all" &&
      country.definitions[activeFilter]
    ) {
      setActiveTab(activeFilter);
    } else {
      // Yoksa ilk mevcut sekmeyi aç
      const tabs: TabType[] = ["kurumsal", "bilimsel", "kulturel"];
      const firstAvailable = tabs.find((tab) => country.definitions[tab]);
      if (firstAvailable) {
        setActiveTab(firstAvailable);
      }
    }
  }, [countryId, country.definitions, activeFilter]);

  if (!country) return null;

  const tabs: { id: TabType; label: string }[] = [
    { id: "kurumsal", label: "Kurumsal" },
    { id: "bilimsel", label: "Bilimsel" },
    { id: "kulturel", label: "Kültürel" },
  ];

  // Sadece veri olan sekmeleri göster
  // Eğer bir filtre aktifse (all değilse), sadece o sekmeyi göster
  const availableTabs =
    activeFilter && activeFilter !== "all"
      ? tabs.filter(
          (tab) => tab.id === activeFilter && country.definitions[tab.id]
        )
      : tabs.filter((tab) => country.definitions[tab.id]);

  return (
    <div className="min-w-75 max-w-100 bg-amber-900 rounded-lg p-4">
      {/* Header */}
      <div className="mb-3 relative">
        {/* Saydam Bayrak Arkaplan */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-30 pointer-events-none">
          <img
            src={`https://flagcdn.com/w160/${country.countryCode}.png`}
            alt={`${country.name} bayrağı`}
            className="w-full h-full object-contain rounded"
          />
        </div>
        <h3 className="text-xl font-black text-white relative z-10">
          {country.name}
        </h3>
        <p className="text-xs text-gray-200 font-bold italic mt-1 relative z-10">
          Yerel Terim: {country.localTerm}
        </p>
      </div>

      {/* Tabs - Sadece birden fazla tab varsa göster */}
      {availableTabs.length > 1 && (
        <div className="flex gap-1 mb-3 border-b border-amber-700">
          {availableTabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant="ghost"
              size="sm"
              className={`rounded-none ${
                activeTab === tab.id
                  ? "text-white border-b-2 border-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="max-h-62.5 overflow-y-auto">
        {country.definitions[activeTab] ? (
          <div className="text-sm text-white font-semibold leading-relaxed">
            {country.definitions[activeTab]}
          </div>
        ) : (
          <div className="text-sm text-gray-300 italic font-semibold">
            Bu çerçeve için veri bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
}
