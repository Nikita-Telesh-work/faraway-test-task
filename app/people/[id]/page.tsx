import React from 'react';
import { CharacterPage } from '@/pages/character';
import { getCharacterDetails } from '@/entities/character';

export interface IAppCharacterPage {
  params: {
    id: string;
  };
}

export default async function AppCharacterPage({ params: { id } }: IAppCharacterPage) {
  const data = await getCharacterDetails({ params: { id } });

  return <CharacterPage id={id} data={data} />;
}
