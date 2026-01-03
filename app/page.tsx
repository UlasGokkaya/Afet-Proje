"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import FilterControls from "@/components/FilterControls";
import { FilterType } from "@/lib/data/countryData";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const DisasterMap = dynamic(() => import("@/components/DisasterMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-150 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Harita yükleniyor...</p>
    </div>
  ),
});

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {/* Header */}
        <Header />
        {/* Filtreler */}
        <FilterControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Harita */}
        <DisasterMap filter={activeFilter} />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
