import { writeFileSync } from 'fs';
import { escape } from 'pliny/utils/htmlEscaper.js';
import { allArticles } from '../.contentlayer/generated/index.mjs';
import { sortPosts } from 'pliny/utils/contentlayer.js';

function createRSSItemXml(post) {
  return `
  <item>
    <guid>${process.env.NEXT_PUBLIC_BASE_URL}/article/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${process.env.NEXT_PUBLIC_BASE_URL}/article/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>me@khsmty.com (Khsmty)</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`;
}

function createRSSXml(posts, page = 'feed.xml') {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Khsmties</title>
      <link>${process.env.NEXT_PUBLIC_BASE_URL}/article</link>
      <description>Khsmty のブログサイト</description>
      <language>ja-jp</language>
      <managingEditor>me@khsmty.com (Khsmty)</managingEditor>
      <webMaster>me@khsmty.com (Khsmty)</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        process.env.NEXT_PUBLIC_BASE_URL
      }/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => createRSSItemXml(post)).join('')}
    </channel>
  </rss>
`;
}

async function generateRSS(allArticles, page = 'feed.xml') {
  const publishPosts = allArticles.filter((post) => post.draft !== true);
  if (publishPosts.length === 0) return;

  const rss = createRSSXml(sortPosts(publishPosts));
  writeFileSync(`./public/${page}`, rss);
}

export default async function rss() {
  await generateRSS(allArticles);
  console.log('RSS feed generated.');
}
