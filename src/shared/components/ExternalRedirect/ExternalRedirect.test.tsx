import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ExternalRedirect } from './ExternalRedirect';

const originalLocation = window.location;

// Restores only location: vi.unstubAllGlobals() would also drop the fetch
// stub from src/test/setup.ts.
afterEach(() => {
  vi.stubGlobal('location', originalLocation);
});

describe('ExternalRedirect', () => {
  it('replaces the current page with the external address', () => {
    const replace = vi.fn();
    vi.stubGlobal('location', { ...originalLocation, replace });

    render(<ExternalRedirect href="https://www.tswisla.pl/" />);

    expect(replace).toHaveBeenCalledWith('https://www.tswisla.pl/');
  });
});
