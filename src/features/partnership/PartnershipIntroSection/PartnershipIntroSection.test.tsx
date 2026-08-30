import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PartnershipIntroSection } from './PartnershipIntroSection';

describe('PartnershipIntroSection', () => {
  it('renders the pitch heading and the club benefits', () => {
    render(<PartnershipIntroSection />);

    expect(screen.getByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(
      screen.getByText('Stała ekspozycja marki podczas meczów obu sekcji'),
    ).toBeInTheDocument();
  });
});
