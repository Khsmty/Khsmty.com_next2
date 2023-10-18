import type { Graph } from 'schema-dts';

const jsonLd: Graph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://khsmty.com/#organization',
      name: 'Khsmty',
      url: 'https://khsmty.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://khsmty.com/static/icon.png',
        width: '1024',
        height: '1024',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://khsmty.com/#website',
      url: 'https://khsmty.com/',
      name: 'Khsmties | Khsmty のウェブサイト',
      description:
        'Khsmty のウェブサイト兼ブログです。主に技術系の記事を書いて投稿しています。',
    },
  ],
};

export default function Head() {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/static/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/favicons/safari-pinned-tab.png"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
