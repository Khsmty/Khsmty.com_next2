import { twemoji } from 'scripts/utils';
import TagList from '../layouts/TagList';
import { FaTags } from 'react-icons/fa6';
import PublishedDate from '../layouts/PublishedDate';

type Props = {
  emoji: string;
  title: string;
  tags?: string[];
  date?: string;
  lastmod?: string;
};

export default function ArticlePageHeader({
  emoji,
  title,
  tags,
  date,
  lastmod,
}: Props) {
  return (
    <header className="flex flex-col items-center pt-8">
      <span>{twemoji(emoji, 75)}</span>

      <div className="mt-7 text-center">
        <h1 className="text-3xl font-semibold leading-normal tracking-tight">
          {title}
        </h1>
      </div>

      {tags && (
        <div className="mt-4 flex items-center">
          <FaTags className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
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
  );
}
