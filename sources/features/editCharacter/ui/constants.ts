import { ICharacter } from '@/entities/character';

export const fieldsMap: Array<{ name: keyof ICharacter; label: string }> = [
  { name: 'height', label: 'Height' },
  { name: 'mass', label: 'Mass' },
  { name: 'hair_color', label: 'Hair color' },
  { name: 'skin_color', label: 'Skin color' },
  { name: 'eye_color', label: 'Eye color' },
  { name: 'birth_year', label: 'Birth year' },
  { name: 'gender', label: 'Gender' },
];
