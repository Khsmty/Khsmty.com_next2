import 'css/tailwind.css';
import 'pliny/search/algolia.css';

import React from 'react';
import { GA } from 'pliny/analytics';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { Metadata } from 'next';
import Head from '@/components/layouts/Head';
import Providers from '@/components/layouts/Providers';
import type { Graph } from 'schema-dts';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: {
    default: 'Khsmties',
    template: `%s | Khsmties`,
  },
  description:
    'Khsmty のウェブサイト兼ブログです。主に技術系の記事を書いて投稿しています。',
  openGraph: {
    title: 'Khsmties',
    description:
      'Khsmty のウェブサイト兼ブログです。主に技術系の記事を書いて投稿しています。',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Khsmties',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/static/images/ogp.png`],
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_BASE_URL}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Khsmties',
    card: 'summary_large_image',
    images: ['/static/images/ogp.png'],
  },
};

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
        url: 'https://khsmty.com/static/images/icon.png',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
      <Head />

      <body>
        <Providers>
          <div className="flex h-[100svh] flex-col justify-between">
            <Header />

            <main className="mx-auto mb-auto mt-24 w-screen max-w-4xl px-4 lg:px-0">
              {children}
            </main>

            <Footer />
          </div>
        </Providers>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GA googleAnalyticsId="G-58TCGP81KF" />
      </body>
    </html>
  );
}
