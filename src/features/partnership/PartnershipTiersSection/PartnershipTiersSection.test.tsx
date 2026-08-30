import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { PartnershipTier } from '../../../shared/types/domain';
import { PartnershipTiersSection } from './PartnershipTiersSection';

const tiers: PartnershipTier[] = [
  {
    key: 'primary',
    name: 'Partner Główny',
    description: 'Opis pakietu głównego.',
    perks: ['Logo na strojach meczowych obu sekcji'],
  },
  {
    key: 'secondary',
    name: 'Partner',
    description: 'Opis pakietu drugiego.',
    perks: ['Wzmianki w mediach społecznościowych klubu'],
  },
  {
    key: 'tertiary',
    name: 'Partner Wspierający',
    description: 'Opis pakietu trzeciego.',
    perks: ['Podziękowanie w Strefie Przyjaciół'],
  },
];

describe('PartnershipTiersSection', () => {
  it('renders every partnership tier passed in props with its perks', () => {
    render(<PartnershipTiersSection tiers={tiers} />);

    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByText('Partner Główny')).toBeInTheDocument();
    expect(screen.getByText('Partner')).toBeInTheDocument();
    expect(screen.getByText('Partner Wspierający')).toBeInTheDocument();
    expect(screen.getByText('Polecane')).toBeInTheDocument();
    expect(screen.getByText('Podziękowanie w Strefie Przyjaciół')).toBeInTheDocument();
  });
});
