import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import type { Sponsor } from '../../../shared/types/domain';
import { SponsorsCarousel } from './SponsorsCarousel';

afterEach(() => {
  cleanup();
});

const sponsors: Sponsor[] = [
  {
    name: 'Sponsor A',
    logoSrc: '/images/sponsors/k/msit.png',
    websiteUrl: 'https://example.com/a',
  },
  {
    name: 'Sponsor B',
    logoSrc: '/images/sponsors/k/klub.png',
    websiteUrl: 'https://example.com/b',
  },
  {
    name: 'Sponsor C',
    logoSrc: '/images/sponsors/k/pzps.png',
    websiteUrl: 'https://example.com/c',
  },
  {
    name: 'Sponsor D',
    logoSrc: '/images/sponsors/k/mzps.png',
    websiteUrl: 'https://example.com/d',
  },
  {
    name: 'Sponsor E',
    logoSrc: '/images/sponsors/m/msit.png',
    websiteUrl: 'https://example.com/e',
  },
  {
    name: 'Sponsor F',
    logoSrc: '/images/sponsors/m/klub.png',
    websiteUrl: 'https://example.com/f',
  },
];

describe('SponsorsCarousel', () => {
  it('renders sponsor carousel and allows switching sponsors', async () => {
    const user = userEvent.setup();

    render(<SponsorsCarousel sponsors={sponsors} />);

    expect(screen.getByRole('region', { name: 'Karuzela logotypów sponsorów' })).toBeInTheDocument();
    expect(screen.getByText('Sponsor A')).toBeInTheDocument();
    expect(screen.getByText('Sponsor 1 / 6')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Następny sponsor' }));

    expect(screen.getByText('Sponsor B')).toBeInTheDocument();
    expect(screen.getByText('Sponsor 2 / 6')).toBeInTheDocument();
  });

  it('renders clickable sponsor links with external target', () => {
    render(<SponsorsCarousel sponsors={sponsors} />);

    const sponsorLink = screen.getByRole('link', { name: 'Odwiedź stronę sponsora Sponsor A' });

    expect(sponsorLink).toHaveAttribute('href', 'https://example.com/a');
    expect(sponsorLink).toHaveAttribute('target', '_blank');
    expect(sponsorLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('wraps to the last sponsor when previous is clicked on the first item', async () => {
    const user = userEvent.setup();

    render(<SponsorsCarousel sponsors={sponsors} />);

    await user.click(screen.getByRole('button', { name: 'Poprzedni sponsor' }));

    expect(screen.getByText('Sponsor F')).toBeInTheDocument();
    expect(screen.getByText('Sponsor 6 / 6')).toBeInTheDocument();
  });

  it('returns null when sponsor names are empty after normalization', () => {
    render(<SponsorsCarousel sponsors={[{ name: '[]' }, { name: '   ' }]} />);

    expect(screen.queryByRole('region', { name: 'Karuzela logotypów sponsorów' })).not.toBeInTheDocument();
  });

  it('renders single sponsor without navigation buttons and shows code fallback without logo', () => {
    render(<SponsorsCarousel sponsors={[{ name: 'Single Sponsor' }]} />);

    expect(screen.getByText('Single Sponsor')).toBeInTheDocument();
    expect(screen.getByText('SS')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Poprzedni sponsor' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Następny sponsor' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Odwiedź stronę sponsora/i })).not.toBeInTheDocument();
  });
});
