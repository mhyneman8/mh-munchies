import { jsonErrorResponse } from '@/lib/error';
import { fetchJson } from '@/lib/proxy';
import type { PriceRange } from '@/types/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchJson<PriceRange[]>({ path: '/price-range' });
    return Response.json(data);
  } catch (error) {
    return jsonErrorResponse(error);
  }
}
