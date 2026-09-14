import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useClubLandingContent } from './useClubLandingContent';

describe('useClubLandingContent', () => {
  it('loads landing content for selected section', async () => {
    const { result } = renderHook(() => useClubLandingContent('mezczyzni'));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data?.rosterCards.length).toBe(4);
  });
});
