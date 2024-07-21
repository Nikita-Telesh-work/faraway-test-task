import { NextRouter } from 'next/router';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockRouter, renderWithProviders } from '@/shared/tests';
import { CharactersList, ICharactersList } from '@/features/browseCharacters';
import { ICharacterInfo, getCharactersPageMock } from '@/entities/character';

let mockRouter: NextRouter;
let mockPathName: string;
let mockSearchParams: Record<string, string>;
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathName,
  useSearchParams: () => mockSearchParams,
}));
let mockCharacterInfo = jest.fn((args: ICharacterInfo) => <div data-testid="characterInfo" />);
jest.mock('@/entities/character', () => ({
  ...jest.requireActual('@/entities/character'),
  CharacterInfo: (args: ICharacterInfo) => mockCharacterInfo(args),
}));

let mockProps: ICharactersList;
beforeEach(() => {
  mockCharacterInfo.mockClear();
  mockRouter = createMockRouter();
  mockPathName = '/';
  mockSearchParams = {};
  mockProps = {
    currentPageNumber: 1,
    pagesAmount: 9,
    characters: getCharactersPageMock({ query: { page: '1' } }).results,
  };
});

describe('Component: CharactersList', () => {
  it(`renders 'NoContent' if no characters provided`, () => {
    mockProps.characters = [];

    renderWithProviders(<CharactersList {...mockProps} />, { router: mockRouter });

    const noContent = screen.getByText('Nothing found. Try to adjust search');
    expect(noContent).toBeVisible();
  });

  it.each`
    rendersOrNot        | pagesAmount
    ${'renders'}        | ${1}
    ${`doesn't render`} | ${9}
  `(`$rendersOrNot 'Pagination' if pagesAmount === $pagesAmount`, ({ pagesAmount }) => {
    mockProps.pagesAmount = pagesAmount;

    renderWithProviders(<CharactersList {...mockProps} />, { router: mockRouter });

    const pagination = screen.queryByTestId('pagination');
    pagesAmount > 1 ? expect(pagination).toBeVisible() : expect(pagination).not.toBeInTheDocument();
  });

  it(`navigates to next page when click navigation without loosing prev query (except page)`, async () => {
    const user = userEvent.setup();
    mockPathName = '/';
    mockSearchParams = {
      testPrevQuery: 'testPrevQuery',
      page: '1',
    };

    renderWithProviders(<CharactersList {...mockProps} />, { router: mockRouter });

    const pagination = screen.getByTestId('pagination');
    const secondPagePaginationItem = within(pagination).getByRole('button', {
      name: 'Go to page 2',
    });

    await user.click(secondPagePaginationItem);

    expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    expect(mockRouter.replace).toHaveBeenCalledWith(
      `${mockPathName}?${mockSearchParams.testPrevQuery}=${mockSearchParams.testPrevQuery}&page=2`,
    );
  });

  it(`renders component 'CharacterInfoStyled' for every character`, () => {
    mockProps.characters = getCharactersPageMock({ query: { page: '1' } }).results;

    renderWithProviders(<CharactersList {...mockProps} />, { router: mockRouter });

    mockProps.characters.forEach((character, index) => {
      expect(mockCharacterInfo).toHaveBeenNthCalledWith(
        index + 1,
        expect.objectContaining({
          info: character,
        }),
      );
    });
    expect(mockCharacterInfo.mock.calls.length).not.toBeLessThan(mockProps.characters.length);
  });
});
