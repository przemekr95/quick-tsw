import '@testing-library/jest-dom/vitest';

// jsdom nie implementuje window.scrollTo — komponenty wywołują je przy zmianie trasy.
window.scrollTo = () => {};
