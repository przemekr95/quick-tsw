import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import type { HeroSlide, Sponsor } from '../../types/domain';
import { SectionLayout } from './SectionLayout';

afterEach(() => {
  cleanup();
});

const mockHeroSlides: HeroSlide[] = [
  {
    id: 'k-1',
    imageSrc: '/images/backgrounds/m/m-1.jpg',
    imageAlt: 'Slajd 1',
    title: 'Pasja i determinacja',
    text: 'Gramy z sercem na każdym metrze boiska.',
  },
  {
    id: 'k-2',
    imageSrc: '/images/backgrounds/m/m-2.jpg',
    imageAlt: 'Slajd 2',
    title: 'Razem silniejsze',
    text: 'Drużyna, która tworzy historię każdego sezonu.',
  },
];

const mockSponsors: Sponsor[] = [
  { name: 'Sponsor 1', tier: 1, logoSrc: '/logo.png', websiteUrl: 'https://example.com' },
];

describe('SectionLayout', () => {
  it('renders cta on section home route', () => {
    render(
      <MemoryRouter initialEntries={['/klub']}>
        <SectionLayout
          clubName="MKS Siatkówka"
          ctaLabel="Przejdź do treści"
          heroHeading="Sekcja Mężczyzn"
          heroSlides={mockHeroSlides}
          sectionLabel="Mężczyźni"
          sectionPath=""
          sponsors={mockSponsors}
        >
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Przejdź do treści' })).toHaveAttribute(
      'href',
      '#section-content',
    );
  });

  it('renders section heading as h1 on the home route', () => {
    render(
      <MemoryRouter initialEntries={['/klub']}>
        <SectionLayout
          clubName="MKS Siatkówka"
          ctaLabel="Przejdź do treści"
          heroHeading="Sekcja Mężczyzn"
          heroSlides={mockHeroSlides}
          sectionLabel="Mężczyźni"
          sectionPath=""
          sponsors={mockSponsors}
        >
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Sekcja Mężczyzn' })).toBeInTheDocument();
  });

  it('does not render cta outside section home route', () => {
    render(
      <MemoryRouter initialEntries={['/kontakt']}>
        <SectionLayout
          clubName="MKS Siatkówka"
          ctaLabel="Przejdź do treści"
          heroHeading="Sekcja Mężczyzn"
          heroSlides={mockHeroSlides}
          sectionLabel="Mężczyźni"
          sectionPath=""
          sponsors={mockSponsors}
        >
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: 'Przejdź do treści' })).not.toBeInTheDocument();
  });

  it('renders pagination dots on section home route', () => {
    render(
      <MemoryRouter initialEntries={['/klub']}>
        <SectionLayout
          clubName="MKS Siatkówka"
          ctaLabel="Przejdź do treści"
          heroHeading="Sekcja Mężczyzn"
          heroSlides={mockHeroSlides}
          sectionLabel="Mężczyźni"
          sectionPath=""
          sponsors={mockSponsors}
        >
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    const dots = screen.getAllByRole('button', { name: /Przejdź do slajdu/ });
    expect(dots).toHaveLength(mockHeroSlides.length);
  });

  it('clicking a dot changes active slide', async () => {
    render(
      <MemoryRouter initialEntries={['/klub']}>
        <SectionLayout
          clubName="MKS Siatkówka"
          ctaLabel="Przejdź do treści"
          heroHeading="Sekcja Mężczyzn"
          heroSlides={mockHeroSlides}
          sectionLabel="Mężczyźni"
          sectionPath=""
          sponsors={mockSponsors}
        >
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    const dots = screen.getAllByRole('button', { name: /Przejdź do slajdu/ });
    expect(dots[0]).toHaveAttribute('aria-pressed', 'true');
    expect(dots[1]).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(dots[1]);

    expect(dots[1]).toHaveAttribute('aria-pressed', 'true');
    expect(dots[0]).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders the club sponsors wall above the footer on every tab', () => {
    render(
      <MemoryRouter initialEntries={['/kontakt']}>
        <SectionLayout
          clubName="MKS Siatkówka"
          ctaLabel="Przejdź do treści"
          heroHeading="Sekcja Mężczyzn"
          heroSlides={mockHeroSlides}
          sectionLabel="Mężczyźni"
          sectionPath=""
          sponsors={mockSponsors}
        >
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('region', { name: 'Sponsorzy klubu MKS Siatkówka' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor 1' })).toBeInTheDocument();
  });
});
