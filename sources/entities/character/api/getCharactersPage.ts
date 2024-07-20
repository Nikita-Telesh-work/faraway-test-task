import { ICharactersPage } from '../model';

interface IGetCharactersPage {
  page: string;
  search?: string;
}

export const getCharactersPage = async ({
  page,
  search,
}: IGetCharactersPage): Promise<ICharactersPage> => {
  const res = await fetch(
    `https://swapi.dev/api/people?page=${page}${!!search ? `&search=${search}` : ''}`,
  );

  return await res.json();
};
