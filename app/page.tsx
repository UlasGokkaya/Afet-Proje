'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import FilterControls from '@/components/FilterControls';
import { FilterType } from '@/lib/data/countryData';


const DisasterMap = dynamic(() => import('@/components/DisasterMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-150 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Harita yükleniyor...</p>
    </div>
  ),
});

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-400 via-pink-50 via-40% to-orange-100">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-4">
          <h1 className="text-3xl md:text-5xl font-(family-name:--font-montserrat) font-bold mb-2 bg-linear-to-r from-red-600 via-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
            Afet, Dünyada Nasıl Tanımlanıyor?
          </h1>
          <p className="text-base text-gray-700 max-w-3xl mx-auto font-large">
            Bir 'afet' tanımının arkasındaki farklı bakış açılarını görmek için haritadaki işaretçilere tıklayın veya filtreleri kullanın.
          </p>
        </header>

        {/* Filtreler */}
        <FilterControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Harita */}
        <DisasterMap key={activeFilter} filter={activeFilter} />

        {/* Footer */}
        <footer className="mt-4 text-center text-xs text-green-500">
          <p>
            *Harita üzerindeki işaretçiler: Japonya, Türkiye, Bolivya ve ABD
          </p>
          <p className="mt-1 text-center text-sm font-bold text-red-800">
            Afet tanımları kurumsal, bilimsel ve kültürel çerçevelerden derlenmiştir.
          </p>
        </footer>
      </div>
    </div>
  );
}
