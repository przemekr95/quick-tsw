import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useStaffRoster } from './useStaffRoster';

describe('useStaffRoster', () => {
  it('loads staff members for selected section', async () => {
    const { result } = renderHook(() => useStaffRoster('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
