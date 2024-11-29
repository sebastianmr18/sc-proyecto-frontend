//Sidebar.js
import React, { useState } from 'react';
import Filters, { FilterProps } from './Filters';
import "@/public/styles/sidebar.css"

interface SidebarProps extends FilterProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  locationFilter,
  setLocationFilter,
  surfaceTypeFilter,
  setSurfaceTypeFilter,
  sportFilter,
  setSportFilter,
  priceFilter,
  setPriceFilter,
  capacityFilter,
  setCapacityFilter,
}) => {
  return (
    <div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-4">Filtros</h2>
          <Filters
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            surfaceTypeFilter={surfaceTypeFilter}
            setSurfaceTypeFilter={setSurfaceTypeFilter}
            sportFilter={sportFilter}
            setSportFilter={setSportFilter}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            capacityFilter={capacityFilter}
            setCapacityFilter={setCapacityFilter}
          />
        </div>
      </div>
      <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="ml-auto">
          <button onClick={toggleSidebar} className="toggle-button">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
