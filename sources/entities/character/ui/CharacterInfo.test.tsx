import { NextRouter } from 'next/router';
import { screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMockRouter, renderWithProviders } from '@/shared/tests';
import { getCharacterDetailsMock } from '@/entities/character';

import { ICharacterInfo, CharacterInfo } from './CharacterInfo';

let mockRouter: NextRouter;
let mockCharacterId: string;
let mockProps: ICharacterInfo;
let mockRaws: Array<{ title: string; value: string }>;
beforeEach(() => {
  mockCharacterId = '1';
  mockRouter = createMockRouter();
  mockProps = {
    info: getCharacterDetailsMock({ params: { id: mockCharacterId } }),
    className: 'testClassName',
  };
  mockRaws = [
    { title: 'Height:', value: mockProps.info.height },
    { title: 'Mass:', value: mockProps.info.mass },
    { title: 'Hair color:', value: mockProps.info.hair_color },
    { title: 'Skin color:', value: mockProps.info.skin_color },
    { title: 'Eye color:', value: mockProps.info.eye_color },
    { title: 'Birth year:', value: mockProps.info.birth_year },
    { title: 'Gender:', value: mockProps.info.gender },
  ];
});

describe('Component: CharacterInfo', () => {
  it('renders all elements', () => {
    renderWithProviders(<CharacterInfo {...mockProps} />);

    const link = screen.getByRole('link', {
      name: `Click to edit ${mockProps.info.name} character details`,
    });
    const linkIcon = within(link).getByTestId('editCharacterIcon');
    const title = screen.getByRole('heading', { level: 4, name: mockProps.info.name });

    [link, linkIcon, title].forEach((element) => expect(element).toBeVisible());

    mockRaws.forEach((raw) => {
      const title = screen.getByText(raw.title);
      const value = screen.getByText(raw.value);

      [title, value].forEach((element) => {
        expect(element).toBeVisible();
      });
    });
  });

  it(`prefers localStorage data instead of provided data`, async () => {
    const heightInLocalStorage = '12345';

    window.localStorage.setItem(
      mockCharacterId,
      JSON.stringify({
        ...mockProps.info,
        height: heightInLocalStorage,
      }),
    );

    renderWithProviders(<CharacterInfo {...mockProps} />);

    const valueFromMock = screen.queryByText(mockProps.info.height);
    const valueFromStorage = screen.getByText(heightInLocalStorage);

    expect(valueFromMock).not.toBeInTheDocument();
    expect(valueFromStorage).toBeVisible();

    window.localStorage.clear();
  });

  it(`navigates to 'CharacterPage' after click on edit icon`, async () => {
    const user = userEvent.setup();

    renderWithProviders(<CharacterInfo {...mockProps} />, { router: mockRouter });

    const editCharacterIcon = screen.getByTestId('editCharacterIcon');

    await user.click(editCharacterIcon);

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith(
      `/people/${mockCharacterId}`,
      `/people/${mockCharacterId}`,
      expect.objectContaining({
        locale: undefined,
        scroll: true,
        shallow: undefined,
      }),
    );
  });
});
