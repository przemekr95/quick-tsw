import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useUpcomingMatches } from './useUpcomingMatches';

describe('useUpcomingMatches', () => {
  it('loads the fixture list for the selected section', async () => {
    const { result } = renderHook(() => useUpcomingMatches('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
