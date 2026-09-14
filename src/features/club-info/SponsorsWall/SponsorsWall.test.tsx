import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { Sponsor } from '../../../shared/types/domain';
import { SponsorsWall } from './SponsorsWall';

afterEach(() => {
  cleanup();
});

const sponsors: Sponsor[] = [
  {
    name: 'Sponsor A',
    tier: 1,
    logoSrc: '/images/sponsors/m/msit.png',
    websiteUrl: 'https://example.com/a',
  },
  {
    name: 'Sponsor B',
    tier: 2,
    logoSrc: '/images/sponsors/m/klub.png',
    websiteUrl: 'https://example.com/b',
  },
  {
    name: 'Sponsor C',
    tier: 2,
    logoSrc: '/images/sponsors/m/pzps.png',
    websiteUrl: 'https://example.com/c',
  },
  {
    name: 'Sponsor D',
    tier: 3,
    logoSrc: '/images/sponsors/m/mzps.png',
    websiteUrl: 'https://example.com/d',
  },
];

describe('SponsorsWall', () => {
  it('renders all sponsor logos at once, grouped by tier', () => {
    render(<SponsorsWall sponsors={sponsors} />);

    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor A' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor B' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor C' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor D' })).toBeInTheDocument();
  });

  it('renders clickable sponsor links with external target', () => {
    render(<SponsorsWall sponsors={sponsors} />);

    const sponsorLink = screen.getByRole('link', { name: 'Odwiedź stronę sponsora Sponsor A' });

    expect(sponsorLink).toHaveAttribute('href', 'https://example.com/a');
    expect(sponsorLink).toHaveAttribute('target', '_blank');
    expect(sponsorLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a non-clickable logo when websiteUrl is missing and falls back to initials without a logo', () => {
    render(<SponsorsWall sponsors={[{ name: 'Bez Strony', tier: 1 }]} />);

    expect(screen.getByText('BS')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Odwiedź stronę sponsora/i }),
    ).not.toBeInTheDocument();
  });

  it('renders a non-clickable logo image when a logo exists but websiteUrl is missing', () => {
    render(<SponsorsWall sponsors={[{ name: 'Bez Linku', tier: 1, logoSrc: '/logo.png' }]} />);

    expect(screen.getByRole('img', { name: 'Logotyp sponsora Bez Linku' })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /Odwiedź stronę sponsora/i }),
    ).not.toBeInTheDocument();
  });

  it('returns null when sponsor names are empty after normalization', () => {
    render(
      <SponsorsWall
        sponsors={[
          { name: '[]', tier: 1 },
          { name: '   ', tier: 2 },
        ]}
      />,
    );

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByText(/./)).not.toBeInTheDocument();
  });
});
