import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Article } from 'contentlayer/generated';
import Link from '@/components/mdx/Link';
import ScrollTopAndComment from '@/components/article/ScrollTopAndComment';
import { Comments, CommentsConfig } from 'pliny/comments';
import ArticlePageHeader from '@/components/article/ArticlePageHeader';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

const commentsConfig: CommentsConfig = {
  provider: 'giscus',
  giscusConfig: {
    repo: 'Khsmty/Khsmty.com',
    repositoryId: 'R_kgDOJpMqKA',
    category: 'コメント',
    categoryId: 'DIC_kwDOJpMqKM4CXK78',
    mapping: 'pathname',
    reactions: '0',
    metadata: '0',
    theme: 'light',
    darkTheme: 'transparent_dark',
    themeURL: '',
    lang: 'ja',
  },
};

interface LayoutProps {
  content: CoreContent<Article>;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
  children: ReactNode;
}

export default function ArticleLayout({
  content,
  next,
  prev,
  children,
}: LayoutProps) {
  const { slug, date, lastmod, title, emoji, tags } = content;

  return (
    <article>
      <ArticlePageHeader
        title={title}
        emoji={emoji}
        tags={tags}
        date={date}
        lastmod={lastmod}
      />

      <div className="mx-auto max-w-[800px]">
        <div className="content pb-8 pt-10">{children}</div>

        <div className="border-b" />

        <div id="comments" className="py-6 text-center">
          <Comments commentsConfig={commentsConfig} slug={slug} />
        </div>

        <div className="border-b" />

        {(next || prev) && (
          <div className="mt-5 flex flex-col justify-between lg:flex-row">
            {prev && prev.path ? (
              <Link
                href={`/${prev.path}`}
                className="flex w-full items-center rounded-xl bg-base-200 px-4 py-3 lg:w-[49%]"
              >
                <FaAngleLeft className="mr-2 inline-block h-6 w-6 shrink-0" />
                {prev.title}
              </Link>
            ) : (
              <div className="hidden lg:block lg:w-[49%]" />
            )}
            {next && next.path ? (
              <Link
                href={`/${next.path}`}
                className="mt-3 flex w-full items-center rounded-xl bg-base-200 px-4 py-3 lg:mt-0 lg:w-[49%]"
              >
                {next.title}
                <FaAngleRight className="ml-2 inline-block h-6 w-6 shrink-0" />
              </Link>
            ) : (
              <div className="hidden lg:block lg:w-[49%]" />
            )}
          </div>
        )}
      </div>

      <ScrollTopAndComment />
    </article>
  );
}
