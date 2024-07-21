import React from 'react';
import { Skeleton } from '@/shared/ui';
import { ICharacter } from '../model';

import {
  EditNoteIconStyled,
  InfoRawStyled,
  LinkStyled,
  PaperStyled,
  TitleStyled,
} from './CharacterInfo.styled';
import { useCharacterInfo } from './useCharacterInfo';

export interface ICharacterInfo {
  info: ICharacter;
  className?: string;
}

export const CharacterInfo: React.FC<ICharacterInfo> = ({ info, className }) => {
  const { mounted, name, infoRawsMap, editCharacterPageUrl } = useCharacterInfo({ info });

  return (
    <PaperStyled className={className}>
      <LinkStyled
        aria-label={`Click to edit ${name} character details`}
        href={editCharacterPageUrl}>
        <EditNoteIconStyled data-testid="editCharacterIcon" />
      </LinkStyled>

      <TitleStyled variant="h5" component="h4">
        {name}
      </TitleStyled>

      {infoRawsMap.map(({ title, value }) =>
        mounted ? (
          <InfoRawStyled key={title} component="div">
            <span>{title}</span>
            {value}
          </InfoRawStyled>
        ) : (
          <Skeleton
            key={title}
            isLoading={!mounted}
            height="24px"
            width="100%"
            sx={{ marginTop: '8px' }}
          />
        ),
      )}
    </PaperStyled>
  );
};
