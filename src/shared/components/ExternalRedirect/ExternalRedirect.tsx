import { useEffect } from 'react';

interface ExternalRedirectProps {
  href: string;
}

// Leaves the app for another site, replacing the current history entry the
// way <Navigate replace> does for routes inside it.
export function ExternalRedirect({ href }: ExternalRedirectProps) {
  useEffect(() => {
    window.location.replace(href);
  }, [href]);

  return null;
}
