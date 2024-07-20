'use client';

import { styled } from '@mui/material/styles';
import { ISearch, Search } from '@/shared/ui';
import { maxQueries } from '@/shared/styles';

export const SearchStyled = styled(Search)<ISearch>({
  maxWidth: '500px',
  width: '100%',
  [maxQueries.smallDesktop]: {
    maxWidth: 'initial',
  },
});
