import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PartnershipIntroSection } from './PartnershipIntroSection';

describe('PartnershipIntroSection', () => {
  it('renders the pitch heading, lead text and benefits from props', () => {
    render(
      <PartnershipIntroSection
        benefits={['Stała ekspozycja marki podczas meczów obu sekcji']}
        leadText="Partnerstwo z klubem to realna obecność Twojej marki."
      />,
    );

    expect(screen.getByRole('heading', { name: 'Zostań Partnerem' })).toBeInTheDocument();
    expect(
      screen.getByText('Partnerstwo z klubem to realna obecność Twojej marki.'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Stała ekspozycja marki podczas meczów obu sekcji'),
    ).toBeInTheDocument();
  });
});
