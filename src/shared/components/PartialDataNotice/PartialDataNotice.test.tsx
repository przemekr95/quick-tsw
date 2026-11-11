import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PartialDataNotice } from './PartialDataNotice';

afterEach(() => {
  cleanup();
});

describe('PartialDataNotice', () => {
  it('says what is missing and lets the visitor try again', async () => {
    const onRetry = vi.fn();

    render(<PartialDataNotice message="Nie udało się wczytać tabeli ligowej." onRetry={onRetry} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Spróbuj ponownie' }));

    expect(screen.getByRole('alert')).toHaveTextContent('Nie udało się wczytać tabeli ligowej.');
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
