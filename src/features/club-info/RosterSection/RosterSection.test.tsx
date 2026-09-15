import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Player } from '../../../shared/types/domain';
import { RosterSection } from './RosterSection';

const players: Player[] = [
  {
    firstName: 'Wojciech',
    lastName: 'Rubacha',
    number: 8,
    position: 'Atakujący',
    photoSrc: '/img.jpg',
  },
];

describe('RosterSection', () => {
  it('renders a card for every player and a link to the full roster', () => {
    render(
      <MemoryRouter>
        <RosterSection players={players} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Poznaj drużynę' })).toBeInTheDocument();
    expect(screen.getByText('Wojciech Rubacha')).toBeInTheDocument();
    expect(screen.getByText('Atakujący')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pełny skład/i })).toBeInTheDocument();
  });
});
