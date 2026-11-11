import { describe, expect, it, vi } from 'vitest';
import { getSectionContent } from './apiClient';

describe('apiClient', () => {
  it('requests section content from the public API', async () => {
    const data = await getSectionContent<unknown[]>('mezczyzni', 'players');

    expect(data.length).toBeGreaterThan(0);
    expect(fetch).toHaveBeenCalledWith('/api/public/sections/mezczyzni/players', {
      headers: { Accept: 'application/json' },
      signal: expect.any(AbortSignal) as AbortSignal,
    });
  });

  it('gives up on a request that does not answer in time', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new DOMException('timed out', 'TimeoutError'));

    await expect(getSectionContent('mezczyzni', 'players')).rejects.toThrow(
      'Brak odpowiedzi na żądanie danych „players” (10 s).',
    );
  });

  it('passes other network errors on unchanged', async () => {
    const offline = new TypeError('Failed to fetch');
    vi.mocked(fetch).mockRejectedValueOnce(offline);

    await expect(getSectionContent('mezczyzni', 'players')).rejects.toBe(offline);
  });

  it('throws a useful error when the API rejects a request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 503 } as Response);

    await expect(getSectionContent('mezczyzni', 'players')).rejects.toThrow(
      'Nie udało się pobrać danych „players” (503).',
    );
  });
});
