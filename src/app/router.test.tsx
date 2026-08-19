import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { appRoutes } from './router';

afterEach(() => {
  cleanup();
});

describe('app routing', () => {
  it('navigates from split screen to kobiety section', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    await user.click(screen.getByRole('link', { name: 'Kobiety' }));

    expect(
      await screen.findByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' }),
    ).toBeInTheDocument();
  });

  it('switches tabs inside section', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kobiety/klub'] });

    render(<RouterProvider router={router} />);

    const druzynaLinks = await screen.findAllByRole('link', { name: 'Drużyna' });
    await user.click(druzynaLinks[0]);

    expect(await screen.findByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
  });

  it('redirects /mezczyzni to klub tab', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni'] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'MKS Siatkówka Mężczyźni' }),
    ).toBeInTheDocument();
  });

  it('renders kontakt data for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/kontakt'] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Koordynatorzy' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Dane kontaktowe' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mezczyzni@klub.pl' })).toBeInTheDocument();
  });

  it('renders kontakt data for kobiety', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kobiety/kontakt'] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Koordynatorzy' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Dane kontaktowe' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'kobiety@klub.pl' })).toBeInTheDocument();
  });

  it('renders druzyna for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/druzyna'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 2, name: 'Sztab' })).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });
});
