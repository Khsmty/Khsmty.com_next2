import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import SearchField from '@/components/SearchField';
import { Metadata } from 'next';

type Props = {
  params: {
    current: string;
  };
  searchParams: {
    q?: string;
  };
};

export const revalidate = 60;

export function generateMetadata({ params, searchParams }: Props): Metadata {
  return {
    title: `「${searchParams.q}」の検索結果 (${params.current}ページ)`,
    description: `キーワード「${searchParams.q}」の検索結果です。(${params.current}ページ目)`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
    q: searchParams.q,
  });

  return (
    <>
      <SearchField />
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        current={current}
        basePath="/search"
        q={searchParams.q}
      />
    </>
  );
}
