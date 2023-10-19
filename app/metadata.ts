import { Metadata } from 'next';

interface PageSEOProps {
  title: string;
  description?: string;
  isArticle?: boolean;
  pageType?: 'article' | 'page';
  slug?: string;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  isArticle = false,
  pageType,
  slug,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description:
        description ||
        'Khsmty のウェブサイト兼ブログです。主に技術系の記事を書いて投稿しています。',
      url: './',
      siteName: 'Khsmties',
      images: isArticle
        ? [
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ogp?type=${pageType}&slug=${slug}`,
          ]
        : ['/static/images/ogp.png'],
      locale: 'ja_JP',
      type: isArticle ? 'article' : 'website',
    },
    twitter: {
      title,
      description:
        description ||
        'Khsmty のウェブサイト兼ブログです。主に技術系の記事を書いて投稿しています。',
      card: 'summary_large_image',
      images: isArticle
        ? [
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/ogp?type=${pageType}&slug=${slug}`,
          ]
        : ['/static/images/ogp.png'],
    },
    ...rest,
  };
}
