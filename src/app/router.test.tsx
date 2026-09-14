import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LOADING_SCREEN_REDIRECT_DELAY_MS } from '../shared/components/LoadingScreen';
import { appRoutes } from './router';

afterEach(() => {
  vi.useRealTimers();
  cleanup();
});

describe('app routing', () => {
  it('shows a loading screen at / and redirects to the klub tab', () => {
    vi.useFakeTimers();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole('status')).toHaveTextContent('Ładowanie');

    act(() => {
      vi.advanceTimersByTime(LOADING_SCREEN_REDIRECT_DELAY_MS);
    });

    expect(
      screen.getByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' }),
    ).toBeInTheDocument();
  });

  it('switches tabs inside section', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/klub'] });

    render(<RouterProvider router={router} />);

    const druzynaLinks = await screen.findAllByRole('link', { name: 'Drużyna' });
    await user.click(druzynaLinks[0]);

    expect(await screen.findByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
  });

  it('renders kontakt data for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/kontakt'] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Koordynatorzy' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Dane kontaktowe' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'mezczyzni@klub.pl' })).toBeInTheDocument();
  });

  it('renders druzyna for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/druzyna'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 2, name: 'Sztab' })).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('navigates to the Strefa Przyjaciół tab from the mezczyzni nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/klub'] });

    render(<RouterProvider router={router} />);

    const supportersLinks = await screen.findAllByRole('link', { name: 'Strefa Przyjaciół' });
    await user.click(supportersLinks[0]);

    expect(await screen.findByRole('heading', { name: 'Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getAllByText('Przyjaciel Klubu').length).toBeGreaterThan(0);
  });

  it('renders strefa przyjaciół for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/strefa-przyjaciol'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getAllByText('Przyjaciel Klubu').length).toBeGreaterThan(0);
    expect(await screen.findByRole('region', { name: /Sponsorzy klubu/ })).toBeInTheDocument();
  });

  it('navigates to the Zostań Partnerem tab from the mezczyzni nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/klub'] });

    render(<RouterProvider router={router} />);

    const partnerLinks = await screen.findAllByRole('link', { name: 'Zostań Partnerem' });
    await user.click(partnerLinks[0]);

    expect(await screen.findByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Formy współpracy' })).toBeInTheDocument();
  });

  it('renders zostań partnerem for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/zostan-partnerem'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByText('Partner Główny')).toBeInTheDocument();
  });

  it('navigates to the Media tab from the footer while keeping the section nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/klub'] });

    render(<RouterProvider router={router} />);

    await user.click(await screen.findByRole('link', { name: 'Media' }));

    expect(await screen.findByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kolory klubu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: 'Klub' })[0]).toHaveAttribute('href', '/klub');
    expect(screen.getAllByRole('link', { name: 'Strefa Przyjaciół' })[0]).toHaveAttribute(
      'href',
      '/strefa-przyjaciol',
    );
  });

  it('renders the media tab directly for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/media'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Klub' })[0]).toHaveAttribute('href', '/klub');
  });
});
