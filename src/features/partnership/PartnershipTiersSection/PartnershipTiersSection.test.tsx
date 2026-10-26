import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { PartnershipTier } from '../../../shared/types/domain';
import { PartnershipTiersSection } from './PartnershipTiersSection';

const tiers: PartnershipTier[] = [
  {
    key: 'primary',
    name: 'Partner Główny',
    description: 'Opis pakietu głównego.',
    perks: ['Logo na strojach meczowych'],
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
    perks: ['Podziękowanie w gronie Przyjaciół Białej Gwiazdy'],
  },
];

describe('PartnershipTiersSection', () => {
  it('renders every partnership tier passed in props with its perks and the closing note', () => {
    render(<PartnershipTiersSection tiers={tiers} />);

    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByText('Partner Główny')).toBeInTheDocument();
    expect(screen.getByText('Partner')).toBeInTheDocument();
    expect(screen.getByText('Partner Wspierający')).toBeInTheDocument();
    expect(screen.getByText('Polecane')).toBeInTheDocument();
    expect(
      screen.getByText('Podziękowanie w gronie Przyjaciół Białej Gwiazdy'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Każdy pakiet możemy dopasować do potrzeb i możliwości Twojej firmy\./),
    ).toBeInTheDocument();
  });
});
