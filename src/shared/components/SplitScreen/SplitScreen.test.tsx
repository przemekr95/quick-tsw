import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { WOMEN_SECTION_URL } from '../../utils/config';
import { SplitScreen } from './SplitScreen';

describe('SplitScreen', () => {
  it('links the women section to the club website and the men section to its tabs', () => {
    render(
      <MemoryRouter>
        <SplitScreen />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Wybierz sekcję siatkówki TS Wisła Kraków' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sekcja siatkówki kobiet' })).toHaveAttribute(
      'href',
      WOMEN_SECTION_URL,
    );
    expect(screen.getByRole('link', { name: 'Sekcja siatkówki mężczyzn' })).toHaveAttribute(
      'href',
      '/mezczyzni/klub',
    );
  });
});
