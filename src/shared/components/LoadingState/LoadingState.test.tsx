import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('announces the label to assistive technology', () => {
    render(<LoadingState label="Ładowanie danych klubu..." />);

    const status = screen.getByRole('status');

    expect(status).toHaveTextContent('Ładowanie danych klubu...');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('shows the club crest loader in both layout variants', () => {
    const { container, rerender } = render(<LoadingState label="Ładowanie..." />);

    expect(container.querySelector('img')).toBeInTheDocument();

    rerender(<LoadingState label="Ładowanie..." withNavOffset={false} />);

    expect(within(container).getByRole('status')).toHaveTextContent('Ładowanie...');
    expect(container.querySelector('img')).toBeInTheDocument();
  });
});
