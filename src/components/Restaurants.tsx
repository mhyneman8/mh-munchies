"use client";

import { useRestaurantsContext } from "@/contexts/RestaurantsContext";
import { RestaurantCard } from "./RestaurantCard";

export const Restaurants = () => {
    const { restaurants, loading } = useRestaurantsContext();

    return (
        <section className="flex flex-1 flex-col gap-4 lg:gap-8">
            <h1>Restaurant&apos;s</h1>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {loading ? <div>Loading...</div> :
                restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}

            </div>
        </section>
    )
}