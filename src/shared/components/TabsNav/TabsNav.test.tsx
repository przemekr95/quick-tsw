import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { TabsNav } from './TabsNav';

describe('TabsNav', () => {
  it('renders all links including external aktualnosci', () => {
    render(
      <MemoryRouter>
        <TabsNav sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Klub' })).toHaveAttribute('href', '/kobiety/klub');
    expect(screen.getByRole('link', { name: 'Drużyna' })).toHaveAttribute(
      'href',
      '/kobiety/druzyna',
    );
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute(
      'href',
      '/kobiety/kontakt',
    );
    expect(screen.getByRole('link', { name: 'Aktualności' })).toHaveAttribute('target', '_blank');
  });
});
