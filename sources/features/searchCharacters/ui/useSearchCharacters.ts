'use client';

import { ChangeEvent } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';

export const useSearchCharacters = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const onChange = debounce((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);

      if (e.target.value.toString().length > 0) {
        params.set('search', e.target.value.toString());
        params.set('page', '1');
      } else {
        params.delete('search');
      }

      replace(`${pathname}?${params.toString()}`);
    }
  }, 300);

  return { onChange };
};
