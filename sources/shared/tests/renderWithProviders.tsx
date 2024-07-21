import { NextRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { theme } from '@/app/theme';
import { DEFAULT_THEME_MODE } from '@/features/changeTheme';

type ExtendedRenderOptions = RenderOptions & {
  router?: NextRouter;
};

export const renderWithProviders = (
  ui: React.ReactElement,
  { router, ...renderOptions }: ExtendedRenderOptions = {},
) => {
  const BaseProviders: React.FC<PropsWithChildren> = ({ children }) => (
    <CssVarsProvider defaultMode={DEFAULT_THEME_MODE} theme={theme}>
      {children}
    </CssVarsProvider>
  );

  const WithRouterProvider: React.FC<PropsWithChildren<{ router: NextRouter }>> = ({
    router,
    children,
  }) => {
    return (
      <RouterContext.Provider value={router}>
        <BaseProviders>{children}</BaseProviders>
      </RouterContext.Provider>
    );
  };

  const Wrapper: React.FC<PropsWithChildren> = ({ children }) => {
    if (router) {
      return <WithRouterProvider router={router} children={children} />;
    }

    return <BaseProviders children={children} />;
  };

  return { wrapper: Wrapper, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
