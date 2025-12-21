'use client';

import { FilterType } from '@/lib/data/countryData';

interface FilterControlsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterControls({
  activeFilter,
  onFilterChange,
}: FilterControlsProps) {
  const filters: { value: FilterType; label: string; color: string }[] = [
    { value: 'all', label: 'Tümü', color: 'bg-gray-200 text-gray-800' },
    { value: 'kurumsal', label: 'Kurumsal', color: 'bg-red-100 text-red-800' },
    { value: 'bilimsel', label: 'Bilimsel', color: 'bg-blue-100 text-blue-800' },
    { value: 'kulturel', label: 'Kültürel', color: 'bg-green-100 text-green-800' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-semibold text-gray-700">Filtrele:</span>
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeFilter === filter.value
                ? `${filter.color} ring-2 ring-offset-2 ring-opacity-50`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Renk açıklaması */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Harita İşaretçi Renkleri:</strong>
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Kurumsal Tanım</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Bilimsel Tanım</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Kültürel Tanım</span>
          </div>
        </div>
      </div>
    </div>
  );
}
