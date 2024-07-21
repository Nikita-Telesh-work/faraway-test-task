import { styled } from '@mui/material/styles';
import {
  Paper,
  PaperProps,
  TextField,
  TextFieldProps,
  Button,
  ButtonProps,
  Typography,
  TypographyProps,
} from '@mui/material';

export const PaperStyled = styled(Paper)<PaperProps>({
  maxHeight: '100%',
  overflow: 'auto',
  maxWidth: '500px',
  margin: '0 auto',
  padding: '20px',
});

export const TitleStyled = styled(Typography)<TypographyProps>({
  textAlign: 'center',
  width: '100%',
});

export const TextFieldStyled = styled(TextField)<TextFieldProps>({
  width: '100%',
  marginTop: '8px',
});

export const ButtonContainerStyled = styled('div')({
  marginTop: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  gap: '8px',
  width: '100%',
});

export const ButtonStyled = styled(Button)<ButtonProps>({
  width: '100%',
});
