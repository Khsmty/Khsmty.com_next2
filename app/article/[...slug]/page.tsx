import 'css/content.scss';

import { components } from '@/components/mdx/MDXComponents';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import {
  sortPosts,
  coreContent,
  allCoreContent,
} from 'pliny/utils/contentlayer';
import { allArticles } from 'contentlayer/generated';
import type { Article } from 'contentlayer/generated';
import ArticleLayout from '@/layouts/ArticleLayout';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const defaultLayout = 'ArticleLayout';
const layouts = {
  ArticleLayout,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allArticles.find((p) => p.slug === slug);
  if (!post) {
    return;
  }

  const publishedAt = new Date(post.date).toISOString();
  const modifiedAt = new Date(post.lastmod || post.date).toISOString();
  let imageList = ['/static/ogp.png'];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : process.env.NEXT_PUBLIC_BASE_URL + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: 'Khsmties',
      locale: 'ja_JP',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: ['Khsmty'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  };
}

export const generateStaticParams = async () => {
  const paths = allArticles.map((p) => ({ slug: p.slug.split('/') }));

  return paths;
};

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'));
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allArticles));
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[postIndex + 1];
  const next = sortedCoreContents[postIndex - 1];
  const post = allArticles.find((p) => p.slug === slug) as Article;
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;
  jsonLd['author'] = [
    {
      '@type': 'Person',
      name: 'Khsmty',
    },
  ];

  const Layout = layouts[defaultLayout];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        />
      </Layout>
    </>
  );
}
