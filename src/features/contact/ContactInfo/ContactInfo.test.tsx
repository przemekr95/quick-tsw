import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContactInfo as ContactInfoType } from '../../../shared/types/domain';
import { ContactInfo } from './ContactInfo';

const contact: ContactInfoType = {
  address: 'ul. Testowa 1, 00-000 Miasto',
  phone: '+48 123',
  email: 'test@klub.pl',
  mapUrl: 'https://example.com',
  nip: '000-000-00-00',
  bankAccountNumber: '00 0000 0000 0000 0000 0000 0000',
  bankAccountHolder: 'Towarzystwo Sportowe Wisła Kraków',
  coordinators: [
    {
      role: 'Koordynator sekcji',
      firstName: 'Anna',
      lastName: 'Nowak',
      phone: '+48 000 000 003',
      email: 'koordynator@klub.pl',
      photoSrc: '/images/backgrounds/hero-m.jpg',
    },
  ],
};

describe('ContactInfo', () => {
  it('renders coordinators and organisation contact details', () => {
    render(<ContactInfo contact={contact} />);

    expect(screen.getByRole('heading', { name: 'Koordynatorzy' })).toBeInTheDocument();
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Dane kontaktowe' })).toBeInTheDocument();
    expect(screen.getByText('ul. Testowa 1, 00-000 Miasto')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'test@klub.pl' })).toHaveAttribute(
      'href',
      'mailto:test@klub.pl',
    );
  });
});
