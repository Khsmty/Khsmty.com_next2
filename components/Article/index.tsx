import { formatDate, formatRichText } from '@/libs/utils';
import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import { twemoji } from '@/libs/utils';
import TagList from '../TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTags } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {
  const content = formatRichText(data.content);

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

          {formatDate(data.publishedAt || '') !==
            formatDate(data.updatedAt) && (
            <PublishedDate date={data.updatedAt} type="updated" />
          )}
        </div>
      </div>

      {/* 目次 */}
      {content.toc.length >= 2 && (
        <div className="card mx-auto mt-5 max-w-lg bg-base-200">
          <div className="card-body gap-1 p-2">
            <h2 className="card-title ml-2 mt-2">
              <FontAwesomeIcon
                icon={faList}
                className="h-5 w-5 text-gray-500"
              />
              目次
            </h2>
            <ul className="menu rounded-box menu-sm bg-base-200 pt-0">
              {content.toc.map((item) => (
                <li
                  key={item.id}
                  className={
                    'justify-start ' +
                    (item.name === 'h2'
                      ? 'ml-0'
                      : item.name === 'h3'
                      ? 'ml-2'
                      : item.name === 'h4'
                      ? 'ml-4'
                      : 'ml-6')
                  }
                >
                  <a href={`#${item.id}`}>
                    <span className="text-gray-500">{item.num}</span>
                    <span className="text-base">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mx-auto mt-7 max-w-[800px]">
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: `${content.html}`,
          }}
        />
      </div>
    </article>
  );
}
