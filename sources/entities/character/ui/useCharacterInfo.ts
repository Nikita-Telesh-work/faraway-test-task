'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '@/shared/hooks';
import { ICharacter } from '../model';

interface IUseCharacterInfo {
  info: ICharacter;
}

export const useCharacterInfo = ({ info }: IUseCharacterInfo) => {
  const { url } = info;
  const [mounted, setMounted] = useState(false);
  const characterId = useMemo(() => url.match(/\/(\d+)/)?.[1] ?? '', [url]);
  const [characterData] = useLocalStorage(characterId, info);
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender } =
    characterData;

  const infoRawsMap = useMemo(
    () => [
      { title: 'Height:', value: height },
      { title: 'Mass:', value: mass },
      { title: 'Hair color:', value: hair_color },
      { title: 'Skin color:', value: skin_color },
      { title: 'Eye color:', value: eye_color },
      { title: 'Birth year:', value: birth_year },
      { title: 'Gender:', value: gender },
    ],
    [birth_year, eye_color, gender, hair_color, height, mass, skin_color],
  );

  const editCharacterPageUrl = useMemo(() => {
    const startIndex = url.indexOf('/people');
    return url.substring(startIndex);
  }, [url]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted, name, infoRawsMap, editCharacterPageUrl };
};
