import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { NavBar } from './NavBar';

afterEach(() => {
  cleanup();
});

describe('NavBar', () => {
  it('renders links and external aktualnosci', () => {
    render(
      <MemoryRouter>
        <NavBar sectionLabel="Kobiety" sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Klub' })).toHaveAttribute('href', '/kobiety/klub');
    expect(screen.getByRole('link', { name: 'Drużyna' })).toHaveAttribute('href', '/kobiety/druzyna');
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute('href', '/kobiety/kontakt');
    expect(screen.getByRole('link', { name: 'Aktualności na Facebooku' })).toHaveAttribute(
      'target',
      '_blank',
    );

    expect(screen.getAllByRole('link')[1]).toHaveAccessibleName('Aktualności na Facebooku');
  });

  it('marks active tab link', () => {
    render(
      <MemoryRouter initialEntries={['/kobiety/klub']}>
        <NavBar sectionLabel="Kobiety" sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Klub' })).toHaveAttribute('aria-current', 'page');
  });

  it('toggles mobile menu', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NavBar sectionLabel="Kobiety" sectionPath="/kobiety" />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: 'Przełącz menu nawigacyjne' });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});
