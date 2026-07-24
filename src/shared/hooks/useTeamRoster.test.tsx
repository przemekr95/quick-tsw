import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTeamRoster } from './useTeamRoster';

describe('useTeamRoster', () => {
  it('loads players for selected section', async () => {
    const { result } = renderHook(() => useTeamRoster('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
