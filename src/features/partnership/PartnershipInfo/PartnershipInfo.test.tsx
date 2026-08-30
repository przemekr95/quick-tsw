import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { PartnershipContent } from '../../../shared/types/domain';
import { PartnershipInfo } from './PartnershipInfo';

const content: PartnershipContent = {
  leadText: 'Partnerstwo z klubem to realna obecność Twojej marki.',
  benefits: ['Stała ekspozycja marki podczas meczów obu sekcji'],
  tiers: [
    {
      key: 'primary',
      name: 'Partner Główny',
      description: 'Opis pakietu głównego.',
      perks: ['Logo na strojach meczowych obu sekcji'],
    },
  ],
  waysLeadText: 'Wspólnie ustalamy zakres współpracy.',
  ways: ['Wsparcie finansowe - jednorazowe lub sezonowe'],
};

describe('PartnershipInfo', () => {
  it('renders the intro, tiers and ways sections from the given content', () => {
    render(
      <MemoryRouter>
        <PartnershipInfo content={content} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('region', { name: 'Zakładka Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByText('Partner Główny')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Formy współpracy' })).toBeInTheDocument();
    expect(screen.getByText('Wsparcie finansowe - jednorazowe lub sezonowe')).toBeInTheDocument();
  });
});
