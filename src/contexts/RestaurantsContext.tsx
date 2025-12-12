"use client";

import { useRestaurants } from "@/hooks/useRestaurants";
import { createContext, useContext } from "react";

const RestaurantsContext = createContext<ReturnType<
  typeof useRestaurants
> | null>(null);

export const RestaurantsProvider = ({ children }: { children: React.ReactNode }) => {
    const restaurants = useRestaurants();
    return (
        <RestaurantsContext.Provider value={restaurants}>
            {children}
        </RestaurantsContext.Provider>
    );
};

export const useRestaurantsContext = () => {
    const context = useContext(RestaurantsContext);
    if (!context) {
        throw new Error('useRestaurantsContext must be used within a RestaurantsProvider');
    }
    return context;
};