import { ICharacter } from '../../model';

export interface IGetCharacterDetails {
  params: {
    id: string;
  };
}

export const getCharacterDetails = async ({
  params: { id },
}: IGetCharacterDetails): Promise<ICharacter> => {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);

  return await res.json();
};
