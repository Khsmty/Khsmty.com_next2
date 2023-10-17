/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Khsmties',
  author: 'Tails Azimuth',
  headerTitle: 'Khsmties',
  description: 'A blog created with Next.js and Tailwind.css',
  language: 'ja-jp',
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
  siteRepo: 'https://github.com/timlrx/tailwind-nextjs-starter-blog',
  siteLogo: '/static/images/logo.png',
  socialBanner: '/static/images/twitter-card.png',
  mastodon: 'https://mastodon.social/@mastodonuser',
  email: 'address@yoursite.com',
  github: 'https://github.com',
  twitter: 'https://twitter.com/Twitter',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com',
  locale: 'ja-JP',
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: 'Khsmty/Khsmty.com',
      repositoryId: 'R_kgDOJpMqKA',
      category: 'コメント',
      categoryId: 'DIC_kwDOJpMqKM4CXK78',
      mapping: 'pathname',
      reactions: '0',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'ja',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: 'search.json',
    },
  },
};

module.exports = siteMetadata;
