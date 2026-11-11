import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { SectionId } from '../types/domain';
import { useSectionData } from './useSectionData';

afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
});

function silenceErrorLog() {
  return vi.spyOn(console, 'error').mockImplementation(() => {});
}

// Only one section exists today; a second id checks the switch the hook is
// built for (AGENTS.md plans bringing the women's section back).
const OTHER_SECTION = 'kobiety' as SectionId;

describe('useSectionData', () => {
  it('starts loading with the initial data and then returns the loaded data', async () => {
    const { result } = renderHook(() =>
      useSectionData('mezczyzni', async () => ['zawodnik'], [] as string[]),
    );

    expect(result.current).toMatchObject({ data: [], loading: true, error: false });

    await waitFor(() => {
      expect(result.current).toMatchObject({ data: ['zawodnik'], loading: false, error: false });
    });
  });

  it('reports and logs a failed request with the initial data instead of loading forever', async () => {
    const errorLog = silenceErrorLog();
    const { result } = renderHook(() =>
      useSectionData(
        'mezczyzni',
        async (): Promise<string[]> => {
          throw new Error('503');
        },
        [],
      ),
    );

    await waitFor(() => {
      expect(result.current).toMatchObject({ data: [], loading: false, error: true });
    });
    expect(errorLog).toHaveBeenCalledWith('Nie udało się wczytać danych sekcji:', new Error('503'));
  });

  it('loads again from scratch when asked to retry', async () => {
    silenceErrorLog();
    const load = vi
      .fn<(section: SectionId) => Promise<string>>()
      .mockRejectedValueOnce(new Error('503'))
      .mockResolvedValueOnce('dane');
    const { result } = renderHook(() => useSectionData('mezczyzni', load, 'brak'));

    await waitFor(() => {
      expect(result.current.error).toBe(true);
    });
    act(() => {
      result.current.retry();
    });

    expect(result.current).toMatchObject({ data: 'brak', loading: true, error: false });
    await waitFor(() => {
      expect(result.current).toMatchObject({ data: 'dane', loading: false, error: false });
    });
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('requests once even when the caller passes a new load function on every render', async () => {
    const load = vi.fn((section: SectionId) => Promise.resolve(section.length));
    const { result, rerender } = renderHook(() => useSectionData('mezczyzni', (s) => load(s), 0));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    rerender();
    rerender();

    expect(load).toHaveBeenCalledTimes(1);
  });

  it('shows loading again when switching back to a section whose new answer is pending', async () => {
    const answers: ((data: string) => void)[] = [];
    const load = (section: SectionId) =>
      new Promise<string>((resolve) => {
        answers.push((data) => resolve(`${section}: ${data}`));
      });
    const { result, rerender } = renderHook(
      ({ section }: { section: SectionId }) => useSectionData(section, load, 'brak'),
      { initialProps: { section: 'mezczyzni' as SectionId } },
    );

    await act(async () => {
      answers[0]('pierwsze');
    });
    expect(result.current).toMatchObject({ data: 'mezczyzni: pierwsze', loading: false });

    rerender({ section: OTHER_SECTION });
    rerender({ section: 'mezczyzni' });

    expect(result.current).toMatchObject({ data: 'brak', loading: true, error: false });
  });

  it('shows loading again on a section change and ignores the previous section’s late answer', async () => {
    const pending = new Map<SectionId, (data: string) => void>();
    const load = (section: SectionId) =>
      new Promise<string>((resolve) => {
        pending.set(section, resolve);
      });
    const { result, rerender } = renderHook(
      ({ section }: { section: SectionId }) => useSectionData(section, load, 'brak'),
      { initialProps: { section: 'mezczyzni' as SectionId } },
    );

    rerender({ section: OTHER_SECTION });
    expect(result.current).toMatchObject({ data: 'brak', loading: true, error: false });

    await act(async () => {
      pending.get(OTHER_SECTION)?.('dane kobiet');
    });
    expect(result.current).toMatchObject({ data: 'dane kobiet', loading: false, error: false });

    await act(async () => {
      pending.get('mezczyzni')?.('dane mężczyzn');
    });
    expect(result.current).toMatchObject({ data: 'dane kobiet', loading: false, error: false });
  });
});
