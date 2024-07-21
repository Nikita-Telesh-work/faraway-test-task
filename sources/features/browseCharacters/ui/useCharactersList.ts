'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMedia } from 'react-use';
import { breakpoints } from '@/shared/styles';

export const useCharactersList = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const isLessThanTablet = useMedia(`(max-width: ${breakpoints.tablet - 0.02}px)`, false);
  const isLessThanExtraSmallPhone = useMedia(
    `(max-width: ${breakpoints.extraSmallPhone - 0.02}px)`,
    false,
  );

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

  useEffect(() => {
    setMounted(true);
  }, []);

  return { mounted, isLessThanTablet, isLessThanExtraSmallPhone, onChangePagination };
};
