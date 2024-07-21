import React from 'react';
import { Header } from '@/widgets/header';
import { ICharacter } from '@/entities/character';
import { EditCharacterForm } from '@/features/editCharacter';
import { PageMainStyled, PageWrapperStyled } from '@/shared/ui';

export interface ICharacterPage {
  id: string;
  data: ICharacter;
}

export const CharacterPage: React.FC<ICharacterPage> = ({ id, data }) => {
  return (
    <PageWrapperStyled>
      <Header />

      <PageMainStyled>
        <EditCharacterForm id={id} data={data} />
      </PageMainStyled>
    </PageWrapperStyled>
  );
};
