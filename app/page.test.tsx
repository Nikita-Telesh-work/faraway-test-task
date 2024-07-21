import { screen } from '@testing-library/react';
import { IHomePage } from '@/pages/home';
import { renderWithProviders } from '@/shared/tests';
import { getCharactersPageMock } from '@/entities/character';

import { IAppHomePage, default as AppHomePage } from './page';

const homePageMock = jest.fn((args: IHomePage) => <div data-testid="homePage" />);
jest.mock('@/pages/home', () => ({
  HomePage: (args: IHomePage) => homePageMock(args),
}));

let mockProps: IAppHomePage;
beforeEach(() => {
  mockProps = {
    searchParams: {
      page: '1',
      search: 'Luke',
    },
  };
});

describe('Page: / (home page)', () => {
  it(`fetches characters page data and renders 'HomePage' after that with required props`, async () => {
    const HomePage = await AppHomePage(mockProps);

    renderWithProviders(HomePage);

    const homePage = screen.getByTestId('homePage');
    expect(homePage).toBeVisible();
    expect(homePageMock).toHaveBeenCalledWith({
      currentPageNumber: +(mockProps.searchParams?.page as string),
      currentSearch: mockProps.searchParams?.search,
      data: getCharactersPageMock({
        query: {
          page: mockProps.searchParams?.page as string,
          search: mockProps.searchParams?.search,
        },
      }),
    });
  });
});
