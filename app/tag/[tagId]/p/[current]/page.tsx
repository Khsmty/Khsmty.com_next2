import { getList } from '@/libs/microcms';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { LIMIT } from '@/constants';

type Props = {
  params: {
    tagId: string;
    current: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const { tagId } = params;
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    offset: LIMIT * (current - 1),
    filters: `tags[contains]${tagId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination
        totalCount={data.totalCount}
        current={current}
        basePath={`/tag/${tagId}`}
      />
    </>
  );
}
