import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { PathRedirect } from './PathRedirect';

afterEach(() => {
  cleanup();
});

function CurrentLocation() {
  const { pathname, search, hash, state } = useLocation();

  return <p>{`${pathname}${search}${hash} ${JSON.stringify(state)}`}</p>;
}

describe('PathRedirect', () => {
  it('moves to the new path while keeping the query string, hash and state', () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/stary', search: '?fbclid=abc', hash: '#dane', state: 1 }]}
      >
        <Routes>
          <Route element={<PathRedirect pathname="/nowy" />} path="/stary" />
          <Route element={<CurrentLocation />} path="/nowy" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('/nowy?fbclid=abc#dane 1')).toBeInTheDocument();
  });

  it('builds the new path from the current one when given a function', () => {
    render(
      <MemoryRouter initialEntries={['/kontakt?fbclid=abc']}>
        <Routes>
          <Route
            element={<PathRedirect pathname={(current) => `/mezczyzni${current}`} />}
            path="*"
          />
          <Route element={<CurrentLocation />} path="/mezczyzni/*" />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('/mezczyzni/kontakt?fbclid=abc null')).toBeInTheDocument();
  });
});
