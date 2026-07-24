import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Club } from '../../../shared/types/domain';
import { ClubInfo } from './ClubInfo';

const club: Club = {
  name: 'Nazwa Klubu',
  history: 'Historia klubu',
  arenaAddress: 'Adres 1',
  board: ['A', 'B'],
  sponsors: ['S1', 'S2'],
};

describe('ClubInfo', () => {
  it('renders club details', () => {
    render(<ClubInfo club={club} />);

    expect(screen.getByText('Nazwa Klubu')).toBeInTheDocument();
    expect(screen.getByText('Historia klubu')).toBeInTheDocument();
    expect(screen.getByText('Adres 1')).toBeInTheDocument();
  });
});
