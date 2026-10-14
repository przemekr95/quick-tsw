import type { SectionId } from '../../shared/types/domain';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');

export async function getSectionContent<T>(section: SectionId, key: string): Promise<T> {
  const response = await fetch(
    `${API_BASE_URL}/public/sections/${encodeURIComponent(section)}/${encodeURIComponent(key)}`,
    { headers: { Accept: 'application/json' } },
  );

  if (!response.ok) {
    throw new Error(`Nie udało się pobrać danych „${key}” (${response.status}).`);
  }

  return (await response.json()) as T;
}
