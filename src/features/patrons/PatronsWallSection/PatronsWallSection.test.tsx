import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import type { Patron } from '../../../shared/types/domain';
import { PatronsWallSection } from './PatronsWallSection';

afterEach(() => {
  cleanup();
});

const patrons: Patron[] = [
  { name: 'Przyjaciel D', tier: 3 },
  { name: 'Mecenas A', tier: 1, message: 'Trzymamy kciuki za cały sezon!' },
  { name: 'Darczyńca B', tier: 2 },
];

function renderWall(list: Patron[] = patrons) {
  render(
    <MemoryRouter>
      <PatronsWallSection patrons={list} />
    </MemoryRouter>,
  );
}

describe('PatronsWallSection', () => {
  it('thanks supporters and says that every contribution counts', () => {
    renderWall();

    expect(
      screen.getByRole('heading', { level: 2, name: 'Przyjaciele Białej Gwiazdy' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Nie ma tu wsparcia zbyt małego/)).toBeInTheDocument();
  });

  it('groups patrons under one heading per tier, from the highest tier down', () => {
    renderWall();

    const tierHeadings = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);

    expect(tierHeadings).toEqual(['Mecenasi', 'Darczyńcy', 'Przyjaciele Klubu', 'Dołącz']);
    expect(
      within(screen.getByRole('list', { name: 'Mecenasi' })).getByText('Mecenas A'),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('list', { name: 'Przyjaciele Klubu' })).getByText('Przyjaciel D'),
    ).toBeInTheDocument();
  });

  it('shows a patron message as a quotation under their name', () => {
    renderWall();

    const message = screen.getByText('Trzymamy kciuki za cały sezon!');

    expect(message.tagName).toBe('Q');
  });

  it('omits the message when a patron left none', () => {
    renderWall([{ name: 'Solo Patron', tier: 2 }]);

    const entry = screen.getByText('Solo Patron').closest('li');

    expect(entry?.querySelector('q')).toBeNull();
  });

  it('skips tiers that have no patrons yet', () => {
    renderWall([{ name: 'Darczyńca B', tier: 2 }]);

    expect(screen.getByRole('heading', { name: 'Darczyńcy' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Mecenasi' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Przyjaciele Klubu' })).not.toBeInTheDocument();
  });

  it('shows an empty state when nobody is listed yet', () => {
    renderWall([]);

    expect(screen.getByText(/Lista dopiero powstaje/)).toBeInTheDocument();
  });

  it('invites anyone to join and links to the contact tab', () => {
    renderWall();

    expect(screen.getByText(/Dołączyć może każdy/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Napisz do nas/ })).toHaveAttribute('href', '/kontakt');
  });
});
