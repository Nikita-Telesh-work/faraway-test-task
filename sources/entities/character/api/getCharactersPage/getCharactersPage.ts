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
    `https://swapi.dev/api/people?page=${page}${!!search ? `&search=${search}` : ''}`,
  );

  return await res.json();
};
