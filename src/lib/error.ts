export interface FetchError extends Error {
    status: number;
}

export const createFetchError = (message: string, status: number): FetchError => {
    const error = new Error(message) as FetchError;
    error.status = status;
    error.name = 'FetchError';

    return error;
};

export const safeReadError = async (response: Response) => {
    try {
        const data = await response.json();

        if (data?.reason) {
            return data.reason;
        }

        return JSON.stringify(data);
    } catch {
        return null;
    }
};

export const isFetchError = (error: unknown): error is FetchError =>
    error instanceof Error &&
    'status' in error &&
    typeof (error as FetchError).status === 'number';

export const isError = (error: unknown): error is Error => error instanceof Error;

export const jsonErrorResponse = (error: unknown) => {
    const reason = isError(error) ? error.message : 'Unexpected proxy error';
    const status = isFetchError(error) ? error.status : 500;

    return new Response(JSON.stringify({ error: true, reason }), {
        status,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}