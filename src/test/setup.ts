import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';
import club from '../data/mocks/club.mezczyzni.json';
import clubLanding from '../data/mocks/club-landing.mezczyzni.json';
import contact from '../data/mocks/contact.mezczyzni.json';
import matches from '../data/mocks/matches.mezczyzni.json';
import partnership from '../data/mocks/partnership.mezczyzni.json';
import patrons from '../data/mocks/patrons.mezczyzni.json';
import staff from '../data/mocks/staff.mezczyzni.json';
import standings from '../data/mocks/standings.mezczyzni.json';
import players from '../data/mocks/team.mezczyzni.json';

window.scrollTo = () => {};

const apiFixtures: Record<string, unknown> = {
  club,
  'club-landing': clubLanding,
  contact,
  matches,
  partnership,
  patrons,
  players,
  staff,
  standings,
};

vi.stubGlobal(
  'fetch',
  vi.fn(async (input: RequestInfo | URL) => {
    const requestUrl = input instanceof Request ? input.url : input.toString();
    const key = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname.split('/').pop() ?? '');
    const data = apiFixtures[key];
    const status = data === undefined ? 404 : 200;

    return {
      ok: status === 200,
      status,
      json: async () => data,
    } as Response;
  }),
);

beforeEach(() => {
  vi.clearAllMocks();
});
