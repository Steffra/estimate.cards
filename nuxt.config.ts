export default defineNuxtConfig({
  modules: ['@vueuse/nuxt'],
  ssr: false,
  nitro: {
    experimental: {
      websocket: true
    }
  },

  compatibilityDate: '2024-11-19'
})