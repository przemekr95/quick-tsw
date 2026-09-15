import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useClubData } from './useClubData';

describe('useClubData', () => {
  it('loads data for selected section', async () => {
    const { result } = renderHook(() => useClubData('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data?.name).toContain('Wisła');
  });
});
