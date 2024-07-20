import React from 'react';
import { HomePage } from '@/pages/home';
import { getCharactersPage } from '@/entities/character';

interface IHome {
  searchParams?: {
    page?: string;
    search?: string;
  };
}

export default async function Home({ searchParams }: IHome) {
  const { page = '1', search = '' } = searchParams || {};
  const data = await getCharactersPage({ page, search });

  return <HomePage currentPageNumber={+page} currentSearch={search} data={data} />;
}
