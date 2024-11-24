// app/courts/components/Filters.tsx
import React from 'react';

interface FilterProps {
    locationFilter: string;
    setLocationFilter: (locationFilter: string) => void;
    surfaceTypeFilter: string;
    setSurfaceTypeFilter: (surfaceTypeFilter: string) => void;
    sportFilter: string;
    setSportFilter: (sportFilter: string) => void;
    priceFilter: number[];
    setPriceFilter: (priceFilter: number[]) => void;
    capacityFilter: number[];
    setCapacityFilter: (capacityFilter: number[]) => void;
}

const Filters: React.FC<FilterProps> = ({
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
        <div className="filters">
            <input
                type='range'
                min="0"
                max="200"
                value={priceFilter[1]}
                onChange={(e) => setPriceFilter([0, parseInt(e.target.value, 10)])}
            />
            <span>Precio: ${priceFilter[0]} - ${priceFilter[1]}</span>
        </div>
    );
}

export default Filters;