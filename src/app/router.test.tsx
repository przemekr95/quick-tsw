import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MEN_SECTION_PATH, WOMEN_SECTION_URL } from '../shared/utils/config';
import { appRoutes } from './router';

// Leaving the app is covered in ExternalRedirect's own test; here it only has
// to show where the route would send the visitor.
vi.mock('../shared/components/ExternalRedirect', () => ({
  ExternalRedirect: ({ href }: { href: string }) => `ExternalRedirect: ${href}`,
}));

afterEach(() => {
  cleanup();
});

describe('app routing', () => {
  it('lets the visitor pick a section at /', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/'] });

    render(<RouterProvider router={router} />);

    expect(document.title).toBe('Siatkówka – TS Wisła Kraków');
    expect(screen.getByRole('link', { name: 'Sekcja siatkówki kobiet' })).toHaveAttribute(
      'href',
      WOMEN_SECTION_URL,
    );

    await user.click(screen.getByRole('link', { name: 'Sekcja siatkówki mężczyzn' }));

    expect(router.state.location.pathname).toBe('/mezczyzni/klub');
    expect(
      await screen.findByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' }),
    ).toBeInTheDocument();
  });

  it('switches tabs inside section', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/klub'] });

    render(<RouterProvider router={router} />);

    const druzynaLinks = await screen.findAllByRole('link', { name: 'Drużyna' });
    await user.click(druzynaLinks[0]);

    expect(await screen.findByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
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
    expect(screen.getByRole('link', { name: 'siatkowkamezczyzn@tswisla.pl' })).toBeInTheDocument();
  });

  it('renders druzyna for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/druzyna'] });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { level: 2, name: 'Zawodnicy' })).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { level: 2, name: 'Sztab szkoleniowy' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
  });

  it('navigates to the Przyjaciele tab from the mezczyzni nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/klub'] });

    render(<RouterProvider router={router} />);

    const supportersLinks = await screen.findAllByRole('link', { name: 'Przyjaciele' });
    await user.click(supportersLinks[0]);

    expect(
      await screen.findByRole('heading', { name: 'Przyjaciele Białej Gwiazdy' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Przyjaciele Klubu').length).toBeGreaterThan(0);
  });

  it('renders przyjaciele for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/mezczyzni/przyjaciele'],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { name: 'Przyjaciele Białej Gwiazdy' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Przyjaciele Klubu').length).toBeGreaterThan(0);
    expect(await screen.findByRole('region', { name: /Sponsorzy klubu/ })).toBeInTheDocument();
  });

  it.each(['/strefa-przyjaciol', '/mezczyzni/strefa-przyjaciol'])(
    'redirects the legacy %s URL to /mezczyzni/przyjaciele',
    async (path) => {
      const router = createMemoryRouter(appRoutes, { initialEntries: [path] });

      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole('heading', { name: 'Przyjaciele Białej Gwiazdy' }),
      ).toBeInTheDocument();
      expect(router.state.location.pathname).toBe('/mezczyzni/przyjaciele');
    },
  );

  it.each(['/kobiety', '/kobiety/klub'])(
    'sends the archived %s URL to the women section on the club website',
    (path) => {
      const router = createMemoryRouter(appRoutes, { initialEntries: [path] });

      render(<RouterProvider router={router} />);

      expect(screen.getByText(`ExternalRedirect: ${WOMEN_SECTION_URL}`)).toBeInTheDocument();
    },
  );

  it('redirects tab URLs from before the /mezczyzni prefix into the section', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/kontakt?fbclid=abc#dane'],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Dane kontaktowe' }),
    ).toBeInTheDocument();
    expect(router.state.location).toMatchObject({
      pathname: '/mezczyzni/kontakt',
      search: '?fbclid=abc',
      hash: '#dane',
    });
  });

  it('opens the klub tab for the bare /mezczyzni URL', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni'] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe('/mezczyzni/klub');
  });

  it('keeps the section prefix in the hero slide buttons on the klub tab', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/klub'] });

    render(<RouterProvider router={router} />);

    await user.click(await screen.findByRole('button', { name: 'Przejdź do slajdu 3' }));

    expect(screen.getByRole('link', { name: 'Skontaktuj się z nami' })).toHaveAttribute(
      'href',
      '/mezczyzni/kontakt',
    );
  });

  it('navigates to the Zostań Partnerem tab from the mezczyzni nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/klub'] });

    render(<RouterProvider router={router} />);

    const partnerLinks = await screen.findAllByRole('link', { name: 'Zostań Partnerem' });
    await user.click(partnerLinks[0]);

    expect(await screen.findByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Formy współpracy' })).toBeInTheDocument();
  });

  it('renders zostań partnerem for mezczyzni', async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ['/mezczyzni/zostan-partnerem'],
    });

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByText('Partner Główny')).toBeInTheDocument();
  });

  it('navigates to the Media tab from the footer while keeping the section nav', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/klub'] });

    render(<RouterProvider router={router} />);

    await user.click(await screen.findByRole('link', { name: 'Media' }));

    expect(await screen.findByRole('heading', { name: 'Księga znaków' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Kolory klubu' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Składy zawodników' })).toBeInTheDocument();

    expect(screen.getAllByRole('link', { name: 'Klub' })[0]).toHaveAttribute(
      'href',
      '/mezczyzni/klub',
    );
    expect(screen.getAllByRole('link', { name: 'Przyjaciele' })[0]).toHaveAttribute(
      'href',
      '/mezczyzni/przyjaciele',
    );
  });

  it('sets a page-specific title for each tab', async () => {
    const router = createMemoryRouter(appRoutes, { initialEntries: ['/mezczyzni/druzyna'] });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Drużyna siatkówki mężczyzn TS Wisła Kraków',
      }),
    ).toBeInTheDocument();
    expect(document.title).toBe('Drużyna | Siatkówka mężczyzn TS Wisła Kraków');
  });

  it.each(['/nie-ma-takiej-strony', '/mezczyzni/nie-ma-takiej-strony'])(
    'renders a noindex not-found page for the unknown URL %s',
    async (path) => {
      const router = createMemoryRouter(appRoutes, { initialEntries: [path] });

      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole('heading', { level: 1, name: 'Nie znaleziono strony' }),
      ).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /wróć na stronę klubu/i })).toHaveAttribute(
        'href',
        '/mezczyzni/klub',
      );
      expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex',
      );
    },
  );

  it.each(['/MEZCZYZNI/DRUZYNA', '/mezczyzni/%64ruzyna'])(
    'keeps the tab meta for %s, which the router matches to /mezczyzni/druzyna',
    async (path) => {
      const router = createMemoryRouter(appRoutes, { initialEntries: [path] });

      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole('heading', {
          level: 1,
          name: 'Drużyna siatkówki mężczyzn TS Wisła Kraków',
        }),
      ).toBeInTheDocument();
      expect(document.title).toBe('Drużyna | Siatkówka mężczyzn TS Wisła Kraków');
      expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
    },
  );

  it.each(['/constructor', '/__proto__', '/toString'])(
    'treats %s as an unknown, noindex page',
    async (path) => {
      const router = createMemoryRouter(appRoutes, { initialEntries: [path] });

      render(<RouterProvider router={router} />);

      expect(
        await screen.findByRole('heading', { level: 1, name: 'Nie znaleziono strony' }),
      ).toBeInTheDocument();
      expect(document.title).toBe('Nie znaleziono strony | Siatkówka mężczyzn TS Wisła Kraków');
      expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex',
      );
    },
  );

  it('gives every section route its own page meta', () => {
    const sectionRoute = appRoutes.find((route) => route.path === MEN_SECTION_PATH);
    const sectionRoutes = sectionRoute?.children?.find((route) => route.children)?.children ?? [];

    expect(sectionRoutes.length).toBeGreaterThan(0);
    for (const route of sectionRoutes) {
      expect(route.handle).toHaveProperty('pageMeta.title');
    }
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
