import { renderHook, act } from '@testing-library/react';

import { useLocalStorage } from './useLocalStorage';

const testKey = 'testKey';
const testValue = 'testValue';
const defaultTestValue = 'defaultTestValue';

beforeEach(() => {
  window.localStorage.clear();
});

afterAll(() => {
  window.localStorage.clear();
});

describe('Hook: useLocalStorage', () => {
  it('returns default value if localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, defaultTestValue));

    expect(result.current[0]).toBe(defaultTestValue);
  });

  it('returns value from localStorage if available', () => {
    window.localStorage.setItem(testKey, JSON.stringify(testValue));

    const { result } = renderHook(() => useLocalStorage(testKey, defaultTestValue));

    expect(result.current[0]).toBe(testValue);
  });

  it('updates localStorage when setting value', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, defaultTestValue));

    act(() => {
      result.current[1](testValue);
    });

    expect(result.current[0]).toBe(testValue);
    expect(JSON.parse(window.localStorage.getItem(testKey) as string)).toBe(testValue);
  });

  it('updates state when localStorage changes', () => {
    const { result } = renderHook(() => useLocalStorage(testKey, defaultTestValue));

    act(() => {
      const event = new StorageEvent('storage', {
        key: testKey,
        newValue: JSON.stringify(testValue),
      });
      window.dispatchEvent(event);
    });

    expect(result.current[0]).toBe(testValue);
  });
});
