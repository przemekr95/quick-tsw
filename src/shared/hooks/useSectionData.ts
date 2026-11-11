import { useCallback, useEffect, useRef, useState } from 'react';
import type { SectionId } from '../types/domain';

export interface SectionDataState<T> {
  data: T;
  loading: boolean;
  error: boolean;
  // Runs the request again, e.g. from the error message's retry button.
  retry: () => void;
}

interface Request {
  section: SectionId;
  id: number;
}

type LoadResult<T> = { requestId: number; ok: true; data: T } | { requestId: number; ok: false };

// Shared by the section data hooks: one service call per section, with a
// failed request reported as `error` instead of leaving the page loading.
// Every section change and retry is a new request with its own id, and only
// that request's result counts, so the page shows loading again rather than
// stale data. `initialData` should be a stable value (a module constant), since
// it is returned as `data` while loading or after an error.
export function useSectionData<T>(
  section: SectionId,
  load: (section: SectionId) => Promise<T>,
  initialData: T,
): SectionDataState<T> {
  const [request, setRequest] = useState<Request>({ section, id: 0 });
  const [result, setResult] = useState<LoadResult<T> | null>(null);
  // Only a new request triggers loading, so a caller passing a new function
  // on every render (e.g. an inline arrow) does not refetch.
  const loadRef = useRef(load);

  // Adjusting state while rendering (React's pattern for reacting to a prop
  // change): the section changed, so this is a new request.
  if (request.section !== section) {
    setRequest({ section, id: request.id + 1 });
  }

  useEffect(() => {
    loadRef.current = load;
  });

  useEffect(() => {
    let active = true;

    loadRef.current(request.section).then(
      (data) => {
        if (active) setResult({ requestId: request.id, ok: true, data });
      },
      (error: unknown) => {
        if (!active) return;
        // The page hides the failed part, so the console is the only place
        // that says which request failed and why (apiClient names it).
        console.error('Nie udało się wczytać danych sekcji:', error);
        setResult({ requestId: request.id, ok: false });
      },
    );

    return () => {
      active = false;
    };
  }, [request]);

  const retry = useCallback(() => {
    setRequest((current) => ({ ...current, id: current.id + 1 }));
  }, []);

  if (request.section !== section || result?.requestId !== request.id) {
    return { data: initialData, loading: true, error: false, retry };
  }

  return result.ok
    ? { data: result.data, loading: false, error: false, retry }
    : { data: initialData, loading: false, error: true, retry };
}
