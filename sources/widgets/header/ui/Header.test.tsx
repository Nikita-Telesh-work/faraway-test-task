import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests';

import { Header } from './Header';

jest.mock('@/features/changeTheme', () => ({
  ThemeSelector: () => <div data-testid="ThemeSelector" />,
}));

describe('Component: Header', () => {
  it('renders ThemeSelector', () => {
    renderWithProviders(<Header />);

    const themeSelectorComponent = screen.getByTestId('ThemeSelector');

    expect(themeSelectorComponent).toBeVisible();
  });

  it('renders passed children', () => {
    renderWithProviders(
      <Header>
        <div data-testid="childDiv" />
      </Header>,
    );

    const childDivComponent = screen.getByTestId('childDiv');

    expect(childDivComponent).toBeVisible();
  });
});
