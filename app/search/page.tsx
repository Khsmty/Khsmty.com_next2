import { getList } from '@/libs/microcms';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import SearchField from '@/components/SearchField';
import { Metadata } from 'next';

type Props = {
  searchParams: {
    q?: string;
  };
};

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: searchParams.q ? `「${searchParams.q}」の検索結果` : '検索',
    description: searchParams.q
      ? `キーワード「${searchParams.q}」の検索結果です。`
      : 'キーワードで記事を検索できます。',
  };
}

export default async function Page({ searchParams }: Props) {
  const data = await getList({
    q: searchParams.q,
  });

  return (
    <>
      <SearchField />
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        basePath="/search"
        q={searchParams.q}
      />
    </>
  );
}
