import React from 'react';
import { PaperStyled, SearchOffIconStyled, TextStyled } from './NoContent.styled';

interface INoContent {
  text: string;
}

export const NoContent: React.FC<INoContent> = ({ text }) => (
  <PaperStyled>
    <SearchOffIconStyled data-testid="searchIcon" />
    <TextStyled component="p">{text}</TextStyled>
  </PaperStyled>
);
