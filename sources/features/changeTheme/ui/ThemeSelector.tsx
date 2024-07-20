'use client';

import React from 'react';
import { ToggleButtonGroup } from '@mui/material';
import { Skeleton } from '@/shared/ui';
import { ThemesEnum } from '../constants';

import { ToggleButtonStyled } from './ThemeSelector.styled';
import { useThemeSelector } from './useThemeSelector';

export const ThemeSelector: React.FC = () => {
  const { mounted, theme, onChange } = useThemeSelector();

  return (
    <Skeleton isLoading={!mounted}>
      <ToggleButtonGroup value={theme} exclusive onChange={onChange} aria-label="Platform">
        <ToggleButtonStyled value={ThemesEnum.LIGHT}>Light</ToggleButtonStyled>
        <ToggleButtonStyled value={ThemesEnum.DARK}>Dark</ToggleButtonStyled>
      </ToggleButtonGroup>
    </Skeleton>
  );
};
