/* eslint-disable jsx-a11y/anchor-is-valid */
'use client';

import { CoreContent } from 'pliny/utils/contentlayer';
import type { Article } from 'contentlayer/generated';
import Pagination from '@/components/layouts/Pagination';
import ArticleList from '@/components/layouts/ArticleList';

interface PaginationProps {
  current: number;
  basePath?: string;
}
interface ListLayoutProps {
  posts: CoreContent<Article>[];
  initialDisplayPosts?: CoreContent<Article>[];
  pagination: PaginationProps;
}

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const displayPosts =
    initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

  return (
    <>
      <div>
        <ArticleList articles={displayPosts} />

        <Pagination
          totalCount={posts.length}
          current={pagination.current}
          basePath={pagination.basePath}
        />
      </div>
    </>
  );
}
