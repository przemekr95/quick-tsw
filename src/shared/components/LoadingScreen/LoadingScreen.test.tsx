import { act, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LOADING_SCREEN_REDIRECT_DELAY_MS } from './LoadingScreen';
import { LoadingScreen } from './LoadingScreen';

describe('LoadingScreen', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders a status indicator for the user', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<LoadingScreen />} path="/" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Ładowanie');
  });

  it('redirects to the klub tab after the delay', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<LoadingScreen />} path="/" />
          <Route element={<div>Zakładka Klub</div>} path="/klub" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Zakładka Klub')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(LOADING_SCREEN_REDIRECT_DELAY_MS);
    });

    expect(screen.getByText('Zakładka Klub')).toBeInTheDocument();
  });
});
