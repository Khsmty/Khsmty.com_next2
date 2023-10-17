import { ReactNode } from 'react';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Page } from 'contentlayer/generated';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import ArticlePageHeader from '@/components/article-page/ArticlePageHeader';

interface LayoutProps {
  content: CoreContent<Page>;
  children: ReactNode;
}

export default function PageLayout({ content, children }: LayoutProps) {
  const { title, emoji } = content;

  return (
    <section>
      <article>
        <ArticlePageHeader title={title} emoji={emoji} />

        <div className="mx-auto mt-7 max-w-[800px]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="content prose max-w-none pb-8 pt-10">
              {children}
            </div>
          </div>
        </div>
      </article>
      <ScrollTopAndComment />
    </section>
  );
}
