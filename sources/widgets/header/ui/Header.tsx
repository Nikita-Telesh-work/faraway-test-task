import React from 'react';
import { ThemeSelector } from '@/features/changeTheme';
import { AppBarBackdropStyled, AppBarStyled } from './Header.styled';

interface IHeader {
  children?: React.ReactNode;
}

export const Header: React.FC<IHeader> = ({ children }) => {
  return (
    <>
      <AppBarBackdropStyled />
      <AppBarStyled>
        <ThemeSelector />
        {children}
      </AppBarStyled>
    </>
  );
};
