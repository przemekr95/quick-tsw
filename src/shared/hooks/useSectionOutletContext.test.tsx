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
  matchForm: [],
};

function LayoutRoute() {
  return <Outlet context={{ club, landingContent }} />;
}

function ChildRoute() {
  const { club: contextClub, landingContent: contextLandingContent } = useSectionOutletContext();

  return (
    <p>
      {contextClub?.name} / {contextLandingContent?.heroHeading}
    </p>
  );
}

describe('useSectionOutletContext', () => {
  it('reads the club and landing content data provided by the parent layout route', () => {
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

    expect(screen.getByText('Nazwa Klubu / Mężczyźni')).toBeInTheDocument();
  });
});
