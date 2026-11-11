import { Navigate, useLocation } from 'react-router-dom';

interface PathRedirectProps {
  // Only the pathname changes; a function gets the current one, e.g. to move
  // it under a prefix.
  pathname: string | ((current: string) => string);
}

// <Navigate replace> drops the query string and hash, which would lose
// tracking parameters (?fbclid=, ?utm_…) on links shared before a move.
export function PathRedirect({ pathname }: PathRedirectProps) {
  const location = useLocation();
  const target = typeof pathname === 'function' ? pathname(location.pathname) : pathname;

  return (
    <Navigate
      replace
      state={location.state}
      to={{ pathname: target, search: location.search, hash: location.hash }}
    />
  );
}
