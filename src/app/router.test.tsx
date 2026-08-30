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

    await user.click(screen.getByRole('link', { name: 'Kobiet' }));

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

  it('navigates to the Ściana Wspierających tab from the kobiety nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kobiety/klub'] });

    render(<RouterProvider router={router} />);

    const supportersLinks = await screen.findAllByRole('link', { name: 'Ściana Wspierających' });
    await user.click(supportersLinks[0]);

    expect(
      await screen.findByRole('heading', { name: 'Ściana Wspierających' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Mecenas Honorowy').length).toBeGreaterThan(0);
  });

  it('renders ściana wspierających for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/mezczyzni/sciana-wspierajacych'],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'Ściana Wspierających' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Przyjaciel Klubu').length).toBeGreaterThan(0);
    expect(await screen.findByRole('region', { name: /Sponsorzy klubu/ })).toBeInTheDocument();
  });

  it('navigates to the Media tab from the footer while keeping the section nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kobiety/klub'] });

    render(<RouterProvider router={router} />);

    await user.click(await screen.findByRole('link', { name: 'Media' }));

    expect(await screen.findByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kolory klubu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: 'Klub' })[0]).toHaveAttribute(
      'href',
      '/kobiety/klub',
    );
    expect(screen.getAllByRole('link', { name: 'Ściana Wspierających' })[0]).toHaveAttribute(
      'href',
      '/kobiety/sciana-wspierajacych',
    );
  });

  it('renders the media tab directly for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/media'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Klub' })[0]).toHaveAttribute(
      'href',
      '/mezczyzni/klub',
    );
  });
});
