import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePatrons } from './usePatrons';

describe('usePatrons', () => {
  it('loads patrons for selected section', async () => {
    const { result } = renderHook(() => usePatrons('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
