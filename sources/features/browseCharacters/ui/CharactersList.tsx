'use client';

import React from 'react';
import { ICharacter } from '@/entities/character';
import { NoContent, Skeleton } from '@/shared/ui';

import {
  CharacterInfoStyled,
  CharactersListWrapperStyled,
  CharactersListContainerStyled,
  PaginationStyled,
} from './CharactersList.styled';
import { useCharactersList } from './useCharactersList';
import { maxQueries } from '@/shared/styles';

export interface ICharactersList {
  currentPageNumber: number;
  pagesAmount: number;
  characters: ICharacter[];
}

export const CharactersList: React.FC<ICharactersList> = ({
  currentPageNumber,
  pagesAmount,
  characters,
}) => {
  const { mounted, isLessThanTablet, isLessThanExtraSmallPhone, onChangePagination } =
    useCharactersList();

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
        <Skeleton
          sx={{
            width: '422px',
            height: '48px',
            margin: '0 auto',
            [maxQueries.tablet]: { width: '330px' },
            [maxQueries.extraSmallPhone]: { width: '274px', height: '40px' },
          }}
          isLoading={!mounted}>
          <PaginationStyled
            data-testid="pagination"
            page={currentPageNumber}
            count={pagesAmount}
            onChange={onChangePagination}
            siblingCount={isLessThanTablet ? 0 : 1}
            size={isLessThanExtraSmallPhone ? 'medium' : 'large'}
          />
        </Skeleton>
      )}
    </CharactersListWrapperStyled>
  );
};
