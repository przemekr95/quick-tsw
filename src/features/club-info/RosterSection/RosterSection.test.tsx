import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { ClubRosterCard } from '../../../shared/types/domain';
import { RosterSection } from './RosterSection';

const players: ClubRosterCard[] = [
  { name: 'Marco Rossi', position: 'Atakujący', number: '13', stats: 'Skuteczność ataku: 94%', imageSrc: '/img.jpg' },
];

describe('RosterSection', () => {
  it('renders a card for every player and a link to the full roster', () => {
    render(
      <MemoryRouter>
        <RosterSection players={players} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Poznaj drużynę' })).toBeInTheDocument();
    expect(screen.getByText('Marco Rossi')).toBeInTheDocument();
    expect(screen.getByText('Atakujący')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /pełny skład/i })).toBeInTheDocument();
  });
});
