import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ErrorState } from './ErrorState';

afterEach(() => {
  cleanup();
});

describe('ErrorState', () => {
  it('tells the visitor the data could not be loaded', () => {
    render(<ErrorState onRetry={() => {}} />);

    expect(screen.getByRole('alert')).toHaveTextContent('Nie udało się wczytać danych');
    expect(
      screen.getByRole('region', { name: 'Nie udało się wczytać danych' }),
    ).toBeInTheDocument();
  });

  it('asks for the failed request again when the visitor tries again', async () => {
    const onRetry = vi.fn();

    render(<ErrorState onRetry={onRetry} withNavOffset={false} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Spróbuj ponownie' }));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
