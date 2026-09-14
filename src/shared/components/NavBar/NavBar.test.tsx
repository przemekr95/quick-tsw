import { cleanup, render, screen, within } from '@testing-library/react';
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
        <NavBar sectionPath="" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' })).toHaveAttribute(
      'href',
      '/klub',
    );
    expect(screen.getByRole('link', { name: 'Klub' })).toHaveAttribute('href', '/klub');
    expect(screen.getByRole('link', { name: 'Drużyna' })).toHaveAttribute(
      'href',
      '/druzyna',
    );
    expect(screen.getByRole('link', { name: 'Kontakt' })).toHaveAttribute(
      'href',
      '/kontakt',
    );
    expect(screen.getByRole('link', { name: 'Aktualności na Facebooku' })).toHaveAttribute(
      'target',
      '_blank',
    );

    expect(screen.getByRole('link', { name: 'Aktualności na Facebooku' })).toHaveAccessibleName(
      'Aktualności na Facebooku',
    );
  });

  it('marks active tab link', () => {
    render(
      <MemoryRouter initialEntries={['/klub']}>
        <NavBar sectionPath="" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Klub' })).toHaveAttribute('aria-current', 'page');
  });

  it('toggles mobile menu', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NavBar sectionPath="" />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: 'Otwórz menu' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('data-state', 'closed');

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('data-state', 'open');
    expect(button).toHaveAttribute('aria-label', 'Zamknij menu');
    expect(
      screen.getByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' }),
    ).toBeInTheDocument();
  });

  it('keeps keyboard focus order consistent in the open menu', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <NavBar sectionPath="" />
      </MemoryRouter>,
    );

    const button = screen.getByRole('button', { name: 'Otwórz menu' });
    await user.click(button);

    expect(button).toHaveFocus();

    await user.tab();

    expect(screen.getByRole('link', { name: 'Towarzystwo Sportowe Wisła Kraków' })).toHaveFocus();

    await user.tab();

    const dialog = screen.getByRole('dialog', { name: 'Menu nawigacyjne' });
    const menuList = within(dialog).getByRole('list');

    expect(within(menuList).getByRole('link', { name: 'Aktualności na Facebooku' })).toHaveFocus();
  });

  it('lists Aktualności before the section tabs in the desktop nav', () => {
    render(
      <MemoryRouter>
        <NavBar sectionPath="" />
      </MemoryRouter>,
    );

    const nav = screen.getByRole('navigation', { name: 'Nawigacja' });
    const links = within(nav).getAllByRole('link');

    expect(links[0]).toHaveAccessibleName('Towarzystwo Sportowe Wisła Kraków');
    expect(links[1]).toHaveAccessibleName('Aktualności na Facebooku');
  });
});
