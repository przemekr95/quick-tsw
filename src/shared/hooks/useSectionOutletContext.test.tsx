import { render, screen } from '@testing-library/react';
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { Club, ClubLandingContent } from '../types/domain';
import { useSectionOutletContext } from './useSectionOutletContext';

const club: Club = {
  name: 'Nazwa Klubu',
  history: 'Historia',
  board: [],
  sponsors: [],
};

const landingContent: ClubLandingContent = {
  heroHeading: 'Mężczyźni',
  heroSlides: [],
  recruitmentPaths: [],
  matchCountdown: [],
  matchForm: [],
  nextMatch: {
    opponent: 'Przeciwnik',
    competition: 'Liga',
    kickoffLabel: 'Sobota, 18:00',
    venue: 'Hala testowa',
  },
};

function LayoutRoute() {
  return <Outlet context={{ club, landingContent }} />;
}

function ChildRoute() {
  const { club: contextClub } = useSectionOutletContext();

  return <p>{contextClub?.name}</p>;
}

describe('useSectionOutletContext', () => {
  it('reads the club data provided by the parent layout route', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <LayoutRoute />,
          children: [{ index: true, element: <ChildRoute /> }],
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Nazwa Klubu')).toBeInTheDocument();
  });
});
