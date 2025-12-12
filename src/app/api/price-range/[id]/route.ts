import { jsonErrorResponse } from '@/lib/error';
import { fetchJson } from '@/lib/proxy';
import type { PriceRange } from '@/types/api';

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  ctx: RouteContext<'/api/price-range/[id]'>,
) {
  try {
    const { id } = await ctx.params;
    const data = await fetchJson<PriceRange>({ path: `/price-range/${id}` });

    return Response.json(data);
  } catch (error) {
    return jsonErrorResponse(error);
  }
}
