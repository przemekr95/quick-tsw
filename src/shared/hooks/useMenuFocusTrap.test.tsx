import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMenuFocusTrap } from './useMenuFocusTrap';

function setupMenuDom() {
  const menu = document.createElement('ul');
  menu.tabIndex = -1;

  const menuLink = document.createElement('a');
  menuLink.href = '/klub';
  menuLink.textContent = 'Klub';
  menu.append(menuLink);

  const button = document.createElement('button');
  button.type = 'button';

  const brand = document.createElement('a');
  brand.href = '/';
  brand.textContent = 'Brand';

  document.body.append(button, brand, menu);

  return {
    menu,
    button,
    brand,
    cleanup: () => {
      button.remove();
      brand.remove();
      menu.remove();
      document.body.style.overflow = '';
    },
  };
}

afterEach(() => {
  document.body.style.overflow = '';
});

describe('useMenuFocusTrap', () => {
  it('focuses primary element and restores overflow on unmount', () => {
    const dom = setupMenuDom();

    const { unmount } = renderHook(() =>
      useMenuFocusTrap({
        isOpen: true,
        menuRef: { current: dom.menu },
        primaryRef: { current: dom.button },
        secondaryRef: { current: dom.brand },
        onClose: vi.fn(),
      }),
    );

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.activeElement).toBe(dom.button);

    unmount();

    expect(document.body.style.overflow).toBe('');
    dom.cleanup();
  });

  it('calls onClose on Escape and restores focus to trigger', () => {
    const dom = setupMenuDom();
    const onClose = vi.fn();

    renderHook(() =>
      useMenuFocusTrap({
        isOpen: true,
        menuRef: { current: dom.menu },
        primaryRef: { current: dom.button },
        secondaryRef: { current: dom.brand },
        onClose,
      }),
    );

    dom.brand.focus();
    expect(document.activeElement).toBe(dom.brand);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(dom.button);
    dom.cleanup();
  });

  it('wraps focus on Tab and Shift+Tab boundaries', () => {
    const dom = setupMenuDom();

    renderHook(() =>
      useMenuFocusTrap({
        isOpen: true,
        menuRef: { current: dom.menu },
        primaryRef: { current: dom.button },
        secondaryRef: { current: dom.brand },
        onClose: vi.fn(),
      }),
    );

    const menuLink = dom.menu.querySelector('a');
    menuLink?.focus();
    expect(document.activeElement).toBe(menuLink);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
    expect(document.activeElement).toBe(dom.button);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true }));
    expect(document.activeElement).toBe(menuLink);

    dom.cleanup();
  });
});
