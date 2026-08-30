import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Patron, Sponsor } from '../../../shared/types/domain';
import { PatronsInfo } from './PatronsInfo';

const patrons: Patron[] = [
  { name: 'Mecenas Honorowy A', tier: 1 },
  { name: 'Mecenas B', tier: 2 },
];

const sponsors: Sponsor[] = [
  { name: 'Sponsor 1', tier: 1, logoSrc: '/logo.png', websiteUrl: 'https://example.com' },
];

describe('PatronsInfo', () => {
  it('renders the patrons wall and the club sponsors wall inside the Strefa Przyjaciół tab region', () => {
    render(<PatronsInfo clubName="MKS Siatkówka" patrons={patrons} sponsors={sponsors} />);

    expect(screen.getByRole('region', { name: 'Zakładka Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getByText('Mecenas Honorowy A')).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: 'Sponsorzy klubu MKS Siatkówka' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Logotyp sponsora Sponsor 1' })).toBeInTheDocument();
  });
});
