import Link from 'next/link';
import { Article } from '@/libs/microcms';
import TagList from './TagList';
import PublishedDate from './Date';
import { twemoji } from '@/libs/utils';

type Props = {
  article: Article;
};

export default function ArticleListItem({ article }: Props) {
  return (
    <div className="mb-5 w-full md:w-[49%]">
      <Link
        href={`/article/${article.id}`}
        className="card card-side items-center bg-base-200 p-3 shadow-xl"
      >
        <div className="mr-3 flex h-[65px] w-[65px] shrink-0 items-center justify-center rounded-lg bg-base-100">
          {twemoji(article.emoji, 40)}
        </div>

        <div className="card-body gap-1 p-0">
          <TagList tags={article.tags} noLink />
          <h2 className="card-title mt-1">{article.title}</h2>
          <PublishedDate date={article.publishedAt || article.createdAt} />
        </div>
      </Link>
    </div>
  );
}
