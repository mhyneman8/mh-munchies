import { NextRequest } from "next/server";
import { fetchJson } from "@/lib/proxy";
import { jsonErrorResponse } from "@/lib/error";

export async function GET(
    _request: NextRequest,
    ctx: RouteContext<'/api/open/[id]'>
) {
    try {
        const { id } = await ctx.params;
        const data = await fetchJson({path: `/open/${id}`});

        return Response.json(data);
    } catch (error) {
        return jsonErrorResponse(error);
    }
}