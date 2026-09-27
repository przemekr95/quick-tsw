import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Patron } from '../../../shared/types/domain';
import { PatronsInfo } from './PatronsInfo';

const patrons: Patron[] = [
  { name: 'Mecenas A', tier: 1 },
  { name: 'Darczyńca B', tier: 2 },
];

describe('PatronsInfo', () => {
  it('renders the patrons wall inside the Przyjaciele Białej Gwiazdy tab region', () => {
    render(
      <MemoryRouter>
        <PatronsInfo patrons={patrons} />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('region', { name: 'Zakładka Przyjaciele Białej Gwiazdy' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Przyjaciele Białej Gwiazdy' })).toBeInTheDocument();
    expect(screen.getByText('Mecenas A')).toBeInTheDocument();
  });
});
