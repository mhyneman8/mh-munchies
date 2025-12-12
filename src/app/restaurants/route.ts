import { jsonErrorResponse } from '@/lib/error';
import { fetchJson } from '@/lib/proxy';
import type { Restaurant } from '@/types/api';
import type { NextRequest } from 'next/server';

interface RestaurantsResponse {
  restaurants: Restaurant[];
}

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const data = await fetchJson<RestaurantsResponse>({
      path: '/restaurants',
      searchParams,
    });

    const filterId = searchParams.get('filter_id');
    const priceRangeId = searchParams.get('price_range_id');

    const restaurants = data.restaurants.filter((restaurant) => {
      const matchesFilter = filterId
        ? restaurant.filter_ids.includes(filterId)
        : true;
      const matchesPrice = priceRangeId
        ? restaurant.price_range_id === priceRangeId
        : true;
      return matchesFilter && matchesPrice;
    });

    return Response.json({ restaurants });
  } catch (error) {
    return jsonErrorResponse(error);
  }
}
