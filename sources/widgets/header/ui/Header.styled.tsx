'use client';

import { styled } from '@mui/material/styles';
import { headerHeight, maxQueries } from '@/shared/styles';
import { AppBar } from '@mui/material';

export const AppBarBackdropStyled = styled('div')({
  height: headerHeight.default,
  flex: `0 0 ${headerHeight.default}`,
  [maxQueries.tablet]: {
    height: headerHeight[maxQueries.tablet],
    flex: `0 0 ${headerHeight[maxQueries.tablet]}`,
  },
});

export const AppBarStyled = styled(AppBar)({
  height: '80px',
  padding: '0 40px',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '8px',
  [maxQueries.desktop]: {
    padding: '0 32px',
  },
  [maxQueries.tablet]: {
    height: '64px',
    padding: '0 20px',
  },
  [maxQueries.phone]: {
    padding: '0 10px',
  },
});
