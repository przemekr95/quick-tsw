import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { SectionLayout } from './SectionLayout';

afterEach(() => {
  cleanup();
});

describe('SectionLayout', () => {
  it('renders cta on section home route', () => {
    render(
      <MemoryRouter initialEntries={['/kobiety/klub']}>
        <SectionLayout sectionLabel="Kobiety" sectionPath="/kobiety">
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Przejdź do treści' })).toHaveAttribute(
      'href',
      '#section-content',
    );
    expect(screen.getByRole('link', { name: 'Powrót do wyboru sekcji' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('does not render cta outside section home route', () => {
    render(
      <MemoryRouter initialEntries={['/kobiety/kontakt']}>
        <SectionLayout sectionLabel="Kobiety" sectionPath="/kobiety">
          <p>Zawartość</p>
        </SectionLayout>
      </MemoryRouter>,
    );

    expect(screen.queryByRole('link', { name: 'Przejdź do treści' })).not.toBeInTheDocument();
  });
});
