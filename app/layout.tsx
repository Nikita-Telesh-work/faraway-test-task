import React from 'react';
import type { Metadata } from 'next';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { DEFAULT_THEME_MODE } from '@/features/changeTheme';
import { theme } from '@/app/theme';
import '@/app/styles/index.css';

export const metadata: Metadata = {
  title: 'StarWarsChar',
  description: 'App for getting information about Star Wars characters',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InitColorSchemeScript defaultMode={DEFAULT_THEME_MODE} />
        <AppRouterCacheProvider>
          <CssVarsProvider defaultMode={DEFAULT_THEME_MODE} theme={theme}>
            {children}
          </CssVarsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
