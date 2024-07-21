'use client';

import { styled } from '@mui/material/styles';
import { CharacterInfo } from '@/entities/character';
import { Pagination, PaginationProps } from '@mui/material';
import { maxQueries } from '@/shared/styles';

const gap = '8px';

export const CharactersListWrapperStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  height: '100%',
  margin: '0 auto',
});

export const CharactersListContainerStyled = styled('div')({
  flex: '0 1 auto',
  overflow: 'auto',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'wrap',
  margin: `0 -${gap} 20px 0`,
  gap,
});

export const CharacterInfoStyled = styled(CharacterInfo)({
  width: `calc(20% - ${gap})`,
  [maxQueries.middleDesktop]: {
    width: `calc(25% - ${gap})`,
  },
  [maxQueries.desktop]: {
    width: `calc(33.333% - ${gap})`,
  },
  [maxQueries.smallDesktop]: {
    width: `calc(50% - ${gap})`,
  },
  [maxQueries.phone]: {
    width: `calc(100% - ${gap})`,
    textAlign: 'center',
  },
});

export const PaginationStyled = styled(Pagination)<PaginationProps>(({ theme }) => ({
  flex: '0 0 auto',
  margin: 'auto auto 0',
  padding: '4px',
  background: `rgba(${theme.vars.palette.common.backgroundChannel} / 0.85)`,
  borderRadius: theme.vars.shape.borderRadius,
}));
