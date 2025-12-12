"use client";

import { useRestaurantsContext } from "@/contexts/RestaurantsContext";
import { FilterSection } from "./FilterSection";

const DELIVERY_TIMES = [
  { id: '0-10', name: '0-10 min' },
  { id: '10-30', name: '10-30 min' },
  { id: '30-60', name: '30-60 min' },
  { id: '60+', name: '1 hour+' },
];

export const FilterLeftMenu = () => {
    const {
    filters,
    handleSelectDeliveryTime,
    handleSelectFilter,
    handleSelectPriceRange,
    loadingFilters,
    priceRanges,
    selectedDeliveryTime,
    selectedFilter,
    selectedPriceRange,
  } = useRestaurantsContext();

    return (
        <aside className="border-brand-stroke shadow-floating-card hidden min-h-[calc(100dvh-7.5rem)] w-59.75 shrink-0 flex-col gap-8 rounded-xl border bg-white p-5 lg:flex">
            <div className="mb-5 text-2xl">Filter</div>

            {/*Food category*/}
              <FilterSection
                filters={filters.slice(0, 4)}
                handleClick={handleSelectFilter}
                loading={loadingFilters}
                sectionHeading="Food category"
                selectedFilter={selectedFilter}
            />

             {/* Delivery Time */}
            <FilterSection
                filters={DELIVERY_TIMES}
                handleClick={handleSelectDeliveryTime}
                sectionHeading="Delivery time"
                selectedFilter={selectedDeliveryTime}
                wrapFilters
            />

              {/* Price Range */}
            <FilterSection
                filterPillSize="small"
                filters={priceRanges}
                handleClick={handleSelectPriceRange}
                loading={priceRanges.length === 0}
                sectionHeading="Price range"
                selectedFilter={selectedPriceRange}
                wrapFilters
            />

        </aside>
    )
}