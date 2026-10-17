import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { NotFoundInfo } from './NotFoundInfo';

describe('NotFoundInfo', () => {
  it('explains the page is missing and links back to the club', () => {
    render(
      <MemoryRouter>
        <NotFoundInfo homePath="/klub" />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Nie znaleziono strony' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /wróć na stronę klubu/i })).toHaveAttribute(
      'href',
      '/klub',
    );
  });
});
