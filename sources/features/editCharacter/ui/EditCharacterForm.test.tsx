import { NextRouter } from 'next/router';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getCharacterDetailsMock } from '@/entities/character';
import { createMockRouter, renderWithProviders } from '@/shared/tests';

import { EditCharacterForm, IEditCharacterForm } from './EditCharacterForm';
import { fieldsMap } from './constants';

let mockCharacterId: string;
let mockRouter: NextRouter;
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

let mockProps: IEditCharacterForm;
beforeEach(() => {
  mockRouter = createMockRouter();
  mockCharacterId = '1';
  mockProps = {
    id: mockCharacterId,
    data: getCharacterDetailsMock({ params: { id: mockCharacterId } }),
  };
});

describe('Component: EditCharacterForm', () => {
  it('renders main form elements with provided data as default values', () => {
    renderWithProviders(<EditCharacterForm {...mockProps} />, { router: mockRouter });

    const title = screen.getByRole('heading', { level: 2, name: mockProps.data.name });
    const exitButton = screen.getByRole('button', { name: 'Exit' });
    const saveButton = screen.getByRole('button', { name: 'Save' });

    [title, exitButton, saveButton].forEach((element) => expect(element).toBeVisible());

    fieldsMap.forEach(({ name, label }) => {
      const field = screen.getByLabelText(label);

      expect(field).toBeVisible();
      expect(field).toHaveDisplayValue(mockProps.data[name]);
    });
  });

  it(`prefers localStorage data instead of provided data`, () => {
    const heightInLocalStorage = '12345';

    window.localStorage.setItem(
      mockCharacterId,
      JSON.stringify({
        ...mockProps.data,
        height: heightInLocalStorage,
      }),
    );

    renderWithProviders(<EditCharacterForm {...mockProps} />, { router: mockRouter });

    const fieldWithValueFromMock = screen.queryByDisplayValue(mockProps.data.height);
    const fieldWithValueFromStorage = screen.getByDisplayValue(heightInLocalStorage);

    expect(fieldWithValueFromMock).not.toBeInTheDocument();
    expect(fieldWithValueFromStorage).toBeVisible();

    window.localStorage.clear();
  });

  it(`types new height, saves it to storage and shows successful toast`, async () => {
    const user = userEvent.setup();
    mockProps.data.height = 'oldHeight';
    const heightFromUserInput = 'heightFromUserInput';

    renderWithProviders(<EditCharacterForm {...mockProps} />, { router: mockRouter });

    const heightField = screen.getByDisplayValue(mockProps.data.height);
    const saveButton = screen.getByTestId('saveButton');

    await user.clear(heightField);
    await user.type(heightField, heightFromUserInput);
    await user.click(saveButton);

    const successfulToast = screen.getByText('Changes were saved!');
    expect(successfulToast).toBeVisible();

    const storageData = JSON.parse(window.localStorage.getItem(mockCharacterId) as string);
    expect(heightField).toHaveDisplayValue(heightFromUserInput);
    expect(storageData.height).toEqual(heightFromUserInput);

    window.localStorage.clear();
  });

  it(`redirects to prev page on clicking exit`, async () => {
    const user = userEvent.setup();

    renderWithProviders(<EditCharacterForm {...mockProps} />, { router: mockRouter });

    const exitButton = screen.getByTestId('exitButton');

    await user.click(exitButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it(`disables save button if input is invalid and show error clue, enables and hides clue if valid again`, async () => {
    const testValidInput = '12345';
    const user = userEvent.setup();

    renderWithProviders(<EditCharacterForm {...mockProps} />, { router: mockRouter });

    const heightField = screen.getByDisplayValue(mockProps.data.height);
    const saveButton = screen.getByTestId('saveButton');

    await user.clear(heightField);

    const errorClue = screen.getByText('Type something to save!');

    expect(errorClue).toBeVisible();
    expect(saveButton).toBeDisabled();

    await user.type(heightField, testValidInput);

    expect(errorClue).not.toBeInTheDocument();
    expect(saveButton).toBeEnabled();
  });
});
