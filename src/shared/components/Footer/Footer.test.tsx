import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { Footer } from './Footer';

afterEach(() => {
  cleanup();
});

function renderFooter(initialEntry = '/klub') {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Footer sectionName="Siatkówka mężczyzn" sectionPath="" />
    </MemoryRouter>,
  );
}

describe('Footer', () => {
  it('signs off with the full section name', () => {
    renderFooter();

    expect(screen.getByText('Siatkówka mężczyzn')).toBeInTheDocument();
  });

  it('links to Media and then Kontakt, scoped to the current section', () => {
    renderFooter();

    const nav = screen.getByRole('navigation', { name: 'Nawigacja w stopce' });
    const links = within(nav).getAllByRole('link');

    expect(links.map((link) => link.textContent)).toEqual(['Media', 'Kontakt']);

    expect(within(nav).getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/kontakt');
    expect(within(nav).getByRole('link', { name: 'Media' })).toHaveAttribute('href', '/media');
  });

  it('does not repeat the primary tabs already in the fixed nav bar', () => {
    renderFooter();

    const nav = screen.getByRole('navigation', { name: 'Nawigacja w stopce' });

    expect(within(nav).getAllByRole('link')).toHaveLength(2);
    expect(within(nav).queryByRole('link', { name: 'Drużyna' })).not.toBeInTheDocument();
  });

  it('opens Facebook and Instagram in a new tab and announces it', () => {
    renderFooter();

    const socials = screen.getByRole('list', { name: 'Media społecznościowe' });
    const facebookLink = within(socials).getByRole('link', {
      name: 'Facebook (otwiera się w nowej karcie)',
    });
    const instagramLink = within(socials).getByRole('link', {
      name: 'Instagram (otwiera się w nowej karcie)',
    });

    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/Tswsiatkowkamezczyzn');
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/tswisla_siatkowkamezczyzn/',
    );

    for (const link of [facebookLink, instagramLink]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('marks the Media link as the current page on the Media tab', () => {
    renderFooter('/media');

    expect(screen.getByRole('link', { name: 'Media' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Kontakt' })).not.toHaveAttribute('aria-current');
  });

  it('renders a copyright line with the current year and brand name', () => {
    renderFooter();

    const currentYear = new Date().getFullYear().toString();

    expect(
      screen.getByText(`© ${currentYear} Towarzystwo Sportowe Wisła Kraków`),
    ).toBeInTheDocument();
  });
});
