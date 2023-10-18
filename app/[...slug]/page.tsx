import 'css/content.scss';

import { components } from '@/components/mdx/MDXComponents';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer';
import { allPages } from 'contentlayer/generated';
import type { Page } from 'contentlayer/generated';
import PageLayout from '@/layouts/PageLayout';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { genPageMetadata } from '@/app/metadata';

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allPages.find((p) => p.slug === slug);
  if (!post) return;

  return genPageMetadata({
    title: post.title,
    description: post.summary,
    isArticle: true,
    pageType: 'page',
    slug: post.slug,
  });
}

export async function generateStaticParams() {
  const paths = allPages.map((page) => ({ slug: page.slug.split('/') }));

  return paths;
}

export default async function PagePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = decodeURI(params.slug.join('/'));

  const sortedCoreContents = allCoreContent(allPages);
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const post = allPages.find((p) => p.slug === slug) as Page;
  const mainContent = coreContent(post);
  const jsonLd = post.structuredData;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageLayout content={mainContent}>
        <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        />
      </PageLayout>
    </>
  );
}
