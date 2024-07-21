import { NextRouter } from 'next/router';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockRouter, renderWithProviders } from '@/shared/tests';
import { ISearchCharacters, SearchCharacters } from '@/features/searchCharacters';

let mockRouter: NextRouter;
let mockPathName: string;
let mockSearchParams: Record<string, string>;
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathName,
  useSearchParams: () => mockSearchParams,
}));

let mockProps: ISearchCharacters;
beforeEach(() => {
  mockRouter = createMockRouter();
  mockPathName = '/';
  mockSearchParams = {};
  mockProps = {
    currentSearch: '',
  };
});

describe('Component: SearchCharacters', () => {
  it('renders search with default value', () => {
    mockProps.currentSearch = 'testSearch';

    renderWithProviders(<SearchCharacters {...mockProps} />, { router: mockRouter });

    const searchField = screen.getByDisplayValue(mockProps.currentSearch);
    expect(searchField).toBeVisible();
  });

  it(`changes route 'search' query and resets 'page' query to '1' on search with debounce`, async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    renderWithProviders(<SearchCharacters {...mockProps} />, { router: mockRouter });

    const searchField = screen.getByTestId('searchInput');

    await user.type(searchField, 'Luke');

    jest.runOnlyPendingTimers();

    // Should be called 1 times (not 4 times) cause of 'debounce' optimisation
    expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    expect(mockRouter.replace).toHaveBeenCalledWith(`${mockPathName}?search=Luke&page=1`);

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it(`deletes 'search' from query (but doesn't resets other queries) if user clears search field`, async () => {
    jest.useFakeTimers();

    mockProps.currentSearch = 'testSearch';
    mockSearchParams = {
      page: '1',
    };
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    renderWithProviders(<SearchCharacters {...mockProps} />, { router: mockRouter });

    const searchField = screen.getByTestId('searchInput');

    await user.clear(searchField);

    jest.runOnlyPendingTimers();

    // Should be called 1 times (not 4 times) cause of 'debounce' optimisation
    expect(mockRouter.replace).toHaveBeenCalledTimes(1);
    expect(mockRouter.replace).toHaveBeenCalledWith(
      `${mockPathName}?page=${mockSearchParams.page}`,
    );

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
