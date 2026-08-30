import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { PartnershipWaysSection } from './PartnershipWaysSection';

describe('PartnershipWaysSection', () => {
  it('lists collaboration options and links to kontakt', () => {
    render(
      <MemoryRouter>
        <PartnershipWaysSection
          leadText="Wspólnie ustalamy zakres współpracy."
          ways={['Wsparcie finansowe - jednorazowe lub sezonowe']}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Formy współpracy' })).toBeInTheDocument();
    expect(screen.getByText('Wspólnie ustalamy zakres współpracy.')).toBeInTheDocument();
    expect(screen.getByText('Wsparcie finansowe - jednorazowe lub sezonowe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Skontaktuj się/ })).toBeInTheDocument();
  });
});
