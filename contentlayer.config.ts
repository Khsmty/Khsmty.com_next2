import {
  defineDocumentType,
  ComputedFields,
  makeSource,
} from 'contentlayer/source-files';
import { writeFileSync } from 'fs';
import GithubSlugger from 'github-slugger';
import removeMd from 'remove-markdown';
import { Article as ArticleGenerated } from 'contentlayer/generated';

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
import siteMetadata from './data/siteMetadata';
import algoliasearch from 'algoliasearch';

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
  const slugger = new GithubSlugger();
  const tagCount: Record<string, number> = {};

  allArticles.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slugger.slug(tag);
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

async function createSearchIndex(allArticles: ArticleGenerated[]) {
  if (!isProduction) return;

  const postsObj = allArticles.map((post) => {
    if (post.draft === true) return;

    return {
      objectID: `article/${post.slug}`,
      url: `${siteMetadata.siteUrl}/article/${post.slug}`,
      title: post.title,
      tags: post.tags,
      description: post.summary,
      body: removeMd(post.body.raw),
      hierarchy: {
        lvl0: '記事',
        lvl1: post.title,
      },
      type: 'lvl1',
    };
  });

  const client = algoliasearch(
    'OZ3EZL97TA',
    process.env.ALGOLIA_ADMIN_API_KEY as string,
  );
  const index = client.initIndex('content');

  // @ts-expect-error
  await index.saveObjects(postsObj, { autoGenerateObjectIDIfNotExist: true });
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
    images: { type: 'json' },
  },
  computedFields: {
    ...computedFields,
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.date,
        dateModified: doc.lastmod || doc.date,
        description: doc.summary,
        image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
      }),
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
    images: { type: 'json' },
  },
  computedFields: {
    ...computedFields,
    // structuredData: {
    //   type: 'json',
    //   resolve: (doc) => ({
    //     '@context': 'https://schema.org',
    //     '@type': 'BlogPosting',
    //     headline: doc.title,
    //     datePublished: doc.date,
    //     dateModified: doc.lastmod || doc.date,
    //     description: doc.summary,
    //     image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
    //     url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
    //   }),
    // },
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
    const { allArticles } = await importData();

    createTagCount(allArticles);
    await createSearchIndex(allArticles);
  },
});
