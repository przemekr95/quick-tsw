import { describe, expect, it, vi } from 'vitest';
import { getSectionContent } from './apiClient';

describe('apiClient', () => {
  it('requests section content from the public API', async () => {
    const data = await getSectionContent<unknown[]>('mezczyzni', 'players');

    expect(data.length).toBeGreaterThan(0);
    expect(fetch).toHaveBeenCalledWith('/api/public/sections/mezczyzni/players', {
      headers: { Accept: 'application/json' },
    });
  });

  it('throws a useful error when the API rejects a request', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false, status: 503 } as Response);

    await expect(getSectionContent('mezczyzni', 'players')).rejects.toThrow(
      'Nie udało się pobrać danych „players” (503).',
    );
  });
});
