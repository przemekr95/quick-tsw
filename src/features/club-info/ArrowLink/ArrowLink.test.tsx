import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { ArrowLink } from './ArrowLink';

describe('ArrowLink', () => {
  it('renders a link pointing to the given destination', () => {
    render(
      <MemoryRouter>
        <ArrowLink to="/kontakt">Skontaktuj się</ArrowLink>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: /skontaktuj się/i });
    expect(link).toHaveAttribute('href', '/kontakt');
  });
});
