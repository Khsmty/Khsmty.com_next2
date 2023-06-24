import { LIMIT } from '@/constants';
import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSQueries,
} from 'microcms-js-sdk';
import { createClient } from 'microcms-js-sdk';
import { notFound } from 'next/navigation';

// タグの型定義
export type Tag = {
  name: string;
} & MicroCMSContentId &
  MicroCMSDate;

// 記事の型定義
export type Article = {
  title: string;
  description: string;
  content: string;
  emoji: string;
  tags: Tag[];
} & MicroCMSContentId &
  MicroCMSDate;

// ページの型定義
export type Page = {
  title: string;
  description: string;
  content: string;
  emoji: string;
} & MicroCMSContentId &
  MicroCMSDate;

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
  throw new Error('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
  throw new Error('NEXT_PUBLIC_MICROCMS_API_KEY is required');
}

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});

// ブログ一覧を取得
export const getList = async (queries?: MicroCMSQueries) => {
  return await client
    .getList<Article>({
      endpoint: 'article',
      queries: {
        orders: '-publishedAt',
        limit: LIMIT,
        ...queries,
      },
    })
    .catch(notFound);
};

// ブログの詳細を取得
export const getDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client
    .getListDetail<Article>({
      endpoint: 'article',
      contentId,
      queries,
    })
    .catch(notFound);
};

// タグの詳細を取得
export const getTag = async (contentId: string, queries?: MicroCMSQueries) => {
  return await client
    .getListDetail<Tag>({
      endpoint: 'tag',
      contentId,
      queries,
    })
    .catch(notFound);
};

// ページの詳細を取得
export const getPageDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client
    .getListDetail<Article>({
      endpoint: 'page',
      contentId,
      queries,
    })
    .catch(notFound);
};
