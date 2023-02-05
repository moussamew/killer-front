import 'whatwg-fetch';
import '@testing-library/jest-dom';
import EventSource from 'eventsourcemock';
import { vi } from 'vitest';

import { server } from './server';

global.EventSource = EventSource;

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

/** Dirty hacky because Vitest can't correctly run all tests with multiple SVG */
vi.mock('@/pages/Home/Gallery.tsx', () => ({
  __esModule: true,
  Gallery: () => {
    return null;
  },
}));

/**
 * Enable API mocking before tests.
 */
beforeAll(() => server.listen());

/**
 * Reset any runtime request handlers we may add during the tests.
 */
afterEach(() => server.resetHandlers());

/**
 * Disable API mocking after the tests are done.
 */
afterAll(() => server.close());
