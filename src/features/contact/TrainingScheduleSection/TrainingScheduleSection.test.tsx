import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { TrainingGroup } from '../../../shared/types/domain';
import { TrainingScheduleSection } from './TrainingScheduleSection';

const trainingGroups: TrainingGroup[] = [
  {
    name: 'Senior',
    venue: 'Hala treningowa',
    address: 'ul. Reymonta 22, 30-059 Kraków',
    mapUrl: 'https://maps.example.com/senior',
    sessions: [
      { day: 'Wtorek', time: '21:30 - 23:30' },
      { day: 'Czwartek', time: '22:00 - 24:00' },
    ],
  },
  {
    name: 'Kadeci',
    venue: 'Szkoła Podstawowa nr 93',
    address: 'ul. Szlachtowskiego, Kraków',
    mapUrl: 'https://maps.example.com/kadeci',
    sessions: [
      { day: 'Wtorek', time: '19:15 - 20:45' },
      { day: 'Piątek', time: '19:30 - 21:00' },
    ],
  },
];

describe('TrainingScheduleSection', () => {
  it('renders every training group with its venue, sessions and map link', () => {
    render(<TrainingScheduleSection trainingGroups={trainingGroups} />);

    expect(screen.getByRole('heading', { name: 'Treningi' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Senior' })).toBeInTheDocument();
    expect(screen.getByText('Hala treningowa')).toBeInTheDocument();
    expect(screen.getByText('ul. Reymonta 22, 30-059 Kraków')).toBeInTheDocument();
    expect(screen.getByText('21:30 - 23:30')).toBeInTheDocument();
    expect(screen.getByText('22:00 - 24:00')).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'Kadeci' })).toBeInTheDocument();
    expect(screen.getByText('Szkoła Podstawowa nr 93')).toBeInTheDocument();
    expect(screen.getAllByText('Wtorek')).toHaveLength(2);
    expect(screen.getByText('19:30 - 21:00')).toBeInTheDocument();

    const mapLinks = screen.getAllByRole('link', { name: /Zobacz na mapie/ });
    expect(mapLinks).toHaveLength(2);
    expect(mapLinks[0]).toHaveAttribute('href', 'https://maps.example.com/senior');
    expect(mapLinks[1]).toHaveAttribute('href', 'https://maps.example.com/kadeci');
  });
});
