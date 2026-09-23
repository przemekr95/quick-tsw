import { act, cleanup, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useScrollToTop } from './useScrollToTop';

afterEach(cleanup);

function PageA() {
  useScrollToTop();
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/b')} type="button">
      Przejdź do B
    </button>
  );
}

function PageB() {
  useScrollToTop();

  return <p>Strona B</p>;
}

describe('useScrollToTop', () => {
  it('scrolls the window to the top on mount and on every route change', async () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const router = createMemoryRouter(
      [
        { path: '/a', element: <PageA /> },
        { path: '/b', element: <PageB /> },
      ],
      { initialEntries: ['/a'] },
    );

    render(<RouterProvider router={router} />);

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
    scrollToSpy.mockClear();

    await act(async () => {
      screen.getByRole('button', { name: 'Przejdź do B' }).click();
    });

    expect(await screen.findByText('Strona B')).toBeInTheDocument();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
