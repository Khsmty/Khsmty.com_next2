import { formatDate, formatRichText } from '@/libs/utils';
import type { Article, Page } from '@/libs/microcms';
import PublishedDate from '../Date';
import { twemoji } from '@/libs/utils';
import TagList from '../TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faB,
  faComment,
  faList,
  faShare,
  faTags,
} from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.css';
import CopyBtn from '@/components/CopyBtn';
import GiscusComponent from '@/components/Giscus';
import {
  faFacebook,
  faLine,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

type Props = {
  data: Article | Page;
  page?: boolean;
};

export default function Article({ data, page = false }: Props) {
  const content = formatRichText(data.content);

  const shares = [
    {
      icon: faTwitter,
      color: '#1d9bf0',
      url: 'https://twitter.com/intent/tweet?url={url}&text={title}&via=@Khsmty',
    },
    {
      icon: faFacebook,
      color: '#1877f2',
      url: 'https://www.facebook.com/sharer/sharer.php?u={url}',
    },
    {
      icon: faLine,
      color: '#06c655',
      url: 'https://social-plugins.line.me/lineit/share?url={url}&text={title}',
    },
    {
      icon: faB,
      color: '#00a4de',
      url: 'https://b.hatena.ne.jp/add?mode=confirm&url={url}&title={title}',
    },
  ];

  return (
    <article>
      <div className="flex flex-col items-center text-center">
        <div className="mt-10">{twemoji(data.emoji, 75)}</div>

        <h1 className="mt-7 text-3xl font-semibold">{data.title}</h1>

        {!page && (
          <>
            <div className="mt-4 flex items-center">
              <FontAwesomeIcon
                icon={faTags}
                className="mr-2 h-5 w-5 text-gray-500"
              />
              {/* @ts-expect-error */}
              <TagList tags={data.tags} />
            </div>

            <div className="mt-2 flex gap-3">
              <PublishedDate date={data.publishedAt || ''} />

              {formatDate(data.publishedAt || '') !==
                formatDate(data.updatedAt) && (
                <PublishedDate date={data.updatedAt} type="updated" />
              )}
            </div>
          </>
        )}
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

      <div className="mb-14 mt-8 flex flex-col items-center gap-2">
        <span className="flex items-center text-xl font-semibold">
          <FontAwesomeIcon icon={faShare} className="mr-2 h-4 w-4" />
          共有
        </span>

        <div className="flex">
          {shares.map((share) => (
            <a
              key={share.icon.iconName}
              href={share.url
                .replace(
                  '{url}',
                  encodeURIComponent(
                    process.env.NEXT_PUBLIC_BASE_URL + `/article/${data.id}`
                  )
                )
                .replace('{title}', encodeURIComponent(data.title))}
              className="btn-ghost btn-circle btn"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={share.icon}
                className="h-6 w-6"
                style={{ color: share.color }}
              />
            </a>
          ))}
          <CopyBtn path={data.id} />
        </div>

        {!page && (
          <>
            <span className="mt-3 flex items-center text-xl font-semibold">
              <FontAwesomeIcon icon={faComment} className="mr-2 h-4 w-4" />
              コメント
            </span>

            <div className="w-full">
              <GiscusComponent />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
