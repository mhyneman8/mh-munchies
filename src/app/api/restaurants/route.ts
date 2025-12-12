import { jsonErrorResponse } from "@/lib/error";
import { fetchJson } from "@/lib/proxy";
import { NextRequest } from "next/server";
import { Restaurant } from "@/types/api";

interface RestaurantsResponse {
    restaurants: Restaurant[];
}

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const data: RestaurantsResponse = await fetchJson({
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