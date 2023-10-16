import Link from 'next/link'
import TagList from './TagList'
import PublishedDate from './Date'
import { twemoji } from 'scripts/utils'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Article } from 'contentlayer/generated'

type Props = {
  article: CoreContent<Article>
}

export default function ArticleListItem({ article }: Props) {
  return (
    <div className="mb-5 w-full md:w-[49%]">
      <Link
        href={`/article/${article.slug}`}
        className="flex-row flex rounded-xl items-center bg-gray-100 p-3 shadow-xl"
      >
        <div className="mr-3 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-lg bg-base-100">
          {twemoji(article.emoji, 40)}
        </div>

        <div className="flex flex-auto flex-col gap-1 p-0">
          <TagList tags={article.tags} noLink />
          <h2 className="flex items-center gap-2 text-xl leading-7 font-semibold mt-1">
            {article.title}
          </h2>
          <PublishedDate date={article.lastmod || article.date} />
        </div>
      </Link>
    </div>
  )
}
