import React from 'react';
import { PaperStyled, SearchIconStyled, TextFieldStyled } from './Search.styled';

export interface ISearch {
  defaultValue: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  placeholder: string;
  className?: string;
}

export const Search: React.FC<ISearch> = ({ defaultValue, onChange, placeholder, className }) => {
  return (
    <PaperStyled className={className}>
      <SearchIconStyled fontSize="small" />
      <TextFieldStyled
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        variant="standard"
      />
    </PaperStyled>
  );
};
