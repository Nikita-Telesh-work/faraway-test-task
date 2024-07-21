import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests';

import { NoContent } from './NoContent';

const testText = 'testText';

describe('Component: NoContent', () => {
  it('renders main elements', () => {
    renderWithProviders(<NoContent text={testText} />);

    const icon = screen.getByTestId('searchIcon');
    const text = screen.getByText(testText);

    [icon, text].forEach((element) => expect(element).toBeVisible());
  });
});
