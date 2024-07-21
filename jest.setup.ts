import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { characterApiHandlers } from '@/entities/character/api';

// Mock LocalStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    clear() {
      this.store = {};
    },
    removeItem(key) {
      delete this.store[key];
    },
    get length() {
      return Object.keys(this.store).length;
    },
    key() {
      return '';
    },
  } as Storage,
});

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const requestsHandlers = [...characterApiHandlers];

export const server = setupServer(...requestsHandlers);

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
