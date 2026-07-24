import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ContactInfo as ContactInfoType } from '../../../shared/types/domain';
import { ContactInfo } from './ContactInfo';

const contact: ContactInfoType = {
  address: 'Adres',
  phone: '+48 123',
  email: 'test@klub.pl',
  mapUrl: 'https://example.com',
};

describe('ContactInfo', () => {
  it('renders contact fields', () => {
    render(<ContactInfo contact={contact} />);

    expect(screen.getByText('Adres')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'test@klub.pl' })).toHaveAttribute(
      'href',
      'mailto:test@klub.pl',
    );
  });
});
