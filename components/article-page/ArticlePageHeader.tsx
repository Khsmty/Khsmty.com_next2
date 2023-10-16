import { twemoji } from 'scripts/utils'
import TagList from '../TagList'
import { FaTags } from 'react-icons/fa6'
import PublishedDate from '../Date'

type Props = {
  emoji: string
  title: string
  tags?: string[]
  date?: string
  lastmod?: string
}

export default function ArticlePageHeader({ emoji, title, tags, date, lastmod }: Props) {
  return (
    <header className="pt-8 flex flex-col items-center">
      <span>{twemoji(emoji, 75)}</span>

      <div className="mt-7 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h1>
      </div>

      {tags && (
        <div className="flex mt-4 items-center">
          <FaTags className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
          <TagList tags={tags} />
        </div>
      )}

      {date && (
        <div className="mt-2 flex gap-3">
          <PublishedDate date={date} />
          {lastmod && <PublishedDate date={lastmod} type="updated" />}
        </div>
      )}
    </header>
  )
}
