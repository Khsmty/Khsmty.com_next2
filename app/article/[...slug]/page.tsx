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
import { genPageMetadata } from '@/app/metadata';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allArticles.find((p) => p.slug === slug);
  if (!post) return;

  return genPageMetadata({
    title: post.title,
    description: post.summary,
    isArticle: true,
    pageType: 'article',
    slug: post.slug,
  });
}

export const generateStaticParams = async () => {
  const paths = allArticles.map((p) => ({ slug: p.slug.split('/') }));

  return paths;
};

export default async function ArticlePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = decodeURI(params.slug.join('/'));

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ArticleLayout content={mainContent} next={next} prev={prev}>
        <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        />
      </ArticleLayout>
    </>
  );
}
