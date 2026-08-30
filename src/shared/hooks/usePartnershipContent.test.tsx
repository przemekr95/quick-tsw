import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePartnershipContent } from './usePartnershipContent';

describe('usePartnershipContent', () => {
  it('loads partnership content for selected section', async () => {
    const { result } = renderHook(() => usePartnershipContent('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data?.tiers.length).toBeGreaterThan(0);
  });
});
