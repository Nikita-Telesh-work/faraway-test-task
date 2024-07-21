'use client';

import { ChangeEvent, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useCharactersList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onChangePagination = useCallback(
    (_: ChangeEvent<unknown>, newPageNumber: number) => {
      if (searchParams) {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
      }
    },
    [pathname, replace, searchParams],
  );

  return { onChangePagination };
};
