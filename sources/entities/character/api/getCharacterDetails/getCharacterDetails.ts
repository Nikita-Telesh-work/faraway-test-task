import { apiBaseUrl } from '@/shared/api/constants';
import { ICharacter } from '../../model';

export interface IGetCharacterDetails {
  params: {
    id: string;
  };
}

export const getCharacterDetails = async ({
  params: { id },
}: IGetCharacterDetails): Promise<ICharacter> => {
  const res = await fetch(`${apiBaseUrl}/people/${id}`);

  return await res.json();
};
