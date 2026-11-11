import type { SectionId } from '../../shared/types/domain';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');

// A request that never answers would otherwise keep the page loading forever.
export const API_TIMEOUT_MS = 10_000;

export async function getSectionContent<T>(section: SectionId, key: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(
      `${API_BASE_URL}/public/sections/${encodeURIComponent(section)}/${encodeURIComponent(key)}`,
      { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(API_TIMEOUT_MS) },
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new Error(`Brak odpowiedzi na żądanie danych „${key}” (${API_TIMEOUT_MS / 1000} s).`);
    }

    throw error;
  }

  if (!response.ok) {
    throw new Error(`Nie udało się pobrać danych „${key}” (${response.status}).`);
  }

  return (await response.json()) as T;
}
