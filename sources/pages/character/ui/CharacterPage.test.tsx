import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/shared/tests';
import { getCharacterDetailsMock } from '@/entities/character';
import { IHeader } from '@/widgets/header';
import { IEditCharacterForm } from '@/features/editCharacter';

import { ICharacterPage, CharacterPage } from './CharacterPage';

const mockEditCharacterForm = jest.fn((args: IEditCharacterForm) => (
  <div data-testid="editCharacterForm" />
));

jest.mock('@/widgets/header', () => ({
  Header: (args: IHeader) => <div data-testid="header" />,
}));
jest.mock('@/features/editCharacter', () => ({
  EditCharacterForm: (args: IEditCharacterForm) => mockEditCharacterForm(args),
}));

let mockProps: ICharacterPage;
beforeEach(() => {
  mockProps = {
    id: 'testId',
    data: getCharacterDetailsMock({ params: { id: '1' } }),
  };
});

describe('Component: CharacterPage', () => {
  it(`renders 'Header' and 'EditCharacterForm' with according props`, () => {
    renderWithProviders(<CharacterPage {...mockProps} />);

    const header = screen.getByTestId('header');
    const editCharacterForm = screen.getByTestId('editCharacterForm');

    [header, editCharacterForm].forEach((element) => expect(element).toBeVisible());
    expect(mockEditCharacterForm).toHaveBeenCalledWith(mockProps);
  });
});
