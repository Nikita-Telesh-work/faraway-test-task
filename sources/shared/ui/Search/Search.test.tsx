import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/shared/tests';

import { ISearch, Search } from './Search';

let mockProps: ISearch;
beforeEach(() => {
  mockProps = {
    defaultValue: '',
    onChange: jest.fn(),
  };
});

describe('Component: Search', () => {
  it('renders search icon & field with placeholder', () => {
    renderWithProviders(<Search {...mockProps} />);

    const searchIcon = screen.getByTestId('searchIcon');
    const searchField = screen.getByPlaceholderText('Search...');

    [searchIcon, searchField].forEach((element) => expect(element).toBeVisible());
  });

  it(`accepts default value`, () => {
    mockProps.defaultValue = 'testDefaultValue';

    renderWithProviders(<Search {...mockProps} />);

    const searchField = screen.getByDisplayValue(mockProps.defaultValue);

    expect(searchField).toBeVisible();
  });

  it(`changes field value when user types and invokes 'onChange' function`, async () => {
    const user = userEvent.setup();

    renderWithProviders(<Search {...mockProps} />);

    const searchField = screen.getByTestId('searchInput');

    await user.type(searchField, 'testNewValue');

    expect(searchField).toHaveDisplayValue('testNewValue');
  });
});
