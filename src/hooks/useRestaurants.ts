'use client';

import { isError } from '@/lib/error';
import { fetchJson } from '@/lib/proxy';
import type { Filter, PriceRange, Restaurant } from '@/types/api';
import { useCallback, useEffect, useMemo, useState } from 'react';

type OpenMap = Record<string, boolean | undefined>;

const API_ROUTES = {
  restaurants: '/api/restaurants',
  filters: '/api/filter',
  priceRanges: '/api/price-range',
  open: (id: string) => `/api/open/${id}`,
};

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [priceRanges, setPriceRanges] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<
    string | null
  >(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  const [openMap, setOpenMap] = useState<OpenMap>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingFilters, setLoadingFilters] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        setLoadingFilters(true);
        const res = await fetch(API_ROUTES.filters);
        if (!res.ok) {
          throw new Error('Failed to load filters');
        }

        const data = (await res.json()) as { filters: Filter[] };
        setFilters(data.filters);
      } catch (error) {
        setError(
          isError(error) ?
            error.message
          : 'Something went wrong loading filters',
        );
      } finally {
        setLoadingFilters(false);
      }
    };

    void loadFilters();
  }, []);

  useEffect(() => {
    const fetchPriceRanges = async () => {
      try {
        const res = await fetch(API_ROUTES.priceRanges);
        if (!res.ok) return;
        const data = (await res.json()) as PriceRange[];
        setPriceRanges(data.map(({ id, range }) => ({ id, name: range })));
      } catch {
        setError('Something went wrong loading price ranges');
      }
    };

     fetchPriceRanges();
  }, []);

  const fetchOpenStatuses = useCallback(async (list: Restaurant[]) => {
    const promises = list.map(async (restaurant) => {
      try {
        const res = await fetchJson<{
          is_open: boolean;
          restaurant_id: string;
        }>({
          path: `/open/${restaurant.id}`,
        });

        return {
          id: restaurant.id,
          open: res.is_open,
        };
      } catch {
        return {
          id: restaurant.id,
          open: undefined,
        };
      }
    });

    const results = await Promise.all(promises);

    setOpenMap((prev) => {
      const updated: OpenMap = { ...prev };

      for (const { id, open } of results) {
        updated[id] = open;
      }

      return updated;
    });
  }, []);

  const fetchRestaurants = useCallback(
    async (filterId: string | null) => {
      try {
        setLoading(true);
        setError(null);

        const searchParams = new URLSearchParams();
        if (filterId) {
          searchParams.set('filter_id', filterId);
        }

        const queryString = searchParams.toString();
        const url = `/api/restaurants${queryString ? `?${queryString}` : ''}`;
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error('Failed to load restaurants');
        }

        const data = (await res.json()) as { restaurants: Restaurant[] };
        setRestaurants(data.restaurants);
        void fetchOpenStatuses(data.restaurants);
      } catch (err) {
        setError(
          err instanceof Error ?
            err.message
          : 'Something went wrong loading restaurants',
        );
      } finally {
        setLoading(false);
      }
    },
    [fetchOpenStatuses],
  );

  useEffect(() => {
    void fetchRestaurants(selectedFilter);
  }, [fetchRestaurants, selectedFilter]);

  const handleSelectFilter = useCallback((id: string) => {
    setSelectedFilter((current) => (current === id ? null : id));
  }, []);

  const handleSelectDeliveryTime = useCallback((id: string) => {
    setSelectedDeliveryTime((current) => (current === id ? null : id));
  }, []);

  const handleSelectPriceRange = useCallback((id: string) => {
    setSelectedPriceRange((current) => (current === id ? null : id));
  }, []);

  const statusLabel = useCallback(
    (restaurantId: string) => {
      const isOpen = openMap[restaurantId];
      if (isOpen === undefined) {
        return 'Checking...';
      }

      return isOpen ? 'Open' : 'Closed';
    },
    [openMap],
  );

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (selectedDeliveryTime) {
      result = result.filter(({ delivery_time_minutes: time }) => {
        switch (selectedDeliveryTime) {
          case '0-10':
            return time <= 10;
          case '10-30':
            return time > 10 && time <= 30;
          case '30-60':
            return time > 30 && time <= 60;
          case '60+':
            return time > 60;
          default:
            return true;
        }
      });
    }

    if (selectedPriceRange) {
      result = result.filter(
        ({ price_range_id: id }) => id === selectedPriceRange,
      );
    }

    // Sort: open restaurants first, then closed, then unknown status
    result = [...result].sort((a, b) => {
      const aIsOpen = openMap[a.id];
      const bIsOpen = openMap[b.id];
      
      // If both have known status
      if (aIsOpen !== undefined && bIsOpen !== undefined) {
        // Open (true) comes before closed (false)
        return aIsOpen === bIsOpen ? 0 : aIsOpen ? -1 : 1;
      }
      
      // Known status comes before unknown
      if (aIsOpen !== undefined && bIsOpen === undefined) return -1;
      if (aIsOpen === undefined && bIsOpen !== undefined) return 1;
      
      // Both unknown - maintain original order
      return 0;
    });

    return result;
  }, [restaurants, selectedDeliveryTime, selectedPriceRange, openMap]);

  return {
    error,
    filters,
    handleSelectDeliveryTime,
    handleSelectFilter,
    handleSelectPriceRange,
    loading,
    loadingFilters,
    priceRanges,
    restaurants: filteredRestaurants,
    selectedDeliveryTime,
    selectedFilter,
    selectedPriceRange,
    statusLabel,
  };
}
