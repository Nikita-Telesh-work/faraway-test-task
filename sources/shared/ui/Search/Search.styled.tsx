'use client';

import { styled } from '@mui/material/styles';
import { IconProps, Paper, PaperProps, TextField, TextFieldProps } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '8px',
  borderRadius: `calc(${theme.vars.shape.borderRadius} * 4)`,
  background: `rgba(${theme.vars.palette.common.backgroundChannel} / 0.85)`,
}));

export const SearchIconStyled = styled(SearchIcon)<IconProps>({
  marginRight: '4px',
});

export const TextFieldStyled = styled(TextField)<TextFieldProps>({
  width: '100%',
});
