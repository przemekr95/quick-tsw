import type { PropsWithChildren } from 'react';
import type { SectionId } from '../../shared/types/domain';

interface ThemeProviderProps extends PropsWithChildren {
  theme: SectionId;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <div data-theme={theme}>{children}</div>;
}
