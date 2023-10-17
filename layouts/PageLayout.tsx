import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Page } from 'contentlayer/generated'
import Link from '@/components/Link'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ArticlePageHeader from '@/components/article-page/ArticlePageHeader'

interface LayoutProps {
  content: CoreContent<Page>
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PageLayout({ content, next, prev, children }: LayoutProps) {
  const { slug, title, emoji } = content

  return (
    <section>
      <ScrollTopAndComment />
      <article>
        <ArticlePageHeader title={title} emoji={emoji} />

        <div className="mx-auto mt-7 max-w-[800px]">
          <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
            <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
          </div>
        </div>
      </article>
    </section>
  )
}
