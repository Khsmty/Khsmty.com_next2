import Link from 'next/link';
import TagList from './TagList';
import PublishedDate from './PublishedDate';
import { twemoji } from 'scripts/utils';
import { CoreContent } from 'pliny/utils/contentlayer';
import { Article } from 'contentlayer/generated';

type Props = {
  article: CoreContent<Article>;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <div className="mb-5 w-full md:w-[49%]">
      <Link
        href={`/article/${article.slug}`}
        className="card card-side items-center bg-base-200 p-3 shadow-xl"
      >
        <div className="mr-3 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-lg bg-base-100">
          {twemoji(article.emoji, 40)}
        </div>

        <div className="card-body gap-1 p-0">
          <TagList tags={article.tags} noLink />
          <h2 className="card-title mt-1">{article.title}</h2>
          <PublishedDate date={article.lastmod || article.date} />
        </div>
      </Link>
    </div>
  );
}
