import 'css/content.scss';
import 'katex/dist/katex.css';

import { components } from '@/components/mdx/MDXComponents';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer';
import { allPages } from 'contentlayer/generated';
import type { Page } from 'contentlayer/generated';
import PageLayout from '@/layouts/PageLayout';
import { Metadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import { notFound } from 'next/navigation';

const defaultLayout = 'PageLayout';
const layouts = {
  PageLayout,
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'));
  const post = allPages.find((p) => p.slug === slug);
  if (!post) {
    return;
  }

  let imageList = [siteMetadata.socialBanner];
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images;
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    };
  });

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'ja_JP',
      type: 'article',
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
  const paths = allPages.map((p) => ({ slug: p.slug.split('/') }));

  return paths;
};

export default async function PagePage({
  params,
}: {
  params: { slug: string[] };
}) {
  const slug = decodeURI(params.slug.join('/'));
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(allPages);
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug);
  if (postIndex === -1) {
    return notFound();
  }

  const post = allPages.find((p) => p.slug === slug) as Page;
  const mainContent = coreContent(post);
  // const jsonLd = post.structuredData
  // jsonLd['author'] = [
  //   {
  //     '@type': 'Person',
  //     name: 'Khsmty',
  //   },
  // ]

  const Layout = layouts[defaultLayout];

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <Layout content={mainContent}>
        <MDXLayoutRenderer
          code={post.body.code}
          components={components}
          toc={post.toc}
        />
      </Layout>
    </>
  );
}
