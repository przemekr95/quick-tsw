import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import type { SectionCoordinator } from '../../../shared/types/domain';
import { CoordinatorsSection } from './CoordinatorsSection';

afterEach(() => {
  cleanup();
});

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

  it('links the card to the external coordinator profile without hiding the contact links', () => {
    const profileUrl = 'https://example.com/koordynatorzy/anna-nowak';

    render(<CoordinatorsSection coordinators={[{ ...coordinators[0], profileUrl }]} />);

    const profileLink = screen.getByRole('link', {
      name: 'Profil Anna Nowak (otwiera się w nowej karcie)',
    });

    expect(profileLink).toHaveAttribute('href', profileUrl);
    expect(profileLink).toHaveAttribute('target', '_blank');
    expect(profileLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('link', { name: '+48 000 000 003' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'koordynator@klub.pl' })).toBeInTheDocument();
  });

  it('renders only the contact links when the coordinator has no profile URL', () => {
    render(<CoordinatorsSection coordinators={[coordinators[1]]} />);

    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
});
