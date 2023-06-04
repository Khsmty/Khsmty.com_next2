// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js",
          crossorigin: "anonymous",
        },
      ],
      link: [
        {
          rel: "icon",
          href: "/img/icon_r.webp",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Roboto:wght@400;700&display=swap",
        },
      ],
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },

  modules: ["nuxt-microcms-module", "nuxt-simple-sitemap", "nuxt-twemoji"],
  css: [
    "~/assets/style.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },

  sitemap: {
    siteUrl: "https://blog.terrier.dev",
  },
  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },
});
