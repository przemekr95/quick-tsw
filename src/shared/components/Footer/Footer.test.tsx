import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { Footer } from './Footer';

afterEach(() => {
  cleanup();
});

describe('Footer', () => {
  it('renders the back-to-section-picker link', () => {
    render(
      <MemoryRouter>
        <Footer sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /Powrót do wyboru sekcji/ })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('renders the club section navigation for the given section path', () => {
    render(
      <MemoryRouter>
        <Footer sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('navigation', { name: 'Nawigacja sekcji klubu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Klub' })).toHaveAttribute('href', '/kobiety/klub');
    expect(screen.getByRole('link', { name: 'Drużyna' })).toHaveAttribute(
      'href',
      '/kobiety/druzyna',
    );
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute(
      'href',
      '/kobiety/kontakt',
    );
    expect(screen.getByRole('link', { name: 'Aktualności na Facebooku' })).toHaveAttribute(
      'target',
      '_blank',
    );
  });

  it('marks the active tab link', () => {
    render(
      <MemoryRouter initialEntries={['/mezczyzni/kontakt']}>
        <Footer sectionPath="/mezczyzni" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders a copyright line with the current year and brand name', () => {
    render(
      <MemoryRouter>
        <Footer sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    const currentYear = new Date().getFullYear().toString();

    expect(
      screen.getByText(new RegExp(`© ${currentYear} Towarzystwo Sportowe Wisła Kraków`)),
    ).toBeInTheDocument();
  });

  it('renders the Media link scoped to the current section', () => {
    render(
      <MemoryRouter>
        <Footer sectionPath="/mezczyzni" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Media' })).toHaveAttribute('href', '/mezczyzni/media');
  });

  it('lists Aktualności first in the section navigation', () => {
    render(
      <MemoryRouter>
        <Footer sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    const nav = screen.getByRole('navigation', { name: 'Nawigacja sekcji klubu' });
    const links = within(nav).getAllByRole('link');

    expect(links[0]).toHaveAccessibleName('Aktualności na Facebooku');
  });
});
