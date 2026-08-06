import { useEffect } from 'react';
import type { RefObject } from 'react';

const DEFAULT_FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseMenuFocusTrapOptions {
  isOpen: boolean;
  menuRef: RefObject<HTMLElement | null>;
  primaryRef: RefObject<HTMLElement | null>;
  secondaryRef?: RefObject<HTMLElement | null>;
  onClose: () => void;
  focusableSelector?: string;
}

export function useMenuFocusTrap({
  isOpen,
  menuRef,
  primaryRef,
  secondaryRef,
  onClose,
  focusableSelector = DEFAULT_FOCUSABLE_SELECTOR,
}: UseMenuFocusTrapOptions): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusableElements = () => {
      const menuItems = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => !element.hasAttribute('disabled') && element.tabIndex !== -1);

      return [primaryRef.current, secondaryRef?.current, ...menuItems].filter(
        (element): element is HTMLElement => Boolean(element),
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) {
        return;
      }

      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        event.preventDefault();
        menuRef.current.focus();
        return;
      }

      const activeElement = document.activeElement as HTMLElement | null;
      const currentIndex = activeElement ? focusableElements.indexOf(activeElement) : -1;

      if (currentIndex === -1) {
        event.preventDefault();
        focusableElements[0]?.focus();
        return;
      }

      const nextIndex = event.shiftKey ? currentIndex - 1 : currentIndex + 1;
      const nextElement = focusableElements[nextIndex];

      if (!nextElement) {
        event.preventDefault();
        focusableElements[event.shiftKey ? focusableElements.length - 1 : 0]?.focus();
        return;
      }

      event.preventDefault();
      nextElement.focus();
    };

    document.addEventListener('keydown', handleKeyDown);

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusableSelector, isOpen, menuRef, onClose, primaryRef, secondaryRef]);
}