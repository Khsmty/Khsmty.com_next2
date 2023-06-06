// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
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

  modules: ["nuxt-microcms-module", "nuxt-simple-sitemap", "nuxt-twemoji"],
  css: ["~/assets/style.scss", "vuetify/lib/styles/main.sass"],
  build: {
    transpile: ["vuetify"],
  },

  sitemap: {
    siteUrl: "https://khsmty.com",
  },
  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
  },
});
