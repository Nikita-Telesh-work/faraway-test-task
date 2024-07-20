'use client';

import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { Alert, Snackbar } from '@mui/material';
import { ICharacter } from '@/entities/character';
import { Skeleton } from '@/shared/ui';

import {
  PaperStyled,
  TitleStyled,
  TextFieldStyled,
  ButtonContainerStyled,
  ButtonStyled,
} from './EditCharacterForm.styled';
import { useEditCharacterForm } from './useEditCharacterForm';

interface IEditCharacterForm {
  id: string;
  data: ICharacter;
}

export const EditCharacterForm: React.FC<IEditCharacterForm> = ({ id, data }) => {
  const { name } = data;
  const {
    mounted,
    isValid,
    openSnackbar,
    initialValues,
    fieldsMap,
    validate,
    onSubmit,
    onCloseSnackbar,
    onClickExit,
  } = useEditCharacterForm({
    id,
    data,
  });

  return (
    <PaperStyled>
      <TitleStyled component="h2" variant="h5">
        {name}
      </TitleStyled>

      <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
        <Form>
          {fieldsMap.map(({ name, label }) => (
            <Field key={name} name={name}>
              {({ field, form: { errors } }: FieldProps<string, Record<string, string>>) => (
                <Skeleton isLoading={!mounted} height="48px" width="100%" sx={{ marginTop: '8px' }}>
                  <TextFieldStyled
                    {...field}
                    label={label}
                    variant="standard"
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                  />
                </Skeleton>
              )}
            </Field>
          ))}

          <ButtonContainerStyled>
            <ButtonStyled type="button" onClick={onClickExit} variant="contained" color="info">
              Exit
            </ButtonStyled>

            <ButtonStyled disabled={!isValid} type="submit" variant="contained" color="success">
              Save
            </ButtonStyled>
          </ButtonContainerStyled>
        </Form>
      </Formik>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={onCloseSnackbar}>
        <Alert onClose={onCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          Changes were saved!
        </Alert>
      </Snackbar>
    </PaperStyled>
  );
};
