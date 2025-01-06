import { delay, http, HttpResponse, Path } from 'msw';
import { apiBaseUrl } from '@/shared/api/constants';
import { ICharacter, ICharactersPage } from '../model';
import { IGetCharacterDetails, getCharacterDetailsMock } from './getCharacterDetails';
import { getCharactersPageMock } from './getCharactersPage';

export const characterApiHandlers = [
  http.get<IGetCharacterDetails['params'], never, ICharacter, Path>(
    `${apiBaseUrl}/people/:id`,
    async ({ params }) => {
      const mockData = getCharacterDetailsMock({ params });

      await delay();

      return HttpResponse.json(mockData);
    },
  ),

  http.get<never, never, ICharactersPage, Path>(`${apiBaseUrl}/people`, async ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') as string;
    const search = url.searchParams.get('search') || undefined;

    const mockData = getCharactersPageMock({ query: { page, search } });

    await delay();

    return HttpResponse.json(mockData);
  }),
];
