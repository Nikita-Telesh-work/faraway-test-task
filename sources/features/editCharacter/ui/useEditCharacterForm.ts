'use client';

import { useRouter } from 'next/navigation';
import { ICharacter } from '@/entities/character';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FormikValues } from 'formik';
import { useLocalStorage } from '@/shared/hooks';

interface IUseEditCharacterForm {
  id: string;
  data: ICharacter;
}

export const useEditCharacterForm = ({ id, data }: IUseEditCharacterForm) => {
  const router = useRouter();
  const [characterData, updateCharacterData] = useLocalStorage(id, data);
  const [mounted, setMounted] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [openSnackbar, setIsOpenSnackbar] = useState(false);

  const fieldsMap: Array<{ name: keyof ICharacter; label: string }> = useMemo(
    () => [
      { name: 'height', label: 'Height' },
      { name: 'mass', label: 'Mass' },
      { name: 'hair_color', label: 'Hair color' },
      { name: 'skin_color', label: 'Skin color' },
      { name: 'eye_color', label: 'Eye color' },
      { name: 'birth_year', label: 'Birth year' },
      { name: 'gender', label: 'Gender' },
    ],
    [],
  );

  const initialValues = useMemo(
    () =>
      fieldsMap.reduce(
        (acc, { name }) => {
          acc[name] = characterData[name] as string;

          return acc;
        },
        {} as Record<keyof ICharacter, string>,
      ),
    [characterData, fieldsMap],
  );

  const validate = useCallback((values: FormikValues) => {
    const errors: Record<string, string> = {};

    for (let field in values) {
      const value = values[field];

      if (value.length === 0) {
        errors[field] = 'Type something to save!';
      }
    }

    setIsValid(Object.keys(errors).length === 0);

    return errors;
  }, []);

  const onSubmit = useCallback(
    (values: FormikValues) => {
      if (isValid && mounted) {
        updateCharacterData({
          ...characterData,
          ...values,
        });
        setIsOpenSnackbar(true);
      }
    },
    [mounted, characterData, isValid, updateCharacterData],
  );

  const onCloseSnackbar = useCallback(() => setIsOpenSnackbar(false), []);

  const onClickExit = () => router.back();

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    mounted,
    isValid,
    openSnackbar,
    initialValues,
    fieldsMap,
    validate,
    onSubmit,
    onCloseSnackbar,
    onClickExit,
  };
};
