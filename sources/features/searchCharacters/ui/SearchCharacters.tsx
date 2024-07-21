'use client';

import React from 'react';
import { SearchStyled } from './SearchCharacters.styled';
import { useSearchCharacters } from './useSearchCharacters';

export interface ISearchCharacters {
  currentSearch: string;
}

export const SearchCharacters: React.FC<ISearchCharacters> = ({ currentSearch }) => {
  const { onChange } = useSearchCharacters();

  return <SearchStyled defaultValue={currentSearch} onChange={onChange} />;
};
