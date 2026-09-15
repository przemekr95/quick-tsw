import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { JoinSection } from './JoinSection';

describe('JoinSection', () => {
  it('renders every recruitment path and a contact link', () => {
    render(
      <MemoryRouter>
        <JoinSection
          recruitmentPaths={['Minisiatkówka - roczniki 2014-2016', 'Młodzik - roczniki 2012-2013']}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Twoje miejsce jest na boisku' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Minisiatkówka - roczniki 2014-2016')).toBeInTheDocument();
    expect(screen.getByText('Młodzik - roczniki 2012-2013')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /skontaktuj się/i })).toBeInTheDocument();
  });
});
