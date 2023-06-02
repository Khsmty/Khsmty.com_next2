// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "icon",
          href: "/img/icon_r.webp",
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

  modules: [
    "nuxt-microcms-module",
    "@nuxtjs/google-fonts",
    "nuxt-simple-sitemap",
  ],
  css: [
    "~/assets/style.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  build: {
    transpile: ["vuetify"],
  },

  googleFonts: {
    families: {
      Roboto: [400, 700],
      "Noto+Sans+JP": [400, 700],
    },
    display: "swap",
    preconnect: true,
    preload: true,
    prefetch: true,
  },
  sitemap: {
    siteUrl: "https://blog.terrier.dev",
  },
  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },
});
