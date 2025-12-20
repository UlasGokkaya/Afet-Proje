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
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            Afet, Dünyada Nasıl Tanımlanıyor?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bir 'afet' tanımının arkasındaki farklı bakış açılarını görmek için haritadaki işaretçilere tıklayın veya filtreleri kullanın.
          </p>
        </header>

        {/* Filtreler */}
        <FilterControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Harita */}
        <DisasterMap filter={activeFilter} />

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            *Harita üzerindeki işaretçiler: Japonya, Türkiye, Bolivya ve ABD
          </p>
          <p className="mt-2">
            Afet tanımları kurumsal, bilimsel ve kültürel çerçevelerden derlenmiştir.
          </p>
        </footer>
      </div>
    </div>
  );
}
