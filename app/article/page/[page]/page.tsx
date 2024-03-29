import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allArticles } from 'contentlayer/generated';
import { redirect } from 'next/navigation';
import { genPageMetadata } from '@/app/metadata';

const POSTS_PER_PAGE = 10;

export const metadata = genPageMetadata({
  title: 'すべての記事',
  description: 'Khsmty が書いた記事の一覧です。',
});

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allArticles.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));

  return paths;
};

export default function Page({ params }: { params: { page: string } }) {
  if (params.page === '1') {
    return redirect('/article');
  }

  const posts = allCoreContent(sortPosts(allArticles));
  const pageNumber = parseInt(params.page as string);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    current: pageNumber,
    totalCount: posts.length,
    basePath: '/article',
  };

  return (
    <>
      <h1 className="mb-6 mt-5 text-center text-2xl font-semibold">
        すべての記事
      </h1>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
      />
    </>
  );
}
