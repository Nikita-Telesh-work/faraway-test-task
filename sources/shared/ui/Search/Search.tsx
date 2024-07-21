import React from 'react';
import { PaperStyled, SearchIconStyled, TextFieldStyled } from './Search.styled';

export interface ISearch {
  defaultValue: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  className?: string;
}

export const Search: React.FC<ISearch> = ({ defaultValue, onChange, className }) => {
  return (
    <PaperStyled className={className}>
      <SearchIconStyled data-testid="searchIcon" fontSize="small" />
      <TextFieldStyled
        inputProps={{ ['data-testid']: 'searchInput' }}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder="Search..."
        variant="standard"
      />
    </PaperStyled>
  );
};
