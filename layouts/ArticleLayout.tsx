import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Article } from 'contentlayer/generated';
import Link from '@/components/mdx/Link';
import ScrollTopAndComment from '@/components/article/ScrollTopAndComment';
import { Comments, CommentsConfig } from 'pliny/comments';
import ArticlePageHeader from '@/components/article/ArticlePageHeader';

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

        <div className="border-b-2" />

        <div className="py-6 text-center">
          <Comments commentsConfig={commentsConfig} slug={slug} />
        </div>

        <footer>
          <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
            {(next || prev) && (
              <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                {prev && prev.path && (
                  <div>
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Previous Article
                    </h2>
                    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      <Link href={`/${prev.path}`}>{prev.title}</Link>
                    </div>
                  </div>
                )}
                {next && next.path && (
                  <div>
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Next Article
                    </h2>
                    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      <Link href={`/${next.path}`}>{next.title}</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </footer>
      </div>

      <ScrollTopAndComment />
    </article>
  );
}
