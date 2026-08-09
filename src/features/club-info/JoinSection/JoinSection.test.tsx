import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { JoinSection } from './JoinSection';

describe('JoinSection', () => {
  it('renders every recruitment path and a contact link', () => {
    render(
      <MemoryRouter>
        <JoinSection recruitmentPaths={['Akademia Młodzieżowa - 10 do 17 lat', 'Liga Rekreacyjna dla Dorosłych']} />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Twoje miejsce jest na boisku' })).toBeInTheDocument();
    expect(screen.getByText('Akademia Młodzieżowa - 10 do 17 lat')).toBeInTheDocument();
    expect(screen.getByText('Liga Rekreacyjna dla Dorosłych')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skontaktuj się/i })).toBeInTheDocument();
  });
});
