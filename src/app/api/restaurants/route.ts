import { jsonErrorResponse } from "@/lib/error";
import { fetchJson } from "@/lib/proxy";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams }= request.nextUrl;
        const data = await fetchJson({
        path: '/restaurants',
        searchParams
        });

        return Response.json(data);

 } catch (error) {
        return jsonErrorResponse(error);
    }

}