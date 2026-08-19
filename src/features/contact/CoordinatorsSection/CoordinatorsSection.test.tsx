import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { SectionCoordinator } from '../../../shared/types/domain';
import { CoordinatorsSection } from './CoordinatorsSection';

const coordinators: SectionCoordinator[] = [
  {
    role: 'Koordynator sekcji',
    firstName: 'Anna',
    lastName: 'Nowak',
    phone: '+48 000 000 003',
    email: 'koordynator@klub.pl',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
  {
    role: 'Zastępca koordynatora',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    phone: '+48 000 000 004',
    email: 'zastepca@klub.pl',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
];

describe('CoordinatorsSection', () => {
  it('renders a card with contact links for every coordinator', () => {
    render(<CoordinatorsSection coordinators={coordinators} />);

    expect(screen.getByRole('heading', { name: 'Koordynatorzy' })).toBeInTheDocument();
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '+48 000 000 003' })).toHaveAttribute(
      'href',
      'tel:+48000000003',
    );
    expect(screen.getByRole('link', { name: 'koordynator@klub.pl' })).toHaveAttribute(
      'href',
      'mailto:koordynator@klub.pl',
    );
  });
});
