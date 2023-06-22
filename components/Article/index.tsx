import { formatRichText } from '@/libs/utils';
import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import { twemoji } from '@/libs/utils';
import TagList from '../TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {
  return (
    <article>
      <div className="flex flex-col items-center text-center">
        <div className="mt-10">{twemoji(data.emoji, 75)}</div>

        <h1 className="mt-7 text-3xl font-semibold">{data.title}</h1>

        <div className="mt-4 flex items-center">
          <FontAwesomeIcon
            icon={faTags}
            className="mr-2 h-5 w-5 text-gray-500"
          />
          <TagList tags={data.tags} />
        </div>

        <div className="mt-2 flex gap-3">
          <PublishedDate date={data.publishedAt || ''} />
          <PublishedDate date={data.updatedAt} />
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-[800px]">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: `${formatRichText(data.content)}`,
          }}
        />
      </div>
    </article>
  );
}
