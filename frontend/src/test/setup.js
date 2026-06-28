import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// jsdom has no layout engine, so it never implements ResizeObserver. Stage.jsx
// (wrapped around every quiz/loading screen) observes its own size on mount.
globalThis.ResizeObserver =
  globalThis.ResizeObserver ||
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

afterEach(() => {
  cleanup();
});
