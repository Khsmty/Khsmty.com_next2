import { MetadataRoute } from 'next';
import { allArticles } from 'contentlayer/generated';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const blogRoutes = allArticles.map((post) => ({
    url: `${siteUrl}/${post.path}`,
    lastModified: post.lastmod || post.date,
    priority: 1,
  }));

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogRoutes];
}
