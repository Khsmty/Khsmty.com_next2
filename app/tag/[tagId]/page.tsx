import { getList, getTag } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { Metadata } from 'next';

type Props = {
  params: {
    tagId: string;
  };
};

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getTag(params.tagId);

  return {
    title: `タグ「${data.name}」の記事一覧`,
    description: `タグ「${data.name}」がついている記事の一覧です。`,
  };
}

export default async function Page({ params }: Props) {
  const data = await getList({
    filters: `tags[contains]${params.tagId}`,
  });
  const tag = await getTag(params.tagId);

  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        basePath={`/tag/${params.tagId}`}
      />
    </>
  );
}
