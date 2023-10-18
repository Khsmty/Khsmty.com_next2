import 'css/tailwind.css';
import 'pliny/search/algolia.css';

import React from 'react';
import { GA } from 'pliny/analytics';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { Metadata } from 'next';
import { AlgoliaSearchProvider } from 'pliny/search/Algolia';
import ThemeProvider from '@/components/layouts/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  title: {
    default: 'Khsmties',
    template: `%s | Khsmties`,
  },
  description: 'Khsmty のウェブサイト兼ブログ',
  openGraph: {
    title: 'Khsmties',
    description: 'Khsmty のウェブサイト兼ブログ',
    url: './',
    siteName: 'Khsmties',
    images: ['/static/ogp.png'],
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: './',
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
    images: ['/static/ogp.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth" suppressHydrationWarning>
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
        rel="icon"
        type="image/png"
        href="/static/favicons/safari-pinned-tab.png"
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

      <body>
        <ThemeProvider>
          <GA googleAnalyticsId="G-58TCGP81KF" />

          <section>
            <div className="flex h-[100svh] flex-col justify-between">
              <AlgoliaSearchProvider
                algoliaConfig={{
                  appId: 'OZ3EZL97TA',
                  apiKey: 'fe707591c3ac98c3da6f645d3e5e5010',
                  indexName: 'content',
                  placeholder: 'サイト内を検索',
                }}
              >
                <Header />
                <main className="mx-auto mb-auto mt-24 w-screen max-w-4xl px-4 lg:px-0">
                  {children}
                </main>
              </AlgoliaSearchProvider>
              <Footer />
            </div>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}
