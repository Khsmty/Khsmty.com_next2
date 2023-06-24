import { getList } from '@/libs/microcms';
import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import SearchField from '@/components/SearchField';

type Props = {
  searchParams: {
    q?: string;
  };
};

export const revalidate = 60;

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
