import { ICharacter } from '../model';

interface IGetCharacterDetails {
  id: string;
}

export const getCharacterDetails = async ({ id }: IGetCharacterDetails): Promise<ICharacter> => {
  const res = await fetch(`https://swapi.dev/api/people/${id}`);

  return await res.json();
};
