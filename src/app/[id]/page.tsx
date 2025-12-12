"use client";

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRestaurantsContext } from '@/contexts/RestaurantsContext';
import { Badge } from '@/components/Badge';
import { cx } from '@/cva.config';

export default function RestaurantDetails() {
    const params = useParams();
    const router = useRouter();
    const restaurantId = params.id as string;
    const { restaurants, filters, priceRanges, statusLabel } = useRestaurantsContext();

    const restaurant = restaurants.find((restaurant) => restaurant.id === restaurantId);
    if (!restaurant) {
        return (
            <div className="bg-brand-offwhite min-h-screen text-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">Restaurant not found</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="text-brand-green hover:underline"
                    >
                        ← Back to restaurants
                    </button>
                </div>
            </div>
        );
    }

    const openStatus = statusLabel(restaurantId);
    const isOpen = openStatus === 'Open';
    const isClosed = openStatus === 'Closed';

    // Get filter names from filter_ids
    const restaurantFilters = restaurant.filter_ids
        .map((filterId) => filters.find((f) => f.id === filterId))
        .filter((f): f is NonNullable<typeof f> => f !== undefined);

    // Get price range name
    const priceRange = priceRanges.find((pr) => pr.id === restaurant.price_range_id);

    return (
        <div className="bg-brand-offwhite min-h-screen text-black max-sm:pb-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back button */}
                <button
                    onClick={() => router.push('/')}
                    className="mb-6 text-sm text-black/60 hover:text-black transition-colors"
                >
                    ← Back to restaurants
                </button>

                {/* Main content */}
                <div className="bg-white rounded-2xl border border-brand-stroke shadow-sm overflow-hidden">
                    {/* Image section */}
                    <div className="relative h-64 sm:h-80 bg-brand-offwhite">
                        <div
                            className={cx(
                                'absolute inset-0 flex items-center justify-center',
                                isClosed && 'opacity-20',
                            )}
                        >
                            <Image
                                alt={restaurant.name}
                                className="object-contain"
                                fill
                                sizes="(max-width: 640px) 100vw, 800px"
                                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${restaurant.image_url}`}
                            />
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 sm:p-8">
                        {/* Header with badges */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge label={openStatus} />
                            {isOpen && (
                                <Badge isDeliveryTime label={`${restaurant.delivery_time_minutes} min`} />
                            )}
                        </div>

                        {/* Restaurant name */}
                        <h1 className={cx('text-5xl font-normal tracking-tighter mb-6', isClosed && 'text-black/20')}>
                            {restaurant.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-lg font-medium">⭐ {restaurant.rating}</span>
                        </div>

                        {/* Details grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                            {/* Delivery time */}
                            <div>
                                <h3 className="text-sm font-medium text-black/60 mb-2">Delivery Time</h3>
                                <p className="text-lg">{restaurant.delivery_time_minutes} minutes</p>
                            </div>

                            {/* Price range */}
                            {priceRange && (
                                <div>
                                    <h3 className="text-sm font-medium text-black/60 mb-2">Price Range</h3>
                                    <p className="text-lg">{priceRange.name}</p>
                                </div>
                            )}
                        </div>

                        {/* Filters */}
                        {restaurantFilters.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-black/60 mb-3">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {restaurantFilters.map((filter) => (
                                        <span
                                            key={filter.id}
                                            className="px-3 py-1.5 bg-brand-offwhite border border-brand-stroke rounded-full text-sm"
                                        >
                                            {filter.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Closed message */}
                        {isClosed && (
                            <div className="mt-6">
                                <Badge intent="closed" label="Opens tomorrow at 12 pm" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}