import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { HtmlFileRedirect } from './HtmlFileRedirect';

afterEach(() => {
  cleanup();
});

function CurrentLocation() {
  return <p>{useLocation().pathname}</p>;
}

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<HtmlFileRedirect />} path="/sekcja">
          <Route element={<CurrentLocation />} path="*" />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('HtmlFileRedirect', () => {
  it('sends a file address to the page address', () => {
    renderAt('/sekcja/druzyna.html');

    expect(screen.getByText('/sekcja/druzyna')).toBeInTheDocument();
  });

  it('renders the routes below it for any other address', () => {
    renderAt('/sekcja/druzyna');

    expect(screen.getByText('/sekcja/druzyna')).toBeInTheDocument();
  });
});
