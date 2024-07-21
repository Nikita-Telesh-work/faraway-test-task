import { screen } from '@testing-library/react';
import { ICharacterPage } from '@/pages/character';
import { renderWithProviders } from '@/shared/tests';
import { getCharacterDetailsMock } from '@/entities/character';

import { IAppCharacterPage, default as AppCharacterPage } from './page';

const characterPageMock = jest.fn((args: ICharacterPage) => <div data-testid="characterPage" />);
jest.mock('@/pages/character', () => ({
  CharacterPage: (args: ICharacterPage) => characterPageMock(args),
}));

let mockProps: IAppCharacterPage;
beforeEach(() => {
  mockProps = {
    params: {
      id: '1',
    },
  };
});

describe('Page: people/[id]', () => {
  it(`fetches character details data and renders 'CharacterPage' after that with required props`, async () => {
    const CharacterPage = await AppCharacterPage(mockProps);

    renderWithProviders(CharacterPage);

    const characterPage = screen.getByTestId('characterPage');
    expect(characterPage).toBeVisible();
    expect(characterPageMock).toHaveBeenCalledWith({
      id: mockProps.params.id,
      data: getCharacterDetailsMock(mockProps),
    });
  });
});
