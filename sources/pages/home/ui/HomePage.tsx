import React from 'react';
import { Header } from '@/widgets/header';
import { ICharactersPage } from '@/entities/character';
import { CharactersList } from '@/features/browseCharacters';
import { SearchCharacters } from '@/features/searchCharacters';
import { PageMainStyled, PageWrapperStyled } from '@/shared/ui';

export interface IHomePage {
  currentPageNumber: number;
  currentSearch: string;
  data: ICharactersPage;
}

export const HomePage: React.FC<IHomePage> = ({
  currentPageNumber,
  currentSearch,
  data: { count, results },
}) => {
  const pagesAmount = Math.ceil(count / 10);

  return (
    <PageWrapperStyled>
      <Header>
        <SearchCharacters currentSearch={currentSearch} />
      </Header>

      <PageMainStyled>
        <CharactersList
          currentPageNumber={currentPageNumber}
          pagesAmount={pagesAmount}
          characters={results}
        />
      </PageMainStyled>
    </PageWrapperStyled>
  );
};
