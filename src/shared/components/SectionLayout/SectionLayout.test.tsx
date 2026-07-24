import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { SectionLayout } from './SectionLayout';

describe('SectionLayout', () => {
  it('renders heading and back link', () => {
    render(
      <MemoryRouter>
        <SectionLayout sectionLabel="Kobiety" sectionPath="/kobiety">
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Kobiety' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Powrót do wyboru sekcji' })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
