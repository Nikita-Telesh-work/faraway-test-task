'use client';

import { styled } from '@mui/material/styles';
import { headerHeight, maxQueries } from '@/shared/styles';

export const PageWrapperStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'stretch',
  height: '100%',
});

export const PageMainStyled = styled('main')({
  flex: '1 1 auto',
  margin: '20px 40px',
  maxHeight: `calc(100dvh - 40px - ${headerHeight.default})`,
  maxWidth: '1600px',
  width: 'calc(100% - 80px)',
  [maxQueries.desktop]: {
    margin: '20px 32px',
    width: 'calc(100% - 64px)',
  },
  [maxQueries.tablet]: {
    margin: '20px',
    width: 'calc(100% - 40px)',
    maxHeight: `calc(100dvh - 40px - ${headerHeight[maxQueries.tablet]})`,
  },
  [maxQueries.phone]: {
    margin: '10px',
    maxHeight: `calc(100dvh - 20px - ${headerHeight[maxQueries.tablet]})`,
    width: 'calc(100% - 20px)',
  },
});
