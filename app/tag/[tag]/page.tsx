import { slug } from 'github-slugger';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import ListLayout from '@/layouts/ListLayout';
import { allArticles } from 'contentlayer/generated';
import tagData from '@/app/tag-data.json';
import { genPageMetadata } from '@/app/seo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Promise<Metadata> {
  const tag = decodeURI(params.tag);
  return genPageMetadata({
    title: tag,
    description: `Khsmties ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${process.env.NEXT_PUBLIC_BASE_URL}/tag/${tag}/feed.xml`,
      },
    },
  });
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>;
  const tagKeys = Object.keys(tagCounts);
  const paths = tagKeys.map((tag) => ({
    tag: tag,
  }));
  return paths;
};

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURI(params.tag);

  const filteredPosts = allCoreContent(
    sortPosts(
      allArticles.filter(
        (post) => post.tags && post.tags.map((t) => slug(t)).includes(tag),
      ),
    ),
  );
  if (!filteredPosts.length) {
    return notFound();
  }

  return (
    <>
      <h1 className="mb-6 mt-5 text-center text-2xl font-semibold">
        タグ「{tag}」がついた記事
      </h1>
      <ListLayout posts={filteredPosts} />
    </>
  );
}
