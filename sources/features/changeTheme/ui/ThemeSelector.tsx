'use client';

import React from 'react';
import { ToggleButtonGroup } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Skeleton } from '@/shared/ui';
import { ThemesEnum } from '../constants';

import { ToggleButtonStyled } from './ThemeSelector.styled';
import { useThemeSelector } from './useThemeSelector';

export const ThemeSelector: React.FC = () => {
  const { mounted, theme, onChange } = useThemeSelector();

  if (!mounted) {
    return <Skeleton height="48px" width="95px" isLoading={!mounted} />;
  }

  return (
    <ToggleButtonGroup exclusive value={theme} onChange={onChange}>
      <ToggleButtonStyled aria-label="Light mode button" value={ThemesEnum.LIGHT}>
        <LightModeIcon data-testid="lightModeIcon" />
      </ToggleButtonStyled>
      <ToggleButtonStyled aria-label="Dark mode button" value={ThemesEnum.DARK}>
        <DarkModeIcon data-testid="darkModeIcon" />
      </ToggleButtonStyled>
    </ToggleButtonGroup>
  );
};
