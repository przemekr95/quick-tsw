import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Patron } from '../../../shared/types/domain';
import { PatronsInfo } from './PatronsInfo';

const patrons: Patron[] = [
  { name: 'Mecenas Honorowy A', tier: 1 },
  { name: 'Mecenas B', tier: 2 },
];

describe('PatronsInfo', () => {
  it('renders the patrons wall inside the Strefa Przyjaciół tab region', () => {
    render(<PatronsInfo patrons={patrons} />);

    expect(screen.getByRole('region', { name: 'Zakładka Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Strefa Przyjaciół' })).toBeInTheDocument();
    expect(screen.getByText('Mecenas Honorowy A')).toBeInTheDocument();
  });
});
