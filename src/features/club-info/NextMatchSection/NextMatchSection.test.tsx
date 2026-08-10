import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { ClubNextMatch } from '../../../shared/types/domain';
import { NextMatchSection } from './NextMatchSection';

const match: ClubNextMatch = {
  opponent: 'MKS Set Nowa Wieś',
  competition: 'I liga kobiet',
  kickoffLabel: '15 sierpnia 2026, 19:00',
  venue: 'Hala Sportowa, ul. Sportowa 1',
};

describe('NextMatchSection', () => {
  it('renders match details, countdown and form', () => {
    render(
      <MemoryRouter>
        <NextMatchSection countdown={[{ value: '16', label: 'Dni' }]} form={['W', 'L']} match={match} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'MKS Set Nowa Wieś' })).toBeInTheDocument();
    expect(screen.getByText(/15 sierpnia 2026, 19:00/)).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('L')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /zapytaj o bilety/i })).toBeInTheDocument();
  });
});
