import 'css/tailwind.css';
import 'pliny/search/algolia.css';

import { AnalyticsConfig, GA } from 'pliny/analytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import siteMetadata from '@/data/siteMetadata';
import { ThemeProviders } from './theme-providers';
import { Metadata } from 'next';
import { AlgoliaSearchProvider } from 'pliny/search/Algolia';

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
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
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteMetadata.language}
      className="scroll-smooth"
      suppressHydrationWarning
    >
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
        href="/static/favicons/safari-pinned-tab.svg"
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
      <body>
        <ThemeProviders>
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
        </ThemeProviders>
      </body>
    </html>
  );
}
