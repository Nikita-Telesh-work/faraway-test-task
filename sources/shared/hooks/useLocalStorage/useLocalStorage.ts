import { useEffect, useState, useCallback } from 'react';

export const useLocalStorage = <T>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const valueFromLocalStorage = window.localStorage.getItem(key);

      if (valueFromLocalStorage) {
        return JSON.parse(valueFromLocalStorage);
      }

      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  const updateValue = useCallback(
    (newValue: T) => {
      try {
        setValue(newValue);
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error(`Error setting localStorage item: ${error}`);
      }
    },
    [key],
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = JSON.parse(event.newValue!) ?? defaultValue;
          setValue(newValue);
        } catch (error) {
          console.error(`Error parsing localStorage value: ${error}`);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [defaultValue, key]);

  return [value, updateValue];
};
