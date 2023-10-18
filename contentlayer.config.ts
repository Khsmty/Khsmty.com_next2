import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from 'contentlayer/source-files';
import { writeFileSync } from 'fs';
import { slug } from 'github-slugger';
import removeMd from 'remove-markdown';
import {
  Article as ArticleGenerated,
  Page as PageGenerated,
} from 'contentlayer/generated';
import algoliasearch from 'algoliasearch';
import type { Graph } from 'schema-dts';

// Remark packages
import remarkGfm from 'remark-gfm';
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js';

// Rehype packages
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrismPlus from 'rehype-prism-plus';
import rehypePresetMinify from 'rehype-preset-minify';

const isProduction = process.env.NODE_ENV === 'production';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
};

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allArticles: ArticleGenerated[]) {
  const tagCount: Record<string, number> = {};

  allArticles.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount));
}

async function createSearchIndex(
  allArticles: ArticleGenerated[],
  allPages: PageGenerated[],
) {
  if (!isProduction) return;

  const articlesObj = allArticles
    .filter((post) => post.draft !== true)
    .map((post) => ({
      objectID: `article/${post.slug}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/article/${post.slug}`,
      title: post.title,
      tags: post.tags,
      description: post.summary,
      body: removeMd(post.body.raw),
      hierarchy: {
        lvl0: '記事',
        lvl1: post.title,
      },
      type: 'lvl1',
    }));
  const pagesObj = allPages
    .filter((post) => post.draft !== true)
    .map((post) => ({
      objectID: `article/${post.slug}`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${post.slug}`,
      title: post.title,
      description: post.summary,
      body: removeMd(post.body.raw),
      hierarchy: {
        lvl0: 'ページ',
        lvl1: post.title,
      },
      type: 'lvl1',
    }));
  const allObj = [...articlesObj, ...pagesObj];

  const client = algoliasearch(
    'OZ3EZL97TA',
    process.env.ALGOLIA_ADMIN_API_KEY as string,
  );
  const index = client.initIndex('content');

  await index.saveObjects(allObj, {
    autoGenerateObjectIDIfNotExist: true,
  });
}

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: 'article/**/*.mdx',
  contentType: 'mdx',
  fields: {
    emoji: { type: 'string', required: true },
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc: ArticleGenerated) =>
        ({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `https://khsmty.com/article/${doc.slug}`,
              url: `https://khsmty.com/article/${doc.slug}`,
              name: `${doc.title} | Khsmties`,
              description: doc.summary,
              isPartOf: {
                '@id': `https://khsmty.com/#website`,
              },
            },
            {
              '@type': 'Article',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `https://khsmty.com/article/${doc.slug}`,
              },
              headline: doc.title,
              image: {
                '@type': 'ImageObject',
                url: `https://khsmty.com/api/ogp?type=article&slug=${slug}`,
              },
              datePublished: doc.date,
              dateModified: doc.lastmod || doc.date,
              author: {
                '@type': 'Person',
                '@id': `$https://khsmty.com/article/${doc.slug}#author`,
                name: 'Khsmty',
                url: 'https://khsmty.com',
              },
              publisher: {
                '@id': 'https://khsmty.com/#organization',
              },
            },
          ],
        }) satisfies Graph,
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'page/**/*.mdx',
  contentType: 'mdx',
  fields: {
    emoji: { type: 'string', required: true },
    title: { type: 'string', required: true },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc: PageGenerated) =>
        ({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `https://khsmty.com/${doc.slug}`,
              url: `https://khsmty.com/${doc.slug}`,
              name: `${doc.title} | Khsmties`,
              description: doc.summary,
              isPartOf: {
                '@id': `https://khsmty.com/#website`,
              },
            },
          ],
        }) satisfies Graph,
    },
  },
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Article, Page],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  onSuccess: async (importData) => {
    const { allArticles, allPages } = await importData();

    createTagCount(allArticles);
    await createSearchIndex(allArticles, allPages);
  },
});
