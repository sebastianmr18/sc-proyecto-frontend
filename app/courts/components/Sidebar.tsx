//Sidebar.js
import React from 'react';
import Filters, { FilterProps } from './Filters';
import "@/public/styles/sidebar.css"
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface SidebarProps extends FilterProps {
  isOpen: boolean;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  //closeSidebar,
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
    <>
    <div className="flex">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-black mb-4 mt-4">Filtros</h2>
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
      <div className={`flex-1 p-4 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="ml-auto">
          <Tippy 
            content={isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            placement='right'
            arrow={true}
            offset={[0, 10]}
            >
            <button onClick={toggleSidebar} className="toggle-button hover:bg-blue-400">
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
          </Tippy>          
        </div>
      </div>
    </div>    
    </>
  );  
}  

export default Sidebar;
