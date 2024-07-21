'use client';

import Link, { LinkProps } from 'next/link';
import { styled } from '@mui/material/styles';
import { Paper, PaperProps, Typography, TypographyProps } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';

export const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
  minHeight: 'fit-content',
  padding: '16px',
  overflow: 'hidden',
  background: `rgba(${theme.vars.palette.common.backgroundChannel} / 0.85)`,
}));

export const LinkStyled = styled(Link)<LinkProps>(({ theme }) => ({
  color: theme.vars.palette.text.primary,
}));

export const EditNoteIconStyled = styled(EditNoteIcon)({
  cursor: 'pointer',
  position: 'absolute',
  top: '8px',
  right: '8px',
});

export const TitleStyled = styled(Typography)<TypographyProps>({
  textAlign: 'center',
});

export const InfoRawStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  marginTop: '8px',
  '& > span': {
    marginRight: '4px',
    fontWeight: '700',
    color: theme.vars.palette.info.light,
  },
}));
