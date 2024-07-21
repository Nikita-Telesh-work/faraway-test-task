import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests';
import { getCharactersPageMock } from '@/entities/character';
import { IHeader } from '@/widgets/header';
import { ICharactersList } from '@/features/browseCharacters';
import { ISearchCharacters } from '@/features/searchCharacters';

import { IHomePage, HomePage } from './HomePage';

const mockSearchCharacters = jest.fn((args: ISearchCharacters) => (
  <div data-testid="searchCharacters" />
));
const mockCharactersList = jest.fn((args: ICharactersList) => <div data-testid="charactersList" />);

jest.mock('@/widgets/header', () => ({
  Header: ({ children }: IHeader) => <div data-testid="header">{children}</div>,
}));
jest.mock('@/features/searchCharacters', () => ({
  SearchCharacters: (args: ISearchCharacters) => mockSearchCharacters(args),
}));
jest.mock('@/features/browseCharacters', () => ({
  CharactersList: (args: ICharactersList) => mockCharactersList(args),
}));

let mockProps: IHomePage;
beforeEach(() => {
  mockProps = {
    currentPageNumber: 1,
    currentSearch: 'Luke',
    data: getCharactersPageMock({ query: { page: '1', search: 'Luke' } }),
  };
});

describe('Component: HomePage', () => {
  it(`renders 'Header' with 'SearchCharacters' as child and 'CharactersList' with according props`, () => {
    mockProps.data.count = 82;

    renderWithProviders(<HomePage {...mockProps} />);

    const header = screen.getByTestId('header');
    const searchCharacters = screen.getByTestId('searchCharacters');
    const charactersList = screen.getByTestId('charactersList');

    [header, searchCharacters, charactersList].forEach((element) => expect(element).toBeVisible());
    expect(mockSearchCharacters).toHaveBeenCalledWith({ currentSearch: mockProps.currentSearch });
    expect(mockCharactersList).toHaveBeenCalledWith({
      currentPageNumber: mockProps.currentPageNumber,
      characters: mockProps.data.results,
      pagesAmount: 9, // for mockProps.data.count (82)
    });
  });
});
