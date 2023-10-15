import Link from 'next/link'
import TagList from './TagList'
import PublishedDate from './Date'
import { twemoji } from 'scripts/utils'
import { CoreContent } from 'pliny/utils/contentlayer'
import { Blog } from 'contentlayer/generated'

type Props = {
  post: CoreContent<Blog>
}

export default function ArticleListItem({ post }: Props) {
  return (
    <div className="mb-5 w-full md:w-[49%]">
      <Link
        href={`/article/${post.slug}`}
        className="flex-row flex rounded-md items-center bg-gray-400 p-3 shadow-xl"
      >
        <div className="mr-3 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-lg bg-base-100">
          {twemoji(post.emoji, 40)}
        </div>

        <div className="flex flex-auto flex-col gap-1 p-0">
          <TagList tags={post.tags} noLink />
          <h2 className="flex items-center gap-2 text-xl leading-7 font-semibold mt-1">
            {post.title}
          </h2>
          <PublishedDate date={post.lastmod || post.date} />
        </div>
      </Link>
    </div>
  )
}
