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
    <article>
      <ArticlePageHeader title={title} emoji={emoji} />

      <div className="mx-auto max-w-[800px]">
        <div className="content pb-12 pt-10">{children}</div>
      </div>

      <ScrollTopAndComment />
    </article>
  );
}
