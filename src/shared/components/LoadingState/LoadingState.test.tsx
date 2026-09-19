import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('announces the label to assistive technology', () => {
    render(<LoadingState label="Ładowanie danych klubu..." />);

    const status = screen.getByRole('status');

    expect(status).toHaveTextContent('Ładowanie danych klubu...');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });
});
