import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PartnershipInfo } from './PartnershipInfo';

describe('PartnershipInfo', () => {
  it('renders the intro, tiers and ways sections inside the Zostań Partnerem tab region', () => {
    render(
      <MemoryRouter>
        <PartnershipInfo />
      </MemoryRouter>,
    );

    expect(screen.getByRole('region', { name: 'Zakładka Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Pakiety partnerskie' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Formy współpracy' })).toBeInTheDocument();
  });
});
