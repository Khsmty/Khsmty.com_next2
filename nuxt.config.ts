// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-microcms-module"],
  microCMS: {
    // serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    serviceDomain: 'khsmty',
    apiKey: process.env.MICROCMS_API_KEY,
  }
})
