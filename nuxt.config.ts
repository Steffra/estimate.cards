export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/fonts'],
  nitro: {
    experimental: {
      websocket: true
    }
  },
  routeRules: {
    '/session/*': {
    ssr: false,
    },
  },

  compatibilityDate: '2024-11-19'
})