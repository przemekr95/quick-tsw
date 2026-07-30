import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroBackground } from './HeroBackground';

describe('HeroBackground', () => {
  it('renders labeled hero wrapper', () => {
    render(
      <HeroBackground sectionLabel="Kobiety" sectionPath="/kobiety">
        <p>Treść</p>
      </HeroBackground>,
    );

    expect(screen.getByLabelText('Tło sekcji Kobiety')).toBeInTheDocument();
    expect(screen.getByText('Treść')).toBeInTheDocument();
  });
});
