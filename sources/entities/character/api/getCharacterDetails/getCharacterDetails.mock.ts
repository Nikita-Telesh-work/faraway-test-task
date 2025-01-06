import { apiBaseUrl } from '@/shared/api/constants';
import { ICharacter } from '../../model';
import { IGetCharacterDetails } from './getCharacterDetails';

type TGetCharacterDetailsMock = (args: IGetCharacterDetails) => ICharacter;

export const getCharacterDetailsMock: TGetCharacterDetailsMock = ({ params: { id } }) => ({
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: `${apiBaseUrl}}/planets/1/`,
  films: [
    `${apiBaseUrl}/films/1/`,
    `${apiBaseUrl}/films/2/`,
    `${apiBaseUrl}/films/3/`,
    `${apiBaseUrl}/films/6/`,
  ],
  species: [],
  vehicles: [`${apiBaseUrl}/vehicles/14/`, `${apiBaseUrl}/vehicles/30/`],
  starships: [`${apiBaseUrl}/starships/12/`, `${apiBaseUrl}/starships/22/`],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: `${apiBaseUrl}/people/${id}/`,
});
