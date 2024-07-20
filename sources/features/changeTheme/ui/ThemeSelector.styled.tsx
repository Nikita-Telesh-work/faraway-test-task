'use client';

import { styled } from '@mui/material/styles';
import { ToggleButton, ToggleButtonProps } from '@mui/material';

export const ToggleButtonStyled = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  color: theme.vars.palette.info.contrastText,
  background: theme.vars.palette.info.light,
  '&:hover': {
    background: theme.vars.palette.info.main,
  },
  '&.Mui-selected': {
    color: theme.vars.palette.success.contrastText,
    background: theme.vars.palette.success.light,
    '&:hover': {
      background: theme.vars.palette.success.main,
    },
  },
}));
