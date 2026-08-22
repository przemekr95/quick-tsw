import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SplitScreen } from './SplitScreen';

describe('SplitScreen', () => {
  it('renders section links with expected hrefs', () => {
    render(
      <MemoryRouter>
        <SplitScreen />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Kobiet' })).toHaveAttribute('href', '/kobiety');
    expect(screen.getByRole('link', { name: 'Mężczyzn' })).toHaveAttribute('href', '/mezczyzni');
  });
});
