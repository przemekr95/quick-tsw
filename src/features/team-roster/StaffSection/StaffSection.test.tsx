import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { StaffMember } from '../../../shared/types/domain';
import { StaffSection } from './StaffSection';

const staff: StaffMember[] = [
  {
    role: 'Trener',
    firstName: 'Anna',
    lastName: 'Nowak',
    bio: 'Trener główny z wieloletnim doświadczeniem.',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
  {
    role: 'Statystyk',
    firstName: 'Piotr',
    lastName: 'Wiśniewski',
    bio: 'Odpowiada za analizę statystyczną drużyny.',
    photoSrc: '/images/backgrounds/hero-m.jpg',
  },
];

describe('StaffSection', () => {
  it('renders a card for the coach and the stats analyst', () => {
    render(<StaffSection staff={staff} />);

    expect(screen.getByRole('heading', { name: 'Sztab' })).toBeInTheDocument();
    expect(screen.getByText('Anna Nowak')).toBeInTheDocument();
    expect(screen.getByText('Trener')).toBeInTheDocument();
    expect(screen.getByText('Piotr Wiśniewski')).toBeInTheDocument();
    expect(screen.getByText('Statystyk')).toBeInTheDocument();
  });
});
