import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContactInfo } from '../../../shared/types/domain';
import { ContactDetailsSection } from './ContactDetailsSection';

const contact: Omit<ContactInfo, 'coordinators' | 'trainingGroups'> = {
  address: 'ul. Sportowa 1, 00-000 Miasto',
  email: 'test@klub.pl',
  mapUrl: 'https://example.com',
  nip: '000-000-00-00',
  krs: '0000000000',
  bankAccountNumber: '45 2490 0005 0000 4600 0041 3030',
  bankAccountHolder: 'Towarzystwo Sportowe Wisła Kraków',
};

describe('ContactDetailsSection', () => {
  it('renders organisation contact details and a map link', () => {
    render(<ContactDetailsSection contact={contact} />);

    expect(screen.getByRole('heading', { name: 'Dane kontaktowe' })).toBeInTheDocument();
    expect(screen.getByText('ul. Sportowa 1, 00-000 Miasto')).toBeInTheDocument();
    expect(screen.getByText('000-000-00-00')).toBeInTheDocument();
    expect(screen.getByText('0000000000')).toBeInTheDocument();
    expect(screen.getByText('45 2490 0005 0000 4600 0041 3030')).toBeInTheDocument();
    expect(screen.getByText('Towarzystwo Sportowe Wisła Kraków')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'test@klub.pl' })).toHaveAttribute(
      'href',
      'mailto:test@klub.pl',
    );
    expect(screen.getByRole('link', { name: /zobacz na mapie/i })).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });
});
