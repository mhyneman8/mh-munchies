import { fetchJson } from "@/lib/proxy";
import { jsonErrorResponse } from "@/lib/error";
import { Filter } from "@/types/api";

interface FiltersResponse {
    filters: Filter[];
}

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const data: FiltersResponse = await fetchJson({path: '/filter'});
        return Response.json(data);
    } catch (error) {
        return jsonErrorResponse(error);
    }
}