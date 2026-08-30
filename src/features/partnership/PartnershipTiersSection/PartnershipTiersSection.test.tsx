import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PartnershipTiersSection } from './PartnershipTiersSection';

describe('PartnershipTiersSection', () => {
  it('renders all three partnership tiers with their perks', () => {
    render(<PartnershipTiersSection />);

    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByText('Partner Główny')).toBeInTheDocument();
    expect(screen.getByText('Partner')).toBeInTheDocument();
    expect(screen.getByText('Partner Wspierający')).toBeInTheDocument();
    expect(screen.getByText('Polecane')).toBeInTheDocument();
    expect(screen.getByText('Podziękowanie w Strefie Przyjaciół')).toBeInTheDocument();
  });
});
