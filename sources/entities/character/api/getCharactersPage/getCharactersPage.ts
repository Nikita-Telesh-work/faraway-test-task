import { apiBaseUrl } from '@/shared/api/constants';
import { ICharactersPage } from '../../model';

export interface IGetCharactersPage {
  query: {
    page: string;
    search?: string;
  };
}

export const getCharactersPage = async ({
  query: { page, search },
}: IGetCharactersPage): Promise<ICharactersPage> => {
  const res = await fetch(
    `${apiBaseUrl}/people?page=${page}${!!search ? `&search=${search}` : ''}`,
  );

  return await res.json();
};
