import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { Sponsor } from '../../../shared/types/domain';
import { SponsorsSection } from './SponsorsSection';

afterEach(() => {
  cleanup();
});

const sponsors: Sponsor[] = [
  { name: 'Sponsor 1', tier: 1, logoSrc: '/logo.png', websiteUrl: 'https://example.com' },
];

describe('SponsorsSection', () => {
  it('renders the club crest and the sponsors wall without a visible title', () => {
    render(<SponsorsSection clubName="MKS Siatkówka" sponsors={sponsors} />);

    expect(
      screen.getByRole('region', { name: 'Sponsorzy klubu MKS Siatkówka' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Herb klubu MKS Siatkówka' })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('links the club crest to the club website in a new tab', () => {
    render(<SponsorsSection clubName="MKS Siatkówka" sponsors={sponsors} />);

    const crestLink = screen.getByRole('link', {
      name: 'Strona klubu MKS Siatkówka (otwiera się w nowej karcie)',
    });

    expect(crestLink).toHaveAttribute('href', 'https://www.tswisla.pl/');
    expect(crestLink).toHaveAttribute('target', '_blank');
    expect(crestLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
