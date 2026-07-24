import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useContactInfo } from './useContactInfo';

describe('useContactInfo', () => {
  it('loads contact data for selected section', async () => {
    const { result } = renderHook(() => useContactInfo('kobiety'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data?.email).toContain('@');
  });
});
