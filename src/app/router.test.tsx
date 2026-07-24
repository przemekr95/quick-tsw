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

    expect(await screen.findByRole('link', { name: 'TSW Kobiety' })).toBeInTheDocument();
  });

  it('switches tabs inside section', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kobiety/klub'] });

    render(<RouterProvider router={router} />);

    const druzynaLinks = await screen.findAllByRole('link', { name: 'Drużyna' });
    await user.click(druzynaLinks[0]);

    expect(await screen.findByRole('heading', { level: 2, name: 'Drużyna' })).toBeInTheDocument();
  });

  it('redirects /mezczyzni to klub tab', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'MKS Siatkówka Mężczyźni' })).toBeInTheDocument();
  });

  it('renders kontakt data for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/kontakt'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { level: 2, name: 'Kontakt' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mezczyzni@klub.pl' })).toBeInTheDocument();
  });

  it('renders kontakt data for kobiety', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kobiety/kontakt'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { level: 2, name: 'Kontakt' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'kobiety@klub.pl' })).toBeInTheDocument();
  });

  it('renders druzyna for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/druzyna'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { level: 2, name: 'Drużyna' })).toBeInTheDocument();
    expect(screen.getAllByText('[Zdjęcie zawodnika]').length).toBeGreaterThan(0);
  });
});
