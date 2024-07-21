'use client';

import { styled } from '@mui/material/styles';
import { Paper, PaperProps, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '40px',
  width: 'auto',
  margin: 'auto',
  borderRadius: `calc(${theme.vars.shape.borderRadius} * 2)`,
  background: `rgba(${theme.vars.palette.common.backgroundChannel} / 0.9)`,
}));

export const SearchOffIconStyled = styled(SearchOffIcon)<PaperProps>({
  width: '100px',
  height: '100px',
});

export const TextStyled = styled(Typography)<PaperProps>({
  marginTop: '20px',
});
