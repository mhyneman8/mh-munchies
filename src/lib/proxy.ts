import { createFetchError, safeReadError } from './error';

interface FetchArgs {
  path: string;
  searchParams?: URLSearchParams;
  method?: 'GET';
}
export const fetchJson = async <T>({
  path,
  searchParams,
  method = 'GET',
}: FetchArgs): Promise<T> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/${path}`);

  if (searchParams) {
    for (const [name, value] of searchParams.entries()) {
      url.searchParams.append(name, value);
    }
  }

  const res = await fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    next: {
      // Cache for 10 minutes
      revalidate: 600,
    },
  });

  if (!res.ok) {
    const reason = await safeReadError(res);
    const fetchError = createFetchError(
      reason ?? `Upstream request failed with ${res.status}`,
      res.status,
    );

    throw fetchError;
  }

  return (await res.json()) as T;
};
