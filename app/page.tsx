import React from 'react';
import { HomePage } from '@/pages/home';
import { getCharactersPage } from '@/entities/character';

export interface IAppHomePage {
  searchParams?: {
    page?: string;
    search?: string;
  };
}

export default async function AppHomePage({ searchParams }: IAppHomePage) {
  const { page = '1', search = '' } = searchParams || {};
  const data = await getCharactersPage({ query: { page, search } });

  return <HomePage currentPageNumber={+page} currentSearch={search} data={data} />;
}
