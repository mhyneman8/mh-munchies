import { safeReadError, createFetchError } from "./error";

interface FetchArgs {
    path: string;
    searchParams?: URLSearchParams;
    method?: 'GET';
}

export const fetchJson = async ({
    path,
    searchParams,
    method = 'GET',
}: FetchArgs) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${path}`);

    if (searchParams) {
        for (const [name, value] of searchParams.entries()) {
            url.searchParams.append(name, value);
        };
    }

    const response = await fetch(url.toString(), {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            // cache for 10 minutes
            revalidate: 600,
        },
    });

    if (!response.ok) {
        const reason = await safeReadError(response)
        const fetchError = createFetchError( 
            reason ?? `Unknown error with ${response.status} response`,
            response.status,
        );

        throw fetchError;
    }

    return await response.json();
};