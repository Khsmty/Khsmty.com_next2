import ListLayout from '@/layouts/ListLayout';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { allArticles } from 'contentlayer/generated';
import { genPageMetadata } from '@/app/metadata';

const POSTS_PER_PAGE = 5;

export const metadata = genPageMetadata({ title: 'Blog' });

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allArticles));
  const pageNumber = 1;
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber,
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
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
