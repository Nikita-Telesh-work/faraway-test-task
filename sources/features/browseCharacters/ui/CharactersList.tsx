'use client';

import React from 'react';
import { ICharacter } from '@/entities/character';
import { NoContent } from '@/shared/ui';

import {
  CharacterInfoStyled,
  CharactersListWrapperStyled,
  CharactersListContainerStyled,
  PaginationStyled,
} from './CharactersList.styled';
import { useCharactersList } from './useCharactersList';

interface ICharactersList {
  currentPageNumber: number;
  pagesAmount: number;
  characters: ICharacter[];
}

export const CharactersList: React.FC<ICharactersList> = ({
  currentPageNumber,
  pagesAmount,
  characters,
}) => {
  const { onChangePagination } = useCharactersList();

  return (
    <CharactersListWrapperStyled>
      {characters.length > 0 ? (
        <CharactersListContainerStyled>
          {characters.map((character) => (
            <CharacterInfoStyled key={character.url} info={character} />
          ))}
        </CharactersListContainerStyled>
      ) : (
        <NoContent text="Nothing found. Try to adjust search" />
      )}

      {pagesAmount > 1 && (
        <PaginationStyled
          page={currentPageNumber}
          count={pagesAmount}
          onChange={onChangePagination}
        />
      )}
    </CharactersListWrapperStyled>
  );
};
