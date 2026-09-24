import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStandings } from './useStandings';

describe('useStandings', () => {
  it('loads the league standings for the selected section', async () => {
    const { result } = renderHook(() => useStandings('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
