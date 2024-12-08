export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@nuxt/fonts'],
  nitro: {
    experimental: {
      websocket: true
    }
  },

  compatibilityDate: '2024-11-19'
})