'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useColorScheme } from '@mui/material';
import { ThemesEnum } from '../constants';

export const useThemeSelector = () => {
  const [mounted, setMounted] = useState(false);
  const { mode: theme, setMode: setTheme } = useColorScheme();

  const onChange = useCallback(
    (_: ChangeEvent<unknown>, newThemeValue: ThemesEnum | null) => {
      if (newThemeValue !== null) {
        setTheme(newThemeValue);
      }
    },
    [setTheme],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted, theme, onChange };
};
