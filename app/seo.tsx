import { Metadata } from 'next';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    openGraph: {
      title: `${title} | Khsmties`,
      description: description || 'Khsmty のウェブサイト兼ブログ',
      url: './',
      siteName: 'Khsmties',
      images: image ? [image] : ['/static/ogp.png'],
      locale: 'ja_JP',
      type: 'website',
    },
    twitter: {
      title: `${title} | Khsmties`,
      card: 'summary_large_image',
      images: image ? [image] : ['/static/ogp.png'],
    },
    ...rest,
  };
}
