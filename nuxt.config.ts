export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/fonts'],
  ssr: false,
  nitro: {
    experimental: {
      websocket: true
    }
  },

  compatibilityDate: '2024-11-19'
})