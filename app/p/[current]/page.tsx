import { getList } from '@/libs/microcms';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { LIMIT } from '@/constants';
import { Metadata } from 'next';

type Props = {
  params: {
    current: string;
  };
};

export const revalidate = 60;

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: `記事一覧 (${params.current}ページ)`,
    description: `Khsmtyが書いた記事の一覧です。(${params.current}ページ目)`,
  };
}

export default async function Page({ params }: Props) {
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    offset: LIMIT * (current - 1),
  });

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} />
    </>
  );
}
