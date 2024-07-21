import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/shared/tests';
import { ThemeSelector } from '@/features/changeTheme';

describe('Component: ThemeSelector', () => {
  it('renders 2 buttons (light/dark)', () => {
    renderWithProviders(<ThemeSelector />);

    const lightModeButton = screen.getByRole('button', { name: 'Light mode button' });
    const lightModeIcon = within(lightModeButton).getByTestId('lightModeIcon');
    const darkModeButton = screen.getByRole('button', { name: 'Dark mode button' });
    const darkModeIcon = within(darkModeButton).getByTestId('darkModeIcon');

    [lightModeButton, lightModeIcon, darkModeButton, darkModeIcon].forEach((element) =>
      expect(element).toBeVisible(),
    );
  });

  it('uses dark theme as default', () => {
    renderWithProviders(<ThemeSelector />);

    const lightModeButton = screen.getByRole('button', { name: 'Light mode button' });
    const darkModeButton = screen.getByRole('button', { name: 'Dark mode button' });

    expect(lightModeButton).toHaveAttribute('aria-pressed', 'false');
    expect(darkModeButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('changes theme mode after clicking according button', async () => {
    const user = userEvent.setup();

    renderWithProviders(<ThemeSelector />);

    const lightModeButton = screen.getByRole('button', { name: 'Light mode button' });
    const darkModeButton = screen.getByRole('button', { name: 'Dark mode button' });

    await user.click(lightModeButton);

    expect(lightModeButton).toHaveAttribute('aria-pressed', 'true');
    expect(darkModeButton).toHaveAttribute('aria-pressed', 'false');
  });
});
