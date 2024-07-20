import React from 'react';
import { CharacterPage } from '@/pages/character';
import { getCharacterDetails } from '@/entities/character';

interface ICharacterPage {
  params: {
    id: string;
  };
}

export default async function Character({ params: { id } }: ICharacterPage) {
  const data = await getCharacterDetails({ id });

  return <CharacterPage id={id} data={data} />;
}
