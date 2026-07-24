import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ThemeProvider } from './ThemeProvider';

describe('ThemeProvider', () => {
  it('sets data-theme attribute', () => {
    render(
      <ThemeProvider theme="kobiety">
        <span>Test</span>
      </ThemeProvider>,
    );

    expect(screen.getByText('Test').parentElement).toHaveAttribute('data-theme', 'kobiety');
  });
});
